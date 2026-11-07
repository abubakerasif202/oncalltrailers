import { expect, test, type Page } from '@playwright/test';
import { STUB_WIDGET } from './stub-widget';

const CAGE = 'product_01a19102-9dd1-77ba-8a1e-b873a4e37fe4';
const MOTORCYCLE = 'product_01a19103-22b0-738d-a605-047c6ab43ad8';
const LTH = 'https://www.localtrailerhire.com.au/l/12x6-tandem-cage-box-trailer-haberfield/68a2ad2c-53a0-4737-81db-ad3ed00ef2d8';

test.skip(process.env.LOCKII_E2E_MODE === 'live', 'preview-build tests');

type Mode = 'stub' | 'blocked' | 'hang';

/** Every provider request is intercepted: nothing in this suite reaches the real widget or booking site. */
async function interceptProviders(page: Page, mode: Mode = 'stub') {
  const requests: string[] = [];
  await page.route('https://www.localtrailerhire.com.au/**', (route) => route.abort());
  await page.route('https://book.lockii.app/**', (route) => {
    requests.push(route.request().url());
    if (mode === 'stub') return route.fulfill({ contentType: 'text/javascript', body: STUB_WIDGET });
    if (mode === 'blocked') return route.abort();
    return undefined; // hang: never answer, so the widget never defines its elements
  });
  return requests;
}

test('the embed script is injected once with the documented attributes plus the two defensive opt-outs', async ({ page }) => {
  const requests = await interceptProviders(page);
  await page.goto('/book');
  await expect(page.locator('lockii-browse')).toHaveCount(1);
  await expect(page.locator('script[src="https://book.lockii.app/widget.js"]')).toHaveCount(1);
  expect(requests.filter((url) => url.endsWith('/widget.js'))).toHaveLength(1);
  const attrs = await page.evaluate(() => (window as unknown as { __stubScriptAttrs: Record<string, string> }).__stubScriptAttrs);
  expect(attrs['data-lockii-id']).toBe('hg6xlx8');
  expect(attrs['data-analytics']).toBe('off'); // preview must not record visits
  expect(attrs['data-schema']).toBe('off'); // no second JSON-LD block
  expect(attrs['data-support-chat']).toBe('off'); // no default chat overlay
});

test('the script stays single across client-side navigation and all widgets use the documented attributes', async ({ page }) => {
  await interceptProviders(page);
  await page.goto('/book');
  await expect(page.locator('lockii-checkout-button')).toHaveCount(2);
  await expect(page.locator(`lockii-checkout-button[product_id="${CAGE}"]`)).toHaveCount(1);
  await expect(page.locator(`lockii-checkout-button[product_id="${MOTORCYCLE}"]`)).toHaveCount(1);
  // Client-side navigation only (no reload): /book → home → trailer page. A page-level marker proves no reload.
  await page.evaluate(() => { (window as unknown as { __noReload: boolean }).__noReload = true; });
  await page.locator('.site-header a.brand').first().click();
  await page.locator('.hero').getByRole('link', { name: 'View trailer' }).click();
  await expect(page).toHaveURL(/\/trailers\/tandem-cage-trailer$/);
  expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true);
  await expect(page.locator(`lockii-checkout-button[product_id="${CAGE}"]`)).toHaveCount(1);
  await expect(page.locator('script[src="https://book.lockii.app/widget.js"]')).toHaveCount(1);
  expect(await page.evaluate(() => (window as unknown as { __stubLoads: number }).__stubLoads)).toBe(1);
});

test('manage-booking hosts the account widget', async ({ page }) => {
  await interceptProviders(page);
  await page.goto('/manage-booking');
  await expect(page.locator('lockii-account')).toHaveCount(1);
});

test('the shield blocks clicks, keyboard and tab stops, so nothing can be booked', async ({ page }) => {
  await interceptProviders(page);
  await page.goto('/trailers/tandem-cage-trailer');
  const stage = page.locator('.lockii-stage');
  await expect(stage.locator('lockii-checkout-button')).toHaveCount(1);
  await expect(stage.locator('.lockii-host')).toHaveAttribute('inert', '');
  const button = stage.locator('button[data-stub-action]');
  await button.scrollIntoViewIfNeeded();
  // A real pointer click at the button's position lands on the shield, not the widget.
  const box = (await button.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await button.focus().catch(() => undefined);
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  for (let i = 0; i < 40; i++) await page.keyboard.press('Tab');
  const reachedWidget = await page.evaluate(() => !!document.activeElement?.closest('.lockii-host'));
  expect(reachedWidget).toBe(false);
  expect(await page.evaluate(() => (window as unknown as { __checkoutClicks?: number }).__checkoutClicks ?? 0)).toBe(0);
  await expect(stage.locator('.lockii-shield')).toBeVisible();
  await expect(page.getByRole('note').first()).toContainText('Preview only');
});

test('frames get an accessible name', async ({ page }) => {
  await interceptProviders(page);
  await page.goto('/book');
  const frame = page.locator('.lockii-host iframe').first();
  await expect(frame).toHaveAttribute('title', 'Trailer availability');
});

for (const mode of ['blocked', 'hang'] as const) {
  test(`when the script is ${mode} the page falls back to the live booking link and phone`, async ({ page }) => {
    test.setTimeout(40_000);
    await interceptProviders(page, mode);
    await page.goto('/trailers/tandem-cage-trailer');
    const fallback = page.locator('.lockii-fallback');
    await expect(fallback).toBeVisible({ timeout: 20_000 });
    await expect(fallback.locator(`a[href="${LTH}"]`)).toHaveAttribute('target', '_blank');
    await expect(fallback.locator('a[href="tel:+61490176809"]')).toBeVisible();
    await expect(page.locator('main h1')).toBeVisible();
  });
}

test('routes keep a booking CTA, noindex, and stay out of the sitemap', async ({ page, request }) => {
  await interceptProviders(page);
  for (const route of ['/book', '/manage-booking']) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator(`main a[href="${LTH}"]`).first()).toBeVisible();
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).not.toContain('/book');
  expect(sitemap).not.toContain('/manage-booking');
});

test('structured data keeps exactly one LocalBusiness block and no widget schema is added', async ({ page }) => {
  await interceptProviders(page);
  await page.goto('/trailers/tandem-cage-trailer');
  await expect(page.locator('lockii-checkout-button')).toHaveCount(1);
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(blocks.filter((b) => JSON.parse(b)['@type'] === 'LocalBusiness')).toHaveLength(1);
  await expect(page.locator('script[data-lockii-schema]')).toHaveCount(0);
});

test('the existing Local Trailer Hire links are unchanged and funnel events are separate and honest', async ({ page }) => {
  await interceptProviders(page);
  await page.goto('/trailers/tandem-cage-trailer');
  await page.evaluate(() => {
    const w = window as unknown as { __events: unknown[] };
    w.__events = [];
    window.addEventListener('oct:track', (e) => w.__events.push((e as CustomEvent).detail));
    document.addEventListener('click', (e) => { if ((e.target as Element).closest('a[target="_blank"]')) e.preventDefault(); }, true);
  });
  const link = page.locator(`.panel a[data-booking="external"]`);
  await expect(link).toHaveAttribute('href', LTH);
  await link.click();
  const events = (await page.evaluate(() => (window as unknown as { __events: { event: string }[] }).__events)).map((e) => e.event).filter((name) => name !== 'trailer_detail_view');
  expect(events).toEqual(['booking_cta_click', 'local_trailer_hire_click']);
  expect(events).not.toContain('booking_completed');
});

test('no horizontal overflow or layout jump on the booking pages', async ({ page }) => {
  await interceptProviders(page);
  for (const route of ['/book', '/manage-booking', '/trailers/tandem-cage-trailer']) {
    await page.goto(route);
    await expect(page.locator('.lockii-host > *').first()).toBeAttached();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const frames = await page.locator('.lockii-frame').all();
    for (const frame of frames) {
      const box = (await frame.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    }
  }
});

test('hydrates without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await interceptProviders(page);
  for (const route of ['/book', '/manage-booking', '/trailers/tandem-cage-trailer']) {
    await page.goto(route);
    await expect(page.locator('.lockii-host > *').first()).toBeAttached();
  }
  expect(errors).toEqual([]);
});

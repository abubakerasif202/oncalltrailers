import { expect, test, type Page } from '@playwright/test';
import { STUB_WIDGET } from './stub-widget';

// Live-build tests. The provider script is always replaced by an inert stub: no real widget, booking,
// payment or analytics request is ever made.
test.skip(process.env.LOCKII_E2E_MODE !== 'live', 'live-build tests');

async function stubProvider(page: Page) {
  const requests: string[] = [];
  await page.route('https://www.localtrailerhire.com.au/**', (route) => route.abort());
  await page.route('https://book.lockii.app/**', (route) => {
    requests.push(route.request().url());
    return route.fulfill({ contentType: 'text/javascript', body: STUB_WIDGET });
  });
  return requests;
}

test('live /book is interactive: no shield, no preview banner, analytics on', async ({ page }) => {
  await stubProvider(page);
  await page.goto('/book');
  const stage = page.locator('.lockii-stage').first();
  await expect(stage.locator('lockii-browse')).toHaveCount(1);
  await expect(stage).toHaveAttribute('data-shielded', 'false');
  await expect(stage.locator('.lockii-host')).not.toHaveAttribute('inert', '');
  await expect(page.locator('.lockii-shield, .lockii-banner')).toHaveCount(0);
  await expect(page.getByText('Preview only')).toHaveCount(0);
  const attrs = await page.evaluate(() => (window as unknown as { __stubScriptAttrs: Record<string, string> }).__stubScriptAttrs);
  expect(attrs).toMatchObject({ 'data-lockii-id': 'hg6xlx8', 'data-analytics': 'on', 'data-schema': 'off', 'data-support-chat': 'off' });
  await expect(page.locator('script[src="https://book.lockii.app/widget.js"]')).toHaveCount(1);
});

test('the stub widget can be clicked and the page records one flow-entry event', async ({ page }) => {
  await stubProvider(page);
  await page.addInitScript(() => {
    const w = window as unknown as { __events: { event: string }[] };
    w.__events = [];
    window.addEventListener('oct:track', (e) => w.__events.push((e as CustomEvent).detail));
  });
  await page.goto('/book');
  await page.locator('button[data-stub-action="lockii-browse"]').click();
  expect(await page.evaluate(() => (window as unknown as { __checkoutClicks?: number }).__checkoutClicks)).toBe(1);
  await expect.poll(() => page.evaluate(() => (window as unknown as { __events: { event: string }[] }).__events.map((e) => e.event))).toEqual(['lockii_flow_entry']);
});

test('manage-booking hosts the live account widget', async ({ page }) => {
  await stubProvider(page);
  await page.goto('/manage-booking');
  await expect(page.locator('lockii-account')).toHaveCount(1);
  await expect(page.locator('.lockii-stage')).toHaveAttribute('data-shielded', 'false');
});

test('the indexed trailer page keeps the site prices alone: no widget beside them', async ({ page }) => {
  const requests = await stubProvider(page);
  await page.goto('/trailers/tandem-cage-trailer');
  await expect(page.locator('.panel .rates')).toContainText('$83.86');
  await expect(page.locator('.lockii-stage, lockii-checkout-button')).toHaveCount(0);
  expect(requests).toEqual([]);
});

test('booking pages stay noindex, unlisted and out of the sitemap', async ({ page, request }) => {
  await stubProvider(page);
  for (const route of ['/book', '/manage-booking']) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('nav a[href="/book"], nav a[href="/manage-booking"]')).toHaveCount(0);
    await expect(page.locator('main a[data-booking="external"]').first()).toBeVisible();
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).not.toMatch(/\/book|\/manage-booking/);
});

test('live still falls back to Local Trailer Hire and the phone when the widget is blocked', async ({ page }) => {
  await page.route('https://www.localtrailerhire.com.au/**', (route) => route.abort());
  await page.route('https://book.lockii.app/**', (route) => route.abort());
  await page.goto('/book');
  const fallback = page.locator('.lockii-fallback').first();
  await expect(fallback).toBeVisible();
  await expect(fallback.locator('a[href="tel:+61490176809"]')).toBeVisible();
});

test('one LocalBusiness block, no widget schema, no overflow', async ({ page }) => {
  await stubProvider(page);
  for (const route of ['/book', '/manage-booking']) {
    await page.goto(route);
    await expect(page.locator('.lockii-host > *').first()).toBeAttached();
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.filter((b) => JSON.parse(b)['@type'] === 'LocalBusiness')).toHaveLength(1);
    await expect(page.locator('script[data-lockii-schema]')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

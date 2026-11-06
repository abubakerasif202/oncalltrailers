import { expect, test, type Locator, type Page } from '@playwright/test';

const BOOKING = 'https://www.localtrailerhire.com.au/u/614c78ad-b2b7-4b0e-b4c8-1e266b2caa3d';
const ROUTES = ['/', '/trailers', '/trailers/tandem-cage-trailer', '/faq', '/how-it-works', '/contact'];

async function expectFocusInside(page: Page, dialog: Locator) {
  for (const key of ['Shift+Tab', ...Array<string>(10).fill('Tab')]) {
    await page.keyboard.press(key);
    await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
}

test.beforeEach(async ({ page }) => {
  // The suite never touches the external booking site.
  await page.route('https://www.localtrailerhire.com.au/**', (route) => route.abort());
});

test('mobile menu supports keyboard, focus restoration and navigation', async ({ page, isMobile }) => {
  test.skip((page.viewportSize()?.width ?? 1440) > 960 && !isMobile, 'Mobile menu is hidden on desktop.');
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
  await expectFocusInside(page, dialog);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'FAQ', exact: true }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('every booking call to action opens the external booking page safely in a new tab', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const links = page.locator(`a[href="${BOOKING}"]`);
    expect(await links.count(), `${route} has a booking CTA`).toBeGreaterThan(0);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
    await expect(page.locator('a[href="/trailers#book"], a[href="/contact#enquire"]')).toHaveCount(0);
  }
});

test('hero shows the headline, a visible booking action and the trailer', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sydney trailer hire.');
  const cta = page.locator('.hero').getByRole('link', { name: /Check availability/ });
  await expect(cta).toBeInViewport();
  await expect(page.locator('.hero').getByRole('link', { name: 'View trailer' })).toHaveAttribute('href', '/trailers/tandem-cage-trailer');
  await expect(page.getByRole('img', { name: /tandem cage trailer.*Sydney Opera House/i })).toBeVisible();
});

test('phone links use a valid tel: href', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('a[href="tel:+61490176809"]').first()).toBeVisible();
});

test('FAQ items expand and collapse', async ({ page }) => {
  await page.goto('/faq');
  const first = page.locator('.faq details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
  await first.locator('summary').click();
  await expect(first).not.toHaveAttribute('open', '');
});

test('gallery switches views with the keyboard', async ({ page }) => {
  await page.goto('/trailers/tandem-cage-trailer');
  const thumb = page.getByRole('button', { name: 'Cage and axle' });
  await thumb.focus();
  await page.keyboard.press('Enter');
  await expect(thumb).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.gallery__img[data-active="true"]')).toHaveCount(1);
});

test('pause control stops decorative motion and is remembered', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('.ambient')).toBeHidden();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
});

test('reduced motion hides the particle field and leaves content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.ambient')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#fleet h2')).toBeVisible();
});

test('routes render without horizontal overflow or runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  for (const route of ROUTES) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

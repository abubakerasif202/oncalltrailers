import { expect, test, type Locator, type Page } from '@playwright/test';

const BOOKING = 'https://www.localtrailerhire.com.au/l/12x6-tandem-cage-box-trailer-haberfield/68a2ad2c-53a0-4737-81db-ad3ed00ef2d8';
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

test('navigation works at every width: desktop links or the accessible mobile menu', async ({ page }) => {
  await page.goto('/');
  const wide = (page.viewportSize()?.width ?? 0) > 960;
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });
  if (wide) {
    await expect(trigger).toBeHidden();
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'FAQ' }).click();
    await expect(page).toHaveURL(/\/faq$/);
    return;
  }
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

test('keyboard: skip link is first, focus is visible, and the booking link is reachable', async ({ page, browserName }) => {
  await page.goto('/');
  // Safari does not Tab to links unless a system setting is on, so focus it directly there.
  if (browserName === 'webkit') await page.getByRole('link', { name: 'Skip to main content' }).focus();
  else await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  const outline = await page.getByRole('link', { name: 'Skip to main content' }).evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
  const booking = page.locator('.hero a[data-booking="external"]');
  await booking.focus();
  await expect(booking).toBeFocused();
  expect(await booking.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
});

test('sticky CTA appears after the hero, stays compact and never covers the footer', async ({ page }) => {
  await page.goto('/');
  const bar = page.locator('.sticky-book');
  await expect(bar).toHaveAttribute('data-visible', 'false');
  await page.evaluate(() => window.scrollTo(0, innerHeight * 1.5));
  await expect(bar).toHaveAttribute('data-visible', 'true');
  const box = await bar.boundingBox();
  expect(box!.height).toBeLessThanOrEqual(80);
  const link = bar.locator('a[data-booking="external"]');
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', BOOKING);
  await page.evaluate(() => document.querySelector('.site-footer')!.scrollIntoView());
  await expect(bar).toHaveAttribute('data-visible', 'false');
});

test('fleet and detail pages state rates with their conditions and attribute statistics', async ({ page }) => {
  await page.goto('/trailers/tandem-cage-trailer');
  const rates = page.locator('.panel .rates');
  await expect(rates).toContainText('Short hire');
  await expect(rates).toContainText('$83.86');
  await expect(rates).toContainText('total per day');
  await expect(rates).toContainText('4+ day hire');
  await expect(rates).toContainText('7+ day hire');
  await expect(page.locator('.panel')).toContainText('including all fees and taxes');
  await expect(page.locator('.reviews__stats')).toContainText('This listing');
  await expect(page.locator('.reviews__stats')).toContainText('Owner profile');
  await expect(page.getByText('Illustrative 3D renders of the trailer type')).toBeVisible();
  await expect(page.getByText(/identical/i)).toHaveCount(0);
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
  const thumb = page.getByRole('button', { name: 'Axle' });
  await thumb.focus();
  await page.keyboard.press('Enter');
  await expect(thumb).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.gallery__img[data-active="true"]')).toHaveCount(1);
});

test('pause control stops decorative motion and is remembered', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const pause = page.getByRole('button', { name: 'Pause animations' });
  await pause.focus(); // smooth scrolling can still be moving the footer button, so activate by keyboard
  await page.keyboard.press('Enter');
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

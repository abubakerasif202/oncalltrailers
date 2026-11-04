import { expect, test, type Page, type Locator } from '@playwright/test';

async function expectFocusInside(page: Page, dialog: Locator) {
  for (const key of ['Shift+Tab', ...Array<string>(12).fill('Tab')]) {
    await page.keyboard.press(key);
    await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
}

async function expectDismissed(page: Page, trigger: Locator) {
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.pointerEvents)).not.toBe('none');
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
}

test.beforeEach(async ({ page }) => {
  // No provider network calls or bookings are performed by this UI regression suite.
  await page.route('https://dash.lockii.app/**', (route) => route.fulfill({
    status: 200, contentType: 'text/javascript', body: '/* Booking provider stubbed for UI-only QA. */',
  }));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Book with Lockii' })).toBeEnabled();
});

test('mobile menu supports keyboard, focus restoration and navigation', async ({ page, isMobile }) => {
  test.skip((page.viewportSize()?.width ?? 1440) > 960 && !isMobile, 'Mobile menu is intentionally hidden on desktop.');
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
  await expectFocusInside(page, dialog);
  await page.keyboard.press('Escape');
  await expectDismissed(page, trigger);
  await trigger.click();
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expectDismissed(page, trigger);
  await trigger.click();
  await dialog.getByRole('link', { name: 'FAQ', exact: true }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.faq details').first()).toBeVisible();
});

test('mobile dialog releases focus and scroll lock on desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.site-header .brand')).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.pointerEvents)).not.toBe('none');
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
});

test('reservation supports keyboard, close controls, backdrop and repeated opening', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Book with Lockii' });
  await trigger.focus();
  await page.keyboard.press('Space');
  const dialog = page.getByRole('dialog', { name: 'Self-Service Trailer Reservation' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleDescription(/Direct connection/);
  await expect(dialog.getByRole('button', { name: 'Close reservation' })).toBeFocused();
  await expectFocusInside(page, dialog);
  await page.keyboard.press('Escape');
  await expectDismissed(page, trigger);
  for (const close of ['Close reservation', 'Return to fleet']) {
    await trigger.click();
    await dialog.getByRole('button', { name: close, exact: true }).click();
    await expectDismissed(page, trigger);
  }
  await trigger.click();
  await page.locator('.dialog-overlay').click({ position: { x: 2, y: 400 } });
  await expectDismissed(page, trigger);
});

test('reservation retains equipment and duration selections after dismissing', async ({ page }) => {
  await page.getByRole('button', { name: '24 Hours (1 Day)', exact: true }).click();
  await page.getByRole('checkbox', { name: /Ratchet Straps/ }).check();
  const total = page.locator('.calc').filter({ has: page.getByRole('button', { name: 'Book with Lockii' }) }).locator('.quote .fig');
  await expect(total).toHaveText('$90');
  await page.getByRole('button', { name: 'Book with Lockii' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('checkbox', { name: /Ratchet Straps/ })).toBeChecked();
  await expect(page.getByRole('button', { name: '24 Hours (1 Day)', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(total).toHaveText('$90');
});

test('dialog respects OS reduced motion and the site pause preference', async ({ page }) => {
  for (const preference of ['reduce', 'site-pause']) {
    await page.emulateMedia({ reducedMotion: preference === 'reduce' ? 'reduce' : 'no-preference' });
    if (preference === 'site-pause') await page.getByRole('button', { name: 'Pause animations' }).click();
    await page.getByRole('button', { name: 'Book with Lockii' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveCSS('transform', 'none');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
});

test('production routes and reservation stay within the responsive viewport', async ({ page }, testInfo) => {
  for (const route of ['/', '/trailers', '/trailers/tandem-cage-trailer', '/faq', '/how-it-works', '/contact']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/');
  await page.getByRole('button', { name: 'Book with Lockii' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight && element.scrollWidth <= element.clientWidth;
  })).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('reservation.png') });
});

test('booking entry is explicit about demo mode or exposes the configured embed', async ({ page }) => {
  await page.goto('/trailers#book');
  const booking = page.locator('#book');
  await expect(booking).toBeVisible();
  if (await booking.locator('lockii-selector').count()) {
    // Configuration/markup only: external provider is blocked by this suite.
    await expect(page.locator('script[data-lockii-id]')).toHaveAttribute('src', 'https://dash.lockii.app/widget.js');
    await expect(page.locator('script[data-lockii-id]')).toHaveAttribute('data-lockii-id', /\S+/);
  } else {
    await expect(booking.getByRole('heading', { name: 'Booking preview — not yet connected' })).toBeVisible();
    await expect(booking).toContainText('Live availability, payment and collection access are not enabled.');
  }
});

test('critical interactions do not emit runtime or accessibility warnings', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' || /Dialog.*(Title|Description)|unique.*key/i.test(message.text())) errors.push(message.text());
  });
  await page.reload();
  await page.getByRole('button', { name: 'Book with Lockii' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(errors).toEqual([]);
});

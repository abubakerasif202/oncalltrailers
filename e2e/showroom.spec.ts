import { expect, test, type Page } from '@playwright/test';

const CAGE = 'https://www.localtrailerhire.com.au/l/12x6-tandem-cage-box-trailer-haberfield/68a2ad2c-53a0-4737-81db-ad3ed00ef2d8';
const MOTORCYCLE = 'https://www.localtrailerhire.com.au/l/motorcycle-x3-trailer/6a9e5309-1800-49c5-9297-b0663d34ecf8';
const PAGES = [
  { path: '/trailers/tandem-cage-trailer', name: '12×6 Cage Box Trailer', title: 'Cage Trailer Hire Sydney | On Call Trailers' },
  { path: '/trailers/motorcycle-trailer', name: 'Motorcycle x3 Trailer', title: 'Motorcycle Trailer Hire Sydney | On Call Trailers' },
  { path: '/trailers/car-trailer', name: 'Car Trailer', title: 'Car Trailer Hire Sydney | On Call Trailers' },
] as const;

// Neither the booking platform nor the widget provider is ever contacted by this suite.
test.beforeEach(async ({ page }) => {
  await page.route('https://www.localtrailerhire.com.au/**', (route) => route.abort());
  await page.route('https://book.lockii.app/**', (route) => route.abort());
});

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    scrollTo(0, 0);
  });
}

test.describe('fleet cards', () => {
  test('the home page shows three trailer cards with verified facts and the right actions', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#fleet .fleet-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('12×6 Cage Box Trailer');
    await expect(cards.nth(0)).toContainText('Ideal for moving furniture, equipment, landscaping materials and bulky loads.');
    await expect(cards.nth(0)).toContainText('1,330 kg');
    await expect(cards.nth(0)).toContainText('$83.86');
    await expect(cards.nth(1)).toContainText('Motorcycle x3 Trailer');
    await expect(cards.nth(1)).toContainText('Designed for transporting motorcycles securely.');
    await expect(cards.nth(1)).toContainText('570 kg');
    await expect(cards.nth(1)).toContainText('$38.34');
    await expect(cards.nth(2)).toContainText('Car Trailer');
    await expect(cards.nth(2)).toContainText('Designed for vehicle transport.');
    // The car trailer has no confirmed rate or specification, so none is invented.
    await expect(cards.nth(2)).toContainText('To be confirmed');
    await expect(cards.nth(2)).toContainText('Hire rate confirmed on enquiry');
    await expect(cards.nth(2)).not.toContainText(/\$\d/);
    // Each card has an Explore link to its own page.
    for (const [index, slug] of ['tandem-cage-trailer', 'motorcycle-trailer', 'car-trailer'].entries()) {
      await expect(cards.nth(index).locator(`a[href="/trailers/${slug}"]`)).toHaveCount(1);
    }
  });

  test('Book Now goes to each trailer’s own listing; the car trailer only offers an enquiry', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#fleet .fleet-card');
    for (const [index, href] of [CAGE, MOTORCYCLE].entries()) {
      const link = cards.nth(index).locator('a[data-booking="external"]');
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
    await expect(cards.nth(2).locator('a[data-booking="external"]')).toHaveCount(0);
    await expect(cards.nth(2).locator('a[href*="localtrailerhire"]')).toHaveCount(0);
    await expect(cards.nth(2).getByRole('link', { name: /Enquire/ })).toHaveAttribute('href', '/contact#enquire');
  });

  test('cards are keyboard reachable with a visible focus state, and every render loads', async ({ page }) => {
    await page.goto('/');
    await scrollThrough(page);
    const card = page.locator('#fleet .fleet-card').first();
    const explore = card.getByRole('link', { name: /Explore Trailer/ });
    await explore.focus();
    await expect(explore).toBeFocused();
    expect(await card.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
    await expect.poll(() => page.locator('#fleet .fleet-card__img').evaluateAll((imgs) => imgs.every((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0))).toBe(true);
  });

  test('the floating motion runs normally, stops for reduced motion, and stops with the pause control', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const img = page.locator('#fleet .fleet-card__img').first();
    // The element animates, so Playwright would wait forever for it to be stable: scroll with the DOM instead.
    await page.locator('#fleet').evaluate((el) => el.scrollIntoView());
    const animation = () => img.evaluate((el) => getComputedStyle(el).animationName);
    expect(await animation()).toBe('fleet-float');
    const pause = page.getByRole('button', { name: 'Pause animations' });
    await pause.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    expect(await animation()).toBe('none');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => localStorage.removeItem('motion'));
    await page.reload();
    expect(await page.locator('#fleet .fleet-card__img').first().evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  });

  test('cards stay inside the viewport at this width', async ({ page }) => {
    await page.goto('/');
    for (const card of await page.locator('#fleet .fleet-card').all()) {
      const box = (await card.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    }
  });
});

test.describe('comparison', () => {
  test('compares the trailers with confirmed facts and "To be confirmed" for the rest', async ({ page }) => {
    await page.goto('/trailers');
    const rows = page.locator('.compare tbody tr');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText('$83.86 total per day');
    await expect(rows.nth(0)).toContainText('2,000 kg');
    await expect(rows.nth(1)).toContainText('$38.34 total per day');
    await expect(rows.nth(1)).toContainText('750 kg');
    await expect(rows.nth(2)).toContainText('Enquire first');
    expect(await rows.nth(2).getByText('To be confirmed').count()).toBeGreaterThanOrEqual(4);
    await expect(rows.nth(2)).not.toContainText(/\$\d|\d\s?kg/);
  });
});

test.describe('trailer pages', () => {
  for (const entry of PAGES) {
    test(`${entry.path} has unique SEO, one h1, breadcrumbs and valid images`, async ({ page }) => {
      await page.goto(entry.path);
      await expect(page).toHaveTitle(entry.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${entry.path}$`));
      expect((await page.locator('meta[name="description"]').getAttribute('content'))!.length).toBeGreaterThan(60);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(entry.name.split(' ')[0]);
      await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText(entry.name);
      const crumbs = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((b) => JSON.parse(b)).find((b) => b['@type'] === 'BreadcrumbList');
      expect(crumbs.itemListElement).toHaveLength(3);
      expect(crumbs.itemListElement[2].item).toMatch(new RegExp(`${entry.path}$`));
      // Heading order never skips a level.
      const levels = await page.locator('main h1, main h2, main h3').evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading jump on ${entry.path}`).toBeLessThanOrEqual(1);
      // Every image reserves space and has an alt attribute; exactly one image is high priority (the hero).
      const images = await page.locator('main img').evaluateAll((imgs) => imgs.map((i) => ({ w: i.getAttribute('width'), h: i.getAttribute('height'), alt: i.getAttribute('alt'), prio: i.getAttribute('fetchpriority'), loading: i.getAttribute('loading') })));
      for (const image of images) {
        expect(image.w && image.h).toBeTruthy();
        expect(image.alt).not.toBeNull();
      }
      expect(images.filter((i) => i.prio === 'high')).toHaveLength(1);
      expect(images.filter((i) => i.loading === 'eager').length).toBeLessThanOrEqual(2);
      await scrollThrough(page);
      await expect.poll(() => page.locator('main img').evaluateAll((imgs) => imgs.every((i) => (i as HTMLImageElement).naturalWidth > 0))).toBe(true);
    });
  }

  test('the cage page keeps its rates, reviews and renders note', async ({ page }) => {
    await page.goto('/trailers/tandem-cage-trailer');
    await expect(page.locator('.panel .rates')).toContainText('$77.87');
    await expect(page.locator('.reviews__stats')).toContainText('This listing');
    await expect(page.getByText('Illustrative 3D renders of the trailer type')).toBeVisible();
  });

  test('the motorcycle page shows only its own listing facts and rates, and no cage reviews', async ({ page }) => {
    await page.goto('/trailers/motorcycle-trailer');
    const rates = page.locator('.panel .rates');
    await expect(rates).toContainText('$38.34');
    await expect(rates).toContainText('$35.94');
    await expect(rates).toContainText('$33.54');
    await expect(page.locator('.spec-table, table').first()).toContainText('570 kg');
    await expect(page.locator('.reviews__stats')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('Haberfield');
    await expect(page.locator('main')).not.toContainText('2,000 kg');
    await expect(page.locator('main a[data-booking="external"]').first()).toHaveAttribute('href', MOTORCYCLE);
    await expect(page.locator('.site-header a[data-booking="external"]').first()).toHaveAttribute('href', MOTORCYCLE);
    await expect(page.locator('.site-footer a[data-booking="external"]').first()).toHaveAttribute('href', MOTORCYCLE);
    // No render claim about axles or ramps: the listing does not state them.
    expect(await page.locator('.trailer-hero img, .gallery img').evaluateAll((imgs) => imgs.map((i) => i.getAttribute('alt')).join(' '))).not.toMatch(/tandem|single axle|ramp/i);
  });

  test('the car trailer cannot be booked through any listing URL, and stays out of search', async ({ page, request }) => {
    await page.goto('/trailers/car-trailer');
    await expect(page.locator('a[data-booking="external"]')).toHaveCount(0);
    await expect(page.locator('a[href*="localtrailerhire.com.au/l/"]')).toHaveCount(0);
    await expect(page.locator('.lockii-stage, lockii-checkout-button, script[src*="lockii"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/contact#enquire"]').first()).toBeVisible();
    await expect(page.locator('.site-header a[href="/contact#enquire"]')).toHaveCount(1);
    await expect(page.locator('.site-footer a[href="/contact#enquire"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('main')).not.toContainText(/\$\d/);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).not.toContain('car-trailer');
    expect(sitemap).toContain('/trailers/motorcycle-trailer');
    expect(sitemap).toContain('/trailers/tandem-cage-trailer');
  });

  test('the booking button follows the trailer during client-side navigation', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('.site-header a[data-booking="external"]').first();
    await expect(header).toHaveAttribute('href', CAGE);
    // A marker on window proves these are client-side navigations, not full reloads.
    await page.evaluate(() => { (window as unknown as { __noReload: boolean }).__noReload = true; });
    await page.locator('#fleet').getByRole('link', { name: /Explore Trailer.*Motorcycle/ }).click();
    await expect(page).toHaveURL(/motorcycle-trailer$/);
    expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true);
    await expect(page.locator('.site-header a[data-booking="external"]').first()).toHaveAttribute('href', MOTORCYCLE);
    await page.locator('main .related a[href="/trailers/car-trailer"]').click();
    await expect(page).toHaveURL(/car-trailer$/);
    await expect(page.locator('.site-header a[href="/contact#enquire"]')).toHaveCount(1);
    await expect(page.locator('.site-header a[data-booking="external"]')).toHaveCount(0);
  });
});

test.describe('image showroom', () => {
  test('arrow keys change the view and thumbnails stay in sync', async ({ page }) => {
    await page.goto('/trailers/tandem-cage-trailer');
    const stage = page.locator('.gallery__stage');
    await stage.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Side view' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.gallery__count')).toContainText('Side view · 2 / 3');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('button', { name: 'Studio cutout' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.gallery__img[data-active="true"]')).toHaveCount(1);
  });

  test('fullscreen opens an accessible viewer with zoom, keyboard navigation and focus return', async ({ page }) => {
    await page.goto('/trailers/motorcycle-trailer');
    const open = page.getByRole('button', { name: 'Fullscreen' });
    await open.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: /Motorcycle x3 Trailer: Front view/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('img')).toHaveAttribute('alt', /Illustrative 3D render/);
    await expect(dialog.locator('.lightbox__zoom')).toHaveText('100%');
    await page.keyboard.press('+');
    await expect(dialog.locator('.lightbox__zoom')).toHaveText('150%');
    await dialog.getByRole('button', { name: 'Zoom in' }).click();
    await expect(dialog.locator('.lightbox__zoom')).toHaveText('200%');
    await page.keyboard.press('0');
    await expect(dialog.locator('.lightbox__zoom')).toHaveText('100%');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog', { name: /Side view/ })).toBeVisible();
    // Focus stays inside the viewer.
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      expect(await page.getByRole('dialog').evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(open).toBeFocused();
  });

  test('the viewer fits the screen without overflow at this width', async ({ page }) => {
    await page.goto('/trailers/car-trailer');
    await page.getByRole('button', { name: 'Fullscreen' }).click();
    const dialog = page.getByRole('dialog');
    const box = (await dialog.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible();
  });
});

test('no asset or page request fails across the fleet routes', async ({ page }) => {
  const failures: string[] = [];
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  for (const route of ['/', '/trailers', ...PAGES.map((p) => p.path)]) {
    await page.goto(route);
    await scrollThrough(page);
    await page.waitForLoadState('networkidle');
  }
  expect(failures).toEqual([]);
});

test('existing live routes still render', async ({ page }) => {
  for (const route of ['/book', '/manage-booking']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
  }
});

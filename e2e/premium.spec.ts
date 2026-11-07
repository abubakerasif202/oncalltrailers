import { expect, test } from '@playwright/test';

test('homepage trust, gallery and contact controls preserve factual destinations', async ({ page }) => {
  await page.goto('/');
  const trust = page.getByRole('region', { name: 'Hire information' });
  await expect(trust).toContainText('Local Trailer Hire');
  await expect(trust).toContainText('Cage trailer listing');
  await expect(page.locator('.home-gallery__link')).toHaveCount(3);
  await expect(page.locator('.home-gallery')).toContainText('Enquiries only');
  await expect(page.getByRole('navigation', { name: 'Social and contact links' }).getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', 'https://www.instagram.com/oncalltrailers_/');
  const rail = page.locator('.reviews__carousel');
  await rail.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Next reviews', exact: true }).click();
  await expect(rail.locator('li').nth(1)).toHaveAttribute('data-active', 'true');
  await page.getByRole('button', { name: 'Previous reviews', exact: true }).click();
  await expect(rail.locator('li').first()).toHaveAttribute('data-active', 'true');
});

test('reviews auto-advance only with motion enabled, pause on request and support arrow keys', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  // Let the page's smooth-scroll controller initialise before taking over its clock.
  await page.waitForTimeout(700);
  await page.clock.install();
  const stage = page.getByRole('region', { name: 'Customer reviews', exact: true });
  await stage.evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.clock.runFor(500);
  await page.mouse.move(0, 0);
  const slides = stage.locator('.reviews__carousel > li');
  await expect(stage.locator('.review-progress span')).toHaveAttribute('data-running', 'true');
  await page.clock.fastForward(6100);
  await expect(slides.nth(1)).toHaveAttribute('data-active', 'true');
  await stage.getByRole('button', { name: 'Pause reviews', exact: true }).click();
  await page.clock.fastForward(12000);
  await expect(slides.nth(1)).toHaveAttribute('data-active', 'true');
  await stage.locator('ul').focus();
  await page.keyboard.press('ArrowRight');
  await expect(slides.nth(2)).toHaveAttribute('data-active', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(stage.locator('.review-progress span')).toHaveAttribute('data-running', 'false');
});

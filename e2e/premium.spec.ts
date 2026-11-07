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
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Previous reviews', exact: true }).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0);
});

import { expect, test } from '@playwright/test';

test('publishes the Work atlas and a reviewed project route with complete metadata', async ({ page }) => {
  await page.goto('/work/');

  await expect(page.getByRole('heading', { level: 1, name: 'Project atlas' })).toHaveCount(1);

  await page.goto('/work/chief-of-staff/');

  await expect(page.getByRole('heading', { level: 1, name: 'Chief of Staff' })).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/work\/chief-of-staff\/$/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /coordination/i);
  await expect(page.getByText('AI systems & orchestration', { exact: true })).toBeVisible();
  await expect(page.getByText('Updated July 21, 2026', { exact: true })).toBeVisible();
});

test('does not publish draft project routes', async ({ page }) => {
  for (const slug of ['adhd-tabs', 'creative-suite', 'android-lab', 'japanese-anime-inspired']) {
    const response = await page.goto(`/work/${slug}/`);
    expect(response?.status()).toBe(404);
  }
});

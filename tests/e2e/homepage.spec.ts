import { expect, test } from '@playwright/test';

test('presents the approved homepage narrative in order', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Software that strengthens human capability.' })).toHaveCount(1);

  const sectionHeadings = page.locator('main > section h2');
  await expect(sectionHeadings).toHaveText([
    'Engineering principles',
    'Featured systems',
    'Signal Library',
    'Handbook and wider work',
    'Start a conversation',
  ]);

  await expect(page.locator('#principles h3')).toHaveText([
    'Grounded knowledge',
    'Human-owned decisions',
    'Modular architecture',
    'Evaluation-driven development',
  ]);
  await expect(page.locator('#featured-systems h3')).toHaveText([
    'Chief of Staff',
    'LifeOS',
    'Alpha Screener',
  ]);
  await expect(page.locator('.home-hero').getByText('Open to roles and collaboration', { exact: true })).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/\bproof\b/i);
});

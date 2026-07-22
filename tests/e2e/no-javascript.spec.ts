import { expect, test } from '@playwright/test';

test('keeps navigation and public reading surfaces available without JavaScript', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Work', exact: true })).toBeVisible();

  await page.goto('/work/');
  await expect(page.locator('.project-card')).toHaveCount(5);

  await page.goto('/case-studies/chief-of-staff/');
  await expect(page.getByRole('heading', { level: 2, name: 'System design' })).toBeVisible();
  await expect(page.locator('main')).toContainText('Validation');

  await page.goto('/systems/reliable-ai-work/');
  await expect(page.getByRole('heading', { level: 2, name: 'How to read this map' })).toBeVisible();
  await expect(page.locator('main')).toContainText('Related public work');

  await page.goto('/handbook/');
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering handbook' })).toBeVisible();

  await page.goto('/signals/');
  await expect(page.getByRole('heading', { level: 1, name: 'Signal Library' })).toBeVisible();
});

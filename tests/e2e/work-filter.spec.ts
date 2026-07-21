import { expect, test } from '@playwright/test';

test('filters Work projects by keyboard without changing the URL and clears the selection', async ({ page }) => {
  await page.goto('/work/');

  await expect(page.getByRole('status')).toHaveText('5 projects shown');
  const productEngineering = page.getByRole('button', { name: 'Product engineering' });
  await productEngineering.focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/work\/$/);
  await expect(productEngineering).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toHaveText('3 projects shown');
  await expect(page.getByRole('heading', { level: 2, name: 'Chief of Staff' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Clear filter' }).click();

  await expect(page.getByRole('status')).toHaveText('5 projects shown');
  await expect(page.locator('.project-card')).toHaveCount(5);
});

test('keeps the complete Work list available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/work/');

  await expect(page.getByRole('heading', { level: 1, name: 'Project atlas' })).toHaveCount(1);
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(page.getByRole('link', { name: 'LifeOS' })).toBeVisible();

  await context.close();
});

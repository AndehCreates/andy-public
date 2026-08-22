import { expect, test } from '@playwright/test';

test('publishes the public-safe Augmentation Ecosystem architecture map', async ({ page }) => {
  await page.goto('/systems/augmentation-ecosystem/');

  await expect(page.getByRole('heading', { level: 1, name: 'Augmentation ecosystem' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'How to read this map' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Four public territories' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Foundations, expressions, and proving grounds' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Authority is composability' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Public/private boundary' })).toHaveCount(1);
  await expect(page.locator('.system-diagram')).toHaveCount(1);

  for (const territory of [
    'Human Understanding',
    'Augmentation Systems',
    'Complex-System Infrastructure',
    'Applied Research / Proving Grounds',
  ]) {
    await expect(page.getByRole('heading', { level: 3, name: territory })).toHaveCount(1);
  }

  for (const publicExample of [
    'Human capability ecosystem',
    'World Knowledge',
    'Fable',
    'MathPad',
    'Chief of Staff',
    'Arcade Workbench',
  ]) {
    await expect(page.getByRole('link', { name: publicExample, exact: true }).first()).toBeVisible();
  }

  const main = page.locator('main');
  await expect(main).toContainText(/public architecture model, not an operational inventory/i);
  await expect(main).toContainText(/capability does not automatically confer authority/i);
  await expect(main).not.toContainText(/\/home\/|localhost|127\.0\.0\.1/i);
});

test('lists the Augmentation Ecosystem among public system maps', async ({ page }) => {
  await page.goto('/systems/');
  await expect(page.getByRole('link', { name: 'Augmentation ecosystem', exact: true })).toBeVisible();
});

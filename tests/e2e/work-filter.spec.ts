import { expect, test } from '@playwright/test';

test('filters Work projects by keyboard without changing the URL and clears the selection', async ({ page }) => {
  await page.goto('/work/');

  await expect(page.getByRole('status')).toHaveText('6 projects shown');
  const productEngineering = page.getByRole('button', { name: 'Product engineering' });
  await productEngineering.focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/work\/$/);
  await expect(productEngineering).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toHaveText('4 projects shown');
  await expect(page.getByRole('heading', { level: 2, name: 'Chief of Staff' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Clear filter' }).click();

  await expect(page.getByRole('status')).toHaveText('6 projects shown');
  await expect(page.locator('.project-card')).toHaveCount(6);
});

test('keeps the complete Work list available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/work/');

  await expect(page.getByRole('heading', { level: 1, name: 'Project atlas' })).toHaveCount(1);
  await expect(page.locator('.project-card')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'LifeOS' })).toBeVisible();

  await context.close();
});

test('presents all listed project purposes, technical ideas, and lifecycle labels before filtering', async ({ page }) => {
  await page.goto('/work/');

  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(6);
  await expect(cards.locator('[data-visual-mark]')).toHaveCount(6);
  await expect(cards.locator('.project-card__hook')).toHaveCount(6);
  await expect(cards.locator('.project-card__differentiator')).toHaveCount(6);

  const marks = await cards.locator('[data-visual-mark]').evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('data-visual-mark')),
  );
  expect(new Set(marks).size).toBe(5);

  await expect(cards.filter({ hasText: 'Chief of Staff' }).locator('.project-card__status')).toHaveText('Active system');
  await expect(cards.filter({ hasText: 'MathPad' }).locator('.project-card__status')).toHaveText('Exploratory system');
  await expect(cards.filter({ hasText: 'Fable' }).locator('.project-card__status')).toHaveText('Exploratory system');
});

test('announces and emphasizes the active Work navigation item', async ({ page }) => {
  await page.goto('/work/');

  const workLink = page.getByRole('link', { name: 'Work', exact: true });
  await expect(workLink).toHaveAttribute('aria-current', 'page');
  await expect(workLink).toHaveCSS('color', 'rgb(242, 245, 251)');
});

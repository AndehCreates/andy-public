import { expect, test } from '@playwright/test';

test('filters Work projects by keyboard without changing the URL and clears the selection', async ({ page }) => {
  await page.goto('/work/');

  await expect(page.getByRole('status')).toHaveText('5 projects shown');
  const productEngineering = page.getByRole('button', { name: 'Product engineering' });
  await productEngineering.focus();
  await page.keyboard.press('Enter');

  const chiefOfStaffCard = page.locator('.project-card').filter({ hasText: 'Chief of Staff' });

  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(productEngineering).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toHaveText('3 projects shown');
  await expect(chiefOfStaffCard).toHaveAttribute('hidden', '');

  await page.getByRole('button', { name: 'Clear filter' }).click();

  await expect(page.getByRole('status')).toHaveText('5 projects shown');
  await expect(page.locator('.project-card')).toHaveCount(5);
});

test('preserves a pre-hydration filter selection after the React bundle hydrates', async ({ page }) => {
  let releaseScripts: (() => void) | undefined;
  const scriptsReleased = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  const hydrationIssues: string[] = [];

  await page.route('**/_astro/*.js', async (route) => {
    await scriptsReleased;
    await route.continue();
  });

  page.on('console', (message) => {
    const text = message.text();
    if (
      message.type() === 'error' ||
      /hydration|did not match|server rendered html|recoverable/i.test(text)
    ) {
      hydrationIssues.push(`${message.type()}: ${text}`);
    }
  });
  page.on('pageerror', (error) => {
    hydrationIssues.push(`pageerror: ${error.message}`);
  });

  await page.goto('/work/', { waitUntil: 'domcontentloaded' });

  const productEngineering = page.getByRole('button', { name: 'Product engineering' });
  const filterRoot = page.locator('[data-project-filter-root]');
  await productEngineering.focus();
  await page.keyboard.press('Enter');

  const chiefOfStaffCard = page.locator('.project-card').filter({ hasText: 'Chief of Staff' });

  await expect(filterRoot).toHaveAttribute('data-project-filter-inline-active', 'true');
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(productEngineering).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toHaveText('3 projects shown');
  await expect(chiefOfStaffCard).toHaveAttribute('hidden', '');

  releaseScripts?.();
  await page.waitForLoadState('networkidle');

  await expect(filterRoot).toHaveAttribute('data-project-filter-hydrated', 'true');
  await expect(filterRoot).not.toHaveAttribute('data-project-filter-inline-active', 'true');
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(productEngineering).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toHaveText('3 projects shown');
  await expect(chiefOfStaffCard).toHaveAttribute('hidden', '');
  expect(hydrationIssues).toEqual([]);
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

test('presents five distinct project purposes, technical ideas, and lifecycle labels before filtering', async ({ page }) => {
  await page.goto('/work/');

  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(5);
  await expect(cards.locator('[data-visual-mark]')).toHaveCount(5);
  await expect(cards.locator('.project-card__hook')).toHaveCount(5);
  await expect(cards.locator('.project-card__differentiator')).toHaveCount(5);

  const marks = await cards.locator('[data-visual-mark]').evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('data-visual-mark')),
  );
  expect(new Set(marks).size).toBe(5);

  await expect(cards.filter({ hasText: 'Chief of Staff' }).locator('.project-card__status')).toHaveText('Active system');
  await expect(cards.filter({ hasText: 'MathPad' }).locator('.project-card__status')).toHaveText('Exploratory system');
});

test('announces and emphasizes the active Work navigation item', async ({ page }) => {
  await page.goto('/work/');

  const workLink = page.getByRole('link', { name: 'Work', exact: true });
  await expect(workLink).toHaveAttribute('aria-current', 'page');
  await expect(workLink).toHaveCSS('color', 'rgb(242, 245, 251)');
});

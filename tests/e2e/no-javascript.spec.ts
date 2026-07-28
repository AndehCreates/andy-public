import { expect, test } from '@playwright/test';

test('keeps navigation and public reading surfaces available without JavaScript', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read case studies', exact: true })).toHaveAttribute('href', '/case-studies/');
  await expect(page.locator('[data-outcomes-module]')).toBeVisible();
  await expect(page.locator('[data-outcome-system]')).toHaveCount(3);
  await expect(page.locator('#featured-systems [data-flagship-preview]')).toHaveCount(3);
  await expect(page.locator('#featured-systems [data-feature-sequence]')).toHaveText(['01', '02', '03']);
  await expect(page.locator('#featured-systems [data-feature-verb]')).toHaveText(['Coordinate', 'Make', 'Evaluate']);
  await expect(page.locator('#featured-systems [data-feature-outcome]')).toHaveText([
    'AI-assisted work without losing review clarity or control of the decision boundary.',
    'intentions workable in the time that is actually available.',
    'uncertain research with clearer assumptions, tradeoffs, and space for human judgment.',
  ]);

  await page.goto('/work/');
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(page.locator('.project-card [data-visual-mark]')).toHaveCount(5);
  await expect(page.locator('.project-card__hook')).toHaveCount(5);
  await expect(page.locator('.project-card__differentiator')).toHaveCount(5);

  await page.goto('/case-studies/chief-of-staff/');
  await expect(page.locator('[data-case-study-hero]')).toContainText('Coordinate AI-assisted work');
  await expect(page.getByRole('heading', { level: 2, name: 'System design' })).toBeVisible();
  await expect(page.locator('main')).toContainText('Validation');
  await expect(page.locator('.system-diagram__visual')).toBeVisible();
  await expect(page.locator('.system-diagram__relationship')).toHaveCount(5);
  await expect(page.locator('.system-diagram__relationship').last()).toContainText('records recoverable state');
  await expect(page.locator('.system-diagram')).toHaveCount(1);

  await page.goto('/systems/reliable-ai-work/');
  await expect(page.getByRole('heading', { level: 2, name: 'How to read this map' })).toBeVisible();
  await expect(page.locator('main')).toContainText('Related public work');

  await page.goto('/handbook/');
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering handbook' })).toBeVisible();

  await page.goto('/signals/');
  await expect(page.getByRole('heading', { level: 1, name: 'Signal Library' })).toBeVisible();
});

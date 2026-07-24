import { expect, test } from '@playwright/test';

test('keeps navigation and public reading surfaces available without JavaScript', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read case studies', exact: true })).toHaveAttribute('href', '/case-studies/');
  await expect(page.locator('.home-hero .system-diagram')).toContainText('Human-owned decisions');
  await expect(page.locator('#featured-systems [data-flagship-preview]')).toHaveCount(3);
  await expect(page.locator('#featured-systems [data-artifact-labels]')).toHaveCount(3);

  await page.goto('/work/');
  await expect(page.locator('.project-card')).toHaveCount(7);
  await expect(page.locator('.project-card [data-visual-mark]')).toHaveCount(7);
  await expect(page.locator('.project-card__hook')).toHaveCount(7);
  await expect(page.locator('.project-card__differentiator')).toHaveCount(7);
  await expect(page.getByRole('link', { name: 'Second Brain' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nexus' })).toBeVisible();

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
  await expect(page.locator('main')).toContainText('Map legend');

  await page.goto('/systems/cognitive-infrastructure/');
  const observatory = page.locator('[data-cognitive-observatory]');
  await expect(observatory.getByRole('radiogroup', { name: 'Choose a system layer to inspect' })).toBeVisible();
  await expect(observatory.locator('.cognitive-observatory__semantic')).toBeVisible();
  await expect(observatory.locator('.cognitive-observatory__layer')).toHaveCount(5);
  await expect(observatory).toContainText('Owns durable memory, session context, and recoverable handoffs.');
  await expect(observatory).toContainText('Reconciles desired work, coordinates verification, and publishes handoff state.');
  await expect(observatory.getByRole('link', { name: 'Chief of Staff' })).toHaveAttribute('href', '/work/chief-of-staff/');

  await page.goto('/handbook/');
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering handbook' })).toBeVisible();

  await page.goto('/signals/');
  await expect(page.getByRole('heading', { level: 1, name: 'Signal Library' })).toBeVisible();
});

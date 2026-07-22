import { expect, test } from '@playwright/test';

const widths = [375, 768, 1280, 1536] as const;

test('preserves reachable public content and navigation across supported viewport widths', async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/work/');

    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    await expect(page.locator('.project-card').first()).toBeVisible();
    await expect(page.locator('.project-card').last()).toBeVisible();
    await expect(page.getByRole('link', { name: 'LifeOS', exact: true })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('keeps long-form code and table content horizontally reachable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/handbook/evaluation-driven-development/');

  const overflowContainers = page.locator('.prose pre, .prose table');
  for (let index = 0; index < await overflowContainers.count(); index += 1) {
    const container = overflowContainers.nth(index);
    await expect(container).toBeVisible();
    const metrics = await container.evaluate((element) => ({ clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
    expect(metrics.scrollWidth).toBeGreaterThanOrEqual(metrics.clientWidth);
  }
});

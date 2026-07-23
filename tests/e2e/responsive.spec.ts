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

test('prioritizes core navigation while preserving secondary routes in a native mobile disclosure', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/work/');

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  const coreLinks = navigation.locator('.site-header__primary-nav a');
  const more = navigation.locator('details');
  const secondaryLinks = navigation.locator('.site-header__secondary-nav a');

  await expect(coreLinks).toHaveCount(4);
  await expect(coreLinks).toHaveText(['Home', 'Work', 'Systems', 'About']);
  await expect(more).toHaveCount(1);
  await expect(more.locator('summary')).toHaveText('More');
  await expect(secondaryLinks).toHaveCount(3);
  expect(await secondaryLinks.evaluateAll((links) => links.every((link) => !(link as HTMLElement).offsetParent))).toBe(true);

  for (const link of await coreLinks.all()) {
    await expect(link).toBeVisible();
    const bounds = await link.boundingBox();
    expect(bounds, 'navigation link should be rendered').not.toBeNull();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
  }

  await expect(page.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
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

test('reflows diagrams into an ordered relationship sequence without internal scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/case-studies/chief-of-staff/');

  const diagram = page.locator('.system-diagram');
  await expect(diagram.locator('.system-diagram__visual')).toBeHidden();
  await expect(diagram.locator('.system-diagram__relationships')).toHaveCSS('display', 'grid');
  await expect(diagram.locator('.system-diagram__relationship').first()).toContainText('sets boundaries');
  await expect(diagram.locator('.system-diagram__relationship').last()).toContainText('records recoverable state');

  const metrics = await diagram.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    overflowX: getComputedStyle(element).overflowX,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  expect(metrics.overflowX).not.toBe('scroll');
});

test('keeps each flagship opening ahead of long-form sections without horizontal overflow', async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: width <= 768 ? 900 : 720 });

    for (const slug of ['chief-of-staff', 'lifeos', 'alpha-screener']) {
      await page.goto(`/case-studies/${slug}/`);

      const hero = page.locator('[data-case-study-hero]');
      const firstLongFormHeading = page.getByRole('heading', { level: 2, name: 'What it solves' });
      await expect(hero).toBeVisible();
      await expect(hero.locator('.system-diagram')).toHaveCount(1);
      expect(await hero.evaluate((element) => element.compareDocumentPosition(document.querySelector('h2')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
      await expect(firstLongFormHeading).toBeVisible();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
});

test('prioritizes the homepage position and flagship action before its visual on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const hero = page.locator('.home-hero');
  const position = hero.locator('.home-hero__position');
  const primaryAction = hero.getByRole('link', { name: 'Read case studies', exact: true });
  const visual = hero.locator('.home-hero__visual');

  expect(await position.evaluate((element) => element.compareDocumentPosition(document.querySelector('.home-hero__visual')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
  expect(await primaryAction.evaluate((element) => element.compareDocumentPosition(document.querySelector('.home-hero__visual')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();

  for (const action of await hero.locator('a').all()) {
    const bounds = await action.boundingBox();
    expect(bounds, 'hero action should be rendered').not.toBeNull();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
  }

  await expect(visual).toContainText('Human-owned decisions');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('reflows the Observatory into an ordered layer sequence on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/systems/cognitive-infrastructure/');

  const observatory = page.locator('[data-cognitive-observatory]');
  await expect(observatory.locator('.cognitive-observatory__visual')).toBeHidden();
  await expect(observatory.locator('.cognitive-observatory__layers')).toHaveCSS('display', 'grid');
  await expect(observatory.locator('.cognitive-observatory__layer').first()).toContainText('Human direction');
  await expect(observatory.locator('.cognitive-observatory__layer').last()).toContainText('Portfolio projects and feedback');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const publicRoutes = [
  '/',
  '/work/',
  '/work/chief-of-staff/',
  '/case-studies/chief-of-staff/',
  '/case-studies/lifeos/',
  '/case-studies/alpha-screener/',
  '/systems/reliable-ai-work/',
  '/handbook/',
  '/signals/',
  '/about/',
  '/resume/',
] as const;

test('keeps each public surface free of automated accessibility violations', async ({ page }) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `${route}: ${results.violations.map((violation) => violation.id).join(', ')}`).toEqual([]);
  }
});

test('provides a keyboard-operable skip link, a single page heading, and landmarks', async ({ page }) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
  }

  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  const main = page.getByRole('main');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await expect(main).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  await expect(main).toBeFocused();

  const homeLink = page.getByRole('link', { name: /AI Systems home$/ });
  await homeLink.focus();
  await expect(homeLink).toHaveCSS('outline-style', 'solid');
});

test('respects reduced motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  const transitionDuration = await page.locator('.skip-link').evaluate((element) => getComputedStyle(element).transitionDuration);
  const durationInMilliseconds = transitionDuration.endsWith('ms')
    ? Number.parseFloat(transitionDuration)
    : Number.parseFloat(transitionDuration) * 1_000;
  expect(durationInMilliseconds).toBeLessThanOrEqual(10);
});

test('gives system diagrams one authoritative semantic representation', async ({ page }) => {
  await page.goto('/case-studies/chief-of-staff/');

  const diagram = page.locator('.system-diagram');
  await expect(diagram).toHaveAttribute('aria-labelledby');
  await expect(diagram).toHaveAttribute('aria-describedby');
  await expect(diagram.locator('.system-diagram__visual')).toHaveAttribute('aria-hidden', 'true');
  await expect(diagram.locator('.system-diagram__text')).toHaveCount(1);
  await expect(diagram.locator('.system-diagram__relationship')).toHaveCount(5);
  await expect(diagram.locator('.system-diagram__relationship').first()).toContainText('sets boundaries');
});

test('keeps homepage decorative sequence accents hidden from assistive technology', async ({ page }) => {
  await page.goto('/');

  const outcomeSequences = page.locator('.home-hero__outcome-sequence');
  await expect(outcomeSequences).toHaveCount(3);

  for (let index = 0; index < await outcomeSequences.count(); index += 1) {
    await expect(outcomeSequences.nth(index)).toHaveAttribute('aria-hidden', 'true');
  }

  const featuredRails = page.locator('[data-feature-rail]');
  await expect(featuredRails).toHaveCount(3);

  for (let index = 0; index < await featuredRails.count(); index += 1) {
    await expect(featuredRails.nth(index)).toHaveAttribute('aria-hidden', 'true');
  }
});

test('keeps the homepage outcomes module semantic and non-interactive', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toHaveCount(1);

  const outcomesRegion = page.getByRole('complementary', { name: 'What the work helps people do' });
  await expect(outcomesRegion).toHaveCount(1);

  const outcomesList = outcomesRegion.getByRole('list');
  const outcomeRows = outcomesRegion.getByRole('listitem');
  await expect(outcomesList).toHaveCount(1);
  await expect(outcomeRows).toHaveCount(3);

  const firstOutcomeRow = outcomeRows.first();
  await expect(firstOutcomeRow).toContainText('Chief of Staff');
  await expect(firstOutcomeRow).toContainText('Coordinate AI-assisted work without losing review clarity or control of the decision boundary.');
  await expect(firstOutcomeRow.locator('.home-hero__outcome-sequence')).toHaveAttribute('aria-hidden', 'true');
  await expect(outcomesRegion.locator('[data-outcome-system] a')).toHaveCount(0);
  await expect(outcomesRegion.locator('[data-outcome-system]').getByRole('link')).toHaveCount(0);
  await expect(outcomesRegion.locator('[data-outcome-system]').getByRole('button')).toHaveCount(0);

  const firstFeaturedPreview = page.locator('[data-flagship-preview]').first();
  await expect(firstFeaturedPreview.locator('[data-feature-rail]')).toHaveAttribute('aria-hidden', 'true');
  await expect(firstFeaturedPreview.getByRole('link', { name: 'Chief of Staff', exact: true })).toHaveAccessibleName('Chief of Staff');
});

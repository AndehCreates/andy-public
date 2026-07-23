import { expect, test } from '@playwright/test';

test('renders the Signal Library as an artifact-first editorial atlas', async ({ page }) => {
  await page.goto('/signals/');

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'What should a ranking prove before a person acts?',
  })).toHaveCount(1);
  await expect(page.locator('[data-signal-lead]')).toHaveCount(1);
  await expect(page.locator('[data-signal-lead]')).toContainText(
    'What should a ranking prove before a person acts?',
  );
  await expect(page.locator('[data-signal-artifact-record]')).toContainText('What was inspected');
  await expect(page.locator('[data-signal-path]')).toHaveCount(3);
  await expect(page.locator('[data-signal-field-index] a')).toHaveCount(4);
  await expect(page.getByRole('heading', {
    level: 2,
    name: 'Start with something inspectable. Follow what it changed.',
  })).toHaveCount(1);
  const fieldLinks = page.locator('[data-signal-field-index] a');
  for (let index = 0; index < await fieldLinks.count(); index += 1) {
    await expect(fieldLinks.nth(index)).toHaveAttribute('href', /^(?:\/signals\/|\/handbook\/|\/systems\/|\/case-studies\/)/);
  }

  await expect(fieldLinks).toHaveText([
    'Read Evaluation is product work',
    'Read Static output as a safety boundary',
    'Read Local-first recovery notes',
    'Read Bounded interface experiment',
  ]);
});

test('renders authored transitions instead of raw relation labels', async ({ page }) => {
  await page.goto('/signals/');

  const firstPath = page.locator('[data-signal-path]').filter({
    hasText: 'What must evidence establish before a result advances?',
  });

  await expect(firstPath).toContainText(
    'The gate exposes a repeatable rule for evaluating product behavior.',
  );
  await expect(firstPath).not.toContainText(/part-of|related-to|applies-principle|caseStudies:/);
});

test('supports keyboard traversal and reduced-motion reading', async ({ page }) => {
  await page.goto('/signals/');

  const firstPath = page.locator('[data-signal-path]').first();
  const firstPathLinks = firstPath.getByRole('link');

  await expect(firstPathLinks).toHaveCount(3);
  await expect(firstPathLinks.nth(0)).toHaveAttribute('href', '/signals/evaluation-as-product-work/');
  await expect(firstPathLinks.nth(1)).toHaveAttribute('href', '/handbook/evaluation-driven-development/');
  await expect(firstPathLinks.nth(2)).toHaveAttribute('href', '/case-studies/alpha-screener/');
  await expect(firstPath).toContainText('The gate exposes a repeatable rule for evaluating product behavior.');

  for (let index = 0; index < 20; index += 1) {
    await page.keyboard.press('Tab');
    if (await firstPathLinks.nth(0).evaluate((element) => element === document.activeElement)) break;
  }
  await expect(firstPathLinks.nth(0)).toBeFocused();
  await expect(firstPathLinks.nth(0)).toBeVisible();
  await expect(firstPathLinks.nth(0)).toHaveCSS('outline-style', 'solid');
  await expect(firstPathLinks.nth(0)).toHaveCSS('outline-width', '2px');
  await page.keyboard.press('Tab');
  await expect(firstPathLinks.nth(1)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(firstPathLinks.nth(2)).toBeFocused();

  const normalTransition = await firstPath.locator('.signal-research-path__connector').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  const normalTransitionMs = normalTransition.endsWith('ms')
    ? Number.parseFloat(normalTransition)
    : Number.parseFloat(normalTransition) * 1_000;
  expect(normalTransitionMs).toBeGreaterThan(10);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/signals/');

  const reducedPathItem = page.locator('[data-signal-path]').first().locator('li').first();
  const reducedTransition = await page.locator('[data-signal-path]').first().locator('.signal-research-path__connector').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  const reducedTransitionMs = reducedTransition.endsWith('ms')
    ? Number.parseFloat(reducedTransition)
    : Number.parseFloat(reducedTransition) * 1_000;
  expect(reducedTransitionMs).toBeLessThanOrEqual(10);
  const reducedPathLink = page.locator('[data-signal-path]').first().getByRole('link').first();
  await reducedPathLink.focus();
  await expect(reducedPathLink).toBeFocused();
  expect(await reducedPathItem.evaluate((element) => element.matches(':focus-within'))).toBe(true);
  await expect(reducedPathItem).toBeVisible();
  await expect(reducedPathItem).toHaveCSS('transform', 'none');
});

test('grounds every Signal detail page in its inspected artifact and reviewed continuation', async ({ page }) => {
  for (const detail of [
    {
      slug: 'evaluation-as-product-work',
      continuationName: 'Continue to the Alpha Screener case study',
      continuationHref: '/case-studies/alpha-screener/',
    },
    {
      slug: 'static-output-as-a-safety-boundary',
      continuationName: 'Continue to the Grounded knowledge handbook principle',
      continuationHref: '/handbook/grounded-knowledge/',
    },
    {
      slug: 'local-first-recovery-notes',
      continuationName: 'Continue to the LifeOS case study',
      continuationHref: '/case-studies/lifeos/',
    },
    {
      slug: 'bounded-interface-experiment',
      continuationName: 'Continue to the Chief of Staff case study',
      continuationHref: '/case-studies/chief-of-staff/',
    },
  ]) {
    await page.goto(`/signals/${detail.slug}/`);

    const context = page.locator('[data-signal-context]');
    await expect(context).toContainText('What was inspected');
    await expect(context).toContainText('What the evidence does not establish');
    await expect(context.getByRole('link', { name: detail.continuationName })).toHaveAttribute(
      'href',
      detail.continuationHref,
    );
    await expect(context.getByRole('link', { name: 'Return to the Signal Library atlas' })).toHaveAttribute('href', '/signals/');
  }
});

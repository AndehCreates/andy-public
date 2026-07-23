import { expect, test } from '@playwright/test';

test('renders the Signal Library as an artifact-first editorial atlas', async ({ page }) => {
  await page.goto('/signals/');

  await expect(page.locator('h1')).toHaveCount(1);
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

  await expect(page.locator('[data-signal-field-index] a')).toHaveText([
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

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

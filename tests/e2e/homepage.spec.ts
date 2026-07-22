import { expect, test } from '@playwright/test';

test('presents the approved homepage narrative in order', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Software that strengthens human capability.' })).toHaveCount(1);

  const sectionHeadings = page.locator('main > section:not(.home-hero) h2');
  await expect(sectionHeadings).toHaveText([
    'Engineering principles',
    'Featured systems',
    'Signal Library',
    'Handbook and wider work',
    'Start a conversation',
  ]);

  await expect(page.locator('#principles h3')).toHaveText([
    'Grounded knowledge',
    'Human-owned decisions',
    'Modular architecture',
    'Evaluation-driven development',
  ]);
  await expect(page.locator('#featured-systems h3')).toHaveText([
    'Chief of Staff',
    'LifeOS',
    'Alpha Screener',
  ]);
  await expect(page.locator('.home-hero').getByText('Open to roles and collaboration', { exact: true })).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/\bproof\b/i);
});

test('opens with Andy\'s systems practice, one flagship action, and a meaningful signal map', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');

  const hero = page.locator('.home-hero');
  const primaryAction = hero.getByRole('link', { name: 'Explore the flagship systems', exact: true });
  const signalMap = hero.locator('.system-diagram');

  await expect(hero.getByText(/Andy builds evidence-led AI systems/i)).toBeVisible();
  await expect(primaryAction).toHaveAttribute('href', '/case-studies/');
  await expect(hero.getByRole('link', { name: 'Explore the handbook', exact: true })).toHaveAttribute('href', '/handbook/');
  await expect(hero.getByRole('link', { name: 'Contact Andy', exact: true })).toHaveAttribute('href', 'mailto:hello@andehcreates.com');
  await expect(signalMap).toContainText('Authority');
  await expect(signalMap).toContainText('Continuity');
  await expect(signalMap).toContainText('Evidence');
  await expect(signalMap).toContainText('Human-owned decisions');

  for (const element of [primaryAction, signalMap]) {
    const bounds = await element.boundingBox();
    expect(bounds, 'hero element should be rendered').not.toBeNull();
    expect(bounds!.y).toBeLessThan(720);
  }
});

test('presents each flagship as a distinct artifact preview with a direct case-study path', async ({ page }) => {
  await page.goto('/');

  const previews = page.locator('#featured-systems [data-flagship-preview]');
  await expect(previews).toHaveCount(3);
  expect(await previews.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-theme')))).toEqual([
    'authority',
    'continuity',
    'evidence',
  ]);
  await expect(previews.locator('h3')).toHaveText(['Chief of Staff', 'LifeOS', 'Alpha Screener']);
  expect(await previews.getByRole('link', { name: 'Explore the case study', exact: true }).evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual([
    '/case-studies/chief-of-staff/',
    '/case-studies/lifeos/',
    '/case-studies/alpha-screener/',
  ]);

  for (const preview of await previews.all()) {
    await expect(preview.locator('[data-artifact-labels] li')).toHaveCount(3);
    await expect(preview.getByText('Pivotal decision', { exact: true })).toBeVisible();
    await expect(preview.getByText('Evidence boundary', { exact: true })).toBeVisible();
  }
});

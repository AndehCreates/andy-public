import { expect, test } from '@playwright/test';

test('publishes the Work atlas and a reviewed project route with complete metadata', async ({ page }) => {
  await page.goto('/work/');

  await expect(page.getByRole('heading', { level: 1, name: 'Project atlas' })).toHaveCount(1);

  await page.goto('/work/chief-of-staff/');

  await expect(page.getByRole('heading', { level: 1, name: 'Chief of Staff' })).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/work\/chief-of-staff\/$/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /coordination/i);
  await expect(page.getByText('AI systems & orchestration', { exact: true })).toBeVisible();
  await expect(page.getByText('Updated July 21, 2026', { exact: true })).toBeVisible();
});

test('does not publish draft project routes', async ({ page }) => {
  for (const slug of ['adhd-tabs', 'creative-suite', 'android-lab', 'japanese-anime-inspired']) {
    const response = await page.goto(`/work/${slug}/`);
    expect(response?.status()).toBe(404);
  }
});

test('publishes each approved flagship case study with its decision narrative', async ({ page }) => {
  await page.goto('/case-studies/');
  await expect(page.getByRole('heading', { level: 1, name: 'Case studies' })).toHaveCount(1);

  for (const study of [
    { slug: 'chief-of-staff', title: 'Chief of Staff' },
    { slug: 'lifeos', title: 'LifeOS' },
    { slug: 'alpha-screener', title: 'Alpha Screener' },
  ]) {
    await page.goto(`/case-studies/${study.slug}/`);
    await expect(page.getByRole('heading', { level: 1, name: study.title })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/case-studies/${study.slug}/$`));

    for (const section of [
      'What it solves',
      'System design',
      'Key decisions and tradeoffs',
      'Validation',
      'Human value',
      'What comes next',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name: section })).toHaveCount(1);
    }
  }
});

test('keeps the local-only Chief of Staff study free of source links and private location details', async ({ page }) => {
  await page.goto('/case-studies/chief-of-staff/');

  await expect(page.getByRole('link', { name: 'Project source' })).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/[A-Z]:\\|localhost|127\.0\.0\.1|https?:\/\/[^\s]*(?:internal|private|local)/i);
});

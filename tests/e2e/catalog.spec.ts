import { expect, test } from '@playwright/test';

test('presents Cognitive Infrastructure as a public-safe, readable Observatory', async ({ page }) => {
  await page.goto('/systems/cognitive-infrastructure/');

  await expect(page.getByRole('heading', { level: 1, name: 'Cognitive Infrastructure' })).toHaveCount(1);
  await expect(page.locator('main')).toContainText('extends human capability without erasing human authority');

  const observatory = page.locator('[data-cognitive-observatory]');
  await expect(observatory.locator('.cognitive-observatory__layers')).toHaveCount(1);
  await expect(observatory.locator('.cognitive-observatory__layer')).toHaveCount(5);
  await expect(observatory).toContainText('Human direction');
  await expect(observatory).toContainText('Second Brain');
  await expect(observatory).toContainText('Nexus');
  await expect(observatory).toContainText('Chief of Staff');
  await expect(observatory).toContainText('AI Hub');
  await expect(observatory).toContainText('Codex and specialized agents');
  await expect(observatory).toContainText('Project repositories');
  await expect(observatory).toContainText('Portfolio projects and feedback');
  await expect(observatory.locator('.cognitive-observatory__visual')).toHaveAttribute('aria-hidden', 'true');
  await expect(observatory.locator('.cognitive-observatory__semantic')).toHaveCount(1);
  await expect(observatory.locator('a[href="/work/chief-of-staff/"]')).toHaveCount(1);
  await expect(observatory.locator('a[href*="second-brain"], a[href*="nexus"], a[href*="ai-hub"]')).toHaveCount(0);
  await expect(observatory).not.toContainText(/localhost|127\.0\.0\.1|[A-Z]:\\|https?:\/\/[^\s]*(?:internal|private|local)/i);
});

test('features the Observatory ahead of existing system maps', async ({ page }) => {
  await page.goto('/systems/');

  const lead = page.locator('[data-observatory-lead]');
  await expect(lead).toBeVisible();
  await expect(lead.getByRole('link', { name: 'Explore Cognitive Infrastructure' })).toHaveAttribute('href', '/systems/cognitive-infrastructure/');
  await expect(page.getByRole('link', { name: 'Reliable AI work', exact: true })).toBeVisible();
  expect(await lead.evaluate((element) => element.compareDocumentPosition(document.querySelector('.systems__grid')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
});

import { expect, test } from '@playwright/test';

test('presents Cognitive Infrastructure as a public-safe, readable Observatory', async ({ page }) => {
  await page.goto('/systems/cognitive-infrastructure/');

  await expect(page.getByRole('heading', { level: 1, name: 'Cognitive Infrastructure' })).toHaveCount(1);
  await expect(page.locator('#main-content')).toContainText('extends human capability without erasing human authority');

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
  await expect(observatory.locator('.cognitive-observatory__field')).toBeVisible();
  await expect(observatory.locator('.cognitive-observatory__field')).toHaveAttribute('aria-label', 'Explore the system layers');
  const field = observatory.locator('.cognitive-observatory__field');
  const governance = field.getByRole('radio', { name: 'Remember and govern' });
  await expect(governance).toBeVisible();
  await governance.check();
  await expect(governance).toBeChecked();
  await expect(field.locator('[data-field-detail="remember-and-govern"]')).toBeVisible();
  await expect(field.locator('[data-field-detail="remember-and-govern"]')).toContainText('Second Brain');
  await expect(field.locator('[data-field-detail="remember-and-govern"]')).toContainText('Authority boundary');
  await expect(observatory.locator('.cognitive-observatory__field')).not.toHaveAttribute('aria-hidden', 'true');
  await expect(observatory.locator('.cognitive-observatory__semantic')).toHaveCount(1);
  await expect(observatory.locator('a[href="/work/chief-of-staff/"]')).toHaveCount(1);
  await expect(observatory.locator('a[href*="second-brain"], a[href*="nexus"], a[href*="ai-hub"]')).toHaveCount(0);
  await expect(observatory).not.toContainText(/localhost|127\.0\.0\.1|[A-Z]:\\|https?:\/\/[^\s]*(?:internal|private|local)/i);
});

test('keeps Observatory layer selection keyboard-accessible and connects it to the editorial trace', async ({ page }) => {
  await page.goto('/systems/cognitive-infrastructure/');

  const field = page.locator('.cognitive-observatory__field');
  await field.getByRole('radio', { name: 'Human direction' }).focus();
  await page.keyboard.press('ArrowRight');

  const remembered = field.getByRole('radio', { name: 'Remember and govern' });
  await expect(remembered).toBeChecked();
  await expect(field.locator('[data-field-detail="remember-and-govern"]')).toBeVisible();
  await expect(page.locator('#layer-remember-and-govern')).toContainText('Preserves the context and boundaries needed for accountable work.');
});

test('keeps the desktop Observatory stage concentric, symmetric, and contained', async ({ page }) => {
  await page.setViewportSize({ width: 1443, height: 1022 });
  await page.goto('/systems/cognitive-infrastructure/');

  const geometry = await page.locator('.cognitive-observatory__field').evaluate((field) => {
    const center = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    const fieldRect = field.getBoundingClientRect();
    const core = center(field.querySelector('.cognitive-observatory__layer-control--1 label')!);
    const orbits = [...field.querySelectorAll('.cognitive-observatory__orbits span')].map(center);
    const top = [2, 3].map((index) => center(field.querySelector(`.cognitive-observatory__layer-control--${index} label`)!));
    const bottom = [4, 5].map((index) => center(field.querySelector(`.cognitive-observatory__layer-control--${index} label`)!));
    const dock = field.querySelector('.cognitive-observatory__field-dock')!.getBoundingClientRect();
    return { core, orbits, top, bottom, field: fieldRect.toJSON(), dock: dock.toJSON() };
  });

  for (const orbit of geometry.orbits) {
    expect(Math.abs(orbit.x - geometry.core.x)).toBeLessThanOrEqual(2);
    expect(Math.abs(orbit.y - geometry.core.y)).toBeLessThanOrEqual(2);
  }
  expect(Math.abs(geometry.top[0]!.y - geometry.top[1]!.y)).toBeLessThanOrEqual(2);
  expect(Math.abs(geometry.bottom[0]!.y - geometry.bottom[1]!.y)).toBeLessThanOrEqual(2);
  expect(Math.abs((geometry.top[0]!.x + geometry.top[1]!.x) / 2 - geometry.core.x)).toBeLessThanOrEqual(2);
  expect(Math.abs((geometry.bottom[0]!.x + geometry.bottom[1]!.x) / 2 - geometry.core.x)).toBeLessThanOrEqual(2);
  expect(geometry.dock.left).toBeGreaterThanOrEqual(geometry.field.left);
  expect(geometry.dock.right).toBeLessThanOrEqual(geometry.field.right);
  expect(geometry.dock.bottom).toBeLessThanOrEqual(geometry.field.bottom);
});

test('keeps the Observatory stage centered without overflow across supported viewports', async ({ page }) => {
  for (const width of [375, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/systems/cognitive-infrastructure/');

    const field = page.locator('.cognitive-observatory__field');
    const centers = await field.evaluate((element) => {
      const center = (selector: string) => {
        const rect = element.querySelector(selector)!.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      };
      return { core: center('.cognitive-observatory__layer-control--1 label'), orbit: center('.cognitive-observatory__orbits span') };
    });

    expect(Math.abs(centers.core.x - centers.orbit.x)).toBeLessThanOrEqual(2);
    expect(Math.abs(centers.core.y - centers.orbit.y)).toBeLessThanOrEqual(2);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('features the Observatory ahead of existing system maps', async ({ page }) => {
  await page.goto('/systems/');

  const lead = page.locator('[data-observatory-lead]');
  await expect(lead).toBeVisible();
  await expect(lead.getByRole('link', { name: 'Explore Cognitive Infrastructure' })).toHaveAttribute('href', '/systems/cognitive-infrastructure/');
  await expect(page.getByRole('link', { name: 'Reliable AI work', exact: true })).toBeVisible();
  expect(await lead.evaluate((element) => element.compareDocumentPosition(document.querySelector('.systems__grid')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
});

test('presents LifeOS as an editorial capability dossier in the approved reading order', async ({ page }) => {
  await page.goto('/work/lifeos/');

  await expect(page.getByRole('heading', { level: 1, name: 'LifeOS' })).toHaveCount(1);
  const dossier = page.locator('[data-capability-dossier]');
  await expect(dossier).toBeVisible();
  await expect(dossier.getByText('Capability thesis', { exact: true })).toBeVisible();
  await expect(dossier.getByText('Capability equation', { exact: true })).toBeVisible();

  const sections = ['Why it matters', 'How it works', 'Decisions and tradeoffs', 'Principles applied', 'Evidence boundary', 'Connected pathways', 'What comes next'];
  for (const section of sections) await expect(dossier.getByRole('heading', { level: 2, name: section })).toBeVisible();

  const orderedHeadings = await dossier.locator('h2').allTextContents();
  expect(orderedHeadings.slice(0, 8)).toEqual(['Capability equation', ...sections]);

  await expect(dossier.getByRole('navigation', { name: 'Dossier chapters' })).toBeVisible();
  await expect(dossier.getByRole('complementary', { name: 'System position' })).toBeVisible();
  await expect(dossier.getByRole('link', { name: 'Project source' })).toHaveAttribute('href', 'https://github.com/AndehCreates/LifeOS');
});

test('keeps a listed capability dossier complete without inventing source links', async ({ page }) => {
  await page.goto('/work/mathpad/');

  const dossier = page.locator('[data-capability-dossier]');
  await expect(dossier).toBeVisible();
  await expect(dossier.getByText('Coherent local-first calculation workspaces.')).toBeVisible();
  await expect(dossier.getByRole('heading', { level: 2, name: 'What comes next' })).toBeVisible();
  await expect(dossier.getByRole('link', { name: 'Project source' })).toHaveAttribute('href', 'https://github.com/AndehCreates/mathpad');
});

import { expect, test } from '@playwright/test';

const publicProjects = [
  {
    path: '/work/world-knowledge/',
    world: 'Human Understanding',
    proof: /source-aware reference layer can separate intake, curation, and retrieval/i,
    boundary: /Retrieval is not factual authority/i,
  },
  {
    path: '/work/chief-of-staff/',
    world: 'Complex-System Infrastructure',
    proof: /explicit lifecycle, ownership, and evidence boundaries/i,
    boundary: /Does not own repository truth/i,
  },
  {
    path: '/work/alpha-screener/',
    world: 'Applied Research / Proving Grounds',
    proof: /deterministic ranking, data-trust checks, and explicit promotion gates/i,
    boundary: /Does not execute trades/i,
  },
] as const;

for (const project of publicProjects) {
  test(`shows bounded ecosystem context on ${project.path}`, async ({ page }) => {
    await page.goto(project.path);

    const role = page.locator('.ecosystem-role');
    await expect(role).toHaveCount(1);
    await expect(role.getByRole('heading', { level: 2, name: project.world })).toBeVisible();
    await expect(role.getByRole('heading', { level: 3, name: 'Role in the ecosystem' })).toBeVisible();
    await expect(role.getByRole('heading', { level: 3, name: 'What this proves' })).toBeVisible();
    await expect(role.getByRole('heading', { level: 3, name: 'Boundaries' })).toBeVisible();
    await expect(role).toContainText(project.proof);
    await expect(role).toContainText(project.boundary);
  });
}

test('case studies inherit ecosystem context from the related public project', async ({ page }) => {
  await page.goto('/case-studies/alpha-screener/');

  const role = page.locator('.ecosystem-role');
  await expect(role).toHaveCount(1);
  await expect(role.getByRole('heading', { level: 2, name: 'Applied Research / Proving Grounds' })).toBeVisible();
  await expect(role).toContainText(/Does not execute trades/i);
});

test('draft project routes remain unpublished after adding optional ecosystem metadata', async ({ page }) => {
  const response = await page.goto('/work/lifeos/');
  expect(response?.status()).toBe(404);
});

import { expect, test } from '@playwright/test';

const identityRoutes = [
  ['/', 'Andy — Human Capability Systems'],
  ['/work/', 'Work | Andy — Human Capability Systems'],
  ['/case-studies/', 'Case studies | Andy — Human Capability Systems'],
  ['/systems/', 'System maps | Andy — Human Capability Systems'],
  ['/handbook/', 'Engineering handbook | Andy — Human Capability Systems'],
  ['/signals/', 'Signal Library | Andy — Human Capability Systems'],
] as const;

for (const [path, title] of identityRoutes) {
  test(`uses the human-capability portfolio identity on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
  });
}

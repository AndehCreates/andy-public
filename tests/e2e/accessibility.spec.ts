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

  await page.goto('/signals/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'What should a ranking prove before a person acts?',
  })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 3, name: /What must evidence establish before a result advances\?/ })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 3, name: /What state must survive an interruption\?/ })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 3, name: /Where does private state stop and public output begin\?/ })).toHaveCount(1);
  await expect(page.locator('[data-signal-path] ol li')).toHaveCount(9);
  const pathLists = page.locator('[data-signal-path] ol');
  await expect(pathLists).toHaveCount(3);
  for (let index = 0; index < await pathLists.count(); index += 1) {
    const itemCount = await pathLists.nth(index).locator(':scope > li').count();
    expect(itemCount).toBeGreaterThanOrEqual(2);
  }
  await expect(page.locator('[data-signal-path] .signal-research-path__connector')).toHaveCount(6);
  await expect(page.locator('[data-signal-path] [aria-hidden="true"]')).toHaveCount(6);
  await expect(page.locator('[data-signal-artifact-record]')).toHaveAttribute('aria-label', /Artifact record/);
  await expect(page.locator('[data-signal-field-index] a')).toHaveCount(4);

  const atlasLinks = await page.locator('[data-signal-lead] a, [data-signal-path] a, [data-signal-field-index] a').evaluateAll((links) =>
    links.map((link) => {
      const element = link as HTMLAnchorElement;
      return {
        name: (element.getAttribute('aria-label') ?? element.textContent ?? '').trim().replace(/\s+/g, ' '),
        href: element.getAttribute('href') ?? '',
      };
    }),
  );
  const names = new Map<string, string>();
  for (const { name, href } of atlasLinks) {
    const previousHref = names.get(name);
    if (previousHref && previousHref !== href) {
      throw new Error(`Duplicate accessible link name "${name}" maps to both "${previousHref}" and "${href}".`);
    }
    names.set(name, href);
  }
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

test('keeps compact diagram components available to assistive technology', async ({ page }) => {
  await page.goto('/');

  const compactDiagram = page.locator('.home-hero .system-diagram--compact');
  await expect(compactDiagram.locator('.system-diagram__components')).not.toHaveCSS('display', 'none');
  await expect(compactDiagram.locator('.system-diagram__components li')).toHaveCount(4);
});

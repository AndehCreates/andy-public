import { expect, test } from '@playwright/test';

test('publishes the Work atlas and a reviewed project route with complete metadata', async ({ page }) => {
  await page.goto('/work/');

  await expect(page.getByRole('heading', { level: 1, name: 'Project atlas' })).toHaveCount(1);

  await page.goto('/work/chief-of-staff/');

  await expect(page.getByRole('heading', { level: 1, name: 'Chief of Staff' })).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/work\/chief-of-staff\/$/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /coordinates AI-assisted software work/i);
  await expect(page.getByText('AI systems & orchestration', { exact: true })).toBeVisible();
  await expect(page.getByText('Updated July 21, 2026', { exact: true })).toBeVisible();
});

test('gives Fable’s public repository and site distinct source labels', async ({ page }) => {
  await page.goto('/work/fable/');

  await expect(page.getByRole('link', { name: 'Repository', exact: true })).toHaveAttribute(
    'href',
    'https://github.com/AndehCreates/fable',
  );
  await expect(page.getByRole('link', { name: 'Project site', exact: true })).toHaveAttribute(
    'href',
    'https://andehcreates.github.io/fable/',
  );
});

test('publishes World Knowledge as a bounded private-source project without source links', async ({ page }) => {
  await page.goto('/work/world-knowledge/');

  await expect(page.getByRole('heading', { level: 1, name: 'World Knowledge' })).toHaveCount(1);
  await expect(page.getByText('Knowledge & context systems', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Project source' })).toHaveCount(0);
  await expect(page.locator('main')).toContainText(/bounded read-only retrieval/i);
  await expect(page.locator('main')).toContainText(/does not establish citation completeness, corpus quality, retrieval quality, or real-world outcomes/i);

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/work/world-knowledge/');
  await expect(page.getByRole('heading', { level: 1, name: 'World Knowledge' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
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
    {
      slug: 'chief-of-staff',
      title: 'Chief of Staff',
      hook: 'Coordinate AI-assisted work without taking authority from the systems that execute it.',
      decision: 'Keep runtime, context, and repository authority distributed rather than centralizing them in the coordination layer.',
    },
    {
      slug: 'lifeos',
      title: 'LifeOS',
      hook: 'Make interruption recovery a first-class product behavior instead of relying on recall.',
      decision: 'Extend the existing state and synchronization model through explicit domain contracts.',
    },
    {
      slug: 'alpha-screener',
      title: 'Alpha Screener',
      hook: 'Rank what to inspect next without hiding data quality, uncertainty, or promotion gates.',
      decision: 'Keep deterministic scoring separate from advisory context and treat research state as evidence rather than permission.',
    },
  ]) {
    await page.goto(`/case-studies/${study.slug}/`);
    await expect(page.getByRole('heading', { level: 1, name: study.title })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/case-studies/${study.slug}/$`));

    const hero = page.locator('[data-case-study-hero]');
    await expect(hero).toContainText(study.hook);
    await expect(hero).toContainText(study.decision);
    await expect(hero.getByText('Problem and context', { exact: true })).toBeVisible();
    await expect(hero.getByText('Evidence basis', { exact: true })).toBeVisible();
    await expect(hero.getByText('Evidence boundary', { exact: true })).toBeVisible();
    await expect(hero.locator('.system-diagram')).toHaveCount(1);
    await expect(page.locator('.system-diagram')).toHaveCount(1);

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

test('keeps flagship safety boundaries explicit without adding unsupported implications', async ({ page }) => {
  await page.goto('/case-studies/lifeos/');
  await expect(page.locator('main')).not.toContainText(/diagnos|clinical|treat(?:ment)?|productivity (?:gain|increase|improvement)/i);

  await page.goto('/case-studies/alpha-screener/');
  await expect(page.locator('[data-case-study-hero]')).toContainText(/uncertainty|evidence gate/i);
  await expect(page.locator('main')).toContainText('not investment advice');
  await expect(page.locator('main')).not.toContainText(/guaranteed|returns?|outperform|win rate/i);
});

test('keeps the local-only Chief of Staff study free of source links and private location details', async ({ page }) => {
  await page.goto('/case-studies/chief-of-staff/');

  await expect(page.getByRole('link', { name: 'Project source' })).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/[A-Z]:\\|localhost|127\.0\.0\.1|https?:\/\/[^\s]*(?:internal|private|local)/i);
});

test('publishes public system maps with text explanations, legends, and validated relations', async ({ page }) => {
  await page.goto('/systems/');
  await expect(page.getByRole('heading', { level: 1, name: 'System maps' })).toHaveCount(1);

  for (const system of [
    { slug: 'reliable-ai-work', title: 'Reliable AI work' },
    { slug: 'software-for-cognition', title: 'Software for cognition' },
    { slug: 'intelligence-at-the-edge', title: 'Intelligence at the edge' },
  ]) {
    await page.goto(`/systems/${system.slug}/`);
    await expect(page.getByRole('heading', { level: 1, name: system.title })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/systems/${system.slug}/$`));
    await expect(page.getByRole('heading', { level: 2, name: 'How to read this map' })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: 'Map legend' })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: 'Related public work' })).toHaveCount(1);
    await expect.poll(() => page.locator('.system-relations a').count()).toBeGreaterThanOrEqual(2);
  }
});

test('publishes approved handbook principles, Signal Library entries, and a newest-first public RSS feed', async ({ page }) => {
  await page.goto('/handbook/');
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering handbook' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Knowledge & context systems' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Human-centered design' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Product engineering' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'Evaluation & reliability' })).toHaveCount(1);
  await expect(page.locator('.handbook__group').filter({ has: page.getByRole('heading', { level: 2, name: 'Knowledge & context systems' }) })).toContainText('Grounded knowledge');

  await page.goto('/handbook/grounded-knowledge/');
  await expect(page.getByRole('heading', { level: 1, name: 'Grounded knowledge' })).toHaveCount(1);
  for (const section of ['Principle', 'When it matters', 'Reusable pattern', 'Failure mode', 'Practical checklist', 'Related public systems']) {
    await expect(page.getByRole('heading', { level: 2, name: section })).toHaveCount(1);
  }

  await page.goto('/signals/');
  await expect(page.getByRole('heading', { level: 1, name: 'Signal Library' })).toHaveCount(1);
  const signalGroups = [
    ['Resource', 'Static output as a safety boundary'],
    ['Homelab', 'Local-first recovery notes'],
    ['Field notes', 'Evaluation is product work'],
    ['Experiments', 'Bounded interface experiment'],
  ] as const;
  for (const [kind, title] of signalGroups) {
    await expect(page.getByRole('heading', { level: 2, name: kind })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: kind }).locator('..')).toContainText(title);
  }

  await page.goto('/signals/evaluation-as-product-work/');
  await expect(page.getByRole('heading', { level: 1, name: 'Evaluation is product work' })).toHaveCount(1);

  const feed = await page.request.get('/rss.xml');
  expect(feed.ok()).toBe(true);
  const xml = await feed.text();
  expect(xml).toContain('Evaluation is product work');
  expect(xml).toContain('Grounded knowledge');
  expect(xml).not.toContain('Schema seed');
  expect(xml.indexOf('Evaluation is product work')).toBeLessThan(xml.indexOf('Grounded knowledge'));
});

test('renders public labels and prose without mojibake', async ({ page }) => {
  await page.goto('/signals/');
  await expect(page.getByText('Field note - Evaluation & reliability', { exact: true })).toBeVisible();

  await page.goto('/systems/software-for-cognition/');
  await expect(page.locator('main')).toContainText('path back into work for a person');
  await expect(page.locator('main')).not.toContainText(/â|Â/);
});

test('publishes honest career surfaces with route-specific social metadata', async ({ page }) => {
  const careerRoutes = [
    {
      path: '/about/',
      heading: 'About Andy',
      title: 'About Andy | AI Systems',
      description: /nontraditional path|human capability/i,
      canonical: /\/about\/$/,
      imageAlt: 'About Andy and a practice of building human-centered AI systems.',
    },
    {
      path: '/resume/',
      heading: 'Resume',
      title: 'Resume | Andy - AI Systems',
      description: /systems|software/i,
      canonical: /\/resume\/$/,
      imageAlt: 'Andy - AI Systems resume, with capabilities and selected systems.',
    },
  ] as const;

  for (const route of careerRoutes) {
    await page.goto(route.path);
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toHaveCount(1);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/social-card\.svg$/);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', route.imageAlt);
    await expect(page.locator('main')).not.toContainText(/employer|university|degree/i);
  }

  const notFound = await page.goto('/not-a-real-route/');
  expect(notFound?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toHaveCount(1);
  await expect(page).toHaveTitle('Page not found | Andy - AI Systems');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/404\/$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/social-card\.svg$/);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', 'Page not found on Andy - AI Systems.');
  for (const label of ['Work', 'Systems', 'Signal Library']) {
    await expect(page.getByRole('navigation', { name: 'Suggested destinations' }).getByRole('link', { name: label, exact: true })).toHaveCount(1);
  }
});

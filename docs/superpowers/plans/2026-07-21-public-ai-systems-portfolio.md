# Public AI Systems Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, static-first public portfolio that presents a coherent AI systems engineering body of work through curated projects, system maps, an engineering handbook, and a living Signal Library.

**Architecture:** Astro generates all core routes from strict TypeScript content collections and leaves the site readable without client JavaScript. Shared publication and sanitization contracts prevent internal, draft, unreviewed, or sensitive material from reaching the static output; a small React island enhances project filtering. Repository evidence is inventoried before public copy is written, and the release gate verifies content, routes, metadata, accessibility, responsive behavior, and both development and production-preview URLs.

**Tech Stack:** Astro 6, TypeScript strict mode, Astro Content Layer with `glob()` loaders and `astro/zod`, MDX, React island integration, Vitest, Playwright, axe-core, CSS design tokens, static output.

**Design specification:** `docs/superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md`

---

## Scope and sequencing

This plan builds one static site with five connected content surfaces. The work
is intentionally ordered so no marketing copy precedes the evidence inventory:

1. establish the build and test harness;
2. make publication safety executable;
3. audit the real projects;
4. build shared visual and content primitives;
5. publish the atlas and deep content from verified inventory;
6. assemble the homepage only after the supporting routes exist; and
7. finish with production-output, browser, and URL verification.

Do not invent employment history, users, revenue, adoption, performance, or
customer metrics. When evidence is incomplete, publish a smaller entry or mark
it `draft`; do not fill the gap with polished speculation.

## Planned file map

### Project and quality configuration

- `package.json` — scripts and dependency contract.
- `astro.config.mjs` — static site, MDX, React, sitemap, canonical site URL.
- `tsconfig.json` — strict Astro TypeScript configuration and aliases.
- `vitest.config.ts` — pure domain and React-island test configuration.
- `playwright.config.ts` — production-preview browser testing.
- `src/env.d.ts` — Astro client type reference.
- `scripts/audit-public-content.ts` — build-time publication and relationship audit.
- `scripts/audit-dist.mjs` — static output, internal-link, media, and leakage audit.

### Content contracts

- `src/content.config.ts` — five collection definitions and field schemas.
- `src/lib/content/taxonomy.ts` — controlled capability vocabulary.
- `src/lib/content/publication.ts` — visibility/source/public-review rules.
- `src/lib/content/sanitization.ts` — public-text and metadata denylist checks.
- `src/lib/content/relations.ts` — cross-collection reference validation.
- `src/lib/content/queries.ts` — public, featured, sorted, and related selectors.
- `src/lib/content/types.ts` — shared derived types for components and tests.

### Content and evidence

- `docs/evidence/README.md` — sanitized evidence-inventory method and template.
- `docs/evidence/<project>.md` — one sanitized inventory for each managed project.
- `src/content/projects/*.mdx` — nine initial project entries.
- `src/content/case-studies/*.mdx` — Chief of Staff, LifeOS, Alpha Screener.
- `src/content/systems/*.mdx` — reliable AI work, software for cognition, intelligence at the edge.
- `src/content/handbook/*.mdx` — four principles plus initial practical patterns.
- `src/content/signals/*.mdx` — representative resource, homelab, and field-note entries.

### Site structure and design system

- `src/config/site.ts` — site identity, navigation, opportunity signal, social links.
- `src/styles/tokens.css` — color, typography, spacing, radius, border, and motion tokens.
- `src/styles/global.css` — reset, document defaults, focus, layout, and reduced motion.
- `src/styles/prose.css` — long-form content rhythm and code/table treatment.
- `src/layouts/BaseLayout.astro` — page shell and metadata integration.
- `src/layouts/ArticleLayout.astro` — long-form content, table of contents, and related links.
- `src/components/meta/DocumentHead.astro` — canonical, Open Graph, description, robots.
- `src/components/layout/SiteHeader.astro` — navigation and opportunity signal.
- `src/components/layout/SiteFooter.astro` — durable links and contact action.
- `src/components/content/CapabilityTag.astro` — controlled capability label.
- `src/components/content/ProjectCard.astro` — consistent project presentation.
- `src/components/content/CollectionIndex.astro` — collection heading and card grid.
- `src/components/content/MediaFigure.astro` — media, caption, credit, alternative text.
- `src/components/content/DecisionBlock.astro` — decisions, tradeoffs, validation, limits.
- `src/components/diagrams/SystemDiagram.astro` — semantic system nodes, edges, legend.
- `src/components/interactive/ProjectFilter.tsx` — progressively enhanced filtering.

### Routes

- `src/pages/index.astro`
- `src/pages/work/index.astro`
- `src/pages/work/[slug].astro`
- `src/pages/case-studies/index.astro`
- `src/pages/case-studies/[slug].astro`
- `src/pages/systems/index.astro`
- `src/pages/systems/[slug].astro`
- `src/pages/handbook/index.astro`
- `src/pages/handbook/[slug].astro`
- `src/pages/signals/index.astro`
- `src/pages/signals/[slug].astro`
- `src/pages/about.astro`
- `src/pages/resume.astro`
- `src/pages/rss.xml.ts`
- `src/pages/404.astro`

### Tests

- `tests/unit/publication.test.ts`
- `tests/unit/sanitization.test.ts`
- `tests/unit/relations.test.ts`
- `tests/unit/queries.test.ts`
- `tests/components/project-filter.test.tsx`
- `tests/e2e/routes.spec.ts`
- `tests/e2e/homepage.spec.ts`
- `tests/e2e/work-filter.spec.ts`
- `tests/e2e/accessibility.spec.ts`
- `tests/e2e/no-javascript.spec.ts`
- `tests/e2e/responsive.spec.ts`

---

### Task 1: Scaffold the static Astro project and verification harness

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro`
- Create: `tests/unit/toolchain.test.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize the Node package without creating another Git repository**

Run:

```powershell
npm init -y
npm install astro @astrojs/check @astrojs/mdx @astrojs/react @astrojs/sitemap @astrojs/rss react react-dom
npm install --save-dev typescript vitest jsdom tsx fast-glob gray-matter @types/react @types/react-dom @testing-library/react @testing-library/user-event @playwright/test @axe-core/playwright
npx playwright install chromium
```

Expected: dependencies install successfully; the existing `.git` directory and
the two committed design documents remain untouched.

- [ ] **Step 2: Replace generated package metadata with the exact script contract**

Set `package.json` to use this shape while preserving installed dependency
versions:

```json
{
  "name": "andy-public",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest",
    "audit:content": "tsx scripts/audit-public-content.ts",
    "build:site": "astro build",
    "audit:dist": "node scripts/audit-dist.mjs",
    "build": "npm run check && npm run test && npm run audit:content && npm run build:site && npm run audit:dist",
    "preview": "astro preview --host 127.0.0.1",
    "test:e2e": "npm run build && playwright test",
    "verify": "npm run build && npm run test:e2e"
  }
}
```

- [ ] **Step 3: Add framework configuration**

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  integrations: [mdx(), react(), sitemap()],
});
```

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strictest",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

`vitest.config.ts`:

```ts
/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
```

`playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  reporter: 'list',
  webServer: {
    command: 'npm run preview -- --port 4322',
    url: 'http://127.0.0.1:4322',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

- [ ] **Step 4: Add a minimal static page and environment types**

`src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

`src/pages/index.astro`:

```astro
---
---
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Andy — AI Systems</title></head>
  <body><main><h1>Software that strengthens human capability.</h1></main></body>
</html>
```

Add `tests/unit/toolchain.test.ts` so the initial test command exercises the
configured TypeScript/Vitest path instead of relying on a no-tests exception:

```ts
import { expect, it } from 'vitest';

it('runs the TypeScript test harness', () => {
  expect('andy-public').toMatch(/^andy-public$/);
});
```

- [ ] **Step 5: Extend ignored generated output**

Add `.playwright/`, `playwright-report/`, `test-results/`, and `coverage/` to
`.gitignore`. Preserve the existing `.superpowers/` exclusion.

- [ ] **Step 6: Run the scaffold gates**

Run:

```powershell
npm run check
npm run test
npm run build:site
```

Expected: Astro check passes, the toolchain test passes, and `dist/index.html`
is generated.

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts playwright.config.ts src/env.d.ts src/pages/index.astro tests/unit/toolchain.test.ts .gitignore
git commit -m "chore: scaffold static Astro portfolio"
```

---

### Task 2: Implement publication, taxonomy, and sanitization contracts with TDD

**Files:**
- Create: `src/lib/content/taxonomy.ts`
- Create: `src/lib/content/publication.ts`
- Create: `src/lib/content/sanitization.ts`
- Create: `tests/unit/publication.test.ts`
- Create: `tests/unit/sanitization.test.ts`

- [ ] **Step 1: Write failing publication tests**

Cover these cases in `tests/unit/publication.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { canPublish, validateSourcePolicy } from '@/lib/content/publication';

describe('canPublish', () => {
  it('publishes only approved listed or featured content', () => {
    expect(canPublish({ visibility: 'listed', publicReview: 'approved' })).toBe(true);
    expect(canPublish({ visibility: 'featured', publicReview: 'approved' })).toBe(true);
    expect(canPublish({ visibility: 'draft', publicReview: 'approved' })).toBe(false);
    expect(canPublish({ visibility: 'listed', publicReview: 'pending' })).toBe(false);
  });
});

describe('validateSourcePolicy', () => {
  it('requires source links for public-source entries', () => {
    expect(validateSourcePolicy({ sourceAvailability: 'public', sourceUrls: [] }))
      .toContain('public source URL');
  });

  it('allows reviewed local-only narratives without a repository URL', () => {
    expect(validateSourcePolicy({ sourceAvailability: 'local-only', sourceUrls: [] }))
      .toEqual([]);
  });
});
```

- [ ] **Step 2: Run the publication tests and verify RED**

Run: `npm test -- tests/unit/publication.test.ts`

Expected: FAIL because the publication module does not exist.

- [ ] **Step 3: Implement the minimal publication contract**

`src/lib/content/publication.ts` must export:

```ts
export const visibilityValues = ['internal', 'draft', 'listed', 'featured'] as const;
export const reviewValues = ['pending', 'approved'] as const;
export const sourceAvailabilityValues = ['public', 'local-only', 'mixed'] as const;

export type Visibility = (typeof visibilityValues)[number];
export type PublicReview = (typeof reviewValues)[number];
export type SourceAvailability = (typeof sourceAvailabilityValues)[number];

export function canPublish(input: { visibility: Visibility; publicReview: PublicReview }) {
  return (input.visibility === 'listed' || input.visibility === 'featured') &&
    input.publicReview === 'approved';
}

export function validateSourcePolicy(input: {
  sourceAvailability: SourceAvailability;
  sourceUrls: string[];
}) {
  return input.sourceAvailability === 'public' && input.sourceUrls.length === 0
    ? ['A public source URL is required when sourceAvailability is public.']
    : [];
}
```

- [ ] **Step 4: Run the publication tests and verify GREEN**

Run: `npm test -- tests/unit/publication.test.ts`

Expected: all publication tests pass.

- [ ] **Step 5: Write failing sanitization tests**

`tests/unit/sanitization.test.ts` must prove that public content rejects:

- Windows development paths such as `D:\coding\private-repo`;
- localhost and private-network URLs;
- secret-like assignments such as `api_key=actual-value`;

and permits ordinary discussion of API keys, local AI, and private-by-design
architecture when no sensitive value is included.

- [ ] **Step 6: Run the sanitization tests and verify RED**

Run: `npm test -- tests/unit/sanitization.test.ts`

Expected: FAIL because the sanitizer does not exist.

- [ ] **Step 7: Implement the minimal sanitizer**

`src/lib/content/sanitization.ts`:

```ts
export type SanitizationFinding = { rule: string; excerpt: string };

const rules = [
  { rule: 'windows-path', pattern: /\b[A-Za-z]:\\(?:Users|Coding|coding|soulver)\\[^\s)]+/g },
  { rule: 'localhost-url', pattern: /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?[^\s)]*/gi },
  { rule: 'private-network-url', pattern: /https?:\/\/(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})(?::\d+)?[^\s)]*/gi },
  { rule: 'secret-assignment', pattern: /\b(?:api[_-]?key|client[_-]?secret|password|token)\s*[:=]\s*[^\s]+/gi },
] as const;

export function findPublicContentRisks(value: string): SanitizationFinding[] {
  return rules.flatMap(({ rule, pattern }) =>
    [...value.matchAll(pattern)].map((match) => ({ rule, excerpt: match[0] })),
  );
}
```

- [ ] **Step 8: Add the controlled capability vocabulary**

`src/lib/content/taxonomy.ts` must export a readonly record and its ID union:

```ts
export const capabilityIds = [
  'ai-systems',
  'evaluation-reliability',
  'knowledge-context',
  'product-engineering',
  'human-centered-design',
  'local-infrastructure-edge',
  'decision-intelligence',
  'interactive-creative-systems',
] as const;

export type CapabilityId = (typeof capabilityIds)[number];

export const capabilities: Record<CapabilityId, string> = {
  'ai-systems': 'AI systems & orchestration',
  'evaluation-reliability': 'Evaluation & reliability',
  'knowledge-context': 'Knowledge & context systems',
  'product-engineering': 'Product engineering',
  'human-centered-design': 'Human-centered design',
  'local-infrastructure-edge': 'Local infrastructure & edge',
  'decision-intelligence': 'Decision intelligence',
  'interactive-creative-systems': 'Interactive & creative systems',
};
```

- [ ] **Step 9: Run focused and full unit tests**

Run:

```powershell
npm test -- tests/unit/publication.test.ts tests/unit/sanitization.test.ts
npm run check
```

Expected: all tests pass and TypeScript/Astro checks are clean.

- [ ] **Step 10: Commit**

```powershell
git add src/lib/content tests/unit
git commit -m "feat: define public content safety contracts"
```

---

### Task 3: Define typed collections, relationship validation, and build audits

**Files:**
- Create: `src/content.config.ts`
- Create: `src/lib/content/types.ts`
- Create: `src/lib/content/relations.ts`
- Create: `src/lib/content/queries.ts`
- Create: `scripts/audit-public-content.ts`
- Create: `tests/unit/relations.test.ts`
- Create: `tests/unit/queries.test.ts`

- [ ] **Step 1: Write failing relationship and query tests**

Tests must prove:

- a public entry cannot reference an `internal` entry;
- missing related IDs are rejected;
- only approved `listed` and `featured` entries enter public indexes;
- only `featured` entries enter homepage selectors;
- entries sort by explicit order and then title for deterministic output.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- tests/unit/relations.test.ts tests/unit/queries.test.ts`

Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement pure relationship and query functions**

Keep these functions independent of Astro so tests use plain objects:

```ts
export function validatePublicRelations(
  entry: { id: string; relatedIds: string[]; visibility: Visibility; publicReview: PublicReview },
  records: Map<string, { visibility: Visibility; publicReview: PublicReview }>,
): string[];

export function publicEntries<T extends Publishable>(entries: T[]): T[];
export function featuredEntries<T extends Publishable>(entries: T[]): T[];
export function byOrderThenTitle<T extends { order?: number; title: string }>(a: T, b: T): number;
```

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- tests/unit/relations.test.ts tests/unit/queries.test.ts`

Expected: all tests pass.

- [ ] **Step 5: Add the Astro v6 content configuration**

Use `src/content.config.ts`, `glob()` loaders, and `z` from `astro/zod`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { capabilityIds } from '@/lib/content/taxonomy';
import { reviewValues, sourceAvailabilityValues, visibilityValues } from '@/lib/content/publication';

const baseFields = {
  title: z.string().min(2),
  summary: z.string().min(20).max(240),
  visibility: z.enum(visibilityValues),
  publicReview: z.enum(reviewValues),
  sourceAvailability: z.enum(sourceAvailabilityValues),
  sourceUrls: z.array(z.string().url()).default([]),
  capabilities: z.array(z.enum(capabilityIds)).min(1),
  relatedIds: z.array(z.string()).default([]),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date(),
  order: z.number().int().nonnegative().optional(),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    ...baseFields,
    projectId: z.string().min(2),
    status: z.enum(['active', 'stable', 'experimental', 'archived']),
  }),
});
```

Define `caseStudies`, `systems`, `handbook`, and `signals` with the same base
fields plus their surface-specific fields. Signals add `kind` with `resource`,
`homelab`, `field-note`, or `experiment`. Export all five collections.

- [ ] **Step 6: Write the public-content audit script**

`scripts/audit-public-content.ts` runs outside Astro's virtual-module runtime
and must:

1. discover all five content directories with `fast-glob`;
2. parse frontmatter and raw body with `gray-matter`;
3. run `validateSourcePolicy()` on every public entry;
4. run `findPublicContentRisks()` over title, summary, source URLs, and raw body;
5. build a global ID map and run `validatePublicRelations()`;
6. throw one grouped error with collection/id/rule for every violation; and
7. print counts by collection and visibility on success.

Do not import `astro:content` from this standalone script. Astro owns schema
validation through `astro check` and `astro build`; the standalone audit owns
cross-file publication and sanitization checks.

- [ ] **Step 7: Add temporary valid fixture content**

Create one underscored fixture per collection, e.g.
`src/content/projects/_fixture.mdx`. The `[^_]*` loader pattern must exclude it
from production while unit tests may read fixture data directly. Do not add
public routes yet.

- [ ] **Step 8: Run schema and audit checks**

Run:

```powershell
npm run check
npm run audit:content
npm test -- tests/unit/relations.test.ts tests/unit/queries.test.ts
```

Expected: schemas load, audits report zero public violations, tests pass.

- [ ] **Step 9: Commit**

```powershell
git add src/content.config.ts src/lib/content scripts tests/unit src/content
git commit -m "feat: add typed portfolio content collections"
```

---

### Task 4: Build the dark design system and shared site shell

**Files:**
- Create: `src/config/site.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/prose.css`
- Create: `src/components/meta/DocumentHead.astro`
- Create: `src/components/layout/SiteHeader.astro`
- Create: `src/components/layout/SiteFooter.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/ArticleLayout.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add site identity and navigation data**

`src/config/site.ts` exports a single readonly object containing title,
description, navigation, and the discreet “Open to roles and collaboration”
label. `BaseLayout.astro` and `DocumentHead.astro` derive canonicals from
`Astro.site` and `Astro.url`. Do not add unverifiable social URLs; omit a link
until its destination is known.

- [ ] **Step 2: Implement semantic design tokens**

Define near-black navy surfaces, cyan system emphasis, violet Signal Library
emphasis, green verification states, muted red failure states, text hierarchy,
spacing, radii, borders, content widths, and motion durations in
`src/styles/tokens.css`. Names must be semantic (`--surface-canvas`,
`--accent-system`) rather than palette-number aliases.

- [ ] **Step 3: Implement global and prose foundations**

`global.css` must include:

- box sizing and margin reset;
- dark `color-scheme`;
- readable system-font fallback stack;
- `:focus-visible` treatment;
- `.skip-link` behavior;
- minimum interactive target sizes;
- responsive container utilities; and
- `prefers-reduced-motion` overrides.

`prose.css` owns headings, paragraphs, lists, code, tables, figures, and anchor
offsets for long-form pages.

- [ ] **Step 4: Implement document metadata and shell**

`DocumentHead.astro` accepts title, description, canonical path, image, type,
and robots. It emits canonical, description, Open Graph, Twitter card, color
scheme, viewport, and theme-color tags.

`BaseLayout.astro` must render:

```astro
<html lang="en">
  <head><DocumentHead {...Astro.props} /></head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content"><slot /></main>
    <SiteFooter />
  </body>
</html>
```

- [ ] **Step 5: Add the long-form layout**

`ArticleLayout.astro` composes `BaseLayout`, semantic `<article>`, an optional
table of contents, update/source metadata, and related-content slots. It does
not know about any specific collection.

- [ ] **Step 6: Replace the scaffold page with a shell smoke page**

Render the approved headline and one paragraph through `BaseLayout`; do not yet
add project marketing copy.

- [ ] **Step 7: Verify the shell**

Run:

```powershell
npm run check
npm run build:site
```

Expected: static build passes with a single semantic homepage and no console
warnings.

- [ ] **Step 8: Commit**

```powershell
git add src/config src/styles src/components/meta src/components/layout src/layouts src/pages/index.astro
git commit -m "feat: establish portfolio design system"
```

---

### Task 5: Build the sanitized evidence inventory before public copy

**Files:**
- Create: `docs/evidence/README.md`
- Create: `docs/evidence/chief-of-staff.md`
- Create: `docs/evidence/lifeos.md`
- Create: `docs/evidence/alpha-screener.md`
- Create: `docs/evidence/mathpad.md`
- Create: `docs/evidence/arcade.md`
- Create: `docs/evidence/adhd-tabs.md`
- Create: `docs/evidence/creative-suite.md`
- Create: `docs/evidence/android-lab.md`
- Create: `docs/evidence/japanese-anime-inspired.md`

- [ ] **Step 1: Add the inventory template and public-safety rule**

Every evidence document contains:

```markdown
# Project name

## Public framing
## Authoritative sources inspected
## Verified capabilities
## Verified system decisions
## Validation evidence
## Human or customer value
## Known limitations
## Public-safe diagrams and media
## Claims not currently supported
## Candidate project and case-study copy
## Review date and public-review decision
```

Committed inventories must not contain local paths, private URLs, credentials,
private logs, or copied secrets. Refer to local evidence by stable project ID,
remote URL when public, file basename, commit, test command, or sanitized
summary.

- [ ] **Step 2: Inventory the three flagship systems read-only**

For Chief of Staff, LifeOS, and Alpha Screener:

1. inspect the current repository status and remote identity;
2. inspect README, architecture/spec docs, primary entry points, tests, recent
   commits, and relevant release/PR state;
3. run only read-only or existing verification commands unless implementation
   execution separately authorizes changes;
4. record exact current evidence and limitations; and
5. mark `publicReview` approved only after the committed inventory passes the
   sanitizer.

- [ ] **Step 3: Inventory the six supporting projects read-only**

Repeat the same bounded process for MathPad, Arcade, ADHD Tabs, Creative Suite,
Android Lab, and Japanese Anime Inspired. A smaller inventory is acceptable
when the project has less verified material.

- [ ] **Step 4: Audit the evidence documents**

Extend `scripts/audit-public-content.ts` to scan `docs/evidence/**/*.md` with
the same sanitizer. Run:

```powershell
npm run audit:content
rg -n "TODO|TBD|lorem|placeholder" docs/evidence
```

Expected: zero sanitizer findings and no placeholder markers. Unsupported
claims are explicitly listed rather than silently omitted from the inventory.

- [ ] **Step 5: Human claim review checkpoint**

Present a compact inventory table with project, source availability, strongest
capabilities, verified validation, limitations, and proposed public surface.
Do not write public project copy until the table is reviewed.

- [ ] **Step 6: Commit**

```powershell
git add docs/evidence scripts/audit-public-content.ts
git commit -m "docs: inventory portfolio evidence"
```

---

### Task 6: Publish the project atlas and project detail routes

**Files:**
- Create: `src/components/content/CapabilityTag.astro`
- Create: `src/components/content/ProjectCard.astro`
- Create: `src/components/content/CollectionIndex.astro`
- Create: `src/content/projects/*.mdx`
- Create: `src/pages/work/index.astro`
- Create: `src/pages/work/[slug].astro`
- Create: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Write the failing route test**

`tests/e2e/routes.spec.ts` must expect `/work/` and one project detail route to
return a unique `<h1>`, canonical URL, description, and at least one controlled
capability label.

- [ ] **Step 2: Run the route test and verify RED**

Run: `npm run test:e2e -- tests/e2e/routes.spec.ts`

Expected: FAIL because `/work/` does not exist.

- [ ] **Step 3: Create reusable project presentation components**

`CapabilityTag.astro` receives only `CapabilityId` and looks up the public
label. `ProjectCard.astro` receives a normalized public project view model,
renders semantic heading/link/summary/status/capabilities, and never reads a
collection directly. `CollectionIndex.astro` owns section heading, description,
count, and responsive grid.

- [ ] **Step 4: Write project entries from approved inventories**

Create one MDX entry for each of the nine projects. Use `featured` for the three
flagship systems only after their public review is approved; use `listed` for
the supporting entries that have sufficient public material and `draft` for
the rest. Local-only entries omit repository URLs and use only sanitized media.

- [ ] **Step 5: Implement the Work index**

Load projects with `getCollection('projects')`, normalize through
`publicEntries()` and `byOrderThenTitle()`, and render all public entries before
any JavaScript enhancement.

- [ ] **Step 6: Implement generated project routes**

Use `getStaticPaths()` from the public project selector. Render project body,
capabilities, validation summary, links when allowed, related systems/case
studies, status, and last-updated date. Internal and draft entries must not
produce paths.

- [ ] **Step 7: Run focused verification**

```powershell
npm run check
npm run audit:content
npm run test:e2e -- tests/e2e/routes.spec.ts
```

Expected: Work and all eligible detail routes pass; no private/draft route is
present.

- [ ] **Step 8: Commit**

```powershell
git add src/components/content src/content/projects src/pages/work tests/e2e/routes.spec.ts
git commit -m "feat: publish the project atlas"
```

---

### Task 7: Publish the three flagship case studies and diagrams

**Files:**
- Create: `src/components/content/MediaFigure.astro`
- Create: `src/components/content/DecisionBlock.astro`
- Create: `src/components/diagrams/SystemDiagram.astro`
- Create: `src/content/case-studies/chief-of-staff.mdx`
- Create: `src/content/case-studies/lifeos.mdx`
- Create: `src/content/case-studies/alpha-screener.mdx`
- Create: `src/pages/case-studies/index.astro`
- Create: `src/pages/case-studies/[slug].astro`
- Modify: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Extend the failing route test**

Add expectations for the case-study index and all three detail routes. Each
detail must contain exactly these conceptual sections, with natural display
labels rather than forced numbered headings:

- what it solves;
- system design;
- key decisions and tradeoffs;
- validation;
- human or business value; and
- what comes next.

Do not require “stakes” or “my contribution.”

- [ ] **Step 2: Run the route test and verify RED**

Run: `npm run test:e2e -- tests/e2e/routes.spec.ts`

Expected: FAIL on missing case-study routes.

- [ ] **Step 3: Implement reusable evidence presentation**

`DecisionBlock.astro` accepts `kind: 'decision' | 'tradeoff' | 'validation' |
'limitation' | 'next'`, title, and slot. `MediaFigure.astro` requires useful alt
text unless explicitly marked decorative and supports caption and source
credit. `SystemDiagram.astro` renders semantic lists plus enhanced visual nodes
and edges; its content remains understandable to screen readers.

- [ ] **Step 4: Write the case studies from the inventories**

Chief of Staff publishes as a sanitized narrative with no local path or
repository link. LifeOS and Alpha Screener link only to confirmed public
sources. Each case study includes one project-specific diagram and cites
verification evidence without inventing metrics.

- [ ] **Step 5: Implement index and generated detail routes**

Use the same public selectors and `ArticleLayout`. The index groups studies by
primary capability and links back to related projects.

- [ ] **Step 6: Verify content and routes**

```powershell
npm run audit:content
npm run check
npm run test:e2e -- tests/e2e/routes.spec.ts
```

Expected: all case-study routes pass; Chief of Staff contains no repo link or
sensitive local detail.

- [ ] **Step 7: Commit**

```powershell
git add src/components src/content/case-studies src/pages/case-studies tests/e2e/routes.spec.ts
git commit -m "feat: add flagship system case studies"
```

---

### Task 8: Publish cross-project system maps

**Files:**
- Create: `src/content/systems/reliable-ai-work.mdx`
- Create: `src/content/systems/software-for-cognition.mdx`
- Create: `src/content/systems/intelligence-at-the-edge.mdx`
- Create: `src/pages/systems/index.astro`
- Create: `src/pages/systems/[slug].astro`
- Modify: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Add failing tests for system routes and relations**

Expect three system detail routes. Each must link to at least two public
projects or articles, render a legend, and contain a text explanation that does
not depend on the visual diagram.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm run test:e2e -- tests/e2e/routes.spec.ts`

Expected: FAIL on missing `/systems/` routes.

- [ ] **Step 3: Write system-map content from approved relationships**

Use only public IDs. The reliable-AI map connects orchestration, governance,
evaluation, provenance, and infrastructure. The cognition map connects
context, attention, interruption recovery, re-entry, and learning. The edge map
connects homelab, local models, devices, and sensors without publishing private
network topology.

- [ ] **Step 4: Implement index and detail routes**

Render related projects, case studies, handbook entries, and Signal Library
items through validated IDs. Unknown or internal relationships must fail the
content audit rather than silently disappear.

- [ ] **Step 5: Verify and commit**

```powershell
npm run audit:content
npm run check
npm run test:e2e -- tests/e2e/routes.spec.ts
git add src/content/systems src/pages/systems tests/e2e/routes.spec.ts
git commit -m "feat: connect work through system maps"
```

---

### Task 9: Publish the handbook and Signal Library

**Files:**
- Create: `src/content/handbook/*.mdx`
- Create: `src/content/signals/*.mdx`
- Create: `src/pages/handbook/index.astro`
- Create: `src/pages/handbook/[slug].astro`
- Create: `src/pages/signals/index.astro`
- Create: `src/pages/signals/[slug].astro`
- Create: `src/pages/rss.xml.ts`
- Modify: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Add failing collection-route tests**

Expect handbook and Signal Library indexes, one detail route from each, and an
RSS document containing only approved public handbook/signal entries.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm run test:e2e -- tests/e2e/routes.spec.ts`

Expected: FAIL on missing routes.

- [ ] **Step 3: Write the four handbook principle entries**

Create grounded knowledge, human-owned decisions, modular architecture, and
evaluation-driven development. Each entry contains:

- concise principle;
- when it matters;
- reusable pattern;
- failure mode;
- practical checklist; and
- related public systems.

- [ ] **Step 4: Add representative Signal Library content**

Seed at least one approved entry for each `kind`: resource, homelab, field-note,
and experiment. Every external resource includes original annotation explaining
why it matters and how it relates to the work; do not create an unannotated link
dump. Homelab entries omit private network details.

- [ ] **Step 5: Implement indexes, details, and RSS**

Indexes expose useful kind/capability groupings. RSS includes approved public
handbook and signal entries only, sorted newest first.

- [ ] **Step 6: Verify and commit**

```powershell
npm run audit:content
npm run check
npm run test:e2e -- tests/e2e/routes.spec.ts
git add src/content/handbook src/content/signals src/pages/handbook src/pages/signals src/pages/rss.xml.ts tests/e2e/routes.spec.ts
git commit -m "feat: publish handbook and Signal Library"
```

---

### Task 10: Add progressively enhanced project filtering

**Files:**
- Create: `src/components/interactive/ProjectFilter.tsx`
- Create: `tests/components/project-filter.test.tsx`
- Create: `tests/e2e/work-filter.spec.ts`
- Modify: `src/pages/work/index.astro`

- [ ] **Step 1: Write the failing component test**

The test renders three projects and proves:

- all projects show initially;
- choosing a capability shows matching projects only;
- a clear action restores all projects; and
- the result count is announced through `aria-live`.

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- tests/components/project-filter.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the minimal React island**

The component accepts already-public normalized view models. It renders the
complete project list during server rendering, uses buttons with `aria-pressed`,
and filters only after hydration. It must not fetch content or own publication
rules.

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `npm test -- tests/components/project-filter.test.tsx`

Expected: PASS.

- [ ] **Step 5: Add end-to-end filtering coverage**

Test keyboard activation, URL-independent filtering, clear behavior, and
result count on `/work/`. In a JavaScript-disabled context, verify that the full
static list remains visible and usable.

- [ ] **Step 6: Hydrate only the filter island**

Use `<ProjectFilter client:idle projects={projects} />`. No other page content
should require client hydration.

- [ ] **Step 7: Verify and commit**

```powershell
npm test -- tests/components/project-filter.test.tsx
npm run test:e2e -- tests/e2e/work-filter.spec.ts
git add src/components/interactive src/pages/work/index.astro tests/components tests/e2e/work-filter.spec.ts
git commit -m "feat: add accessible project filtering"
```

---

### Task 11: Assemble the approved homepage after supporting content exists

**Files:**
- Create: `tests/e2e/homepage.spec.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write the failing homepage narrative test**

Assert this order with semantic section headings:

1. “Software that strengthens human capability.”
2. four engineering principles;
3. three featured systems;
4. the Signal Library centerpiece;
5. handbook and wider-work entry points; and
6. inclusive conversation call to action.

Also assert the discreet opportunity signal and absence of public labels that
repeatedly call the work “proof.”

- [ ] **Step 2: Run the homepage test and verify RED**

Run: `npm run test:e2e -- tests/e2e/homepage.spec.ts`

Expected: FAIL because the smoke homepage lacks the approved sections.

- [ ] **Step 3: Implement the homepage from collection queries**

Use `featuredEntries()` for systems/projects and public selectors for handbook
and Signal Library teasers. Do not hard-code duplicated project summaries.
Keep the visual hierarchy from the approved companion: restrained cyan system
emphasis, violet Signal Library band, editorial spacing, thin borders, and no
dashboard widgets or badge walls.

- [ ] **Step 4: Run the homepage test and inspect copy**

```powershell
npm run test:e2e -- tests/e2e/homepage.spec.ts
rg -n -i "proof|stakes|my contribution|industry-leading|revolutionary" src/pages src/content
```

Expected: test passes; any matched wording is deliberate handbook/case-study
discussion, not repetitive marketing copy.

- [ ] **Step 5: Commit**

```powershell
git add src/pages/index.astro tests/e2e/homepage.spec.ts
git commit -m "feat: assemble evidence-led homepage"
```

---

### Task 12: Add About, résumé, 404, and production metadata surfaces

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/resume.astro`
- Create: `src/pages/404.astro`
- Create: `src/data/resume.ts`
- Create: `public/social-card.svg`
- Modify: `src/components/meta/DocumentHead.astro`
- Modify: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Extend route and metadata tests**

Expect About, résumé, and 404 routes; unique titles/descriptions/canonicals;
Open Graph image and alt text; and no invented employer timeline.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm run test:e2e -- tests/e2e/routes.spec.ts`

Expected: FAIL on missing routes.

- [ ] **Step 3: Build the honest About page**

Explain the genuine interest in how systems, development, and software work;
the non-traditional path; the focus on human cognition and high-value software;
and the desire to work with strong teams. Keep biography subordinate to the
work and avoid apologetic framing.

- [ ] **Step 4: Build a structured HTML résumé**

`src/data/resume.ts` contains summary, capability groups, selected systems,
technical tools actually used, and education/certification only when verified.
`resume.astro` uses print CSS and a “Print / Save as PDF” action. Do not commit a
placeholder PDF; add a downloadable PDF later only when generated and visually
reviewed from the approved HTML résumé.

- [ ] **Step 5: Add 404 and social metadata**

The 404 page links to Work, Systems, and Signal Library. Create a restrained
static social card using the headline and site identity. Ensure every route can
override title, description, image, and robots.

- [ ] **Step 6: Verify and commit**

```powershell
npm run check
npm run test:e2e -- tests/e2e/routes.spec.ts
git add src/pages src/data/resume.ts src/components/meta/DocumentHead.astro public/social-card.svg tests/e2e/routes.spec.ts
git commit -m "feat: complete career and metadata surfaces"
```

---

### Task 13: Add static-output, accessibility, no-JavaScript, and responsive gates

**Files:**
- Create: `scripts/audit-dist.mjs`
- Create: `tests/unit/dist-audit.test.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/no-javascript.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Modify: `playwright.config.ts`

- [ ] **Step 1: Write a failing static-output audit fixture**

Factor `auditDist()` so a unit test can pass a temporary output tree containing
a broken link and a private path, then assert both findings are reported. Do not
delete user files; the test owns only its temporary fixture directory.

- [ ] **Step 2: Run the audit test and verify RED**

Run: `npm test -- tests/unit/dist-audit.test.ts`

Expected: FAIL because `auditDist()` does not exist.

- [ ] **Step 3: Implement the distribution audit**

Walk `dist/**/*.html`, collect local links and referenced local media, verify
targets exist, and scan rendered HTML for sanitizer patterns plus internal/draft
markers. Report all failures together and exit nonzero. Export the pure function
for tests and keep CLI invocation in the same module.

- [ ] **Step 4: Run the audit test and verify GREEN**

Run: `npm test -- tests/unit/dist-audit.test.ts`

Expected: PASS.

- [ ] **Step 5: Add accessibility tests**

Using `@axe-core/playwright`, scan Home, Work, one project, one case study, one
system, Handbook, Signal Library, About, and résumé. Also assert skip-link
behavior, one `<h1>`, landmarks, keyboard focus visibility, and reduced-motion
CSS.

- [ ] **Step 6: Add no-JavaScript tests**

Add a `chromium-no-js` Playwright project with `javaScriptEnabled: false`.
Verify navigation, all Work cards, case-study prose, system-map text, handbook,
and Signal Library remain available. Skip only the interactive-filter assertion.

- [ ] **Step 7: Add responsive tests**

Test widths 375, 768, 1280, and 1536. Assert no horizontal document overflow,
navigation remains operable, cards do not clip, long code/table content remains
reachable, and primary actions remain visible.

- [ ] **Step 8: Run the full automated gate**

```powershell
npm run verify
```

Expected: type/schema/unit/content/build/dist/e2e/accessibility/no-JS/responsive
checks all pass with no warnings treated as failures.

- [ ] **Step 9: Commit**

```powershell
git add scripts/audit-dist.mjs tests playwright.config.ts package.json
git commit -m "test: enforce public portfolio quality gates"
```

---

### Task 14: Perform real-browser polish and hand off live URLs

**Files:**
- Modify: only files implicated by observed defects
- Create: `docs/verification/v1-readiness.md`

- [ ] **Step 1: Start the development server on an explicit port**

Run:

```powershell
npm run dev -- --port 4321
```

Expected: Astro reports `http://127.0.0.1:4321/` and keeps running.

- [ ] **Step 2: Inspect the development URL in a real browser**

Use @browser:control-in-app-browser or @build-web-apps:frontend-testing-debugging
to verify the approved routes and interactions. Record exact issues before
editing. Check the 30-second hero signal, five-minute scan path, long-form
readability, filter behavior, keyboard navigation, responsive breakpoints, and
visual consistency.

- [ ] **Step 3: Fix observed defects with TDD**

For each functional defect, add a failing unit/component/e2e test, verify RED,
implement the smallest fix, and verify GREEN. For purely visual defects, capture
before/after browser evidence and keep changes inside shared tokens/components
when possible.

- [ ] **Step 4: Run the full clean gate**

```powershell
npm run verify
git diff --check
git status --short --branch
```

Expected: every automated gate passes; diff check is clean; only intentional
verification notes or fixes are uncommitted.

- [ ] **Step 5: Start the production preview on a second explicit port**

Run:

```powershell
npm run preview -- --port 4322
```

Expected: Astro reports `http://127.0.0.1:4322/` and serves the generated
`dist/` artifact.

- [ ] **Step 6: Verify the preview URL independently**

In the browser, open `http://127.0.0.1:4322/` and repeat route, navigation,
filter, accessibility smoke, and responsive checks. Confirm that no behavior
depends on the development server.

- [ ] **Step 7: Write the readiness record**

`docs/verification/v1-readiness.md` records:

- commit and branch;
- commands and pass counts;
- content and sanitization audit results;
- routes checked;
- accessibility and responsive evidence;
- development URL;
- production-preview URL;
- known limitations; and
- deployment readiness without claiming a public deployment.

- [ ] **Step 8: Commit final polish and verification evidence**

```powershell
git add src tests scripts docs/verification package.json package-lock.json
git commit -m "chore: verify portfolio V1 readiness"
```

- [ ] **Step 9: Final handoff**

Report both working local URLs, the exact final commit, verification summary,
known limitations, and the next explicit decision: hosting/domain selection or
additional content expansion. Do not claim the site is publicly deployed until
a real public URL has been verified.

---

## Completion gate

Implementation is complete only when all of the following are true:

- the evidence inventories precede and support public copy;
- all nine managed projects have an intentional `internal`, `draft`, `listed`,
  or `featured` disposition;
- Chief of Staff, LifeOS, and Alpha Screener have reviewed, sanitized case
  studies with diagrams;
- the three system maps, four principle entries, and representative Signal
  Library content are public and related correctly;
- no internal or draft content appears in routes, metadata, sitemap, RSS, or
  related-content indexes;
- the static output contains no detected local paths, private URLs, secret-like
  assignments, broken internal links, or missing required media;
- unit, component, content, build, accessibility, no-JavaScript, responsive, and
  browser route checks pass;
- the repository is clean after the final commit; and
- both the development and production-preview URLs are running and verified in
  a real browser for handoff.

## Official implementation references

- Astro v6 content-layer migration and loader contract:
  <https://docs.astro.build/en/guides/upgrade-to/v6/>
- Astro testing with Vitest and Playwright:
  <https://docs.astro.build/en/guides/testing/>
- Astro static output guidance:
  <https://docs.astro.build/en/guides/on-demand-rendering/>
- Astro sitemap integration:
  <https://docs.astro.build/en/guides/integrations-guide/sitemap/>
- Astro configuration and canonical site URL:
  <https://docs.astro.build/en/guides/configuring-astro/>

# Connected Catalog and Cognitive Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing portfolio collections into a connected, evidence-gated catalog led by a bespoke Cognitive Infrastructure Observatory and supported by editorial project dossiers.

**Architecture:** Keep Astro's static-first content pipeline and extend the existing Zod schemas, publication selectors, relation audit, and generated routes. Structured capability narratives and typed relation edges produce shared view models; public components translate those contracts into natural editorial language. The Observatory and Foldout remain fully usable as server-rendered HTML, with CSS and native browser behavior providing the first enhancement layer.

**Tech Stack:** Astro 6, strict TypeScript, MDX content collections, React 19 for the existing project-filter island, Zod through `astro/zod`, Vitest, Playwright, axe-core, CSS design tokens.

**Approved design:** `docs/superpowers/specs/2026-07-22-connected-catalog-design.md`

**Execution authority:** For this connected-catalog execution path, this plan
and its approved design supersede the pre-scaffold July 21 handoff and plan
where their task sequence or publication matrix differs. Repository operating
rules and evidence gates remain authoritative.

---

## File and responsibility map

### Content contracts

- `src/lib/content/catalog.ts` — capability-narrative and system-projection schemas, types, labels, and invariant checks.
- `src/lib/content/relations.ts` — typed relation edges, inverse rules, target resolution, public filtering, and natural relationship view models.
- `src/lib/content/presentation.ts` — retains existing evidence/diagram contracts and composes the new catalog fields into publishable project validation.
- `src/content.config.ts` — wires the project and system collections to the catalog contracts.
- `src/lib/content/types.ts` — shared collection-name and normalized record types only.

### Presentation

- `src/components/catalog/CapabilityEquation.astro` — human friction → system response → capability extended.
- `src/components/catalog/RelationshipPathways.astro` — natural grouped navigation for typed edges.
- `src/components/catalog/CatalogRail.astro` — persistent desktop system/chapter orientation and compact mobile disclosure.
- `src/components/catalog/CapabilityDossierHero.astro` — project capability thesis and evidence status.
- `src/components/diagrams/CognitiveObservatory.astro` — semantic layered projection and visual Observatory.
- `src/layouts/CatalogArticleLayout.astro` — Editorial Foldout wrapper for project and flagship-system reading.
- `src/components/interactive/ProjectFilter.tsx` and `ProjectFilter.css` — server-rendered editorial ledger plus progressive filtering.

### Content and routes

- `src/content/systems/cognitive-infrastructure.mdx` — flagship projection, thesis, layers, and public-safe explanation.
- `src/content/projects/*.mdx` — capability narratives and typed relations for every featured/listed project.
- `src/content/handbook/*.mdx`, `src/content/signals/*.mdx`, and existing system entries — reciprocal, annotated relations.
- `src/pages/work/index.astro`, `src/pages/work/[slug].astro`, `src/pages/systems/index.astro`, and `src/pages/systems/[slug].astro` — ledger, dossiers, Observatory, and Foldout routing.

### Verification

- Unit tests under `tests/unit/` own schema, relation, query, audit, and content-seed behavior.
- `tests/components/project-filter.test.tsx` owns ledger filtering and card semantics.
- `tests/e2e/catalog.spec.ts` owns Observatory, Foldout, dossier, natural relation, and route behavior.
- Existing no-JavaScript, accessibility, responsive, route, homepage, and distribution-audit tests receive focused regression cases.

---

### Task 1: Inventory Second Brain, Nexus, and AI Hub before public copy

**Files:**
- Modify ignored source registry: `.local/evidence-sources.json`
- Create: `docs/evidence/second-brain.md`
- Create: `docs/evidence/nexus.md`
- Create: `docs/evidence/ai-hub.md`
- Move and revise: `docs/evidence/japanese-anime-inspired.md` → `docs/evidence/japanese-language-cognition.md`
- Modify: `docs/evidence/sources.md`
- Modify: `docs/evidence/public-review.md`

- [ ] **Step 1: Resolve source identities without exposing local paths**

Read `.local/evidence-sources.json`, verify each candidate checkout by Git remote
and current commit, and add ignored entries for `project-second-brain`,
`project-nexus`, and `project-ai-hub` when absent. Do not copy local paths into a
tracked file or terminal transcript intended for handoff.

Expected: every proposed project ID resolves to one authoritative checkout and
observed commit, or the task stops with a missing-source report before public
copy is written.

- [ ] **Step 2: Inspect the evidence sources read-only**

For each source, inspect README/AGENTS/design docs, recent commits, primary
implementation entry points, tests, and current Git state. Record only observed
capabilities, decisions, verification, limitations, and public-safe media.

Use the established authority boundaries:

```text
Second Brain -> durable memory, session context, recoverable handoffs
Nexus        -> governance, accountability, consequential-work conditions
AI Hub       -> runtime registry, admission, leases, capacity, execution events
```

Treat these as hypotheses to verify, not claims to copy blindly.

- [ ] **Step 3: Write the three evidence inventories**

Use all eleven headings from `docs/evidence/README.md`. Candidate copy must be
bounded by observed evidence and must exclude private hosts, endpoints, paths,
credentials, operational logs, personal data, and unsupported runtime claims.

- [ ] **Step 4: Reframe the Japanese project inventory**

Preserve the observed source identity and commit while changing the public
identity to `project-japanese-language-cognition`. Frame it as an audio-first
language-education cognition project. Preserve exclusions for shipped-product
claims, learning outcomes, proficiency gains, audio provenance, and specific
intellectual-property association.

- [ ] **Step 5: Update the source record and pending review rows**

Add sanitized source availability, public remote when authorized, observed
commit, and inspection date to `docs/evidence/sources.md`. Add the intended
visibility states to `docs/evidence/public-review.md`:

```text
project-second-brain              featured / pending
project-nexus                     featured / pending
project-ai-hub                    listed   / pending
project-japanese-language-cognition listed / pending
project-chief-of-staff            listed   / approved
```

Keep LifeOS and Alpha Screener featured; keep MathPad and Arcade listed; keep
ADHD Tabs, Creative Suite, and Android Lab draft.

- [ ] **Step 6: Run documentation safety checks**

Run:

```powershell
rg -n -i "[A-Z]:\\|localhost|127\.0\.0\.1|token|secret|password|private host" docs/evidence
git diff --check
```

Expected: only deliberate policy language matches; no private source location,
secret-like assignment, or malformed Markdown is present.

- [ ] **Step 7: Present the new review matrix and stop**

Present the four new/reframed rows with candidate framing, capability tags,
allowed links/media, validation boundary, and excluded claims. **Do not begin
Task 2 or create public entries until the user explicitly approves the claims,
links, media, and `publicReview` state.**

- [ ] **Step 8: Record approval and commit the evidence unit**

After approval, change only the approved rows to `publicReview: approved`, then:

```powershell
git add docs/evidence
git commit -m "docs(evidence): approve cognitive infrastructure sources"
```

Expected: a focused commit containing sanitized inventories and the reviewed
matrix, with `.local/` still ignored.

---

### Task 2: Add capability-narrative and system-projection contracts

**Files:**
- Create: `src/lib/content/catalog.ts`
- Modify: `src/lib/content/presentation.ts`
- Modify: `src/lib/content/types.ts`
- Modify: `src/content.config.ts`
- Modify: `src/content/projects/schema-seed.mdx`
- Modify: `src/content/systems/schema-seed.mdx`
- Modify: `src/content/projects/chief-of-staff.mdx`
- Modify: `src/content/projects/lifeos.mdx`
- Modify: `src/content/projects/alpha-screener.mdx`
- Modify: `src/content/projects/mathpad.mdx`
- Modify: `src/content/projects/arcade.mdx`
- Create: `tests/unit/catalog.test.ts`
- Modify: `tests/unit/presentation.test.ts`
- Modify: `tests/unit/content-seeds.test.ts`

- [ ] **Step 1: Write failing capability-narrative schema tests**

Add fixtures proving publishable projects require meaningful strings and at
least one principle:

```ts
const capabilityNarrative = {
  capabilityThesis: 'Reduce the cognitive cost of returning to interrupted work.',
  humanFriction: 'Working context is expensive to reconstruct after interruption.',
  whyItMatters: 'Reconstruction delays action and increases dependence on recall.',
  systemResponse: 'Preserve a durable working state and explicit recovery path.',
  capabilityExtended: 'Reliable re-entry into meaningful work.',
  howItWorks: 'Shared contracts connect interface behavior, local state, and synchronization.',
  pivotalDecision: 'Extend the existing authority boundaries.',
  decisionTradeoff: 'Accept slower expansion in exchange for continuity and clear ownership.',
  principleIds: ['handbook:modular-architecture'],
  nextStep: 'Validate interruption and conflict-recovery scenarios.',
};
```

Assert blank values, unknown principle ID shapes, and missing fields fail for
approved `listed`/`featured` projects but remain optional for draft/internal
content.

- [ ] **Step 2: Write failing system-projection tests**

Test a projection containing stable layer/component IDs, responsibility,
authority boundary, optional project target, and theme. Reject duplicate IDs,
unknown edge endpoints, and a component that links to a malformed project ID.

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```powershell
npm test -- tests/unit/catalog.test.ts tests/unit/presentation.test.ts tests/unit/content-seeds.test.ts
```

Expected: FAIL because `catalog.ts` and the new collection fields do not exist.

- [ ] **Step 4: Implement the catalog schemas**

In `src/lib/content/catalog.ts`, export:

```ts
export const capabilityNarrativeSchema = z.object({
  capabilityThesis: publicString,
  humanFriction: publicString,
  whyItMatters: publicString,
  systemResponse: publicString,
  capabilityExtended: publicString,
  howItWorks: publicString,
  pivotalDecision: publicString,
  decisionTradeoff: publicString,
  principleIds: z.array(relationIdSchema).min(1),
  nextStep: publicString,
});

export const systemProjectionSchema = z.object({
  thesis: publicString,
  layers: z.array(systemLayerSchema).min(2),
  edges: z.array(systemProjectionEdgeSchema).min(1),
}).superRefine(validateUniqueProjectionIdsAndEndpoints);
```

Export inferred types and a `catalogPresentationFields` object that can be
spread into the project and system collection schemas.
`systemProjectionSchema` is optional for existing system entries in this task;
Task 4 makes it present and required for the new Cognitive Infrastructure entry.

- [ ] **Step 5: Compose publishable-project validation**

Update `presentation.ts` so every publishable project requires the existing
Work presentation fields plus `capabilityNarrative` and, where applicable,
typed relations from Task 3. Keep flagship-only case-study fields limited to
projects that still own flagship case-study presentation; do not require draft
projects to carry dossiers.

- [ ] **Step 6: Migrate the five current public entries and wire schemas**

Add faithful capability-narrative fields to Chief of Staff, LifeOS, Alpha
Screener, MathPad, and Arcade using their already approved public copy. Do not
change visibility, sources, evidence scope, or claims in this task. Then extend
`content.config.ts` so publishable project entries require the new contract.
Keep schema seeds draft/pending with minimal valid structures only when Astro's
loader requires them.

- [ ] **Step 7: Run focused tests and verify GREEN**

Run:

```powershell
npm test -- tests/unit/catalog.test.ts tests/unit/presentation.test.ts tests/unit/content-seeds.test.ts
npm run check
```

Expected: PASS with strict TypeScript and Astro content checks.

- [ ] **Step 8: Commit**

```powershell
git add src/lib/content/catalog.ts src/lib/content/presentation.ts src/lib/content/types.ts src/content.config.ts src/content/projects/schema-seed.mdx src/content/systems/schema-seed.mdx src/content/projects/chief-of-staff.mdx src/content/projects/lifeos.mdx src/content/projects/alpha-screener.mdx src/content/projects/mathpad.mdx src/content/projects/arcade.mdx tests/unit/catalog.test.ts tests/unit/presentation.test.ts tests/unit/content-seeds.test.ts
git commit -m "feat(content): define capability catalog contracts"
```

---

### Task 3: Replace flat related IDs with typed, natural relationship pathways

**Files:**
- Modify: `src/lib/content/relations.ts`
- Modify: `src/lib/content/types.ts`
- Modify: `src/content.config.ts`
- Modify: `scripts/audit-public-content.ts`
- Modify: `tests/unit/relations.test.ts`
- Modify: `tests/unit/audit-public-content.test.ts`

- [ ] **Step 1: Write failing typed-relation tests**

Cover all approved relation types:

```ts
export const relationTypeValues = [
  'part-of',
  'governs',
  'provides-context-to',
  'coordinates',
  'executes-through',
  'built-through',
  'validates',
  'informed-by',
  'applies-principle',
  'related-to',
] as const;
```

Test that each edge requires a target and authored annotation; lineage types
`built-through`, `validates`, and `informed-by` also require nonempty
`evidenceNote`.

- [ ] **Step 2: Write failing natural-presentation tests**

Given a resolved relation such as:

```ts
{
  target: 'handbook:modular-architecture',
  type: 'applies-principle',
  annotation: 'LifeOS uses explicit authority boundaries to preserve continuity.',
}
```

assert the view model groups it under `See the principle in practice`, keeps the
authored sentence, emits a usable href, and generates an appropriate inverse
path when the target is public.

- [ ] **Step 3: Write failing audit cases**

Add fixtures for:

- missing target;
- internal or unapproved public target;
- lineage relation without `evidenceNote`;
- unsafe text inside annotation/evidence;
- a valid public bidirectional relation.

- [ ] **Step 4: Run focused tests and verify RED**

Run:

```powershell
npm test -- tests/unit/relations.test.ts tests/unit/audit-public-content.test.ts
```

Expected: FAIL on missing typed-edge schema and resolver behavior.

- [ ] **Step 5: Implement relation validation and inverse rules**

Keep one shared mapping:

```ts
const relationPresentation = {
  'part-of': { group: 'understand', inverse: 'contains' },
  'governs': { group: 'understand', inverse: 'governed-by' },
  'provides-context-to': { group: 'understand', inverse: 'receives-context-from' },
  'coordinates': { group: 'understand', inverse: 'coordinated-by' },
  'executes-through': { group: 'lineage', inverse: 'executes' },
  'built-through': { group: 'lineage', inverse: 'helped-build' },
  'validates': { group: 'evidence', inverse: 'validated-by' },
  'informed-by': { group: 'evidence', inverse: 'informs' },
  'applies-principle': { group: 'principle', inverse: 'applied-by' },
  'related-to': { group: 'related', inverse: 'related-to' },
} as const;
```

Authored `annotation` remains the public sentence on the source. An optional
`inverseAnnotation` overrides the shared inverse template when natural tone
requires it.

- [ ] **Step 6: Add normalized public resolution**

Export a resolver that accepts all collection records and returns:

```ts
type RelationshipPathway = {
  group: 'understand' | 'principle' | 'evidence' | 'related' | 'lineage';
  heading: string;
  items: Array<{ title: string; href: string; annotation: string }>;
};
```

Never return draft/internal/unapproved targets. Components visible in a
projection may remain unlinked when their project target is not public.

- [ ] **Step 7: Update the content audit**

Parse `relationshipEdges`, scan annotations/evidence notes through the existing
sanitizer, validate targets, and report all failures together. Retain support
for legacy `relatedIds` until Task 8 migrates every public entry, then remove
the fallback in that task.

- [ ] **Step 8: Run focused tests and verify GREEN**

Run:

```powershell
npm test -- tests/unit/relations.test.ts tests/unit/audit-public-content.test.ts
npm run audit:content
```

Expected: PASS with no public-target or unsafe-relation violations.

- [ ] **Step 9: Commit**

```powershell
git add src/lib/content/relations.ts src/lib/content/types.ts src/content.config.ts scripts/audit-public-content.ts tests/unit/relations.test.ts tests/unit/audit-public-content.test.ts
git commit -m "feat(content): connect catalog entries with natural relations"
```

---

### Task 4: Build the static Cognitive Infrastructure Observatory

**Files:**
- Create: `src/components/diagrams/CognitiveObservatory.astro`
- Create: `src/content/systems/cognitive-infrastructure.mdx`
- Modify: `src/pages/systems/index.astro`
- Modify: `src/pages/systems/[slug].astro`
- Create: `tests/e2e/catalog.spec.ts`
- Modify: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Write failing Observatory route tests**

Assert `/systems/cognitive-infrastructure/` contains:

- one H1;
- the human-authority thesis;
- all approved public layer labels;
- semantic layer and component lists;
- a visual projection marked `aria-hidden="true"`;
- links only for eligible public project targets; and
- no private topology or missing-route links.

- [ ] **Step 2: Add no-JavaScript and mobile expectations**

With JavaScript disabled, assert every layer responsibility and eligible
drill-down remains available. At 375px, assert the Observatory renders as an
ordered layered sequence with no horizontal overflow; do not squeeze a radial
map into the viewport.

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```powershell
npm run test:e2e -- tests/e2e/catalog.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/responsive.spec.ts
```

Expected: FAIL because the new system entry and component do not exist.

- [ ] **Step 4: Write the flagship system entry**

Use approved, evidence-bounded content. Its projection contains:

```text
Human direction
  -> Second Brain / Nexus
  -> Chief of Staff / AI Hub
  -> Codex and specialized agents / project repositories
  -> portfolio projects and feedback
```

Describe responsibilities and handoffs without depicting live host topology,
endpoints, or unattended operation.

- [ ] **Step 5: Implement the Observatory**

Render one authoritative semantic structure and a separate visual structure
with `aria-hidden="true"`. Desktop uses the approved Observatory composition;
mobile uses a deliberate layer sequence. Focusable component anchors expose
visible focus, concise responsibility, and eligible links. Use CSS and native
anchors first; do not add a JavaScript island unless a tested interaction
cannot be expressed accessibly.

- [ ] **Step 6: Feature the Observatory in the Systems index**

Give Cognitive Infrastructure a full-width lead treatment above the remaining
system maps. Existing systems remain available and are not demoted to hidden
secondary navigation.

- [ ] **Step 7: Run focused verification**

Run:

```powershell
npm run check
npm run audit:content
npm run test:e2e -- tests/e2e/catalog.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
```

Expected: PASS, including keyboard focus, no-JS, semantic, and responsive
coverage.

- [ ] **Step 8: Commit**

```powershell
git add src/components/diagrams/CognitiveObservatory.astro src/content/systems/cognitive-infrastructure.mdx src/pages/systems tests/e2e/catalog.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat(systems): add the cognitive infrastructure observatory"
```

---

### Task 5: Create the Editorial Foldout and Capability Dossier

**Files:**
- Create: `src/components/catalog/CapabilityEquation.astro`
- Create: `src/components/catalog/CapabilityDossierHero.astro`
- Create: `src/components/catalog/CatalogRail.astro`
- Create: `src/components/catalog/RelationshipPathways.astro`
- Create: `src/layouts/CatalogArticleLayout.astro`
- Modify: `src/pages/work/[slug].astro`
- Modify: `src/pages/systems/[slug].astro`
- Modify: `src/styles/prose.css`
- Modify: `tests/e2e/catalog.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Write failing dossier anatomy tests**

For LifeOS, assert this order:

```text
capability thesis
capability equation
why it matters
how it works
decisions and tradeoffs
principles applied
evidence boundary
connected pathways
what comes next
```

Assert the Foldout contains a system-position control, chapter navigation,
return-to-Observatory link where applicable, and exactly one H1.

- [ ] **Step 2: Write failing accessibility and responsive cases**

At desktop, the rail must be complementary navigation and must not obscure the
article. At mobile, replace it with a labelled native disclosure or compact
navigation block. Verify active-page semantics, 44px interactive targets, and
no horizontal overflow.

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```powershell
npm run test:e2e -- tests/e2e/catalog.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
```

Expected: FAIL because project routes still use the generic article layout.

- [ ] **Step 4: Implement focused catalog components**

`CapabilityEquation.astro` accepts only the three strings. `CatalogRail.astro`
accepts normalized system position and table-of-contents items.
`RelationshipPathways.astro` accepts the view model from Task 3 and renders
natural sentences under visitor-intent headings; it never infers publication
state itself.

- [ ] **Step 5: Implement `CatalogArticleLayout.astro`**

Compose `BaseLayout`, the rail, dossier hero, article body, evidence area, and
relationship pathways. Preserve a single content reading column and use shared
tokens. Do not modify generic handbook/signal article behavior.

- [ ] **Step 6: Migrate project and flagship-system routes**

Normalize project/system data in the route and pass view models to the layout.
Keep source links conditional on approved `sourceUrls`. Generated paths must
still come only from `publicEntries()`.

- [ ] **Step 7: Run focused verification**

Run:

```powershell
npm run check
npm run test:e2e -- tests/e2e/catalog.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
```

Expected: PASS on one featured and one listed dossier at mobile and desktop.

- [ ] **Step 8: Commit**

```powershell
git add src/components/catalog src/layouts/CatalogArticleLayout.astro src/pages/work src/pages/systems src/styles/prose.css tests/e2e/catalog.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat(catalog): add editorial capability dossiers"
```

---

### Task 6: Turn Work into an editorial system ledger

**Files:**
- Modify: `src/components/interactive/ProjectFilter.tsx`
- Modify: `src/components/interactive/ProjectFilter.css`
- Modify: `src/pages/work/index.astro`
- Modify: `tests/components/project-filter.test.tsx`
- Modify: `tests/e2e/work-filter.spec.ts`
- Modify: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Rewrite failing component expectations**

Update fixtures with `capabilityNarrative` and assert every ledger entry
contains:

- capability promise;
- friction → response → capability equation;
- technical differentiator;
- evidence state;
- a natural place-in-system sentence; and
- project-specific visual mark.

Assert featured entries receive a lead class while listed entries remain full
content entries.

- [ ] **Step 2: Run the component test and verify RED**

Run:

```powershell
npm test -- tests/components/project-filter.test.tsx
```

Expected: FAIL on missing ledger fields and hierarchy.

- [ ] **Step 3: Implement the ledger view model**

Pass only normalized public project data into the React island. Keep filtering
by capability and the existing `aria-live` result count. Do not move
publication rules or relation resolution into the component.

- [ ] **Step 4: Replace uniform cards with editorial ledger entries**

Use decisive structural rules, asymmetric featured placement, project marks,
capability equations, and quiet evidence labels. Reuse the existing palette and
tokens; avoid extra badges, dashboard metrics, or generic cards.

- [ ] **Step 5: Verify enhanced and no-JS behavior**

Run:

```powershell
npm test -- tests/components/project-filter.test.tsx
npm run test:e2e -- tests/e2e/work-filter.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/responsive.spec.ts
```

Expected: the five current approved projects render with the new ledger anatomy
without JavaScript, and filtering remains keyboard-operable after hydration.
Task 7 expands this expectation to all nine approved public projects and reruns
the same coverage.

- [ ] **Step 6: Commit**

```powershell
git add src/components/interactive/ProjectFilter.tsx src/components/interactive/ProjectFilter.css src/pages/work/index.astro tests/components/project-filter.test.tsx tests/e2e/work-filter.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat(work): present projects as a system ledger"
```

---

### Task 7: Publish the approved project catalog and preserve existing work

**Files:**
- Create: `src/content/projects/second-brain.mdx`
- Create: `src/content/projects/nexus.mdx`
- Create: `src/content/projects/ai-hub.mdx`
- Create: `src/content/projects/japanese-language-cognition.mdx`
- Modify: `src/content/projects/chief-of-staff.mdx`
- Modify: `src/content/projects/lifeos.mdx`
- Modify: `src/content/projects/alpha-screener.mdx`
- Modify: `src/content/projects/mathpad.mdx`
- Modify: `src/content/projects/arcade.mdx`
- Preserve: draft project entries and evidence for ADHD Tabs, Creative Suite, and Android Lab
- Modify: `src/lib/content/queries.ts`
- Modify: `tests/unit/queries.test.ts`
- Modify: `tests/unit/flagship-presentation.test.ts`
- Modify: `tests/e2e/routes.spec.ts`
- Modify: `tests/e2e/catalog.spec.ts`

- [ ] **Step 1: Write failing visibility-matrix tests**

Assert publication state against stable frontmatter project IDs:

```ts
featured = [
  'project-second-brain',
  'project-nexus',
  'project-lifeos',
  'project-alpha-screener',
];

listed = [
  'project-chief-of-staff',
  'project-ai-hub',
  'project-mathpad',
  'project-arcade',
  'project-japanese-language-cognition',
];
```

The Cognitive Infrastructure system is featured separately. Chief of Staff's
case-study route remains public even though its project becomes listed.
Publication selectors and relation targets use these stable `project-*` IDs.
Generated project URLs continue to use content-entry/file slugs such as
`/work/second-brain/`, and route tests assert that separate URL contract.
Add a unit case that pairs `entry.data.id: 'project-second-brain'` with
`entry.id: 'second-brain'` so a future selector cannot silently switch back to
route-slug identity.

- [ ] **Step 2: Run query and route tests to verify RED**

Run:

```powershell
npm test -- tests/unit/queries.test.ts tests/unit/flagship-presentation.test.ts
npm run test:e2e -- tests/e2e/routes.spec.ts tests/e2e/catalog.spec.ts
```

Expected: FAIL on missing entries, old homepage allowlist, and old Chief of
Staff visibility assumptions.

- [ ] **Step 3: Write new project entries from approved inventories**

Each entry includes all capability-narrative fields, evidence summary, safe
source policy, long-form dossier sections, and annotated typed relations. Do
not expand claims beyond the Task 1 matrix.

- [ ] **Step 4: Deepen existing public projects**

Add capability narratives and natural relations to Chief of Staff, LifeOS,
Alpha Screener, MathPad, and Arcade. Preserve their reviewed technical claims,
source links, evidence boundaries, and long-form prose. Demote Chief of Staff
project visibility only; keep its case study and approved evidence.

- [ ] **Step 5: Update selectors without a hidden allowlist**

Replace `approvedHomepageProjectIds` with a selector whose explicit stable
`entry.data.id` values match the approved homepage story, not every featured
project automatically. Keep homepage decisions independent from project
visibility and translate to `entry.id` only when constructing route URLs.

- [ ] **Step 6: Run content and route verification**

Run:

```powershell
npm run check
npm run audit:content
npm test -- tests/unit/queries.test.ts tests/unit/flagship-presentation.test.ts
npm run test:e2e -- tests/e2e/routes.spec.ts tests/e2e/catalog.spec.ts
```

Expected: nine project routes, one Cognitive Infrastructure system route, all
legacy eligible routes, and no draft/internal routes.

- [ ] **Step 7: Commit**

```powershell
git add src/content/projects src/lib/content/queries.ts tests/unit/queries.test.ts tests/unit/flagship-presentation.test.ts tests/e2e/routes.spec.ts tests/e2e/catalog.spec.ts
git commit -m "feat(content): publish the connected project catalog"
```

---

### Task 8: Connect systems, principles, signals, and project lineage

**Files:**
- Modify: `src/content/systems/reliable-ai-work.mdx`
- Modify: `src/content/systems/software-for-cognition.mdx`
- Modify: `src/content/systems/intelligence-at-the-edge.mdx`
- Modify: `src/content/handbook/*.mdx`
- Modify: `src/content/signals/*.mdx`
- Modify: `src/pages/handbook/[slug].astro`
- Modify: `src/pages/signals/[slug].astro`
- Remove legacy use: `relatedIds` from migrated public content
- Modify: `tests/unit/relations.test.ts`
- Modify: `tests/e2e/catalog.spec.ts`
- Modify: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Write failing cross-catalog pathway tests**

Assert at least one public example for each visitor path:

```text
Understand the system
See the principle in practice
Follow the evidence
Explore related work
Trace how this was built
```

Verify the UI renders authored sentences rather than raw type names such as
`applies-principle` or `built-through`.

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npm test -- tests/unit/relations.test.ts
npm run test:e2e -- tests/e2e/catalog.spec.ts tests/e2e/routes.spec.ts
```

Expected: FAIL because existing entries still use flat `relatedIds`.

- [ ] **Step 3: Author evidence-supported edges**

Migrate existing public relations to annotated edges. Add lineage edges only
when the evidence inventory supports the connection. If provenance is
incomplete, use `related-to` with honest annotation or omit the relation.

- [ ] **Step 4: Reuse `RelationshipPathways` on reading surfaces**

Resolve relation view models in handbook and signal detail routes and render
the shared component after the article. Do not add the Foldout rail to every
short reading surface unless the content benefits from system-position context.

- [ ] **Step 5: Remove the legacy public fallback**

After all public content is migrated, remove public `relatedIds` handling from
the audit and route-specific resolvers. Keep only the typed edge contract.

- [ ] **Step 6: Run full content verification**

Run:

```powershell
npm run check
npm run audit:content
npm test -- tests/unit/relations.test.ts tests/unit/audit-public-content.test.ts
npm run test:e2e -- tests/e2e/catalog.spec.ts tests/e2e/routes.spec.ts
```

Expected: PASS with no unknown, private, unsafe, or mechanically displayed
relationships.

- [ ] **Step 7: Commit**

```powershell
git add src/content/systems src/content/handbook src/content/signals src/pages/handbook src/pages/signals src/lib/content/relations.ts scripts/audit-public-content.ts tests/unit/relations.test.ts tests/unit/audit-public-content.test.ts tests/e2e/catalog.spec.ts tests/e2e/routes.spec.ts
git commit -m "feat(content): connect principles signals and systems"
```

---

### Task 9: Integrate the catalog story into homepage and navigation

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/layout/SiteHeader.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/unit/site-navigation.test.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Write failing homepage-story tests**

Assert the homepage introduces the Cognitive Infrastructure Observatory before
the project catalog, preserves the existing human-capability headline, and
offers clear routes to:

- explore the integrated system;
- browse project dossiers;
- read principles; and
- follow signals.

Do not duplicate the entire Observatory or nine-project ledger on the homepage.

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npm test -- tests/unit/site-navigation.test.ts
npm run test:e2e -- tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts
```

Expected: FAIL on the new flagship-system entry path and story order.

- [ ] **Step 3: Add one decisive Observatory preview**

Use a compact, noninteractive projection derived from the Cognitive
Infrastructure content entry. The preview links to the full Observatory and
keeps project cards subordinate to the system thesis.

- [ ] **Step 4: Clarify navigation without adding permanent chrome**

Keep Work, Systems, and About as core routes. Label or describe the Systems
entry so the Cognitive Infrastructure flagship is discoverable without adding
a separate top-level navigation item.

- [ ] **Step 5: Run focused verification**

Run:

```powershell
npm test -- tests/unit/site-navigation.test.ts
npm run test:e2e -- tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts tests/e2e/no-javascript.spec.ts
```

Expected: PASS at mobile/desktop and without JavaScript.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/index.astro src/components/layout/SiteHeader.astro src/styles/global.css tests/e2e/homepage.spec.ts tests/unit/site-navigation.test.ts tests/e2e/responsive.spec.ts tests/e2e/no-javascript.spec.ts
git commit -m "feat(home): lead with the connected systems practice"
```

---

### Task 10: Harden accessibility, static output, and catalog integrity

**Files:**
- Modify: `scripts/audit-dist.mjs`
- Modify: `tests/unit/dist-audit.test.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/catalog.spec.ts`

- [ ] **Step 1: Add failing rendered-output fixtures**

Extend the distribution audit test with:

- a public relationship link to a nonexistent target;
- a draft/internal marker in an Observatory target;
- a private path in a relation annotation; and
- a valid unlinked explanatory component.

- [ ] **Step 2: Run the audit test and verify RED**

Run:

```powershell
npm test -- tests/unit/dist-audit.test.ts
```

Expected: FAIL until the rendered-output audit recognizes the new catalog
markers and routes.

- [ ] **Step 3: Extend the distribution audit**

Keep the audit generic: verify local href targets, scan rendered text and data
attributes for sensitive patterns, and reject public draft/internal markers.
Allow Observatory components without href when their project is not public.

- [ ] **Step 4: Complete browser quality coverage**

Add Observatory and dossiers to axe scans. Test keyboard traversal, visible
focus, Foldout chapter navigation, mobile disclosure behavior, reduced motion,
no-JS content parity, and widths 375/768/1280/1536.

- [ ] **Step 5: Run the complete automated gate**

Run:

```powershell
npm run verify
git diff --check
```

Expected: unit, content, static build, distribution, route, accessibility,
no-JS, responsive, and interaction tests pass.

- [ ] **Step 6: Run the Impeccable detector**

Run once, after UI changes are complete:

```powershell
node C:\Users\wizof\.agents\skills\impeccable\scripts\detect.mjs --json src/components/catalog src/components/diagrams/CognitiveObservatory.astro src/components/interactive/ProjectFilter.css src/layouts/CatalogArticleLayout.astro src/pages/index.astro src/pages/work src/pages/systems
```

Expected: no unresolved craft-floor violations. Fix any finding in the owning
shared token/component and rerun the narrow affected tests, but do not rerun the
detector repeatedly.

- [ ] **Step 7: Commit**

```powershell
git add scripts/audit-dist.mjs tests
git commit -m "test: enforce connected catalog quality gates"
```

---

### Task 11: Perform real-browser polish and record the runtime handoff

**Files:**
- Modify: only files implicated by observed visual or interaction defects
- Create: `docs/verification/connected-catalog-readiness.md`

- [ ] **Step 1: Start and verify the real development server**

Run:

```powershell
npm run dev -- --port 4321
```

Keep the process running. Verify `http://127.0.0.1:4321/` before reporting it.

- [ ] **Step 2: Inspect the required journeys in a real browser**

Use `@browser:control-in-app-browser` or
`@build-web-apps:frontend-testing-debugging` to inspect:

```text
Home -> Cognitive Infrastructure Observatory
Observatory -> Second Brain dossier
Observatory -> Nexus dossier
Observatory -> Chief of Staff dossier -> case study
Work -> capability filter -> listed project
Project -> principle -> signal -> related system
```

Check desktop and mobile, keyboard-only traversal, no-JS reading, long-form
rhythm, natural relationship language, focus states, and whether the
Observatory feels like the expressive peak rather than a dashboard.

- [ ] **Step 3: Fix observed defects with proof-first changes**

For functional defects, add or update the narrowest failing test before fixing.
For visual defects, record the observed issue, change the shared component or
token that owns it, and capture before/after browser evidence.

- [ ] **Step 4: Run the clean automated gate**

Run:

```powershell
npm run verify
git diff --check
git status --short --branch
```

Expected: every gate passes and only intentional readiness notes or fixes
remain.

- [ ] **Step 5: Start and verify the production preview**

Run:

```powershell
npm run preview -- --port 4322
```

Verify `http://127.0.0.1:4322/` independently from the development server and
repeat the core Observatory, dossier, relationship, filter, and responsive
smoke paths.

- [ ] **Step 6: Write the readiness record**

Record:

- branch and commit;
- evidence-review decision;
- commands and pass counts;
- public routes and publication matrix;
- browser journeys checked;
- accessibility/no-JS/responsive evidence;
- Impeccable detector result;
- exact development and preview URLs;
- known limitations; and
- deployment readiness without claiming deployment.

- [ ] **Step 7: Commit final polish and readiness evidence**

```powershell
git add src tests scripts docs/verification package.json package-lock.json
git commit -m "chore: verify connected catalog readiness"
```

- [ ] **Step 8: Final handoff**

Report both still-running URLs, the exact final commit, verification summary,
known limitations, and the next explicit lifecycle decision. Do not push, open
a pull request, merge, deploy, or change visibility beyond this plan unless the
user requests that lifecycle.

---

## Completion gate

Implementation is complete only when:

- the new evidence rows are explicitly approved before public project copy;
- Cognitive Infrastructure is a featured, public-safe Observatory;
- Second Brain, Nexus, LifeOS, and Alpha Screener are featured projects;
- Chief of Staff, AI Hub, MathPad, Arcade, and Japanese Language Cognition are
  listed projects;
- ADHD Tabs, Creative Suite, and Android Lab remain draft and absent from
  public output;
- Chief of Staff's approved case study remains public;
- every featured/listed project has a complete capability dossier;
- typed relations validate internally but read as natural editorial pathways;
- lineage claims have evidence notes;
- no private, draft, internal, unsafe, or unsupported material reaches routes,
  metadata, sitemap, RSS, relations, or rendered output;
- Observatory, Foldout, Work, and all dossiers remain useful without
  JavaScript;
- accessibility, keyboard, reduced-motion, responsive, content, build, and
  distribution gates pass;
- the Impeccable detector has no unresolved findings; and
- both development and production-preview URLs are running and verified for
  handoff.

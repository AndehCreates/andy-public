# Signal Library Editorial Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the conventional `/signals/` kind-grouped card index with an artifact-first Editorial Research Atlas led by one manually curated Signal and cross-portfolio guided reading paths.

**Architecture:** Keep Astro's static-first content pipeline and existing publication selectors. Add a focused Signal presentation contract, one repository-owned atlas configuration, and a pure resolver that validates every curated target against public collection records. Server-rendered Astro components present the lead, artifact record, guided paths, compact field index, and detail-page continuation; CSS provides the first explanatory-motion layer, with no required JavaScript.

**Tech Stack:** Astro 6, strict TypeScript, MDX content collections, Zod through `astro/zod`, Vitest, Playwright, axe-core, component-scoped CSS.

**Approved design:** `docs/superpowers/specs/2026-07-23-signal-library-editorial-atlas-design.md`

**Execution authority:** This focused plan supersedes Signal Library implementation detail in the July 21 V1 plan. The repository operating rules, publication gates, approved connected-catalog direction, and current public evidence decisions remain binding.

---

## Execution and orchestration contract

- The root executor is the integration orchestrator.
- Use `superpowers:subagent-driven-development`.
- Delegate bounded implementation and review units to GPT-5.6 Terra children at
  medium reasoning.
- Use at most two child agents concurrently.
- Children must not spawn descendants.
- Every child receives exact file ownership, relevant spec excerpts, and focused
  verification commands.
- The root orchestrator owns integration, authoritative tests, commits, browser
  QA, the public-copy checkpoint, and final handoff.
- Workers are not alone in the repository. Preserve unrelated changes, do not
  revert concurrent edits, and adapt to the current branch state.
- Do not push, open a pull request, or merge unless the user explicitly requests
  that lifecycle in the implementation task.

## Mandatory public-copy checkpoint

Task 3 produces the exact proposed artifact-first Signal copy and a review
matrix. Present that matrix to the user and stop.

Do not modify the four currently public Signal entries, make new Signal claims,
or continue to Task 4 until the user explicitly approves the relevant copy
rows. Approval of this implementation plan or visual design does not
automatically approve final public wording.

## File and responsibility map

### Content contracts

- `src/lib/content/signals.ts` — Signal artifact types, structured presentation
  fields, continuation target schema, conditional public-entry validation, and
  public-safe view types.
- `src/content.config.ts` — composes the Signal presentation fields into the
  existing Signal collection and applies public-entry refinement.
- `src/lib/content/signalAtlas.ts` — pure atlas configuration schema, canonical
  public-record model, resolver, aggregated configuration errors, and href
  derivation.
- `src/data/signalAtlas.ts` — the one manual lead choice and ordered authored
  research paths. It contains IDs and transition annotations, not duplicated
  claims.
- `scripts/audit-public-content.ts` — audits structured Signal strings,
  continuation targets, and the atlas configuration against the same public
  records used by the existing publication audit.

### Presentation

- `src/components/signals/SignalLead.astro` — first-viewport research question,
  finding, evidence summary, limitation, metadata, and primary reading action.
- `src/components/signals/SignalArtifactRecord.astro` — public-safe artifact
  type, source context, evidence, and boundary.
- `src/components/signals/SignalResearchPath.astro` — semantic ordered path,
  authored transition explanations, and CSS-only traversal emphasis.
- `src/components/signals/SignalFieldIndex.astro` — compact complete public
  collection index.
- `src/components/signals/SignalContext.astro` — compact detail-page artifact
  context and continuation.
- `src/pages/signals/index.astro` — collection loading, normalization, resolver
  invocation, and page composition.
- `src/pages/signals/[slug].astro` — retains `ArticleLayout` and adds the compact
  context/continuation slots.

### Content and evidence

- `docs/evidence/signal-atlas-copy-review.md` — exact proposed public fields,
  evidence source, unsupported claims, and user disposition for each current
  Signal entry.
- `src/content/signals/evaluation-as-product-work.mdx`
- `src/content/signals/local-first-recovery-notes.mdx`
- `src/content/signals/static-output-as-a-safety-boundary.mdx`
- `src/content/signals/bounded-interface-experiment.mdx`

Keep all four current slugs stable.

### Verification

- `tests/unit/signals.test.ts` — schema/refinement behavior.
- `tests/unit/signal-atlas.test.ts` — configuration and resolver behavior.
- `tests/unit/audit-public-content.test.ts` — audit integration and failure
  aggregation.
- `tests/e2e/signal-atlas.spec.ts` — index, detail, keyboard, motion, and
  semantic path behavior.
- Existing `tests/e2e/routes.spec.ts`, `no-javascript.spec.ts`,
  `accessibility.spec.ts`, and `responsive.spec.ts` receive focused regressions.

---

### Task 1: Add the typed Signal artifact contract

**Files:**
- Create: `src/lib/content/signals.ts`
- Create: `tests/unit/signals.test.ts`

- [ ] **Step 1: Write the failing schema tests**

Create `tests/unit/signals.test.ts` with:

```ts
import { z } from 'astro/zod';
import { describe, expect, it } from 'vitest';
import { reviewValues, visibilityValues } from '../../src/lib/content/publication';
import {
  addSignalPresentationIssues,
  signalPresentationFields,
} from '../../src/lib/content/signals';

const schema = z.object({
  visibility: z.enum(visibilityValues),
  publicReview: z.enum(reviewValues),
  ...signalPresentationFields,
}).superRefine(addSignalPresentationIssues);

const approvedSignal = {
  visibility: 'listed',
  publicReview: 'approved',
  researchQuestion: 'What should a ranking prove before a person acts?',
  artifactLabel: 'Uncertainty and readiness gates',
  artifactType: 'implementation',
  finding: 'Insufficient evidence blocks promotion while deterministic scoring remains inspectable.',
  evidenceSummary: 'Focused tests cover insufficient samples, non-positive results, and readiness alignment.',
  evidenceBoundary: 'The tests do not establish live performance or investment outcomes.',
  readingMinutes: 8,
  sourceContext: 'Alpha Screener',
  continueTo: {
    targetId: 'caseStudies:case-study-alpha-screener',
    annotation: 'Continue to the case study to inspect the wider decision-support boundary.',
  },
} as const;

describe('Signal presentation contract', () => {
  it('accepts a complete approved public Signal', () => {
    expect(schema.safeParse(approvedSignal).success).toBe(true);
  });

  it.each([
    'researchQuestion',
    'artifactLabel',
    'artifactType',
    'finding',
    'evidenceSummary',
    'evidenceBoundary',
    'continueTo',
  ] as const)('rejects an approved public Signal missing %s', (field) => {
    expect(schema.safeParse({ ...approvedSignal, [field]: undefined }).success).toBe(false);
  });

  it('allows an unpublished editorial seed to omit presentation fields', () => {
    expect(schema.safeParse({
      visibility: 'draft',
      publicReview: 'pending',
    }).success).toBe(true);
  });

  it('rejects blank continuation annotations and malformed targets', () => {
    expect(schema.safeParse({
      ...approvedSignal,
      continueTo: { targetId: 'not-a-target', annotation: '' },
    }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run tests/unit/signals.test.ts
```

Expected: FAIL because `src/lib/content/signals.ts` does not exist.

- [ ] **Step 3: Implement the minimal Signal contract**

Create `src/lib/content/signals.ts` with these exported contracts:

```ts
import { z } from 'astro/zod';
import type { RefinementCtx } from 'astro/zod';
import { canPublish } from './publication';
import { contentCollectionNames } from './types';

export const signalArtifactTypeValues = [
  'source',
  'implementation',
  'test',
  'interface',
  'decision-record',
  'failure',
  'diagram',
] as const;

const targetPattern = new RegExp(
  `^(?:${contentCollectionNames.join('|')}):[a-z0-9]+(?:-[a-z0-9]+)*$`,
);

export const signalContinueToSchema = z.object({
  targetId: z.string().regex(targetPattern),
  annotation: z.string().trim().min(20).max(220),
});

export const signalPresentationFields = {
  researchQuestion: z.string().trim().min(20).max(140).optional(),
  artifactLabel: z.string().trim().min(3).max(120).optional(),
  artifactType: z.enum(signalArtifactTypeValues).optional(),
  finding: z.string().trim().min(20).max(320).optional(),
  evidenceSummary: z.string().trim().min(20).max(320).optional(),
  evidenceBoundary: z.string().trim().min(20).max(320).optional(),
  readingMinutes: z.number().int().positive().max(60).optional(),
  sourceContext: z.string().trim().min(2).max(100).optional(),
  continueTo: signalContinueToSchema.optional(),
};

type SignalPresentationInput = {
  visibility: 'internal' | 'draft' | 'listed' | 'featured';
  publicReview: 'pending' | 'approved';
} & {
  [K in keyof typeof signalPresentationFields]?: unknown;
};

const requiredPublicFields = [
  'researchQuestion',
  'artifactLabel',
  'artifactType',
  'finding',
  'evidenceSummary',
  'evidenceBoundary',
  'continueTo',
] as const;

export function addSignalPresentationIssues(
  value: SignalPresentationInput,
  context: RefinementCtx,
): void {
  if (!canPublish(value)) return;

  for (const field of requiredPublicFields) {
    if (value[field] === undefined) {
      context.addIssue({
        code: 'custom',
        path: [field],
        message: `${field} is required for an approved public Signal.`,
      });
    }
  }
}

export type SignalContinueTo = z.infer<typeof signalContinueToSchema>;
export type SignalArtifactType = (typeof signalArtifactTypeValues)[number];
```

If `RefinementCtx` is not exported by the installed `astro/zod`, use
`z.RefinementCtx` after confirming the local type surface. Do not weaken the
function to `any`.

- [ ] **Step 4: Keep the contract disconnected from live content**

Do not modify `src/content.config.ts` in this task. The new module and its unit
tests define the future public-entry contract, but the live collection remains
on its existing schema until exact copy is approved in Task 3.

This preserves the current public site and keeps `npm run check`,
`npm run audit:content`, and `npm run build` green at the human checkpoint.

- [ ] **Step 5: Run the focused test and repository check**

Run:

```powershell
npx vitest run tests/unit/signals.test.ts
npm run check
```

Expected: PASS. The live Signal collection is unchanged.

- [ ] **Step 6: Commit the isolated, non-breaking contract**

```powershell
git add src/lib/content/signals.ts tests/unit/signals.test.ts
git commit -m "feat(signals): define the artifact content contract"
```

---

### Task 2: Add the atlas configuration, pure resolver, and audit failures

**Files:**
- Create: `src/lib/content/signalAtlas.ts`
- Create: `src/data/signalAtlas.ts`
- Create: `tests/unit/signal-atlas.test.ts`
- Modify: `scripts/audit-public-content.ts`
- Modify: `tests/unit/audit-public-content.test.ts`

- [ ] **Step 1: Write failing resolver tests**

Create `tests/unit/signal-atlas.test.ts` covering:

```ts
import { describe, expect, it } from 'vitest';
import {
  resolveSignalAtlas,
  type SignalAtlasConfig,
  type SignalAtlasRecord,
} from '../../src/lib/content/signalAtlas';

const records: SignalAtlasRecord[] = [
  {
    canonicalId: 'signals:evaluation-as-product-work',
    collection: 'signals',
    slug: 'evaluation-as-product-work',
    href: '/signals/evaluation-as-product-work/',
    title: 'What should a ranking prove before a person acts?',
    summary: 'A reviewed artifact-first research note.',
    visibility: 'featured',
    publicReview: 'approved',
  },
  {
    canonicalId: 'handbook:evaluation-driven-development',
    collection: 'handbook',
    slug: 'evaluation-driven-development',
    href: '/handbook/evaluation-driven-development/',
    title: 'Evaluation-driven development',
    summary: 'A public engineering principle.',
    visibility: 'featured',
    publicReview: 'approved',
  },
  {
    canonicalId: 'caseStudies:case-study-alpha-screener',
    collection: 'caseStudies',
    slug: 'alpha-screener',
    href: '/case-studies/alpha-screener/',
    title: 'Alpha Screener',
    summary: 'A reviewed case study.',
    visibility: 'featured',
    publicReview: 'approved',
  },
];

const config: SignalAtlasConfig = {
  leadSignalId: 'signals:evaluation-as-product-work',
  paths: [{
    id: 'evidence-before-action',
    question: 'What must evidence establish before a result advances?',
    premise: 'Follow the gate from inspected behavior to product consequence.',
    readingMinutes: 12,
    steps: [
      {
        targetId: 'signals:evaluation-as-product-work',
        intent: 'inspect',
        transition: 'The observed gate becomes a repeatable development principle.',
      },
      {
        targetId: 'handbook:evaluation-driven-development',
        intent: 'understand',
        transition: 'The principle is visible in a reviewed decision-support system.',
      },
      {
        targetId: 'caseStudies:case-study-alpha-screener',
        intent: 'practice',
      },
    ],
  }],
};
```

Required assertions:

- resolves the exact manual lead;
- preserves path and step order;
- derives public hrefs from normalized records rather than config;
- rejects a missing, pending, draft, or internal lead;
- rejects an unknown or non-public step;
- rejects paths with fewer than two steps;
- rejects a missing transition on every non-final step;
- rejects an atlas with no eligible public Signal record;
- returns all failures together in one `SignalAtlasConfigurationError`;
- never silently removes an invalid step or chooses a replacement lead.

- [ ] **Step 2: Run the resolver test and verify RED**

Run:

```powershell
npx vitest run tests/unit/signal-atlas.test.ts
```

Expected: FAIL because the resolver does not exist.

- [ ] **Step 3: Implement the pure configuration and resolver contract**

Create `src/lib/content/signalAtlas.ts` with:

- `signalAtlasIntentValues = ['inspect', 'understand', 'practice', 'evidence',
  'continue']`;
- Zod schemas for step, path, and full configuration;
- `SignalAtlasRecord`, which contains only normalized public routing data and
  publication fields;
- `ResolvedSignalAtlas`, which contains the resolved lead, paths, and step
  records;
- `SignalAtlasConfigurationError`, which stores an ordered `issues: string[]`;
- `resolveSignalAtlas(config, records)`, which validates structure and public
  targets, aggregates failures, and throws before returning partial output;
- `publicContentRoutePrefixes`, the exhaustive collection-to-route-prefix map;
- `contentSlugFromRelativePath(relativePath)`, which removes `.md` or `.mdx`
  while preserving nested slug segments; and
- `toSignalAtlasRecord(input)`, the one normalization function used by runtime
  collection entries and standalone-audit entries.

Use the existing `canPublish()` function. Build the record index with
`new Map(records.map((record) => [record.canonicalId, record]))`.

`toSignalAtlasRecord()` accepts the authored frontmatter ID separately from the
route slug. It builds:

- `canonicalId` from collection plus authored ID;
- `href` from `publicContentRoutePrefixes[collection]` plus route slug; and
- the public routing and publication fields required by the resolver.

Do not derive route slugs from authored IDs. Existing case-study data proves
those values can differ.

The resolver must never:

- infer publication from route existence;
- use config titles or hrefs;
- fall back to the newest Signal;
- remove invalid steps;
- accept a path whose final resolved length is below two; or
- return a result when zero public Signals exist.

- [ ] **Step 4: Add the repository-owned atlas configuration**

Create `src/data/signalAtlas.ts`.

Use only currently public, reviewed targets:

```ts
import type { SignalAtlasConfig } from '@/lib/content/signalAtlas';

export const signalAtlasConfig = {
  leadSignalId: 'signals:evaluation-as-product-work',
  paths: [
    {
      id: 'evidence-before-action',
      question: 'What must evidence establish before a result advances?',
      premise: 'Follow a tested decision gate into the system and principle it shaped.',
      readingMinutes: 12,
      steps: [
        {
          targetId: 'signals:evaluation-as-product-work',
          intent: 'inspect',
          transition: 'The gate exposes a repeatable rule for evaluating product behavior.',
        },
        {
          targetId: 'handbook:evaluation-driven-development',
          intent: 'understand',
          transition: 'The principle becomes concrete in the Alpha Screener decision surface.',
        },
        {
          targetId: 'caseStudies:case-study-alpha-screener',
          intent: 'practice',
        },
      ],
    },
    {
      id: 'state-after-interruption',
      question: 'What state must survive an interruption?',
      premise: 'Trace recoverable state from a concrete implementation contract into a cognition system.',
      readingMinutes: 10,
      steps: [
        {
          targetId: 'signals:local-first-recovery-notes',
          intent: 'inspect',
          transition: 'The observed state contract clarifies why durable context is a product concern.',
        },
        {
          targetId: 'handbook:grounded-knowledge',
          intent: 'understand',
          transition: 'The principle is applied in the LifeOS continuity model.',
        },
        {
          targetId: 'caseStudies:case-study-lifeos',
          intent: 'practice',
        },
      ],
    },
    {
      id: 'public-output-boundary',
      question: 'Where does private state stop and public output begin?',
      premise: 'Follow the post-build audit into the portfolio publication boundary.',
      readingMinutes: 9,
      steps: [
        {
          targetId: 'signals:static-output-as-a-safety-boundary',
          intent: 'inspect',
          transition: 'The delivery artifact demonstrates the need for visible provenance and review.',
        },
        {
          targetId: 'handbook:grounded-knowledge',
          intent: 'understand',
          transition: 'The same boundary appears in the reliable-AI system map.',
        },
        {
          targetId: 'systems:reliable-ai-work',
          intent: 'practice',
        },
      ],
    },
  ],
} satisfies SignalAtlasConfig;
```

Do not add MathPad, Arcade, ADHD Tabs, Creative Suite, Android Lab, Second
Brain, Nexus, AI Hub, or other pending targets.

- [ ] **Step 5: Add a non-activated atlas audit helper**

Modify `scripts/audit-public-content.ts` to:

1. retain `slug` and an optional test-only `signalPresentation` payload on
   `AuditedEntry`;
2. derive the live entry slug from the content file path relative to its collection
   directory with `contentSlugFromRelativePath()`;
3. normalize entries with the shared `toSignalAtlasRecord()` helper;
4. export a pure `validateSignalAtlasEntries(entries, atlasConfig)` helper that
   validates continuation targets and calls `resolveSignalAtlas()`; and
5. return all helper violations as strings suitable for the existing aggregate
   audit error.

Do **not** call `validateSignalAtlasEntries()` from `auditEntries()` yet. Do not
collect or require the new structured Signal fields in the live scanner yet.
Task 3 activates both behaviors atomically with approved content.

Do not introduce a second file scanner or separate publication predicate.

- [ ] **Step 6: Add audit regression tests**

Extend `tests/unit/audit-public-content.test.ts` with fixtures that prove:

- a public Signal with complete structured fields and a public continuation is
  accepted by `validateSignalAtlasEntries()`;
- an unknown, draft, internal, or pending continuation is rejected;
- missing `evidenceSummary`, `evidenceBoundary`, or continuation annotation is
  rejected;
- a secret-like or private path inside any structured Signal field is reported;
- invalid atlas configuration errors are included in the aggregate audit
  helper result;
- route slugs are derived from file paths rather than authored IDs;
- a nested file path such as `research/gate-note.mdx` derives the stable route
  slug `research/gate-note`;
- a case-study authored ID and its route slug may differ without breaking the
  resolved href; and
- unrelated non-Signal entries remain unaffected.

Give the helper this focused signature:

```ts
export function validateSignalAtlasEntries(
  entries: AuditedEntry[],
  atlasConfig: SignalAtlasConfig = signalAtlasConfig,
): string[]
```

- [ ] **Step 7: Run focused tests**

Run:

```powershell
npx vitest run tests/unit/signals.test.ts tests/unit/signal-atlas.test.ts tests/unit/audit-public-content.test.ts
```

Expected: PASS for pure contracts and fixtures. The real content audit remains
unchanged because the new enforcement is not active against live content yet.

- [ ] **Step 8: Prove the pre-approval branch remains healthy**

Run:

```powershell
npm run check
npm run audit:content
npm run build
```

Expected: PASS with the current public Signal entries unchanged.

- [ ] **Step 9: Commit the non-breaking atlas foundation**

```powershell
git add src/lib/content/signalAtlas.ts src/data/signalAtlas.ts scripts/audit-public-content.ts tests/unit/signal-atlas.test.ts tests/unit/audit-public-content.test.ts
git commit -m "feat(signals): add the curated atlas resolver"
```

---

### Task 3: Draft exact grounded Signal copy and stop for approval

**Files:**
- Create: `docs/evidence/signal-atlas-copy-review.md`
- Read only: `docs/evidence/alpha-screener.md`
- Read only: `docs/evidence/lifeos.md`
- Read only: `docs/evidence/chief-of-staff.md`
- Read only: `docs/verification/v1-readiness.md`
- Read only: `package.json`
- Read only: the four current `src/content/signals/*.mdx` public entries

- [ ] **Step 1: Create the copy-review matrix without changing public content**

Write `docs/evidence/signal-atlas-copy-review.md` with one row per existing
public Signal slug. Each row contains:

- stable slug;
- proposed public title or research question;
- `artifactLabel`;
- `artifactType`;
- `finding`;
- `evidenceSummary`;
- `evidenceBoundary`;
- `readingMinutes`;
- `sourceContext`;
- `continueTo.targetId`;
- `continueTo.annotation`;
- exact evidence-document section supporting each factual claim;
- prohibited or unsupported claims;
- proposed body-copy changes; and
- `publicReview: pending`.

The four intended source pairings are:

| Stable slug | Grounding source | Intended question |
| --- | --- | --- |
| `evaluation-as-product-work` | Alpha Screener uncertainty/readiness gates and focused tests | What should a ranking prove before a person acts? |
| `local-first-recovery-notes` | LifeOS application-state, adjustment, and intervention contracts | What state must survive an interruption? |
| `static-output-as-a-safety-boundary` | This repository's build pipeline and post-build rendered-output audit | Where does private state stop and public output begin? |
| `bounded-interface-experiment` | Chief of Staff lifecycle fixtures and independent-verification gate | Who is allowed to declare work complete? |

- [ ] **Step 2: Audit the proposed matrix for unsafe strings**

Run:

```powershell
npm run audit:content
```

The review matrix itself must contain no private checkout paths, private hosts,
credentials, account data, unsupported metrics, or unreviewed source links.

Also run:

```powershell
npm run check
npm run build
```

Expected: PASS. The new Signal schema and live atlas audit are still not active,
and the four current public entries are unchanged.

- [ ] **Step 3: Present the matrix and STOP**

Present `docs/evidence/signal-atlas-copy-review.md` to the user.

State clearly:

- the visual design is already approved;
- these are the exact proposed public Signal claims;
- every current slug stays stable;
- the four existing public entries remain unchanged until approval; and
- execution will resume only for explicitly approved rows.

Do not infer approval from the earlier design approval. Do not continue to Step
4 until the user responds in the implementation thread.

- [ ] **Step 4: Apply only approved copy**

After explicit approval, update the approved rows in:

- `src/content/signals/evaluation-as-product-work.mdx`
- `src/content/signals/local-first-recovery-notes.mdx`
- `src/content/signals/static-output-as-a-safety-boundary.mdx`
- `src/content/signals/bounded-interface-experiment.mdx`

Keep every filename and authored `id` stable. Update the matrix rows to
`publicReview: approved by user` with the review date.

If any row is not approved, either keep its current copy and provide the new
required structured fields using only already-approved wording, or remove it
from the atlas config and revise the path under user direction. Never fill a
content gap with plausible prose.

- [ ] **Step 5: Activate schema and audit enforcement atomically**

Only after the approved Signal files contain the complete structured fields,
modify the `signals` collection in `src/content.config.ts`:

```ts
import {
  addSignalPresentationIssues,
  signalPresentationFields,
} from '@/lib/content/signals';

const signals = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/signals' }),
  schema: z.object({
    ...baseFields,
    ...signalPresentationFields,
    kind: z.enum(['resource', 'homelab', 'field-note', 'experiment']),
  }).superRefine(addSignalPresentationIssues),
});
```

Then modify `scripts/audit-public-content.ts` to:

1. collect the structured Signal fields into
   `AuditedEntry.signalPresentation`;
2. include every structured string in `findPublicContentRisks`;
3. call `validateSignalAtlasEntries()` from `auditEntries()`; and
4. append all returned violations to the existing aggregate failure.

This is the only activation point. The content files, schema refinement, and
live audit enforcement must land in the same verified commit.

- [ ] **Step 6: Run the full content contract gate**

Run:

```powershell
npm run check
npx vitest run tests/unit/signals.test.ts tests/unit/signal-atlas.test.ts tests/unit/audit-public-content.test.ts
npm run audit:content
```

Expected: PASS with all approved public Signal entries satisfying the new
contract and every configured target resolving publicly.

- [ ] **Step 7: Commit the activated content foundation**

Stage only:

```powershell
git add src/lib/content/signals.ts src/lib/content/signalAtlas.ts src/data/signalAtlas.ts src/content.config.ts scripts/audit-public-content.ts tests/unit/signals.test.ts tests/unit/signal-atlas.test.ts tests/unit/audit-public-content.test.ts docs/evidence/signal-atlas-copy-review.md src/content/signals/evaluation-as-product-work.mdx src/content/signals/local-first-recovery-notes.mdx src/content/signals/static-output-as-a-safety-boundary.mdx src/content/signals/bounded-interface-experiment.mdx
git commit -m "feat(signals): establish the artifact-first atlas"
```

---

### Task 4: Build the server-rendered Editorial Atlas index

**Files:**
- Create: `src/components/signals/SignalLead.astro`
- Create: `src/components/signals/SignalArtifactRecord.astro`
- Create: `src/components/signals/SignalResearchPath.astro`
- Create: `src/components/signals/SignalFieldIndex.astro`
- Modify: `src/pages/signals/index.astro`
- Create: `tests/e2e/signal-atlas.spec.ts`
- Modify: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Load the Impeccable UI quality floor**

The UI executor must use the `impeccable` skill, run its context loader once
with `--target src/pages/signals/index.astro`, then load
`reference/craft-floor.md` immediately before editing the UI.

The existing `PRODUCT.md` and
`.impeccable/surfaces/src-pages-signals-index-astro.md` are authoritative.

- [ ] **Step 2: Write the failing atlas route test**

Create `tests/e2e/signal-atlas.spec.ts` with assertions for:

```ts
import { expect, test } from '@playwright/test';

test('presents one curated lead and artifact-first research paths', async ({ page }) => {
  await page.goto('/signals/');

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('[data-signal-lead]')).toHaveCount(1);
  await expect(page.locator('[data-signal-lead]')).toContainText(
    'What should a ranking prove before a person acts?',
  );
  await expect(page.locator('[data-signal-artifact-record]')).toContainText(
    'What was inspected',
  );
  await expect(page.locator('[data-signal-path]')).toHaveCount(3);
  await expect(page.locator('[data-signal-field-index] a')).toHaveCount(4);
  await expect(page.getByRole('heading', {
    level: 2,
    name: 'Start with something inspectable. Follow what it changed.',
  })).toHaveCount(1);
});

test('renders authored transitions instead of raw relation labels', async ({ page }) => {
  await page.goto('/signals/');

  const firstPath = page.locator('[data-signal-path]').filter({
    hasText: 'What must evidence establish before a result advances?',
  });
  await expect(firstPath).toContainText(
    'The gate exposes a repeatable rule for evaluating product behavior.',
  );
  await expect(firstPath).not.toContainText(
    /part-of|related-to|applies-principle|caseStudies:/,
  );
});
```

Update the existing Signal assertions in `tests/e2e/routes.spec.ts` so they
verify the stable routes and new field index rather than the removed
Resource/Homelab/Field notes/Experiments group headings.

- [ ] **Step 3: Run the route test and verify RED**

Run:

```powershell
npm run build
npx playwright test tests/e2e/signal-atlas.spec.ts --project=chromium --reporter=list
```

Expected: FAIL because the current index has no lead, artifact record, or
research paths.

- [ ] **Step 4: Use the shared route normalization helper**

Map Astro collection entries into `SignalAtlasRecord` values with the
`toSignalAtlasRecord()` helper created in Task 2. The runtime adapter must:

- use `entry.data.id` for the canonical target ID;
- use `entry.id` for the public route slug;
- map each collection to its existing public route prefix;
- carry only title, summary, visibility, publicReview, and routing values; and
- reject collections without a public route mapping at compile time.

Do not put Astro collection loading inside the pure resolver.

- [ ] **Step 5: Implement `SignalLead.astro`**

Props must be a normalized public Signal view model. Render:

- one eyebrow identifying artifact type and source context;
- the research question as the page's only `<h1>`;
- finding;
- evidence summary;
- evidence boundary;
- date, capability, kind, and optional reading length;
- a descriptive primary link to the Signal detail; and
- `data-signal-lead`.

The lead component must not infer lead placement from `visibility`.

- [ ] **Step 6: Implement `SignalArtifactRecord.astro`**

Render a semantic `<aside data-signal-artifact-record>` with a definition list:

- What was inspected
- What it revealed
- Evidence
- Evidence boundary
- Why continue

Use public-safe labels only. Do not render local paths or raw IDs.

- [ ] **Step 7: Implement `SignalResearchPath.astro`**

Render each path as a semantic section with:

- its question as an `<h3>`;
- premise and reading length;
- an `<ol>` of resolved public steps;
- one descriptive link per step;
- transition annotation adjacent to the source step;
- visually hidden text that names the relationship sequence; and
- `data-signal-path`.

CSS may animate only `opacity`, `color`, `border-color`, and `transform`.
Content remains visible by default. Use `:focus-within` and `:hover` to
emphasize the active sequence. Under reduced motion, remove transitions and
transforms.

- [ ] **Step 8: Implement `SignalFieldIndex.astro`**

Render every public Signal exactly once in a compact ordered list with:

- kind;
- date;
- title/research question;
- source context when present;
- primary capability;
- optional reading length; and
- descriptive detail link.

The component receives already-public sorted entries. It owns no publication
logic and requires no JavaScript.

- [ ] **Step 9: Compose the page**

Replace `src/pages/signals/index.astro` with:

1. one load of all five content collections via `Promise.all`;
2. one normalization pass into atlas records;
3. `resolveSignalAtlas(signalAtlasConfig, records)`;
4. one separate `publicEntries()` query for the complete Signal field index;
5. `SignalLead`;
6. `SignalArtifactRecord`;
7. the research-path section;
8. `SignalFieldIndex`; and
9. a quiet RSS link.

Do not add a React island or client script in this task.

- [ ] **Step 10: Run focused build and browser tests**

Run:

```powershell
npm run build
npx playwright test tests/e2e/signal-atlas.spec.ts tests/e2e/routes.spec.ts --project=chromium --reporter=list
```

Expected: PASS.

- [ ] **Step 11: Commit the index**

```powershell
git add src/components/signals src/lib/content/signalAtlas.ts src/pages/signals/index.astro tests/e2e/signal-atlas.spec.ts tests/e2e/routes.spec.ts
git commit -m "feat(signals): build the editorial research atlas"
```

---

### Task 5: Add compact atlas context to Signal detail pages

**Files:**
- Create: `src/components/signals/SignalContext.astro`
- Modify: `src/pages/signals/[slug].astro`
- Modify: `tests/e2e/signal-atlas.spec.ts`

- [ ] **Step 1: Write failing detail-context assertions**

Add:

```ts
test('continues the atlas on Signal detail pages', async ({ page }) => {
  await page.goto('/signals/evaluation-as-product-work/');

  const context = page.locator('[data-signal-context]');
  await expect(context).toContainText('What was inspected');
  await expect(context).toContainText('What the evidence does not establish');
  await expect(context.getByRole('link', {
    name: /Continue to the Alpha Screener case study/i,
  })).toHaveAttribute('href', '/case-studies/alpha-screener/');
  await expect(page.getByRole('link', {
    name: /Return to the Signal Library atlas/i,
  })).toHaveAttribute('href', '/signals/');
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npm run build
npx playwright test tests/e2e/signal-atlas.spec.ts --project=chromium --reporter=list
```

Expected: FAIL because detail pages render only `ArticleLayout` and MDX.

- [ ] **Step 3: Implement `SignalContext.astro`**

Render a compact, quiet component with:

- source context and artifact label;
- finding;
- evidence summary;
- evidence boundary;
- a descriptive continuation link;
- a return-to-atlas link; and
- `data-signal-context`.

It receives a resolved continuation record. It does not query collections,
infer publication, or render raw target IDs.

- [ ] **Step 4: Resolve the detail continuation**

In `src/pages/signals/[slug].astro`:

- keep the existing public `getStaticPaths()`;
- load all collections needed to resolve `entry.data.continueTo.targetId`;
- normalize records through the shared helper;
- reject a missing or non-public continuation during the build;
- pass `SignalContext` through the existing `ArticleLayout` `lead` or `related`
  slot; and
- preserve current source links, metadata, table of contents, and MDX body.

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npm run build
npx playwright test tests/e2e/signal-atlas.spec.ts tests/e2e/routes.spec.ts --project=chromium --reporter=list
```

Expected: PASS.

Commit:

```powershell
git add src/components/signals/SignalContext.astro src/pages/signals/[slug].astro tests/e2e/signal-atlas.spec.ts
git commit -m "feat(signals): continue atlas paths into detail pages"
```

---

### Task 6: Enforce no-JavaScript, keyboard, motion, accessibility, and responsive behavior

**Files:**
- Modify: `tests/e2e/signal-atlas.spec.ts`
- Modify: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: Signal components only when tests expose a defect

- [ ] **Step 1: Add no-JavaScript coverage**

Extend `tests/e2e/no-javascript.spec.ts`:

```ts
await page.goto('/signals/');
await expect(page.locator('[data-signal-lead]')).toBeVisible();
await expect(page.locator('[data-signal-path]')).toHaveCount(3);
await expect(page.locator('[data-signal-field-index] a')).toHaveCount(4);

for (const link of await page.locator('[data-signal-path] a').all()) {
  await expect(link).toHaveAttribute('href', /^\/(?:signals|handbook|systems|work|case-studies)\//);
}
```

- [ ] **Step 2: Add keyboard and reduced-motion coverage**

In `tests/e2e/signal-atlas.spec.ts`:

- tab through the first path's links in DOM order;
- assert each receives visible focus;
- assert the transition annotation is present before focus;
- emulate `reducedMotion: 'reduce'`;
- assert path connectors have transition duration no greater than 10ms; and
- assert no transform is required to expose content.

- [ ] **Step 3: Expand responsive coverage**

In `tests/e2e/responsive.spec.ts`, check `/signals/` at 375, 768, 1280, and
1536 pixels:

- no document overflow;
- the lead precedes the artifact record in DOM order;
- path steps are single-column at 375;
- connectors are vertical at mobile widths;
- at desktop widths, a path exposes at least three columns without clipping;
- metadata remains reachable; and
- all field-index links remain visible.

- [ ] **Step 4: Keep the existing axe route and add semantic assertions**

`/signals/` already participates in `tests/e2e/accessibility.spec.ts`. Add:

- exactly one `<h1>`;
- each path has an accessible heading;
- each ordered path contains at least two list items;
- decorative connectors are `aria-hidden="true"`;
- no duplicate link names whose destinations differ; and
- the artifact record uses a named `<aside>`.

- [ ] **Step 5: Run focused browser gates**

Run:

```powershell
npm run build
npx playwright test tests/e2e/signal-atlas.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts --reporter=list
```

Expected: PASS in both configured Playwright projects where applicable.

- [ ] **Step 6: Commit quality gates**

```powershell
git add src/components/signals tests/e2e/signal-atlas.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
git commit -m "test(signals): enforce atlas accessibility and resilience"
```

---

### Task 7: Perform the Impeccable finish pass and complete verification

**Files:**
- Modify: only Signal files implicated by observed defects
- Modify: `.impeccable/surfaces/src-pages-signals-index-astro.md` only if the
  implemented direction materially clarifies a durable rule
- Create: `docs/verification/signal-atlas-readiness.md`

- [ ] **Step 1: Start the real development server**

Run:

```powershell
npm run dev -- --port 4321
```

Keep it running. Verify `http://127.0.0.1:4321/signals/` returns the actual
portfolio and not the brainstorm companion.

- [ ] **Step 2: Inspect desktop and mobile in a real browser**

Using the in-app browser:

- inspect 1440×900 and 375×812;
- verify the lead feels editorial rather than like a generic hero;
- verify the artifact record contains the most concrete information in the
  first viewport;
- verify questions feel discovered from evidence rather than written as brand
  slogans;
- follow every guided path;
- inspect one Signal detail continuation;
- test keyboard traversal;
- test reduced motion; and
- test with JavaScript disabled.

Record exact issues before editing.

- [ ] **Step 3: Fix only observed defects**

For functional defects, add a failing test first. For visual defects, record the
before/after observation and keep the change inside the focused Signal
components or shared tokens only when the rule is genuinely reusable.

- [ ] **Step 4: Run the Impeccable detector once**

After UI edits are complete:

```powershell
node C:\Users\wizof\.agents\skills\impeccable\scripts\detect.mjs --json src/pages/signals/index.astro src/pages/signals/[slug].astro src/components/signals
```

Run it once, at the end. Resolve material findings without diluting the approved
direction. Do not run a second detector.

- [ ] **Step 5: Run the complete automated gate**

Run:

```powershell
npm run verify
git diff --check
git status --short --branch
```

Expected:

- Astro check passes;
- all unit tests pass;
- content audit passes;
- static build and distribution audit pass;
- all Playwright, axe, no-JavaScript, and responsive tests pass;
- diff check is clean; and
- only intentional readiness notes or final fixes remain.

- [ ] **Step 6: Start and verify production preview**

Run:

```powershell
npm run preview -- --port 4322
```

Keep it running. Verify `http://127.0.0.1:4322/signals/` independently from the
development server.

- [ ] **Step 7: Write the readiness record**

Create `docs/verification/signal-atlas-readiness.md` with:

- branch and final commit;
- approved copy-review rows;
- focused and full command results with pass counts;
- atlas routes and destinations checked;
- accessibility, keyboard, responsive, reduced-motion, and no-JavaScript
  evidence;
- Impeccable detector result;
- development URL;
- production-preview URL;
- known limitations; and
- confirmation that no pending project or claim was promoted.

- [ ] **Step 8: Request independent code and QA review**

Use GPT-5.6 Terra medium subagents:

1. one read-only reviewer for correctness, publication safety, accessibility,
   architecture, and tests; and
2. one read-only QA reviewer for desktop/mobile/no-JavaScript/reduced-motion
   behavior.

Use at most two concurrently. Children must not spawn descendants. Fix material
findings, rerun the affected focused tests, then rerun `npm run verify`.

- [ ] **Step 9: Commit final polish and verification**

```powershell
git add src/components/signals src/pages/signals src/lib/content src/data/signalAtlas.ts src/content/signals scripts/audit-public-content.ts tests docs/evidence/signal-atlas-copy-review.md docs/verification/signal-atlas-readiness.md .impeccable/surfaces/src-pages-signals-index-astro.md
git commit -m "chore(signals): verify editorial atlas readiness"
```

- [ ] **Step 10: Final handoff**

Report:

- exact final commit;
- verification commands and pass counts;
- approved copy-review rows;
- known limitations;
- verified development URL;
- verified production-preview URL; and
- next focused surface: Systems Observatory, Work Capability Explorer, or
  dossier artifacts, without starting it automatically.

---

## Completion gate

Implementation is complete only when:

- the exact grounded Signal copy has explicit user approval;
- all four current Signal slugs remain reachable;
- one manually configured, reviewed lead dominates the first viewport;
- every public Signal has a named artifact, finding, evidence summary, evidence
  boundary, and annotated continuation;
- all atlas targets are collection-backed, public, and approved;
- invalid curated configuration blocks the build without fallback;
- guided paths render as static semantic HTML with authored transitions;
- the complete Signal collection appears in the compact field index;
- detail pages preserve the existing article experience and add compact atlas
  context;
- motion explains traversal without hiding meaning;
- no-JavaScript, reduced-motion, keyboard, axe, and responsive gates pass;
- no draft, internal, private, or unsupported material appears in output;
- the Impeccable detector has no unresolved material finding;
- independent code and QA reviewers have no unresolved material finding;
- the full repository verification passes;
- the repository is clean after the final commit; and
- both real development and production-preview URLs remain running and verified
  at handoff.

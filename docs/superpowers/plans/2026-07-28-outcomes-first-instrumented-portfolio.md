# Outcomes-first Instrumented Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public portfolio feel more authored through a restrained instrument-panel visual grammar while leading the homepage and LifeOS content with human outcomes that a hiring manager can understand immediately.

**Architecture:** Preserve Astro's static, content-owned model. Replace only the homepage hero's abstract diagram with a semantic outcomes module and extend the existing featured-card pattern with content-bearing instrument details. Update reviewed LifeOS content at its shared source so Work, case study, and résumé surfaces remain coherent; keep authority, continuity, and evidence as deeper explanatory vocabulary rather than the homepage pitch.

**Tech Stack:** Astro 6, TypeScript, MDX content collections, CSS custom properties, Vitest, Playwright, axe-core/playwright.

---

## File map

| File | Responsibility |
| --- | --- |
| `src/pages/index.astro` | Outcome-led hero, semantic outcomes module, featured-card rendering hooks, page-local instrument styling. |
| `src/styles/tokens.css` | Reusable color-token semantic comments only when the names are insufficient; no live-status tokens. |
| `src/content/projects/lifeos.mdx` | Shared public LifeOS summary, hook, labels, and case-study framing. |
| `src/content/case-studies/lifeos.mdx` | LifeOS long-form opening that explains intention, commitment, and time before continuity/recovery mechanisms. |
| `src/data/resume.ts` | Concise selected-system LifeOS summary consistent with its public project framing. |
| `tests/e2e/homepage.spec.ts` | Outcome module, credibility layer, and human-readable homepage copy contract. |
| `tests/e2e/responsive.spec.ts` | Mobile stacking, outcome-to-system mapping, focus order, and no-overflow contract. |
| `tests/e2e/accessibility.spec.ts` | Semantic/accessibility smoke for the new outcomes module and decorative markers. |

### Task 1: Characterize and update the public LifeOS narrative

**Files:**
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/routes.spec.ts`
- Modify: `src/content/projects/lifeos.mdx`
- Modify: `src/content/case-studies/lifeos.mdx`
- Modify: `src/data/resume.ts`

- [ ] **Step 1: Add failing public-copy assertions**

In `tests/e2e/homepage.spec.ts`, add an outcome assertion that expects the LifeOS outcome text and rejects the old recovery-first homepage phrase:

```ts
await expect(page.locator('[data-outcome-system="lifeos"]')).toContainText(
  'Make intentions workable in the time that is actually available.',
);
await expect(page.locator('.home-hero__summary')).not.toContainText(
  'recovering context after interruption',
);
```

In `tests/e2e/routes.spec.ts`, add focused assertions for `/work/lifeos/`,
`/case-studies/lifeos/`, and `/resume/`. Assert the public intention,
commitment, and time proposition wherever LifeOS is named. On the LifeOS case
study specifically, also assert that interruption recovery remains present as a
secondary continuity mechanism rather than disappearing from the reviewed story.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/routes.spec.ts --reporter=list`

Expected: FAIL because the current hero summary and project content still lead with interruption recovery.

- [ ] **Step 3: Update the reviewed LifeOS source content**

In `src/content/projects/lifeos.mdx`, make desired and committed activity across real time the summary and `caseStudyHook`. Replace recovery-first `artifactLabels` with three public-safe labels that describe the broader activity/time relationship. Keep the current technical differentiator, pivotal decision, evidence boundary, local-first source state, and approved visibility unchanged.

In `src/content/case-studies/lifeos.mdx`, rewrite only the opening summary and `What it solves` / `Who it helps` passages so the primary proposition is making intentions and commitments workable across available time. Preserve interruption recovery as a secondary continuity mechanism, not a removed or inflated claim.

In `src/data/resume.ts`, align the LifeOS selected-system summary to the same public proposition; do not add new employers, metrics, deployments, or capabilities.

- [ ] **Step 4: Run content and focused browser checks**

Run: `npm run audit:content; npx playwright test tests/e2e/homepage.spec.ts tests/e2e/routes.spec.ts --reporter=list`

Expected: PASS. The audit finds no unsafe public content and the homepage recognizes the corrected LifeOS framing.

- [ ] **Step 5: Commit the content unit**

```powershell
git add src/content/projects/lifeos.mdx src/content/case-studies/lifeos.mdx src/data/resume.ts tests/e2e/homepage.spec.ts tests/e2e/routes.spec.ts
git commit -m "feat: clarify LifeOS time and intention story"
```

### Task 2: Replace the hero diagram with a semantic outcomes module

**Files:**
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add failing semantic and focus-order tests**

In `tests/e2e/homepage.spec.ts`, assert one outcomes module with a heading, exactly three rows, named reviewed systems, plain-language outcomes, and no faux-live wording:

```ts
const outcomes = page.locator('[data-outcomes-module]');
await expect(outcomes.getByRole('heading', { name: 'What the work helps people do' })).toHaveCount(1);
await expect(outcomes.locator('[data-outcome-system]')).toHaveCount(3);
await expect(outcomes).toContainText(['Chief of Staff', 'LifeOS', 'Alpha Screener']);
await expect(outcomes).not.toContainText(/live|uptime|telemetry|updated \d+/i);
```

In `tests/e2e/responsive.spec.ts`, test 375px ordering: hero position and primary CTA precede the outcomes module, which precedes `#featured-systems`; assert no overflow. If rows are text-only, assert they contain no anchors and have no button/link role.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts --reporter=list`

Expected: FAIL because the hero still renders `SystemDiagram` with authority, continuity, evidence, and human-owned decisions.

- [ ] **Step 3: Implement the minimal static outcomes module**

In `src/pages/index.astro`:

- remove the homepage-only `SystemDiagram` import and `portfolioSignalMap` constant; do not modify case-study diagrams;
- add a local typed constant containing exactly three reviewed system IDs, names, outcome copy, and compact sequence labels;
- change the hero summary to describe coordinating AI-assisted work, making intentions workable across real time, and evaluating uncertain research;
- replace `.home-hero__visual` with an `<aside data-outcomes-module aria-labelledby="outcomes-heading">` whose heading, three noninteractive rows, system names, and one-sentence outcomes are all visible text;
- retain the existing primary CTA and secondary links before the module in DOM order.

Do not show progress percentages, counters, timestamps, or health language. Do not make the rows clickable in this slice.

- [ ] **Step 4: Add the outcomes-module layout**

Use existing surface, border, spacing, mono, and accent tokens. Give the module a small structural header and one compact numbered row per system. On desktop, keep it as the right-hand hero column; below the existing narrow breakpoint, it follows hero actions and precedes featured systems. Mark purely decorative row rails and sequence ornaments `aria-hidden="true"`.

- [ ] **Step 5: Run focused checks and verify GREEN**

Run: `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts --reporter=list`

Expected: PASS at 375px, 768px, 1280px, and 1536px. The outcomes are readable, noninteractive, and do not overflow.

- [ ] **Step 6: Commit the hero unit**

```powershell
git add src/pages/index.astro tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat: lead portfolio with human outcomes"
```

### Task 3: Add a restrained, reusable instrument grammar to featured work

**Files:**
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/tokens.css`

- [ ] **Step 1: Add failing featured-card assertions**

Extend the flagship test to assert each card has a visible verb/outcome hook, one decision/tradeoff field, one evidence/validation field, and a case-study link. Add assertions that no new status element uses unsupported terms such as `live`, `uptime`, `healthy`, or relative timestamps.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx playwright test tests/e2e/homepage.spec.ts --reporter=list`

Expected: FAIL because the card has legacy artifact labels/status but no outcomes-first instrumentation contract.

- [ ] **Step 3: Implement the card grammar without a dashboard simulation**

In `src/pages/index.astro`, retain the existing project-derived `pivotalDecision`, `evidenceSummary`, and case-study link. Reorganize them into a compact, text-first card sequence:

1. static sequence label and plain-language verb;
2. named system and public outcome/hook;
3. `Decision` and `Evidence` text fields;
4. direct case-study link.

Use a short three-segment visual rail only as a decorative separator; pair it with text and mark it `aria-hidden="true"`. Do not introduce a timer, animated meter, status counter, or an assertion of operational recency.

In `src/styles/tokens.css`, add comments documenting the existing semantic role of cyan, violet, green, and amber if implementation needs an explicit token contract. Do not rename tokens or add a generic dashboard palette.

- [ ] **Step 4: Verify focused behavior**

Run: `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts --reporter=list`

Expected: PASS. Every featured card remains text-complete and scannable at mobile width.

- [ ] **Step 5: Commit the featured-work unit**

```powershell
git add src/pages/index.astro src/styles/tokens.css tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat: add evidence-led portfolio instrument details"
```

### Task 4: Lock accessibility, reduced-motion, and real-browser evidence

**Files:**
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `src/pages/index.astro` only if a verified accessibility or responsive defect requires it
- Create: `docs/verification/outcomes-first-portfolio.md`

- [ ] **Step 1: Add accessibility coverage for the outcomes module**

Extend `tests/e2e/accessibility.spec.ts` to scan the homepage after the new module is present. Assert one homepage `<h1>`, a labelled outcomes region, no interactive role on text-only rows, and that decorative rails/sequence marks are omitted from the accessible name.

- [ ] **Step 2: Run the new test and verify RED or document an existing equivalent**

Run: `npx playwright test tests/e2e/accessibility.spec.ts --reporter=list`

Expected: FAIL until the module's landmarks/hidden decoration contract is implemented. If all assertions pass because the implementation already satisfies them, record that as characterization evidence in the verification note.

- [ ] **Step 3: Implement the smallest verified fix**

Correct only observed semantic, contrast, focus-order, reduced-motion, or overflow defects. Preserve the current native mobile More disclosure. Do not add a client-side framework island.

- [ ] **Step 4: Run the complete automated gate**

Run: `npm run verify; git diff --check; git status --short --branch`

Expected: all static, content, type, unit, Playwright, accessibility, no-JavaScript, and responsive checks pass; no whitespace errors; `git status` contains only intentional files changed by the verified outcomes-first UI work and no unrelated artifacts.

- [ ] **Step 5: Perform browser inspection**

Start: `npm run dev -- --port 4321`

Inspect with the collaborative preview at 1280px and 375px:

- homepage first viewport: human outcome, primary action, one credibility cue, and all three named systems are legible;
- homepage mobile: primary CTA precedes the outcomes module; outcomes precede featured systems; More navigation stays operable; no horizontal overflow;
- `/work/`, `/case-studies/lifeos/`, and `/systems/software-for-cognition/`: LifeOS is not reduced to recovery-only language;
- reduced-motion mode: no continuous instrument animation.

Stop the development server if it was started solely for this verification run.

- [ ] **Step 6: Record verification and commit**

Write `docs/verification/outcomes-first-portfolio.md` with the branch/commit, executed commands, affected routes, desktop/mobile evidence, accessibility/no-JS result, and any known limitations. Then:

```powershell
git add src/pages/index.astro src/styles/tokens.css tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts docs/verification/outcomes-first-portfolio.md
git commit -m "test: verify outcomes-first portfolio experience"
```

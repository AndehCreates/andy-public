# Signal Library Editorial Atlas readiness

Date: 2026-07-23
Branch: `codex/signal-library-editorial-atlas`
Verified implementation revision: `c13b0e977c99acf50c071033ef561631a3b29fb7`
Final readiness revision: this record is included in the final handoff commit; use the handoff SHA as the authoritative final revision.

## Approval checkpoint

The user explicitly approved all four proposed public Signal rows on
2026-07-23 before schema activation, live audit enforcement, or public entry
updates continued:

1. `evaluation-as-product-work`
2. `static-output-as-a-safety-boundary`
3. `local-first-recovery-notes`
4. `bounded-interface-experiment`

The approved wording and row-by-row review state remain recorded in
`docs/evidence/signal-atlas-copy-review.md`.

## Automated verification

Focused Atlas gate:

- `npm run build` — passed
  - Astro check: 0 errors, 0 warnings, 1 existing Zod deprecation hint
  - Vitest: 14 files, 89 tests passed
  - public-content audit: passed
  - static build: 28 pages
  - distribution audit: 28 HTML files passed
- `npx playwright test tests/e2e/signal-atlas.spec.ts tests/e2e/no-javascript.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts --reporter=list`
  — 17 tests passed
- `git diff --check` — passed

Complete repository gate:

- `npm run verify` — passed on the authoritative rerun
  - Vitest: 14 files, 89 tests passed
  - Playwright: 34 tests passed across the configured Chromium and
    Chromium-no-JavaScript projects
  - content, static-build, and distribution audits passed
- `git diff --check` — passed

The first complete-gate attempt produced one non-Signal failure in the existing
Work filter test while seven browser workers ran under unusual local load.
The affected code was unchanged by this branch, three parallel focused
reproductions passed, and the exact complete gate then passed without a code
change. This was treated as a transient `client:idle` hydration race rather
than masked with an unrelated patch.

## 2026-07-24 revalidation

The same load-sensitive Work-filter behavior was reproduced while preparing
this branch for integration:

- the first `npm run verify` completed the type check, 89 unit tests, content
  audit, 28-page build, and distribution audit, then finished with 33 of 34
  browser tests passing;
- the only failure was the unchanged Work-filter interaction not observing the
  Product engineering button's pressed state under the seven-worker run;
- `npx playwright test tests/e2e/work-filter.spec.ts --workers=1
  --repeat-each=3 --reporter=list` then passed all 12 focused checks; and
- an immediate second `npm run verify`, without a source change, passed all 89
  unit tests, all 34 browser tests, the content audit, the 28-page build, and
  the distribution audit.

This confirms the Atlas implementation and keeps the intermittent hydration
race explicit as an integration risk rather than representing every full-gate
attempt as green.

## Routes and traversal

Verified Atlas routes:

- `/signals/`
- `/signals/evaluation-as-product-work/`
- `/signals/static-output-as-a-safety-boundary/`
- `/signals/local-first-recovery-notes/`
- `/signals/bounded-interface-experiment/`

Every destination in the three authored paths was opened in the live
development browser:

- evidence path:
  `/signals/evaluation-as-product-work/` ->
  `/handbook/evaluation-driven-development/` ->
  `/case-studies/alpha-screener/`
- recovery path:
  `/signals/local-first-recovery-notes/` ->
  `/handbook/grounded-knowledge/` ->
  `/case-studies/lifeos/`
- publication-boundary path:
  `/signals/static-output-as-a-safety-boundary/` ->
  `/handbook/grounded-knowledge/` ->
  `/systems/reliable-ai-work/`

The `Evaluation is product work` detail route was also checked for its compact
Signal context, Alpha Screener continuation, Atlas return link, article body,
and absence of horizontal overflow.

## Browser, accessibility, and resilience evidence

- Desktop: inspected at an exact 1440 x 900 CSS viewport. The lead and artifact
  record begin together, the lead remains the dominant editorial element, and
  three-column paths are unclipped.
- Mobile: inspected at an exact 375 x 812 CSS viewport. The lead precedes the
  artifact record, path steps become a single column, connectors become
  vertical, and no horizontal overflow appears.
- Field index: all four reviewed Signal links remain visible and reachable.
- Accessibility: axe and semantic assertions passed; the page has one h1,
  named path regions, ordered lists, a named artifact aside, hidden decorative
  connectors, visible focus, and no conflicting duplicate link names.
- Keyboard: the focused Chromium gate proved the first path's links receive
  focus in DOM order with a visible outline. The in-app browser's low-level Tab
  bridge did not advance focus in this local session, so no unsupported manual
  keyboard claim is made.
- Reduced motion: live-browser emulation matched
  `prefers-reduced-motion: reduce`; all path content stayed visible, transforms
  were absent, and connector/item transition durations resolved to `0.01ms`.
- No JavaScript: live-browser script disabling preserved the approved h1,
  visible lead, three paths, nine internal path destinations, four field-index
  links, and a no-overflow layout.

## Impeccable and independent review

The Impeccable detector was run once during the Task 4 index review against
`src/pages/signals/index.astro` and returned `[]`. That timing was earlier than
the plan's final-review step. Because the plan also prohibits a second detector
run, it was not rerun after the detail context and resilience work. Final
manual browser QA and independent Terra-medium code/QA reviews cover the
post-detector changes; this timing deviation remains explicit rather than
being silently represented as an end-of-work scan.

Independent final code and QA review results are recorded in the final handoff.

## Running surfaces

- Development: `http://127.0.0.1:4321/signals/`
- Production preview: `http://127.0.0.1:4322/signals/`

Both URLs returned HTTP 200 with the approved lead in this task. The production
preview was also opened independently in the in-app browser and showed three
paths, four field-index entries, the reviewed detail continuation, and no
horizontal overflow.

## Publication safety and limitations

- No draft, internal, private, or pending project was promoted.
- No private checkout path, hostname, credential, customer data, or unsupported
  performance claim was added to public output.
- Publication state, source availability, and public review remain separate.
- The existing non-blocking `z.string().url()` deprecation hint in
  `src/content.config.ts` remains outside this focused change.
- The next focused portfolio surface is intentionally not started here.

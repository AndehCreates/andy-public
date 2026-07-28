# Outcomes-First Portfolio Verification

**Recorded:** 2026-07-28 (America/Denver)
**Branch:** `codex/outcomes-first-instrumented-portfolio`
**Commit at verification start:** `d2efbecfbf280de51f6873eaa74b82192b452f89`

## Scope

This record covers Task 4 verification for the outcomes-first homepage experience.

- Affected route: `/`
- Directly changed files: `tests/e2e/accessibility.spec.ts`
- Intentionally unchanged after verification: `src/pages/index.astro`, `tests/e2e/responsive.spec.ts`

The homepage markup already satisfied the new outcomes-module semantics. The Task 4 work therefore stayed at characterization coverage rather than implementation repair.

## Automated Evidence

| Command | Result |
| --- | --- |
| `npm run build:site` | Passed twice while adding and re-running the new coverage; static output generated successfully. |
| `npx playwright test tests/e2e/accessibility.spec.ts --reporter=list` | Passed; 6 tests passed after updating coverage to the current homepage semantics. |
| `npx playwright test tests/e2e/no-javascript.spec.ts --reporter=list` | Passed; 1 test passed. |
| `npx playwright test tests/e2e/responsive.spec.ts --reporter=list` | Final signal: responsive assertions are already present for mobile ordering and overflow. An isolated run returned 5 passed / 1 failed because the preview server on `http://127.0.0.1:4342/` refused the final navigation, not because of a layout assertion. |
| `npm run verify` | Passed; full gate completed with 31 Playwright tests passed. |
| `git diff --check` | Passed; no whitespace or conflict-marker issues. |
| `git status --short --branch` | Dirty only for the intended Task 4 test/doc changes before commit. |

## Homepage Accessibility Coverage Added

The updated accessibility suite now characterizes the outcomes module and adjacent decorative markers on `/`:

- exactly one homepage `h1`
- one labelled complementary landmark for the outcomes module via `What the work helps people do`
- one list with three non-interactive outcome rows
- one explicit ARIA-tree characterization for the LifeOS outcome row that exposes `LifeOS` plus `Intentions, commitments, and time integrated into a smooth resilient workflow.` while excluding the decorative `02` sequence marker
- no links or buttons inside the text-only outcome rows
- outcome sequence markers hidden from assistive technology with `aria-hidden="true"`
- featured-card rail markers hidden from assistive technology with `aria-hidden="true"`

## No-JavaScript and Responsive Evidence

- No-JavaScript coverage passed against the public reading surfaces, including the homepage route.
- Existing responsive coverage already checks the Task 4 surface for:
  - homepage mobile order with the hero position and flagship action before the outcomes module
  - outcomes module before `#featured-systems`
  - no links or buttons inside outcome rows
  - no horizontal overflow on the homepage
- The 1280px opening-frame check also verifies that every outcome line has rendered height, guarding the repaired desktop text layout.

## Manual Browser Inspection

Manual inspection ran against the rebuilt production preview on 2026-07-28.

| Route | Desktop (1280x720) | Mobile (375x812) | Result |
| --- | --- | --- | --- |
| `/` | Inspected hero hierarchy, outcome module, and opening frame. | Inspected stacked hero hierarchy and compact navigation. | Readable after correcting a zero-height outcome-line inheritance defect; no horizontal overflow. |
| `/work/` | Inspected project atlas hierarchy, filters, and featured cards. | Inspected the compact filter layout. | Readable; no horizontal overflow. |
| `/case-studies/lifeos/` | Inspected the approved workflow-first framing, evidence boundary, and system diagram. | Inspected the stacked case-study opening frame. | Readable; no horizontal overflow. |
| `/systems/software-for-cognition/` | Inspected the system-map opening hierarchy. | Inspected the narrow reading layout. | Readable; no horizontal overflow. |

The mobile `More` disclosure was opened in the production preview; it revealed the secondary `Handbook` link and did not introduce horizontal overflow.

The inspection found that outcome text inherited `line-height: 0` from the instrument module at desktop width. The homepage now sets an explicit readable line height, with a 1280px browser assertion that each outcome line has rendered height.

## Known Limitations

- The isolated `responsive.spec.ts` run showed one preview-server lifecycle failure (`ERR_CONNECTION_REFUSED` at `127.0.0.1:4342`) during the final homepage test. The same assertion passed in the authoritative `npm run verify` run, so this was recorded as environment instability rather than a confirmed responsive defect.
- `astro check` still emits one existing deprecation hint for `z.string().url()` in `src/content.config.ts`; it is non-blocking and outside Task 4 scope.
- This record does not claim manual assistive-technology validation with a screen reader or browser accessibility tree tooling beyond Playwright and axe automation.

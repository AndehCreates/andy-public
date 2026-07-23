# Repository Instructions

These instructions apply to all work in this repository.

## Read order and authority

Before implementation, read in this order:

1. `README.md` for mission and current state.
2. `docs/IMPLEMENTATION_HANDOFF.md` for the active execution boundary.
3. `docs/superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md`
   for approved product decisions.
4. `docs/superpowers/plans/2026-07-21-public-ai-systems-portfolio.md` for task
   sequence, file-level guidance, and verification.

Use this authority order when material conflicts:

1. current explicit user instruction;
2. this file for repository operating rules;
3. the approved design specification for product intent;
4. the implementation plan for execution detail;
5. current repository evidence and tests for observed behavior.

Do not silently rewrite the specification or plan while implementing it. Record
material deviations in the handoff and obtain user approval when they change
public meaning, scope, architecture, or the publication gate.

## Product and editorial guardrails

- Present Andy as a serious AI systems engineer and human-centered systems
  builder through decisions, artifacts, and working systems--not inflated titles
  or implied employment history.
- Use professional capability language. Avoid repetitive labels such as
  "proof," "stakes," or "contribution" when the evidence is already visible.
- Every public artifact must answer: what it solves, who benefits, how decisions
  were made, how it was tested, what tradeoffs remain, and what comes next.
- Use the approved case-study shape: problem, constraints, system design,
  decisions and tradeoffs, validation, value, and next steps.
- Keep the Signal Library broad enough for useful resources, homelab work, and
  adjacent technical interests without weakening the primary AI-systems story.

## Evidence and publication safety

- Evidence inventory comes before public project copy.
- Separate `publicationState`, `sourceAvailability`, and `publicReview`; one must
  never be inferred from another.
- Local-only source may support a public, sanitized narrative after explicit
  review. It does not imply that the repository itself should be published.
- Never publish secrets, tokens, credentials, private URLs, private hostnames,
  filesystem paths, personal data, customer data, or unsupported quantitative
  claims.
- Keep any local path/source registry ignored by Git. Public content may name a
  project but must not reveal its private checkout location.
- If evidence is incomplete, mark the item pending or draft. Do not fill gaps
  with plausible prose.

## Mandatory human checkpoint

Task 5 creates the sanitized evidence inventory and public-review matrix. After
Task 5, present that matrix to the user and stop. Do not begin Task 6, create
public project entries, or publish case-study claims until the user explicitly
approves the relevant items.

This is a semantic approval gate, not a test failure and not an invitation to
choose claims on the user's behalf.

## Technical boundaries

- Use the Astro 6 static-first architecture in the approved plan.
- Keep TypeScript strict and content contracts independently testable where the
  plan calls for it.
- Core routes, content, navigation, and metadata must work without client
  JavaScript. Interactive filtering is progressive enhancement.
- Preserve the dark visual direction and build from shared design tokens and
  components rather than one-off page styling.
- Do not add a CMS, database, authentication system, analytics stack, or backend
  in V1 unless the user explicitly expands scope.
- The visual companion under `.superpowers/` is reference material only. Do not
  ship it as the application or treat its URL as the portfolio dev server.

## Execution and subagent rules

- Work in the implementation plan's dependency order.
- Use at most two child agents concurrently.
- Children must not spawn descendants.
- Give each child a bounded task, owned files or responsibility, relevant plan
  excerpts, and required verification evidence.
- Workers are not alone in the codebase: they must preserve unrelated changes,
  avoid reverting others, and adapt to concurrent work.
- The orchestrator owns integration, authoritative verification, commits, and
  the human checkpoint.
- Wait for every requested worker to reach a terminal state and collect its
  result before ending the task.

## Verification and handoff

- Inspect existing tests before changing behavior and use proof-first or
  characterization-first work where practical.
- Run the narrowest relevant checks after each unit, then the complete gates in
  the plan before claiming completion.
- Browser-check public surfaces at desktop and mobile sizes, with and without
  JavaScript where specified.
- A build alone is not a runtime handoff. Start the real dev server and the
  production preview, smoke-test both, and report their exact URLs.
- Never claim a server is available unless it is still running and the reported
  URL was verified in the current task.

## Git discipline

- Preserve user changes and keep unrelated work out of commits.
- Do not commit secrets, local evidence-source maps, build output, dependency
  directories, or companion artifacts.
- Use focused conventional commits after meaningful verified units.
- Do not push, open a pull request, or merge unless the user requests that
  lifecycle explicitly.

## Code Review Rules

### Public evidence boundaries

- Flag any public route, metadata, relationship, generated artifact, or
  source-link change that exposes a private path, host, credential, personal
  data, draft/internal content, or an unsupported claim. The safe path is to
  keep the item pending or remove the unsafe public reference.

### Publication-state integrity

- Flag behavior that infers `publicationState`, `sourceAvailability`, or
  `publicReview` from another field. These states are independent; public
  selectors and generated routes must use the explicit approved state.

### Static and accessible delivery

- Flag new portfolio content that depends on client JavaScript for core
  navigation, reading, relationship paths, or source disclosures. The safe
  path is semantic static HTML with progressive enhancement only.

### Pull request review loop

- Before merge, request a Codex review for the current head commit with the
  exact PR comment `@codex review`. Wait for the eyes reaction and review on
  that commit, address findings, and repeat after every substantive new commit.
- Do not treat a review on an earlier commit SHA as coverage for the current
  pull request head.

# Public Portfolio Implementation Handoff

## Objective

Build the approved V1 public portfolio as an evidence-led, dark, static-first
Astro site that communicates how Andy thinks about and builds reliable software
and AI systems that strengthen human capability.

## Repository snapshot

- Repository: `D:\coding\andy-public`
- Branch at handoff preparation: `main`
- State before this handoff: clean, documentation-only repository
- Application status: not scaffolded
- Real dev server status: not available yet
- Approved design: `docs/superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md`
- Executable plan: `docs/superpowers/plans/2026-07-21-public-ai-systems-portfolio.md`

Do not mistake the ignored `.superpowers/` visual companion or its historical
port for the product. Task 1 creates the actual application and its scripts.

## Execution brief

Use the executable plan as the task authority. Start at Task 1 and implement in
dependency order.

The first uninterrupted execution boundary is:

1. scaffold and verify the Astro application;
2. implement publication, taxonomy, and sanitization contracts;
3. define typed content collections and build audits;
4. build the dark design system and shared shell;
5. inspect the managed project repositories and produce sanitized evidence
   inventories plus `docs/evidence/public-review.md`.

Then present the public-review matrix to the user and **stop before Task 6**.
There is no autonomous fallback for that checkpoint. Do not publish project
copy, flagship case studies, or inferred claims while approval is pending.

After explicit approval, continue Tasks 6-14 through the complete runtime and
browser handoff.

## Managed evidence scope

The initial source inventory is defined in the approved specification and
includes Chief of Staff, LifeOS, MathPad, Arcade, Alpha Screener, ADHD Tabs,
Creative Suite, Android Lab, and the Japanese anime-inspired learning app.

The local checkout paths belong only in an ignored source map. Public artifacts
may include a sanitized project name and approved narrative, but never the
private local path. JARVIS, andeh.tech, and intouch are out of the managed V1
portfolio unless the user explicitly changes scope.

## Orchestration contract

- Root implementation model: GPT-5.6 Terra.
- Child implementation/review model: GPT-5.6 Terra at medium reasoning.
- Use no more than two child agents concurrently.
- Child agents must not spawn descendants.
- Prefer bounded units with clear file ownership and verification expectations.
- Serialize work that shares content contracts, configuration, lockfiles, the
  browser session, or the dev-server port.
- The root task reviews actual diffs, runs authoritative checks, integrates and
  commits work, and owns the user checkpoint.
- Preserve the plan body as an approved decision artifact; track progress in the
  task plan, commits, tests, and this handoff if a material deviation occurs.

## Required quality evidence

For each behavior-bearing unit, record:

- existing tests inspected;
- test or characterization added or strengthened;
- the observed pre-implementation failure or baseline when applicable;
- focused verification commands and results;
- any deliberate no-test exception and its replacement evidence.

Before the V1 is called complete, satisfy the implementation plan's full gate:
content audits, checks, tests, build, generated-output audit, browser coverage,
accessibility, responsive inspection, no-JavaScript behavior, and smoke-tested
development and production-preview servers.

## Runtime handoff contract

When a server first becomes available, report the exact verified development URL
to the user. At final handoff, keep both the real development server and the
production-preview server running, verify that each serves the expected site,
and report both URLs. Never substitute the companion URL.

## Completion shape

The implementation task should return one of two truthful outcomes:

- **Awaiting publication approval:** Tasks 1-5 are verified, the review matrix
  is ready, and execution has stopped before Task 6; or
- **V1 complete:** the user approved the review matrix, Tasks 6-14 are verified,
  all quality gates pass, and working dev/preview URLs are handed off.

Anything between those outcomes should be reported as active work or a concrete
blocker, not as completion.

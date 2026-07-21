# Chief of Staff

## Public framing

Pending review: a thin, Codex-oriented control plane for coordinating durable software work across projects and workers without taking ownership away from the systems that already govern runtime, memory, or source code.

## Authoritative sources inspected

- Project ID: `project-chief-of-staff`; source availability is local-only under the portfolio source policy.
- Observed repository commit: `884ecb0` (`docs: plan chief of staff skills and rotation`, 2026-07-20).
- `README.md`, `AGENTS.md`, `2026-07-19-chief-of-staff-design.md`, and `2026-07-20-chief-of-staff-human-resolution-flywheel-design.md`.
- Primary implementation surfaces: `cli.py`, `state_machine.py`, and `repo_guards.py`.
- Sanitized fixtures and module tests under `tests/fixtures` and `src/chief_of_staff`.

## Verified capabilities

- Validates typed project, host, and work-lifecycle fixtures without contacting live infrastructure.
- Reconciles work through explicit lifecycle states, including admission, lease, execution, verification, human review, and handoff states.
- Produces diagnostic-only dry-run projections for normal completion, stale leases, waiting-for-human decisions, recovery, and handoff-pending work.
- Evaluates repository mutation eligibility through identity, branch/worktree, dirty-state, merge/rebase, lease, and idempotency checks.

## Verified system decisions

- The system is intentionally a control-plane layer, not a replacement runtime registry, scheduler, memory system, governance system, or source-of-truth repository.
- Runtime admission and leases remain with the runtime authority; durable memory and handoffs remain with the memory authority; project repositories retain code and release truth.
- A worker-reported result is not independent verification. Completion is gated by the declared verification evidence.
- Uncertain, stale, blocked, and handoff-pending work remains recoverable rather than being deleted automatically.

## Validation evidence

- `python -m chief_of_staff.cli validate-fixtures` reported three valid hosts and nine valid projects.
- `python -m chief_of_staff.cli dry-run-canary` accepted the fixture normal path and rejected the stale lease epoch without mutation.
- `python -m chief_of_staff.cli dry-run-flywheel` exercised executable, human-waiting, recovery, handoff-pending, and approval-pending projections without mutation.
- `python -m chief_of_staff.cli validate-sdlc-contract` reported the full lifecycle fixture ready with no blockers.
- `python -m pytest -q` passed 104 tests; the only warning was an environment permission warning while writing the test cache.

## Human or customer value

Pending review: the design aims to make long-running, multi-project AI-assisted work more legible and recoverable by preserving clear ownership, explicit verification, and human decisions at consequential boundaries.

## Known limitations

- Current verification is fixture-based and offline; it does not prove live runtime, worker, memory, or repository integration.
- A prepared live-admission boundary requires explicit operator acknowledgement and is not evidence that a live lease or worker execution occurred.
- The observed checkout contains uncommitted review artifacts, so this inventory is an observation of the current implementation rather than a release attestation.
- The portfolio source policy classifies this project as local-only; no public repository link is authorized for publication from this inventory.

## Public-safe diagrams and media

- A simplified authority-boundary diagram may show governance, durable context, coordination, runtime admission, workers, and project repositories as separate responsibilities.
- A lifecycle diagram may show `observe → classify → decide → request → lease → execute → verify → record → reconcile`, including human-review and stale-recovery branches.
- Do not depict host topology, local locations, live service endpoints, keys, or operational logs.

## Claims not currently supported

- That the system operates a live multi-host fleet or has completed live admission, execution, release, or handoff cycles.
- Quantified reliability, throughput, autonomy, cost, customer, or business-impact claims.
- Any claim that it replaces the runtime, memory, governance, or repository authorities named in the design.

## Candidate project and case-study copy

Pending public review: “Chief of Staff is a deliberately thin coordination layer for AI-assisted software work. It uses typed lifecycle contracts, idempotency, repository guards, and independent verification gates to keep progress observable while preserving human control and existing system ownership. The current implementation is verified with deterministic fixtures and offline tests; live integrations remain an explicit next validation step.”

## Review date and public-review decision

Reviewed 2026-07-21. `publicationState: draft`; `sourceAvailability: local-only`; `publicReview: pending`.

# Second Brain evidence inventory

## Public framing

Candidate framing: a durable context layer for preserving session continuity and
recoverable handoffs across meaningful work. It is not presented as an agent
runtime, a governance authority, or a source-code repository.

## Authoritative sources inspected

- Local-only MetaBrain repository at observed commit `fa5f8b9`.
- `README.md` and package-script declarations in that repository.
- Contract test entrypoint `test/metabrain-contract.test.mjs`.
- Recent commits covering cycle status, board state, launcher preflight, and
  evidence directories.
- Current Git state, which had unrelated working-tree changes at inspection.

## Verified capabilities

- Defines a contract-test entrypoint for the observed durable-context workflow.
- Provides explicit contract-loop preflight and smoke commands alongside the
  contract test.
- Exposes a latest-cycle status command, including a machine-readable mode.
- Maintains session-board and handoff-oriented artifacts in the observed
  repository structure.

## Verified system decisions

- Durable session context and human-readable handoffs are treated as a distinct
  responsibility from runtime admission and source-code truth.
- Contract preflight, smoke, and test commands are separate surfaces rather
  than an implied live-runtime guarantee.
- Cycle status is an operator-facing observation surface, not evidence of
  autonomous execution.

## Validation evidence

- The observed package scripts expose `contract:test`, `contract:smoke`, and
  `contract:preflight` commands.
- The inspected test entrypoint provides a repository-owned contract boundary.
- This inventory did not run live writes, remote-host checks, or browser flows.

## Human or customer value

For a person returning to interrupted work, durable context and recoverable
handoffs can make prior decisions and the next useful action easier to recover.

## Known limitations

- The source is local-only, has no authorized public remote, and had unrelated
  working-tree changes at inspection.
- This review does not establish availability, retention, privacy, multi-user
  behavior, or production reliability.
- A direct durable-write verification was not performed in this inventory.

## Public-safe diagrams and media

- A conceptual layer labelled "durable context and recoverable handoffs" may be
  used in a reviewed systems diagram.
- No screenshots, source links, vault material, or operational records are
  approved.

## Claims not currently supported

- Autonomous memory, production reliability, privacy guarantees, or quantified
  productivity outcomes.
- Live runtime, remote-host, or durable-write success claims.
- Any claim that it governs consequential work, admits runtime work, or owns
  project-repository truth.

## Approved public project framing

Second Brain may be presented as a durable context layer that preserves session
continuity and recoverable handoffs. Public copy may describe the observed
contract, preflight, smoke, latest-cycle, session-board, and handoff surfaces.
It must keep live writes, remote-host behavior, retention, privacy, and
production reliability outside the established evidence boundary.

## Review date and public-review decision

- Review date: 2026-07-24.
- `publicationState`: featured.
- `sourceAvailability`: local-only.
- `publicReview`: approved by the user for the evidence-bounded project route.
- Source links, screenshots, vault material, operational records, and broader
  claims remain unauthorized.

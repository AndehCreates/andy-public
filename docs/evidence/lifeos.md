# LifeOS

## Public framing

Pending review: a local-first product system for externalizing work, time, context, transitions, and recovery so people can manage daily life with less dependence on fragile working memory.

## Authoritative sources inspected

- Project ID: `project-lifeos`; observed public remote: `https://github.com/AndehCreates/LifeOS`.
- Observed repository commit: `b9bb4f0` (`fix(test): isolate bridge fetches in unit tests`, 2026-08-12).
- `README.md`, current package scripts, current test surfaces, and the merged PR #82 validation record.
- Primary implementation surfaces: `main.tsx`, `App.tsx`, `store.ts`, `schemas.ts`, `src/tests/setup.ts`, and `src/tests/bridgeTestIsolation.test.ts`.
- Current `main` history through the merged test-isolation change; no private checkout paths are included here.

## Verified capabilities

- Provides a React application with durable task, commitment, project, plan, people, routine, journal, and activity data contracts.
- Supports workflow-state and time-aware planning concepts alongside focus, capture, transition, and re-entry-oriented flows.
- Uses schema validation for application state and explicit contracts for user-confirmed adjustments and human interventions.
- Includes local-first persistence and synchronization architecture through existing state, Dexie, and Yjs surfaces.
- Isolates fire-and-forget bridge captures in ordinary tests and rejects unexpected HTTP; live observability smoke uses an explicit native-fetch opt-in.

## Verified system decisions

- The architecture-deepening design preserves the existing state and sync model instead of creating a replacement orchestrator or persistence system.
- Domain behavior is intended to live behind domain-named interfaces, with UI and Brain callers using shared product contracts.
- High-consequence or ambiguous automation is represented as an intervention that requires user confirmation, with a safe timeout disposition.
- The product direction emphasizes continuity, interruption recovery, reduced remembering/sequencing burden, and shame-free re-entry rather than a generic task-list model.

## Validation evidence

- `npm run workspace:doctor` completed successfully on the inspected branch.
- `npm run lint` completed successfully with `tsc --noEmit`.
- `npm test` passed with 186 files passed, 1 skipped; 1,798 tests passed, 7 skipped.
- `npm run build` passed; the existing large-bundle warning remains.
- Current-worktree development/proxy and production-preview smoke checks passed for the app root, bridge state, read-only `/brain/exec`, built assets, and WebSocket path.
- The opt-in observability smoke reached native HTTP but was environment-limited by unavailable MCP/provider services and the separate `/hermes/api/health` gateway route; no readiness or production claim is made from it.

## Human or customer value

Pending review: LifeOS is designed to lower the cognitive cost of planning and returning to work by making context, time, next actions, and recovery paths visible rather than relying on memory alone.

## Known limitations

- The inspected repository is a single-page application; this inventory does not establish production deployment, cross-device reliability, or accessibility outcomes.
- Runtime smoke covered app, proxy, preview, and WebSocket paths, but this inventory does not establish production deployment, cross-device reliability, or accessibility outcomes.
- Local persistence and synchronization introduce durability and conflict-handling concerns that require continued scenario-based validation.

## Public-safe diagrams and media

- A cognitive-continuity diagram may show capture, workflow state, time/commitments, focus, interruption, and recovery converging on a user-owned next action.
- A system diagram may show UI callers, domain modules, local persistence, and synchronization as distinct layers without exposing network topology.
- Suitable media should use synthetic or fully sanitized sample data; do not show personal tasks, contacts, journals, or real schedules.

## Claims not currently supported

- Clinical outcomes, accessibility certification, productivity gains, or claims that the product treats any condition.
- Scale, retention, customer adoption, or reliability metrics.
- That all documented user flows, sync paths, or integrations are production-ready.

## Candidate project and case-study copy

Pending public review: “LifeOS explores software as external executive support: a local-first workspace that makes work state, commitments, context, and recovery visible. Its architecture favors explicit domain contracts, user-confirmed consequential actions, and continuity after interruption. The current codebase has typed state contracts and a verified type check; broader scenario and accessibility validation remain next steps.”

## Review date and public-review decision

Previous review record: 2026-07-21. Current refresh: `publicationState: draft`; `sourceAvailability: public`; `publicReview: pending refreshed user approval` against `b9bb4f0`. The repository link and candidate framing remain reviewable but are not authorized for promotion by this refresh alone.

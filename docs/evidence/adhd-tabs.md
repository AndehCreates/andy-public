# ADHD Tabs evidence inventory

## Public framing

Browser-based cognitive tool for reducing the decision cost of accumulated tabs while keeping handling choices explicit and reversible.

## Authoritative sources inspected

- Local-only project at observed commit `60b897b` on `main`; no public repository remote was observed.
- `manifest.json`, intent-aware queue design, extension source layout, test layout, and recent commit history.

## Verified capabilities

- Browser extension surface includes a popup, options page, new-tab override, background service worker, archive command, and local storage integration.
- Current design defines a resumable review queue with leave-open, defer, close, and archive actions.
- The design preserves tab occurrences rather than reducing identity to a URL and requires explicit duplicate handling.

## Verified system decisions

- Intent guidance is separated from authorization: recommendations never silently close or archive a tab.
- Queue lifecycle state, batch state, and resume state have distinct persistence responsibilities.
- Conservative reconciliation escalates ambiguous browser-tab matches to user review rather than risking wrong reattachment.

## Validation evidence

- Source tree includes focused tests for UI logic and queue/archive storage behavior.
- The design states scenario-based dogfood gates for recommendation quality, recovery, and archive retrieval; those gates are not yet recorded as passed.

## Human or customer value

- Can help people return to active work and reduce tab-management friction without treating stale material as disposable by default.

## Known limitations

- The project is local-only and contains uncommitted implementation and planning work, so only reviewed, sanitized narrative could be considered later.
- The current evidence does not establish completion of the proposed dogfood validation milestones.

## Public-safe diagrams and media

- A sanitized diagram may show: browser signals -> conservative queue preparation -> explicit user decision -> reversible archive or resumed work.
- No existing extension capture is approved for public use.

## Claims not currently supported

- Clinical efficacy, diagnosis, or universal ADHD benefit claims.
- Validated recommendation accuracy, user-retention, or productivity metrics.

## Candidate project and case-study copy

Draft only: “ADHD Tabs explores a browser workflow that prepares small, resumable tab-review decisions while leaving close and archive actions under human control.”

## Review date and public-review decision

- Review date: 2026-07-21.
- `publicationState`: pending.
- `sourceAvailability`: local-only.
- `publicReview`: pending user approval; no public route, source link, or project entry is authorized.

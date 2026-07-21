# Documentation Index

This directory holds the durable product, execution, and evidence record for the
public portfolio.

## Active documents

| Document | Status | Purpose |
| --- | --- | --- |
| [`superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md`](superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md) | Approved | Mission, positioning, information architecture, content model, visual direction, quality bar, and V1 boundaries |
| [`superpowers/plans/2026-07-21-public-ai-systems-portfolio.md`](superpowers/plans/2026-07-21-public-ai-systems-portfolio.md) | Approved and executable | Ordered implementation tasks, file map, test strategy, human checkpoint, and runtime handoff |
| [`IMPLEMENTATION_HANDOFF.md`](IMPLEMENTATION_HANDOFF.md) | Active | Current repository state and instructions for the next implementation task |

Repository-wide operating rules live in [`../AGENTS.md`](../AGENTS.md). The
mission and concise orientation live in [`../README.md`](../README.md).

## Planned durable records

The implementation plan will add these records as work progresses:

- `docs/evidence/*.md` -- sanitized project evidence inventories;
- `docs/evidence/public-review.md` -- the user-approved publication matrix;
- `docs/evidence/source-map.local.*` -- ignored local source locations;
- typed public content under `src/content/` after approval;
- automated public-content and generated-output audit results through the
  repository's verification scripts.

Evidence documents are factual inputs, not marketing drafts. Public content may
be derived from them only after the Task 5 review gate is satisfied.

## Status vocabulary

- **Approved** means the user accepted the direction or execution contract.
- **Verified** means a claim is supported by inspected repository or runtime
  evidence.
- **Public-reviewed** means the user approved that verified material for public
  use.
- **Published** means it is included in generated site output.

These states are deliberately separate. Approval of the design does not verify
a project claim, and a verified claim is not automatically safe to publish.

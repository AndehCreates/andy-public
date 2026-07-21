# Alpha Screener

## Public framing

Pending review: a research-oriented market opportunity workstation that organizes deterministic signals, uncertainty, and evidence views to help a user decide what to inspect next.

## Authoritative sources inspected

- Project ID: `project-alpha-screener`; observed public remote: `https://github.com/AndehCreates/alpha-screener`.
- Observed repository commit: `787aaef` (`feat(alpha): preserve evidence-factory research boundary`, 2026-07-20).
- `README.md`, `2026-04-01-omni-gate-architecture-design.md`, `2026-06-02-outcome-first-alpha-lab-design.md`, and `docs/evaluation/README.md`.
- Primary implementation surfaces: `App.tsx`, `server.ts`, `tradeReadinessGates.ts`, and `uncertaintyGate.ts`.
- Focused tests for uncertainty, pre-trade bundles, and signal-trust registry behavior.

## Verified capabilities

- Ranks and compares candidate symbols using deterministic scoring, signal context, and a workspace for chart, options, and exposure-oriented evidence views.
- Separates measured, derived, and proxy signals and makes data quality and confidence part of the decision surface.
- Suppresses advisory regime context for invalid trust, low confidence, market-stress conditions, or an explicit user preference.
- Builds research rows from historical outcomes with explicit anchor-date rules intended to prevent lookahead leakage and preserve options feasibility as metadata rather than proof.
- Uses pre-trade and uncertainty gates that block promotion on insufficient data, non-positive results, invalid readiness alignment, or missing required evidence.

## Verified system decisions

- Deterministic scoring remains available independently of optional advisory context.
- The discovery path labels proxy-versus-full analysis differences rather than presenting proxy signals as equivalent to complete analysis.
- Outcome research separates exploratory, candidate, and proof-ready research states; it does not promote a result directly to trade readiness.
- The platform is explicitly positioned as a decision aid with human review, not an automated trading system.

## Validation evidence

- `npx tsx --test src/lib/uncertaintyGate.test.ts src/lib/preTradeBundle.test.ts src/lib/signalTrustRegistry.test.ts` passed 16 focused tests.
- The focused tests covered insufficient-sample blocking, positive lower-bound promotion, non-positive-edge rejection, readiness alignment, cost-eliminated candidates, and signal-promotion guardrails.
- Source inspection confirmed server-side validation, cache-aware data retrieval, and explicit read-only research and evidence-gating modules.

## Human or customer value

Pending review: Alpha Screener aims to reduce decision overload by showing a ranked starting point, the evidence to inspect next, uncertainty signals, and clear invalidation context instead of presenting opaque recommendations.

## Known limitations

- Market data may be incomplete, stale, provider-dependent, derived, or proxy-based; options and exposure calculations are not vendor-certified models.
- AI narration is optional and falls back to deterministic explanation when unavailable.
- Historical research is not a live-trading result, and trade-readiness gates can remain blocked even when exploratory research is promising.
- This inventory did not run live-provider checks, execute a full historical study, or verify a production deployment.

## Public-safe diagrams and media

- A decision-aid flow diagram may show data inputs flowing through validation and deterministic scoring into ranked opportunities, a decision summary, evidence tabs, and a human decision.
- A confidence diagram may distinguish measured, derived, and proxy inputs, plus advisory-suppression gates.
- Use generated or delayed/sanitized examples only; do not show account state, credentials, real-time positions, orders, or personalized watchlists.

## Claims not currently supported

- Profitability, tradability, investment performance, investment advice, or live-order execution claims.
- Claims that a signal is production-ready solely because it appears in research output.
- Accuracy, win-rate, return, customer, or operational-scale metrics.

## Candidate project and case-study copy

Pending public review: “Alpha Screener is a research and decision-support workspace for examining market opportunities with visible confidence and uncertainty. It keeps deterministic scoring separate from optional advisory context, labels proxy signals honestly, and uses explicit evidence gates to prevent exploratory findings from being presented as trade-ready. Focused tests currently verify core uncertainty, readiness, and signal-trust rules; live-data and outcome-study validation remain bounded next steps.”

## Review date and public-review decision

Reviewed 2026-07-21. `publicationState: draft`; `sourceAvailability: public`; `publicReview: pending`.

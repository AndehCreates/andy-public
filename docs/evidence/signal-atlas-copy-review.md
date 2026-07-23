# Signal Library Editorial Atlas: copy-review matrix

**Status:** approved for activation on 2026-07-23. The four current live entries
remain `publicReview: approved`; the approved replacement copy below is now the
authorized activation source.

This matrix records the user approval that permits atomic content, schema, and
audit activation. It does not change the existing `publicReview: approved`
authority of any live Signal record.

## Overview

| Stable slug | Proposed public title / research question | Reviewed evidence anchor | Proposed continuation |
| --- | --- | --- | --- |
| `evaluation-as-product-work` | Evaluation is product work / What should a ranking prove before a person acts? | Alpha Screener uncertainty and readiness gates; focused tests | `caseStudies:case-study-alpha-screener` |
| `local-first-recovery-notes` | Local-first recovery notes / What state must survive an interruption? | LifeOS application-state, adjustment, and intervention contracts | `caseStudies:case-study-lifeos` |
| `static-output-as-a-safety-boundary` | Static output as a safety boundary / Where does private state stop and public output begin? | Portfolio build pipeline and rendered-output audit | `handbook:grounded-knowledge` |
| `bounded-interface-experiment` | Bounded interface experiment / Who is allowed to declare work complete? | Chief of Staff lifecycle fixtures and independent-verification gate | `caseStudies:case-study-chief-of-staff` |

## `evaluation-as-product-work`

- **Stable slug / authored ID:** `evaluation-as-product-work` (retain unchanged).
- **Current live `publicReview`:** `approved` (unchanged)
- **Proposed replacement-copy review:** `approved by user` (2026-07-23)
- **Proposed public title:** `Evaluation is product work`
- **Proposed `researchQuestion`:** `What should a ranking prove before a person acts?`
- **Proposed `artifactLabel`:** `Uncertainty and readiness gates`
- **Proposed `artifactType`:** `implementation`
- **Proposed `finding`:** `A ranking remains a decision aid when deterministic scoring is paired with explicit uncertainty and readiness gates instead of being presented as a conclusion.`
- **Proposed `evidenceSummary`:** `Source inspection found deterministic scoring, uncertainty and pre-trade gates; 16 focused tests covered insufficient-sample blocking, non-positive-edge rejection, readiness alignment, and signal-promotion guardrails.`
- **Proposed `evidenceBoundary`:** `This evidence does not establish profitability, trading performance, investment advice, live execution, or a production-ready signal.`
- **Proposed `readingMinutes`:** `3`
- **Proposed `sourceContext`:** `Alpha Screener research workspace`
- **Proposed `continueTo.targetId`:** `caseStudies:case-study-alpha-screener`
- **Proposed `continueTo.annotation`:** `Continue to see how deterministic scoring, uncertainty, and human review are kept distinct in the broader decision-support workspace.`
- **Exact evidence-document support:** `docs/evidence/alpha-screener.md` - **Authoritative sources inspected** supports the inspected gate modules and focused tests; **Verified capabilities** supports deterministic scoring, uncertainty, and pre-trade gates; **Verified system decisions** supports decision-aid framing; **Validation evidence** supports the exact 16-test count and coverage; **Claims not currently supported** supports the boundary.
- **Prohibited / unsupported claims:** profitability, trading performance, investment advice, live-order execution, live-data validation, a production-ready signal, accuracy, win rate, return, customer, or operational-scale metrics.
- **Exact proposed body-copy replacement:**

  > A ranking is only a useful starting point if a person can inspect what supports it and what blocks it. In Alpha Screener, deterministic scoring stays separate from uncertainty and readiness gates, so missing evidence or unresolved conditions can remain visible instead of being smoothed into a recommendation.
  >
  > The reviewed source includes focused tests for insufficient-sample blocking, non-positive-edge rejection, readiness alignment, and signal-promotion guardrails. That establishes a bounded decision-aid pattern, not profitability, advice, or live execution. Continue to the Alpha Screener case study for the wider workspace and its remaining validation boundaries.

## `local-first-recovery-notes`

- **Stable slug / authored ID:** `local-first-recovery-notes` (retain unchanged).
- **Current live `publicReview`:** `approved` (unchanged)
- **Proposed replacement-copy review:** `approved by user` (2026-07-23)
- **Proposed public title:** `Local-first recovery notes`
- **Proposed `researchQuestion`:** `What state must survive an interruption?`
- **Proposed `artifactLabel`:** `Application-state, adjustment, and intervention contracts`
- **Proposed `artifactType`:** `source`
- **Proposed `finding`:** `Interruption recovery becomes inspectable when application state, user-confirmed adjustments, and human interventions are represented as typed contracts.`
- **Proposed `evidenceSummary`:** `Source inspection confirmed typed schemas for application state, adjustment proposals, delegated policies, human interventions, and planning artifacts; the inspected commit also completed a TypeScript type check.`
- **Proposed `evidenceBoundary`:** `This evidence does not establish clinical, productivity, accessibility, reliability, cross-device, or production-ready synchronization outcomes.`
- **Proposed `readingMinutes`:** `3`
- **Proposed `sourceContext`:** `LifeOS application architecture`
- **Proposed `continueTo.targetId`:** `caseStudies:case-study-lifeos`
- **Proposed `continueTo.annotation`:** `Continue to see how typed state and user-confirmed interventions support continuity without claiming that every recovery or sync path is complete.`
- **Exact evidence-document support:** `docs/evidence/lifeos.md` - **Authoritative sources inspected** supports the inspected application and schema surfaces; **Verified capabilities** supports schema validation and explicit adjustment/intervention contracts; **Verified system decisions** supports user confirmation and safe timeout disposition; **Validation evidence** supports the type check and source inspection; **Known limitations** and **Claims not currently supported** support the boundary.
- **Prohibited / unsupported claims:** clinical outcomes, productivity gains, accessibility certification, reliability or retention metrics, production deployment, all user flows or sync paths being production-ready, and cross-device reliability.
- **Exact proposed body-copy replacement:**

  > An interruption should not force a person to reconstruct the whole system from memory. LifeOS makes the state around work, adjustment proposals, and human interventions explicit in typed contracts, so consequential changes can be inspected and confirmed rather than disappearing into interface behavior.
  >
  > The reviewed source confirms those contracts through source inspection and a TypeScript type check. It does not establish recovery, accessibility, productivity, or synchronization outcomes. Continue to the LifeOS case study for the architecture and the scenario validation still to do.

## `static-output-as-a-safety-boundary`

- **Stable slug / authored ID:** `static-output-as-a-safety-boundary` (retain unchanged).
- **Current live `publicReview`:** `approved` (unchanged)
- **Proposed replacement-copy review:** `approved by user` (2026-07-23)
- **Proposed public title:** `Static output as a safety boundary`
- **Proposed `researchQuestion`:** `Where does private state stop and public output begin?`
- **Proposed `artifactLabel`:** `Static build pipeline and rendered-output audit`
- **Proposed `artifactType`:** `test`
- **Proposed `finding`:** `A static build creates a reviewable public artifact when content checks and rendered-output audits inspect what will be served.`
- **Proposed `evidenceSummary`:** `The portfolio package scripts run type checks, tests, a public-content audit, a static build, and a rendered-output audit; the V1 readiness record documents a passing static build and rendered-output audit.`
- **Proposed `evidenceBoundary`:** `Static output does not establish public deployment and does not remove the need for editorial review or security review.`
- **Proposed `readingMinutes`:** `2`
- **Proposed `sourceContext`:** `Andy Public Portfolio build and verification record`
- **Proposed `continueTo.targetId`:** `handbook:grounded-knowledge`
- **Proposed `continueTo.annotation`:** `Continue to the grounded-knowledge principle for the editorial discipline that keeps reviewed evidence separate from unreviewed context.`
- **Exact evidence-document support:** `package.json` - **scripts** supports the named build, content-audit, and distribution-audit steps. `docs/verification/v1-readiness.md` - **Automated quality gate** supports the passing static build and rendered-output audit; **Publication and sanitization evidence** supports inspection of rendered static HTML; **Result** and **Final checks and known limitations** support the no-deployment and continuing-review boundary.
- **Prohibited / unsupported claims:** public deployment, a configured or verified public host/domain, elimination of editorial review, elimination of security risk, or a guarantee that private state can never leak.
- **Exact proposed body-copy replacement:**

  > A public site is easier to review when its rendered output is a deliberate artifact rather than an accidental view into runtime state. This portfolio's build pipeline checks content, builds static pages, and audits the rendered output before it is treated as a release candidate.
  >
  > The V1 readiness record documents a passing static build and rendered-output audit. That evidence supports a reviewable output boundary, not public deployment or the claim that static delivery replaces editorial and security review. Continue to Grounded knowledge for the practice of keeping evidence and context distinct.

## `bounded-interface-experiment`

- **Stable slug / authored ID:** `bounded-interface-experiment` (retain unchanged).
- **Current live `publicReview`:** `approved` (unchanged)
- **Proposed replacement-copy review:** `approved by user` (2026-07-23)
- **Proposed public title:** `Bounded interface experiment`
- **Proposed `researchQuestion`:** `Who is allowed to declare work complete?`
- **Proposed `artifactLabel`:** `Lifecycle fixtures and independent-verification gate`
- **Proposed `artifactType`:** `test`
- **Proposed `finding`:** `Completion remains accountable when lifecycle fixtures distinguish a worker-reported result from independently declared verification evidence.`
- **Proposed `evidenceSummary`:** `Offline lifecycle fixtures exercised completion, stale-lease, human-waiting, recovery, handoff-pending, and approval-pending states; the reviewed suite passed 104 tests.`
- **Proposed `evidenceBoundary`:** `This evidence is fixture-based and offline; it does not establish live fleet operation, integration, autonomy, or business-scale outcomes.`
- **Proposed `readingMinutes`:** `3`
- **Proposed `sourceContext`:** `Chief of Staff coordination lifecycle`
- **Proposed `continueTo.targetId`:** `caseStudies:case-study-chief-of-staff`
- **Proposed `continueTo.annotation`:** `Continue to see how lifecycle states, repository guards, and independent verification preserve human control at completion boundaries.`
- **Exact evidence-document support:** `docs/evidence/chief-of-staff.md` - **Authoritative sources inspected** supports lifecycle fixtures; **Verified capabilities** supports explicit lifecycle and diagnostic-only projections; **Verified system decisions** supports the independent-verification gate; **Validation evidence** supports the named offline states and exact 104-test result; **Known limitations** and **Claims not currently supported** support the boundary.
- **Prohibited / unsupported claims:** live multi-host or fleet operation, live runtime/worker/memory/repository integration, autonomous execution, released handoff cycles, reliability, throughput, cost, customer, or business-impact metrics.
- **Exact proposed body-copy replacement:**

  > Completion should be a verifiable state, not a worker's self-report. Chief of Staff models admission, execution, verification, human review, recovery, and handoff as explicit lifecycle states, with declared verification evidence required before work is treated as complete.
  >
  > The reviewed offline fixtures cover normal completion, stale leases, human waiting, recovery, handoff-pending, and approval-pending states, and the reviewed suite passed 104 tests. This does not establish a live fleet or integration. Continue to the Chief of Staff case study for the authority boundaries and next validation step.

# Chief-managed portfolio reconciliation

**Observed:** 2026-08-11 (America/Denver)
**Scope:** Chief's current managed-project registry versus the current Andy
Public portfolio and its repository-owned evidence/review contracts.

## Authority and freshness

- Current Chief authority was read from remote `main` at
  `b0cfcf849f9f15b10273c421a3ca2cb6282b55b5`, observed 2026-08-11. It contains
  16 managed project identities. The older nine-project fixture is not current
  authority.
- Andy Public was inspected at local `codex/portfolio-upstream-current`,
  `2f007095663ad64a7118d9bfcdbac9c70aa082ca`, with five pre-existing user
  edits preserved. Its upstream publication branch is currently
  `ad3145b078f5017ad0627c81755bbe392135ce3d`; the local branch is ahead, not
  behind. No public content was changed by this reconciliation.
- Existing Andy Public evidence and review rows are dated 2026-07-21. The
  current public source heads for all five represented projects have changed
  since those rows were recorded, so none is classified as both represented and
  current.
- Andy Public's publication selector requires `listed` or `featured` visibility
  plus `publicReview: approved`. A public source requires a source URL. Chief's
  public-evidence path additionally requires an exact source revision, sanitized
  evidence, an inspectable HTTPS preview, predecessor/successor linkage, and
  human review; a prepared handoff does not publish.

## Reconciliation

| Project | Current source authority observed | Andy Public state | Classification | Exact next action |
| --- | --- | --- | --- | --- |
| Chief of Staff | Chief remote `main` at `b0cfcf849f9f15b10273c421a3ca2cb6282b55b5`; existing inventory is `884ecb0` | Featured entry and case study | Stale required evidence | Re-inspect the current Chief head, refresh the sanitized inventory and validation boundary, then request review before changing any public copy. Keep the repository link and operational details excluded. |
| LifeOS | Public `main` at `39e3855ed148f865260ea3d81da61fb9e8b5abfe`; configured Chief candidate is at older `778f75dbea29db3894fb3ac6ae3ca52ce729d9b6` | Featured entry and case study | Stale required evidence | Refresh the candidate at the current source head, attach an inspectable public HTTPS preview, then request owner review. Do not promote the current `needs_shaping` candidate or change the entry yet. |
| MathPad | Public `main` at `479ed9cdc5b0028576411bf307d96e956a7d48e3`; existing inventory is `6704730` | Listed entry | Stale required evidence | Re-run the bounded validation on the current head, refresh the inventory and source row, then obtain review before retaining or revising the listed entry. |
| Arcade | Public `main` at `9bdb81315edc6bf00f6989807a6fae9eff473354`; existing inventory is `0490ff0` | Listed entry | Stale required evidence | Reconcile the current source head and workbench validation, refresh the inventory, then request public review before changing the listed entry. |
| Alpha Screener | Public `main` at `4048e6869b029fb6ccf9821d24bf983fde06fda7`; existing inventory is `787aaef` | Featured entry and case study | Stale required evidence | Refresh the research-only evidence boundary and validation at the current head, then request review before changing any claims or links. Preserve the no-trading/no-profitability boundary. |
| ADHD Tabs | Local-only `main` at `60b897b9f7db48f2813bf0e9491b7b37def4658c`; the checkout has uncommitted work | No project entry; old draft review row | Stale required evidence | Preserve the source state, re-inspect a clean reviewable revision when available, refresh the sanitized inventory, and request public review. Do not publish clinical, efficacy, recommendation, or repository-link claims. |
| Creative Suite | Public `main` at `a2b255c17c5aa437e65e18b0cbd68c2fc5f55f89`; existing inventory is local-only `53824f1` | No project entry; old draft review row | Missing required evidence | Inspect the current public source, replace the local-only inventory with a current sanitized inventory, refresh the existing review row and reset it to pending, then wait for explicit approval before a listed entry. |
| Fable | Public `main` at `01c8e367f8a1b33ca5fa28ff27248f143669e071`; current Chief setup evidence matches | No project entry or review row | Eligible for promotion, review pending | Review the new non-public inventory in `docs/evidence/fable.md`. Approve or revise its framing, public links, and media in the normal review matrix; only then create the smallest project entry. |
| Japanese Anime Inspired | Public `main` at `050b74bffddd8e7459ba2708575f97ac9050c374`; existing inventory is `6ebf6e8` | No project entry; old draft review row | Stale required evidence | Refresh the inventory against current `main`, complete the explicitly pending content/audio review decision, then request public review. Do not claim a shipped app, learning outcomes, audio provenance, or IP association. |
| Nexus | Public `main` at `419cac73e9dd0274c60fd6834a15f1a89e463bf0` | No entry or evidence row | Missing required evidence | Gather a bounded, sanitized current-source inventory and a concrete public framing; keep it pending until Andy Public review approves a project destination. |
| Empowering Excellence | Public `main` at `40f815d3788b2022b6b345ac8440cc74959d657f` | No entry or evidence row | Missing required evidence | Reconcile the current public source and review evidence, write a sanitized inventory, and request public review; do not infer a portfolio claim from registry membership or open work. |
| Business Engine | Current managed branch `docs/durable-foundation` at `3ec1f4803b35afa2424b2227cc2c6464a30d9b8f` | No entry or evidence row | Missing required evidence | Establish a bounded public-safe framing from the current branch and its documented scope, then create a pending inventory/review row. Do not publish venture, operating, or outcome claims without approval. |
| World Knowledge | Public `main` at `5c0c02af2926296d1b02ceeaf0387138dcf398e1` | No entry or evidence row | Missing required evidence | Collect current-source validation evidence in the project's declared environment, write a sanitized inventory, and request review before any public representation. |
| AI Hub Control Plane | Public remote head `cb3658757671897f389d4578d53eda5b2197fe41`; managed as an operational control-plane client | No entry or evidence row | Private or otherwise ineligible | Keep out of the public portfolio unless the user explicitly authorizes a separate sanitized narrative review. Do not expose internal operational topology, credentials, or runtime details. |
| Flourish | Public remote head `e9e25bf0630b5a42ca0df747237e267b8fecfb29`; Chief identifies it as a private source-aware commons | No entry or evidence row | Private or otherwise ineligible | Keep out of Andy Public. Reconsider only if the user changes scope and supplies an explicitly reviewed public-safe framing. |
| Andy Public | Publication authority at remote `codex/public-ai-systems-portfolio-v1` head `ad3145b078f5017ad0627c81755bbe392135ce3d` | This is the publication surface, not a portfolio candidate | Otherwise ineligible as a portfolio item | Preserve the current publication branch and human review gate; do not represent the publication surface as one of Andy's projects. |

## Superseded or not-current candidates

Android Lab appears in the older Andy Public nine-project evidence set but not
in Chief's current 16-project registry. Android Lab is explicitly a future
category until a concrete Android application repository is registered;
Capability Studio is not managed.

| Project | Classification | Exact next action |
| --- | --- | --- |
| Android Lab / Capability Studio | Private or otherwise ineligible for this reconciliation | Make no Andy Public change. A concrete registered Android repository and a new public-safety review would be required first. |

## Result

No existing public entry is current against the source heads re-observed on
2026-08-11. Fable is the only candidate supported by current Chief policy and
current source evidence for a narrow promotion review. This change adds only
its pending evidence/review record; it does not publish Fable or alter any
existing public project, case study, source link, or visibility state.

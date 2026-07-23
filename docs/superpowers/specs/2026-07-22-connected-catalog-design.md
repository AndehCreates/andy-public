# Connected Catalog and Cognitive Infrastructure Design

**Status:** Approved in conversation on 2026-07-22; awaiting written-spec review  
**Product:** Andy Public Portfolio  
**Primary surface mode:** Experience for discovery, Read for detail  
**Visual direction:** Systems Observatory with Editorial Foldout navigation

## Objective

Turn the portfolio from a set of adjacent content collections into an authored,
connected catalog of systems, projects, principles, signals, and evidence.

The catalog must communicate more than repository implementation details. Every
public artifact should explain:

- the human friction or opportunity that motivated the work;
- why that problem matters;
- how the system responds;
- which human cognition, ability, or system capability it strengthens;
- which decisions and tradeoffs shaped the result;
- what evidence supports the public framing;
- what remains outside the validation boundary; and
- how the work relates to the wider practice.

The catalog should leave a visitor with three impressions in order:

1. Andy thinks in connected systems.
2. The product and interface craft is visible in the experience itself.
3. The technical depth is supported by inspectable decisions and evidence.

## Product thesis

The portfolio presents software as infrastructure for human capability.

Some projects strengthen cognition directly through context, continuity,
learning, calculation, or attention. Others strengthen a person's effective
abilities indirectly through agents and layered systems that preserve context,
coordinate work, execute bounded tasks, and keep consequential authority with
people.

The central claim is not autonomous software. It is:

> The system extends human capability without erasing human authority.

## Experience model

### 1. Systems Observatory

The featured Cognitive Infrastructure system opens as a bespoke, spatial
projection rather than a conventional card grid.

The Observatory:

- places human intent, judgment, and approval at the center;
- shows memory, governance, coordination, runtime, execution, and code truth as
  distinct responsibilities;
- makes the layered system understandable before asking visitors to read
  component details;
- lets visitors focus a layer or component and follow it into a project or
  system dossier;
- provides a complete, readable HTML representation without JavaScript; and
- uses progressive enhancement only for focus, exploration, and orientation.

It must feel like a flagship experience, not a dashboard. Avoid widget density,
badge walls, ornamental telemetry, and interface chrome that competes with the
system model.

### 2. Editorial Foldout

After a visitor enters the system, component, or project, the interface shifts
into a quieter reading mode.

The Foldout provides:

- a persistent system field-guide rail at wider viewports;
- a clear "you are here" position within the layered system;
- chapter navigation for long project and system narratives;
- links back to the Observatory and adjacent layers;
- natural paths into related projects, principles, signals, and evidence; and
- a compact mobile replacement for the persistent rail.

The transition from Observatory to Foldout is intentional. The first mode
creates recognition and curiosity; the second supports comprehension.

### 3. Capability Dossier

Every featured and listed project uses the same editorial spine while retaining
project-specific diagrams, marks, colors, and artifacts.

The required narrative order is:

1. capability thesis;
2. human friction or opportunity;
3. why it matters;
4. system response;
5. how it works;
6. pivotal decisions and tradeoffs;
7. principles applied;
8. evidence and validation boundary;
9. place in the wider system;
10. what comes next.

The first screen should include a concise capability equation:

`human friction -> system response -> capability extended`

The equation is an editorial summary, not a quantitative claim.

## Cognitive Infrastructure flagship

Create a featured system with the stable ID `cognitive-infrastructure`.

Its public-safe projection describes the following responsibilities:

| Layer | Component | Public responsibility |
| --- | --- | --- |
| Human direction | Human intent, judgment, approval | Chooses what matters and retains consequential authority. |
| Remember | Second Brain | Owns durable memory, session context, and recoverable handoffs. |
| Govern | Nexus | Owns policy, accountability, and conditions for consequential work. |
| Coordinate | Chief of Staff | Reconciles desired work, coordinates verification, and publishes handoff state. |
| Admit and operate | AI Hub | Owns runtime registration, admission, leases, capacity, and execution events. |
| Execute | Codex and specialized agents | Perform bounded work and return observations and evidence. |
| Preserve code truth | Project repositories | Retain source, tests, review, implementation, and release truth. |
| Produce and learn | Portfolio projects | Become products, experiments, evidence, and feedback for the wider system. |

This table defines editorial responsibilities, not live topology or deployment
claims. Public diagrams must not expose private hosts, endpoints, paths,
credentials, or operational logs.

Codex, specialized agents, and repositories appear as architectural layers.
They do not receive duplicate project cards solely because they appear in the
flagship map.

## Catalog scope and publication states

Preserve every existing catalog item unless the user explicitly changes it.

### Featured

- System: `cognitive-infrastructure`
- Project: `project-second-brain`
- Project: `project-nexus`
- Project: `project-lifeos`
- Project: `project-alpha-screener`

### Listed

- Project: `project-chief-of-staff`
- Project: `project-ai-hub`
- Project: `project-mathpad`
- Project: `project-arcade`
- Project: `project-japanese-language-cognition`

### Draft

- Project: `project-adhd-tabs`
- Project: `project-creative-suite`
- Project: `project-android-lab`

Changing Chief of Staff from featured to listed must not remove its approved
case study. Existing route and relationship behavior should adapt to the new
project visibility without losing the reviewed narrative.

The Japanese language project replaces the previous public-facing
`project-japanese-anime-inspired` identity. Its approved framing is an
audio-first language-education cognition project. Do not publish claims about a
shipped application, learning outcomes, language proficiency gains, audio
quality, or association with specific intellectual property. Media remains
blocked until provenance, licensing, and linguistic review are explicit.

Second Brain, Nexus, and AI Hub require sanitized evidence inventories before
their public project routes or claims are generated. The visibility decisions
above authorize the intended catalog hierarchy; they do not waive evidence,
sanitization, or public-review requirements.

## Content contracts

### Project capability narrative

Every featured or listed project must provide typed, independently testable
fields for:

- `capabilityThesis`
- `humanFriction`
- `whyItMatters`
- `systemResponse`
- `capabilityExtended`
- `howItWorks`
- `pivotalDecision`
- `decisionTradeoff`
- `principleIds`
- `evidenceSummary`
- `nextStep`
- `relationshipEdges`

Long-form MDX remains responsible for prose and project-specific evidence.
Structured fields provide consistent index presentation, navigation, audits,
and relationship summaries without duplicating the whole article.

### System projection

The Cognitive Infrastructure entry must provide typed layers, components,
responsibilities, and edges. Each component defines:

- a stable ID;
- a public label;
- a concise public responsibility;
- its authority boundary;
- an optional public project target; and
- its Observatory visual theme.

The static text explanation and semantic list remain authoritative. The
enhanced visual projection consumes the same normalized view model.

## Typed relationships

Relations remain explicit and typed in content, but the public interface must
not expose them like database fields or taxonomy chips.

Supported internal relationship types are:

- `part-of`
- `governs`
- `provides-context-to`
- `coordinates`
- `executes-through`
- `built-through`
- `validates`
- `informed-by`
- `applies-principle`
- `related-to`

Each edge contains:

- source collection and ID;
- target collection and ID;
- relationship type;
- a short editorial annotation explaining the connection; and
- optional evidence or provenance text when the relationship is a lineage
  claim such as `built-through`, `validates`, or `informed-by`.

### Natural public presentation

Public rendering translates typed edges into authored language:

- "LifeOS applies the modular-authority pattern."
- "This recovery field note informed the re-entry model."
- "Chief of Staff coordinates work admitted by AI Hub."
- "This project was built through the cognitive-infrastructure workflow."

The interface groups relationships by visitor intent rather than schema type:

- **Understand the system**
- **See the principle in practice**
- **Follow the evidence**
- **Explore related work**
- **Trace how this was built**

Use short sentences, contextual link cards, diagram callouts, or prose-adjacent
references. Do not present raw relation labels, repetitive pills, or a generic
"related content" dump.

Every rendered connection is bidirectional when the reverse view is public and
useful. The reverse sentence may use different natural copy. Typed inverse rules
must live in one shared relation module rather than being reauthored on pages.

Lineage language requires evidence. If a project cannot demonstrate that it was
`built-through`, `validates`, or `informed-by` another system, use a weaker
supported relationship or omit the edge.

## Index presentation

The Work index becomes an editorial system ledger.

Each entry shows:

- project title and status;
- a strong capability promise;
- the capability equation;
- one concise system or technical differentiator;
- current evidence state;
- its place in the wider system; and
- a restrained set of navigation choices.

Featured entries may use larger or asymmetric compositions. Listed entries
remain substantial rather than collapsing into secondary link rows. The
hierarchy should communicate emphasis without making listed work feel
unfinished.

Filtering remains progressive enhancement. The complete reviewed catalog is
present in server-rendered HTML.

## Visual system

Preserve and strengthen the incumbent dark visual world:

- deep navy canvas and raised surfaces;
- cyan for systems and coordination;
- violet for memory, cognition, and signals;
- green for validated evidence;
- warm yellow for human judgment and focus;
- project-specific geometric marks;
- thin structural rules;
- strong display hierarchy with quieter reading typography; and
- editorial spacing that creates distinct peaks in the scroll.

The Observatory is the expressive peak. Foldout and dossier surfaces become
quieter so long-form reasoning stays readable.

Do not introduce:

- dashboard-style widget fields;
- glow-heavy science-fiction decoration;
- decorative node graphs without explanatory value;
- excessive rounded cards;
- badge walls;
- generic stock imagery; or
- motion that carries required meaning.

## Behavior and responsive adaptation

- Core routes, navigation, content, relations, and diagrams work without
  JavaScript.
- Observatory enhancement may focus a layer, reveal its concise explanation,
  and expose the correct drill-down link.
- Keyboard users can traverse components in a logical order and understand the
  active focus.
- Reduced-motion settings remove nonessential transitions.
- On mobile, the Observatory becomes a deliberate layered sequence rather than
  a squeezed radial graphic.
- The Foldout rail becomes a compact system-position and chapter control.
- Long relationship annotations, diagrams, and evidence blocks must not cause
  horizontal page overflow.

## Publication and evidence safety

Publication state, source availability, and public review remain independent.

- A featured or listed target does not render until its evidence inventory,
  public review, and required content fields pass.
- Draft and internal content must not appear in routes, metadata, RSS, sitemaps,
  filters, Observatory drill-downs, or public relationship summaries.
- A public source URL is rendered only when separately approved.
- Local paths, private URLs, hostnames, credentials, personal data, and
  unsupported quantitative claims remain prohibited.
- Unknown relationship targets, private targets referenced by public content,
  and lineage edges without an annotation fail the content audit.

When a component is visible in the public-safe flagship projection but its
project dossier is not publishable, the component remains explanatory and does
not link to a missing or private route.

## Verification

Implementation planning must include:

- unit tests for the expanded project and system schemas;
- unit tests for relation normalization, inverse relationships, natural display
  copy, and public-target filtering;
- content audit fixtures for unknown targets, private-target leakage, missing
  lineage annotations, and unsafe strings;
- project-query tests covering the revised visibility matrix;
- route tests for the Cognitive Infrastructure Observatory and every eligible
  project dossier;
- regression coverage proving the Chief of Staff case study remains public
  after the project becomes listed;
- no-JavaScript coverage for Observatory, Work, and project navigation;
- keyboard and focus tests for enhanced Observatory exploration;
- accessibility scans for Observatory and Foldout surfaces;
- responsive tests at the existing portfolio breakpoints;
- visual inspection of the Observatory, Work ledger, and at least one featured
  and one listed dossier; and
- the repository's complete verification, build, and rendered-output audits.

## Implementation boundaries

- Keep Astro 6, strict TypeScript, repository-owned content, static output, and
  the existing publication selectors.
- Extend the current content and relation modules instead of introducing a CMS,
  database, backend, or second publication system.
- Reuse shared design tokens and components.
- Do not replace the homepage or unrelated surfaces wholesale.
- Preserve reviewed claims unless the new evidence process produces approved
  replacements.
- Do not publish Second Brain, Nexus, or AI Hub project copy before their
  evidence inventories and review matrix rows are complete.

## Acceptance criteria

The design is complete when:

- the Cognitive Infrastructure Observatory communicates the integrated system
  and human-authority thesis without private operational detail;
- the Observatory links to eligible component projects and gracefully handles
  non-publishable components;
- Work reads as an authored catalog rather than a uniform project-card grid;
- every featured and listed project explains the why, how, what, human
  capability, decision, tradeoff, evidence boundary, and next step;
- project and system detail pages use the Editorial Foldout and Capability
  Dossier model;
- public relationships read as natural editorial connections while remaining
  typed, validated, and bidirectional internally;
- the approved publication hierarchy is preserved;
- no draft, internal, unsafe, or unsupported material leaks into public output;
  and
- the complete automated and browser verification gates pass.

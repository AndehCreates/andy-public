# Signal Library Editorial Atlas Design

**Date:** 2026-07-23  
**Status:** Approved in the visual companion on 2026-07-23; awaiting written-spec review  
**Product:** Andy Public Portfolio  
**Route:** `/signals/`  
**Surface mode:** Experience for discovery, Read for detail  
**Direction:** Editorial Research Atlas  

## Objective

Reinvent the Signal Library from four repeated kind-based card groups into a
curated research atlas.

The atlas should show how an inspected artifact leads to a decision, how that
decision changes a system or interface, what evidence supports the connection,
and where validation stops. It should make coherent themes and purposeful
systems visible without turning relationships into taxonomy, decorative node
graphs, or abstract brand language.

The approved design preserves the incumbent dark visual world and existing
static-first publishing boundary.

## Visitor outcome

A visitor should leave the index understanding:

1. which current signal Andy considers most important and why;
2. what concrete artifact or observation supports it;
3. which project, system, handbook principle, or evidence boundary it changed;
4. how related decisions recur across the wider body of work; and
5. where to continue reading.

The page succeeds when a hiring manager, collaborator, or technical peer can
follow a meaningful path without first understanding the portfolio's content
schema.

## Editorial thesis

The Signal Library is a field guide to how observations become system
decisions.

Themes are conclusions drawn from concrete artifacts. They do not lead the
writing. Every public signal begins with something inspectable:

- a source or external reference;
- an implementation or test surface;
- an interface state;
- a decision record;
- an observed failure or recovery;
- a reviewed diagram; or
- another public-safe evidence object.

The atlas does not claim that every artifact proves a grand thesis. It shows
where the same engineering concern appears, how different systems respond, and
what remains unverified.

## Approved composition

### 1. Editorial lead signal

The first viewport is dominated by one manually selected, reviewed signal.
Recency is compact metadata and never chooses the lead automatically.

The lead contains:

- a concrete research question rather than a slogan;
- the project, system, source, or context in which it was observed;
- a concise explanation of the artifact;
- the decision or finding it exposed;
- compact date, kind, capability, and reading-length metadata;
- the strongest available validation fact;
- the validation boundary; and
- a clear action to read the annotation or begin its guided path.

Lead selection must be independent from publication state. `featured` content
is eligible for curation but does not automatically become the atlas lead.

The approved representative lead asks:

> What should a ranking prove before a person acts?

It uses reviewed Alpha Screener evidence about uncertainty and readiness gates
as the example. This is design copy derived from approved evidence, not an
automatic authorization for a new public Signal entry. Final wording remains
subject to the normal content audit and review rules.

### 2. Artifact record

A compact field record sits beside or immediately after the lead.

It identifies:

- what was inspected;
- which implementation, source, test, or interface artifact matters;
- what was observed;
- what the artifact establishes;
- what it does not establish; and
- why it belongs in the Signal Library.

The record uses human-readable labels. Public filesystem paths, private source
locations, private hosts, credentials, or operational detail never appear.

### 3. Guided research questions

Thematic threads are presented as concrete questions:

- Who is allowed to declare work complete?
- What state must survive an interruption?
- Where does private state stop and public output begin?
- What must evidence establish before a result advances?

Questions may change as the reviewed catalog grows. They are not permanent
taxonomy values.

Each path contains three to five authored steps. A step points to a reviewed,
collection-backed Signal entry, Handbook principle, System, Project, or Case
Study. Every transition includes a short explanation of why the next artifact
follows.

Evidence objects remain part of the adjacent artifact record or transition
annotation. They do not become independent path targets until the repository
defines a separately typed, publication-aware evidence collection. This avoids
creating unresolvable pseudo-routes or a second relationship authority.

Public copy groups the steps by reader intent:

- inspect the artifact;
- understand the decision;
- see it in practice;
- examine the evidence; or
- continue the investigation.

Raw collection names, relation types, and database-like chips stay internal.

### 4. Compact complete record

The full public Signal collection remains available below the authored paths.
It becomes a dense field index rather than another card grid.

Each row contains only the metadata needed for orientation:

- concrete title or research question;
- kind;
- date;
- source or project context when public;
- primary capability;
- reading length when known; and
- destination.

Kind and capability may support progressive enhancement, but they do not define
the page's primary hierarchy.

### 5. Detail-page continuity

Signal detail pages remain quieter reading surfaces. They should receive enough
atlas context to answer:

- where the signal was observed;
- which artifact anchors the note;
- what decision it affected;
- which reading path contains it;
- which public artifact comes next; and
- what remains outside the evidence boundary.

The index redesign must not force a full dossier redesign in the first slice.
Detail-page additions should stay compact and reuse the existing article layout
unless implementation evidence proves a shared catalog reading component is
already ready.

## Content model

### Signal entry fields

Extend the Signal content contract only with independently useful fields:

- `researchQuestion`: the concrete question the entry investigates;
- `artifactLabel`: public-safe name for the inspected object;
- `artifactType`: controlled value such as `source`, `implementation`, `test`,
  `interface`, `decision-record`, `failure`, or `diagram`;
- `finding`: the observed decision or behavior;
- `evidenceSummary`: the concise public-safe evidence supporting the finding;
- `evidenceBoundary`: what the artifact does not establish;
- `readingMinutes`: optional positive integer; and
- `sourceContext`: optional public-safe project, system, or source label; and
- `continueTo`: one public collection target plus an editorial annotation
  explaining why that destination is the useful next read.

Do not store lead placement or thread order in individual Signal entries.

`evidenceSummary` supplies the index and detail-page answer to "what evidence
supports this interpretation." The MDX body may expand that evidence without
duplicating the summary.

`continueTo` supplies the default detail-page continuation for a Signal that is
not currently visible inside a curated research path. When a Signal appears in
a configured path, the path's authored transition annotation takes precedence
in that context. Both targets resolve through the same public-target validation
rules.

### Atlas configuration

Create one repository-owned atlas configuration with:

- one `leadSignalId`;
- an ordered list of research paths;
- each path's stable ID, question, short premise, and estimated reading length;
- ordered public targets across supported collections; and
- one editorial annotation per transition.

This configuration is presentation strategy, not publication authority.

The resolver must:

1. resolve every target through the existing content collections;
2. reject unknown targets;
3. reject draft, internal, or unapproved public targets;
4. preserve the configured order;
5. return public-safe normalized view models; and
6. fail the content audit when a transition lacks an annotation.

Do not duplicate long summaries, validation claims, or publication fields in
the atlas configuration.

Curated configuration is a build-time contract, not a best-effort hint. The
content audit must fail when:

- `leadSignalId` is missing, unknown, duplicated, unpublished, or unapproved;
- a configured path has fewer than two valid public steps;
- any path target becomes draft, internal, pending review, or unknown;
- a transition annotation is missing; or
- publication filtering would leave the atlas with no eligible public Signal
  entries.

Production output must not silently choose a replacement lead, drop an invalid
step, render a broken path, or publish an empty atlas. Editors correct the
configuration or publication state before the build can succeed.

### Editorial requirements

Every public Signal entry must answer:

1. What was inspected or observed?
2. What did it reveal?
3. Which decision or interface changed because of it?
4. What evidence supports that interpretation?
5. What does the evidence not establish?
6. Where should the reader continue?

The structured Signal fields supply concise answers for index and navigation:
`artifactLabel` and `artifactType` answer the first question; `finding` answers
the second and third; `evidenceSummary` answers the fourth;
`evidenceBoundary` answers the fifth; and `continueTo` answers the sixth. The
MDX body supplies the fuller reasoning and supporting context.

Connections appear only when the editorial annotation names the shared
decision, constraint, observed behavior, or evidence boundary. A generic
"related" connection is insufficient.

## Visual system

Preserve the current near-black navy foundation and semantic accent roles:

- violet for Signals and research focus;
- cyan for principles, system structure, or coordination;
- green for verified evidence;
- warm yellow for human judgment, limitations, or attention; and
- muted red only for explicit failure-oriented material.

The atlas should feel like an authored field guide:

- one large lead composition rather than a conventional hero plus cards;
- thin structural rules;
- asymmetric editorial columns;
- compact monospaced metadata;
- quieter reading typography for explanations;
- stepped paths with deliberate connectors;
- dense but legible index rows; and
- limited corner radius.

Avoid:

- repeated rounded cards;
- dashboard widgets;
- taxonomy-first filter bars;
- decorative node maps;
- badge walls;
- glow-heavy science-fiction styling;
- generic stock imagery; and
- abstract section names unsupported by concrete artifacts.

## Motion and interaction

Motion explains traversal.

On pointer hover, keyboard focus, or optional enhancement, a guided path may:

- emphasize the active step;
- draw or reveal the connector toward the next step;
- reduce emphasis on unrelated paths; and
- expose the transition annotation.

All steps, annotations, destinations, and sequence meaning exist in static HTML.
Motion never carries required information.

`prefers-reduced-motion: reduce` removes connector drawing, transforms, and
nonessential transitions. Focus order follows the reading order. Hover-only
content is prohibited.

The first implementation should prefer CSS focus and hover behavior. A small
vanilla enhancement or island is justified only if it materially improves path
orientation and preserves the complete server-rendered experience.

## Responsive behavior

Desktop shows the lead and artifact record together, then exposes several steps
of a research path in one horizontal reading field.

Mobile becomes a deliberate sequence:

1. lead question and finding;
2. artifact record;
3. compact path index;
4. one stacked research path at a time; and
5. complete field index.

The mobile design must not squeeze a graph or wide path into the viewport.
Connectors become vertical, annotations remain adjacent to their transitions,
and no content requires horizontal scrolling.

## Accessibility

- Exactly one page-level heading.
- Semantic sections and ordered lists for paths.
- Descriptive link names that include the destination or purpose.
- Visible focus on every interactive destination.
- Static access to every public Signal and guided path without JavaScript.
- No reliance on color, position, or motion alone.
- Screen-reader text explains the transition between path steps.
- Compact metadata maintains readable contrast and does not become the only
  source of meaning.
- Existing accessibility, no-JavaScript, and responsive test gates remain
  mandatory.

## Publication and evidence safety

The atlas does not change publication authority.

- Lead and path targets must already be public and approved.
- A project or system mentioned in a public-safe artifact record does not gain a
  public route or promotion automatically.
- New Signal entries derived from existing evidence still require schema,
  content-audit, and public-review compliance.
- Local-only sources may support sanitized narrative but never expose their
  checkout locations.
- Test counts, commits, source links, and observed behavior must match reviewed
  evidence and be refreshed when the underlying claim changes.
- Pending MathPad, Arcade, ADHD Tabs, Creative Suite, and Android Lab claims
  remain unavailable unless their exact public states are approved separately.

## Implementation boundaries

The first focused slice may modify:

- Signal content schema and audit rules;
- reviewed Signal entries needed for the approved atlas;
- one typed atlas configuration and resolver;
- `/signals/`;
- compact context on `/signals/[slug]/`;
- focused unit and browser tests; and
- shared tokens only when a reusable atlas need is established.

It must not:

- implement the Systems Observatory;
- replace the Work index;
- redesign all dossiers;
- create a CMS, database, or backend;
- make JavaScript necessary for Signal discovery;
- promote pending content; or
- rewrite unrelated site surfaces.

The new contracts should remain compatible with the approved connected-catalog
direction so later Systems, Work, and dossier work can consume the same public
relationship and evidence boundaries.

## Verification

Implementation planning must include:

- schema tests for the new Signal fields;
- atlas-configuration tests for one lead, stable order, and required transition
  annotations;
- resolver tests for unknown, draft, internal, and unapproved targets;
- failure tests for an invalid lead, paths reduced below two valid steps, and an
  atlas with no eligible public entries;
- content-audit fixtures for missing artifacts, missing evidence boundaries,
  missing evidence summaries, missing continuation annotations, unsafe strings,
  and private-target leakage;
- route tests for the lead, artifact record, guided paths, and complete field
  index;
- regression coverage proving all four currently public Signal routes remain
  reachable until deliberately replaced by reviewed entries;
- no-JavaScript coverage for the lead and every path destination;
- keyboard and focus coverage for path traversal;
- reduced-motion assertions;
- accessibility scans;
- responsive checks at the existing breakpoints;
- visual inspection of desktop and mobile compositions; and
- the repository's complete check, test, build, and rendered-output audits.

## Acceptance criteria

The design is complete when:

- one manually curated, reviewed lead signal dominates the first viewport;
- the lead is grounded in a named artifact, observed finding, validation fact,
  and limitation;
- research paths use concrete questions and authored transition explanations;
- paths connect public Signals to meaningful Handbook, System, Project, Case
  Study, or evidence destinations without exposing raw relation types;
- the full Signal collection remains available as a compact server-rendered
  field index;
- mobile converts paths into a readable sequence;
- motion clarifies traversal while reduced-motion and no-JavaScript behavior
  remain complete;
- no new claim or publication state is inferred from visual placement; and
- invalid curated configuration blocks the production build instead of
  silently selecting, dropping, or emptying content; and
- the result feels like a curated research atlas rather than grouped cards,
  decorative cartography, or abstract systems branding.

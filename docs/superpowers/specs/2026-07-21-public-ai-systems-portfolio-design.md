# Public AI Systems Portfolio Design

**Date:** 2026-07-21
**Status:** Approved for implementation planning
**Workspace:** `D:\coding\andy-public`

## 1. Mission

Build a public-facing body of work that demonstrates the ability to design,
build, validate, and communicate serious AI and software systems.

The site should let a hiring manager, prospective partner, or collaborator:

- understand the positioning in 30 seconds;
- respect the engineering judgment within five minutes; and
- find enough substance for a 30-minute deep dive that leads to a conversation.

The site does not imply traditional employment history that does not exist. It
earns credibility through the quality of the work, the clarity of the thinking,
the honesty of the tradeoffs, and the value created for people.

## 2. Positioning

### Core identity

The primary position is an evidence-led AI systems engineer and human-centered
systems builder. The broader range—homelab infrastructure, product experiments,
creative tooling, interactive systems, and learning projects—supports that
position rather than competing with it.

### Core promise

> Software that strengthens human capability.

Supporting copy should explain that the work spans grounded AI systems,
cognition tools, and local infrastructure built with explicit tradeoffs, human
judgment, and measurable validation.

### Opportunity signal

Use an evidence-first hero with a discreet signal such as “Open to roles and
collaboration.” The primary call to action is to explore the systems; the
secondary call to action explains how they are built. The closing call to
action invites hiring, partnership, and collaboration conversations without
making the site read like a job-search landing page.

### Tone

- Professional, technically literate, calm, and precise.
- Curious and human without becoming casual or self-mythologizing.
- Market capabilities and outcomes rather than repeatedly labeling artifacts
  as “proof.” Evidence is structural, not a slogan.
- Avoid inflated enterprise claims, invented metrics, and premature language
  about formal roles, business stakes, or organizational contribution.

## 3. Principles

The public engineering philosophy begins with four concise principles:

1. **Grounded knowledge:** important outputs should trace to trusted sources,
   durable context, or inspectable system state.
2. **Human-owned decisions:** consequential actions remain understandable,
   reviewable, and interruptible by people.
3. **Modular architecture:** components have explicit responsibilities and do
   not duplicate repository, runtime, memory, or product authority.
4. **Evaluation-driven development:** tests, replay, observed behavior, and
   explicit failure modes matter more than demos that merely look convincing.

The engineering handbook will expand these into reusable patterns, failure
modes, diagrams, and practical checklists.

## 4. Information Architecture

### Primary navigation

- Home
- Work
- Systems
- Handbook
- Signal Library
- About
- Résumé

### Public surfaces

| Surface | Purpose |
| --- | --- |
| Home | Positioning, principles, selected systems, the Signal Library, and opportunity call to action |
| Work | Filterable atlas of projects using market-facing capability tags |
| Project page | Concise overview, visuals, status, capabilities, links, and related systems |
| Case studies | Index and deeper explanations of what systems solve, how they work, decisions, validation, value, and next steps |
| Systems | Cross-project maps that explain recurring architecture and design patterns |
| Handbook | Principles, patterns, tradeoffs, failure modes, and engineering checklists |
| Signal Library | Curated resources, homelab notes, experiments, tools, and broader interests |
| About | Honest non-traditional path, motivation, working style, and current direction |
| Résumé | Focused, downloadable career document aligned with the public portfolio |

## 5. Homepage Narrative

The homepage follows this order:

1. **Hero:** “Software that strengthens human capability,” supporting sentence,
   primary exploration action, secondary methods action, and discreet
   opportunity signal.
2. **Principles:** grounded knowledge, human ownership, modular architecture,
   and evaluation-driven development.
3. **Featured systems:** Chief of Staff, LifeOS, and Alpha Screener as the
   initial flagship case studies.
4. **Signal Library:** a prominent living centerpiece for resources, homelab
   work, annotated references, experiments, and field notes.
5. **Handbook and wider work:** clear entry points to reusable engineering
   thinking and the full project atlas.
6. **Conversation:** an inclusive call to discuss a role, partnership, or
   collaboration around reliable AI systems and human value.

The homepage remains curated as the portfolio expands. New projects enter the
Work atlas and relevant system maps first; only the strongest, most complete
stories become homepage features.

## 6. Visual Direction

- Dark mode is the primary and V1 theme.
- Use a near-black navy foundation with restrained cyan for system/navigation
  emphasis, violet for the Signal Library, green for verified/healthy states,
  and muted red only for failure-oriented diagrams.
- Favor editorial spacing, strong typographic hierarchy, thin structural
  borders, and compact capability labels.
- Motion should clarify relationships or state, not decorate every scroll.
- Diagrams use shared visual primitives and tokens rather than exported images
  where practical.
- Avoid generic developer-dashboard styling, neon overload, glassmorphism,
  fake terminal windows, skill-percentage bars, and dense badge walls.

## 7. Portfolio Content System

### Initial managed portfolio

| Project | Initial public framing |
| --- | --- |
| Chief of Staff | AI operations, orchestration, governance, and reliability |
| LifeOS | Human-centered product systems, cognition, context, and re-entry |
| Alpha Screener | Decision intelligence, evaluation, uncertainty, and research tooling |
| MathPad | Product craft, interaction reliability, and expressive precision |
| Arcade | Systems design, reusable simulation, and interactive experimentation |
| ADHD Tabs | Cognitive tools and browser-product experience |
| Creative Suite | Multimodal experiences and creative tooling |
| Android Lab | Device intelligence, sensors, and edge systems |
| Japanese Anime Inspired | Learning systems and product experimentation |

Chief of Staff, ADHD Tabs, Creative Suite, and Android Lab are currently
local-only. Source-code publication, remote creation, or repository linking is
a separate human-approved action and is not implied by including them in the
site.

This design approves public-safe narrative coverage of those projects once the
specific content passes public-source review. A public project page or case
study may describe goals, architecture, decisions, validation summaries, and
sanitized diagrams without a public repository link. It must not expose local
paths, secrets, private hostnames, operational credentials, private logs, or
unreviewed implementation details. Publishing source code, creating a remote,
or linking a repository remains a separate explicit action.

Chief of Staff may therefore ship in V1 as a reviewed public narrative and
sanitized case study without publishing its local repository. Its case study
focuses on authority boundaries, lifecycle design, reliability mechanisms, and
validation rather than sensitive operational configuration.

### Capability vocabulary

Use a controlled, employer-legible vocabulary instead of project-specific or
overly literal tags:

- AI systems and orchestration
- Evaluation and reliability
- Knowledge and context systems
- Product engineering
- Human-centered design
- Local infrastructure and edge
- Decision intelligence
- Interactive and creative systems

### Case-study shape

Case studies should be proportional to the available evidence. The reusable
shape is:

1. What it solves
2. System design
3. Key decisions and tradeoffs
4. How it was validated
5. Human or business value
6. What comes next

Do not require “stakes” or “my contribution” sections in V1. Ownership and
context can be stated naturally when the source material supports them.

### Cross-project system maps

The initial maps are:

- **Reliable AI work:** orchestration, governance, evaluation, provenance, and
  local infrastructure.
- **Software for cognition:** context, attention, interruption recovery,
  learning, and re-entry.
- **Intelligence at the edge:** homelab systems, local models, devices, sensors,
  and private infrastructure.

Maps link to projects, case studies, handbook entries, and Signal Library
items. They explain how the body of work fits together without forcing every
project into a homepage feature.

## 8. Evidence Inventory and Editorial Workflow

Writing begins from the actual repository and artifact state, not from generic
portfolio copy.

For each candidate item:

1. Inspect the authoritative repository, docs, tests, history, release state,
   diagrams, screenshots, and public links.
2. Record what exists, what is verified, what remains local or incomplete, and
   what cannot be shared publicly.
3. Frame portable capabilities and customer or human value without inflating
   the claim.
4. Choose the smallest suitable artifact: project page, case study, system map,
   handbook entry, or Signal Library item.
5. Validate public sources, media, links, metadata, and accessibility before
   publication.

The editorial pipeline is:

`repository + artifacts -> evidence inventory -> capability framing -> content artifact -> homepage / atlas / system-map placement`

## 9. Technical Architecture

### Stack

- Astro
- TypeScript in strict mode
- Astro content collections with schema validation
- Markdown or MDX for long-form content
- Component-scoped styles and shared design tokens
- Selective React or framework islands only for interactions that need client
  state, such as filtering or diagram focus
- Static build output deployable to a conventional static host

V1 has no CMS, database, authentication layer, or runtime API. Git is the
content authority. A runtime dependency must be justified by a demonstrated
publishing or interaction requirement.

### Content collections

- `projects`
- `caseStudies`
- `systems`
- `handbook`
- `signals`

Shared metadata includes stable slug, title, summary, publication state,
capability tags, dates, related content, source links, media, and optional
featured placement. Collection-specific schemas add only the fields that the
surface needs.

### Publication and source state

Every content record has an explicit `visibility` state:

| State | Build and route behavior |
| --- | --- |
| `internal` | Never included in public collection queries, generated routes, metadata, sitemaps, feeds, or related-content indexes |
| `draft` | Available for local editorial preview only and excluded from production output and public indexes |
| `listed` | Generates a public page and may appear in the relevant atlas or collection index, but is not eligible for homepage placement |
| `featured` | Meets all public requirements, generates a public page, and may appear in curated homepage or featured-system placements |

Every project and case study also declares `sourceAvailability` as `public`,
`local-only`, or `mixed`.

- Public source links are required only when `sourceAvailability` is `public`.
- `local-only` and `mixed` entries may publish without a repository URL after
  explicit public-source review and may use only reviewed narrative and media.
- `listed` and `featured` entries require `publicReview: approved`.
- A local-only entry cannot become public merely by changing `visibility`; the
  public-review field and sanitized-content checks must also pass.
- Relationship validation must not allow a public page to reveal the slug,
  title, link, or metadata of an `internal` record.

### Route model

- `/`
- `/work`
- `/work/[slug]`
- `/case-studies`
- `/case-studies/[slug]`
- `/systems`
- `/systems/[slug]`
- `/handbook`
- `/handbook/[slug]`
- `/signals`
- `/signals/[slug]`
- `/about`
- `/resume`

### Component boundaries

| Component | Responsibility |
| --- | --- |
| Site shell | Global metadata, navigation, footer, skip link, and page frame |
| Project card | Stable project summary and capability presentation |
| Capability tag | Controlled taxonomy display and filter value |
| Article shell | Long-form hierarchy, table of contents, and related content |
| Media figure | Image, diagram, caption, credit, and accessible alternative |
| System diagram | Shared node, edge, legend, and focus presentation |
| Filter island | Optional client-side enhancement over a complete static project list |
| Callout and decision blocks | Consistent tradeoff, validation, limitation, and next-step presentation |

Each component exposes a small content-oriented interface and depends on shared
tokens rather than page-specific styling.

## 10. Data Flow and Progressive Enhancement

1. Repository-owned content and media enter typed collections.
2. Collection schemas and editorial checks validate metadata, relationships,
   links, media, public visibility, and controlled tags.
3. Astro generates semantic static HTML, metadata, sitemap entries, and static
   assets at build time.
4. Optional islands enhance filters, diagram exploration, and restrained motion.
5. If client JavaScript fails, all project and article content remains readable
   and navigable.

No runtime fetch is required for core V1 content.

## 11. Failure Handling

- Invalid or incomplete collection content fails the build with an actionable
  error that names the artifact and field.
- Duplicate slugs, unknown tags, invalid relationships, missing required media,
  and broken internal links block release.
- `internal`, `draft`, or unreviewed material is excluded from public routes,
  indexes, related-content projections, metadata, sitemaps, and feeds.
- A `listed` or `featured` local-only entry without `publicReview: approved`
  fails the production build even when all other fields are valid.
- External links degrade to ordinary links; previews or embellishments must not
  be required to understand the content.
- Missing optional media falls back to a designed text presentation.
- A failed interactive enhancement leaves the static page usable.
- A not-found route uses a clear branded 404 with paths back to Work, Systems,
  and the Signal Library.

## 12. Quality and Verification

### Automated gates

- TypeScript and Astro checks
- Content-schema validation
- Unit tests for taxonomy, relationships, collection selectors, and helpers
- Component tests for client-side filters and interactive diagrams
- Production static build
- Route, metadata, sitemap, internal-link, and media audits
- No accidental private paths, credentials, or unpublished artifacts in output

### Browser gates

- Homepage, Work, flagship case studies, a system map, handbook, Signal
  Library, About, Résumé, and 404 routes
- Keyboard navigation, focus visibility, skip navigation, headings, landmarks,
  labels, color contrast, reduced-motion behavior, and meaningful image
  alternatives
- Mobile, tablet, desktop, and wide-screen layouts
- Filtering and diagram interactions with and without JavaScript
- Social metadata and share-image presentation

### Runtime handoff

Implementation is not complete until:

- the development server is running and its local URL is reported;
- the production build passes;
- the production preview server is running and its local URL is reported; and
- both URLs have been checked in a real browser.

## 13. V1 Milestone

V1 includes:

- the complete dark-mode site shell and navigation;
- the approved homepage narrative;
- a Work atlas covering the initial managed portfolio;
- three flagship case studies with diagrams: Chief of Staff, LifeOS, and Alpha
  Screener;
- the three initial cross-project system maps;
- the Signal Library with an extensible entry model and representative starter
  content;
- a concise engineering handbook with the four principles and initial patterns;
- About and Résumé surfaces;
- responsive, accessibility, metadata, and static-build quality gates; and
- verified development and production-preview URLs.

### Portfolio-grade publication gate

No substantial artifact is presented as complete unless it answers:

- What does it solve?
- Who benefits?
- How was the approach chosen?
- How was it tested or validated?
- What would come next?

Thin projects may remain concise project entries until their available material
supports a deeper case study.

## 14. Out of Scope for V1

- CMS or admin interface
- Database-backed content
- Authentication or private portfolio areas
- Runtime comments, likes, analytics dashboards, or social features
- Automated publication from managed repositories
- Automatic creation or exposure of local-only Git remotes
- Invented performance, adoption, revenue, or customer metrics
- A light theme unless later research demonstrates a concrete need

## 15. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Breadth dilutes the AI systems position | Curate the homepage; put breadth in the Work atlas and system maps |
| Non-traditional experience reads as unsupported ambition | Use precise language, real artifacts, validation details, and visible limitations |
| Content becomes inconsistent as projects are added | Typed collections, controlled tags, shared components, and build-time validation |
| Case studies overstate immature work | Use proportional formats and omit unsupported sections or claims |
| The Signal Library becomes an uncurated link dump | Require annotation, relevance, and a clear relationship to work or interests |
| Visual polish obscures substance | Keep motion restrained and make architecture, decisions, and usable content primary |
| Private or local system details leak publicly | Require explicit public-source review and release-blocking output inspection |

## 16. Approved Decisions

- Evidence-led AI systems positioning with broader systems-building depth.
- Honest non-traditional path; credibility comes from how the work is reasoned
  about, built, and validated.
- Dark-mode-first visual direction.
- Capability-oriented public language; avoid overusing “proof” and literal
  project descriptions.
- Chief of Staff, LifeOS, and Alpha Screener as initial flagship case studies.
- Signal Library as a prominent living centerpiece.
- Scalable project atlas and cross-project system maps for future additions.
- Toned-down case-study structure without mandatory stakes or contribution
  sections.
- Astro static-first architecture with typed repository-owned content.
- No CMS, database, or runtime backend in V1.
- Development and production-preview URLs are mandatory implementation
  handoff artifacts.

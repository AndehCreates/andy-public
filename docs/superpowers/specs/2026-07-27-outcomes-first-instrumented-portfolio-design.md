# Outcomes-first instrumented portfolio design

**Date:** 2026-07-27  
**Status:** Approved direction; awaiting written-spec review  
**Scope:** Homepage and reusable portfolio-surface visual language

## Intent

Give the public portfolio a more authored, bespoke character without turning it
into a faux developer dashboard. The portfolio should feel like a coherent
systems practice: calm, precise, technically literate, and rewarding to inspect.

The first viewport must sell the human and product consequence of the work. The
deeper engineering vocabulary and evidence should make that promise credible;
they must not substitute for it.

## Narrative order

1. **Human outcome:** Build systems people can use and trust when context gets
   complex.
2. **Recognizable problems:**
   - Keep control while work becomes AI-assisted.
   - Make intentions workable in the time that is actually available.
   - Act with uncertainty visible, not hidden.
3. **Concrete systems:** Chief of Staff, LifeOS, and Alpha Screener connect each
   problem to a reviewed portfolio artifact.
4. **Engineering depth:** authority, continuity, and evidence explain how the
   work earns those outcomes within individual case studies and maps.

## LifeOS framing

LifeOS must not be represented primarily as an interruption-recovery tool. Its
public framing concerns managing personal activity across time: desired and
committed activity aligned with the time a person actually has.

Approved short form:

> Intentions, commitments, and time brought into a workable view.

Interruption recovery remains an important deeper detail: a continuity mechanism
that helps the plan survive when real life changes it.

## Visual language

The existing dark editorial system remains the foundation. Add a restrained
instrument-panel grammar as reusable, content-bearing detail:

- small mono status lines and sequence labels;
- bounded system modules with simple borders and readable labels;
- compact rails or state markers only when they convey a real relationship;
- deliberate cyan, violet, green, and amber semantics rather than generic
  decorative accents.

Token semantics are fixed:

- cyan communicates structure, navigation, and system linkage;
- violet identifies the Signal Library and exploratory content;
- green identifies reviewed, verified, or completed evidence states only;
- amber discloses a caution, limitation, or tradeoff only, never uptime or live
  health.

Rails and markers are decorative only when paired with visible text labels.
Do not use pulsing, meters, sparklines, timestamps, or numeric counters unless
they are backed by real public data.

The visual grammar must never imply live telemetry, monitoring, or unsupported
operational status. It is structural wayfinding, not a dashboard simulation.

## Homepage composition

The homepage hero retains its current two-column composition and primary action.
Its supporting module changes from an abstract system-signals diagram to a
plain-language "What the work helps people do" module with the three outcomes
above. The three selected-system cards use concise verbs:

| System | Verb | Public outcome |
| --- | --- | --- |
| Chief of Staff | Coordinate | AI-assisted work with human control intact. |
| LifeOS | Align | Intentions, commitments, and time brought into a workable view. |
| Alpha Screener | Evaluate | Decision support that keeps uncertainty in view. |

The hero module contains a section heading and three outcome rows. Each row has
one plain-language outcome sentence and visibly names its reviewed system.

Featured-system cards retain a scannable credibility layer: verb, public
outcome, one decision or tradeoff signal, one evidence or validation signal,
and a case-study link. The homepage may simplify engineering vocabulary, but it
must not remove visible credibility in favor of verb-only marketing.

Authority, continuity, and evidence remain visible in the case-study and system
map layers, where a reader has context for their meaning.

## Guardrails

- Preserve the approved evidence-first editorial standard and publication gates.
- Do not add unsupported metrics, live-state claims, private operational detail,
  or a generic "AI dashboard" treatment.
- Keep the no-JavaScript core usable and ensure all instrumented details have
  plain text equivalents.
- Preserve the existing mobile More disclosure and compact navigation behavior.
- Reuse shared tokens/components; do not create one-off decorative variants per
  page.

## Acceptance criteria

- A first-time hiring manager can identify the three work outcomes in the
  homepage hero without needing to understand internal system vocabulary.
- The interface has a recognizable visual signature but still reads as an
  editorial portfolio, not an app dashboard.
- LifeOS visibly communicates the intention-to-time proposition.
- The hero summary and LifeOS featured card use the intention, commitment, and
  time framing; conversation copy does not position LifeOS primarily as
  recovery after interruption.
- A hiring manager can map each outcome to one named reviewed system within the
  first viewport, which includes both plain-language benefit copy and at least
  one visible credibility cue.
- Featured-system cards remain scannable at mobile width without becoming badge
  noise.
- No new homepage element implies live status, telemetry, or unsupported
  operational recency.
- All visual modules add semantic content and remain accessible at desktop and
  mobile widths.
- Case studies retain the deeper authority, continuity, and evidence story with
  no new or inflated claims.

## Validation

- Add or update homepage content assertions for the outcome-led language and
  LifeOS framing.
- Run content audit, type checks, unit tests, build, and existing browser checks.
- Inspect desktop and mobile home, Work, LifeOS case study, and a system map in
  a real browser; confirm no horizontal overflow, readable contrast, and a
  coherent hierarchy.
- Preserve hero focus order: primary CTA, secondary links, then outcome-module
  links when rows are interactive. Noninteractive rows must not look clickable.
- Hide decorative rails, markers, and sequence labels from assistive technology
  unless their meaning is not already expressed in text.
- On mobile, stack the outcomes module before featured systems, preserve the
  current compact navigation and More behavior, and introduce no horizontal
  overflow.
- Do not continuously animate instrumented accents; retain optional entrance
  motion only when it is disabled by reduced-motion preferences.

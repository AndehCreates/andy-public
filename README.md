# Andy Public Portfolio

This repository is the source for a public portfolio about building software and
AI systems that strengthen human capability. It is intended to show how the
work is framed, designed, validated, and communicated--not to imply a traditional
professional background that is not present.

The portfolio should let a hiring manager, collaborator, or partner quickly see
two things:

1. a coherent point of view on reliable, human-centered AI systems; and
2. concrete evidence that those ideas have been turned into working software.

## Current state

The product direction and implementation sequence are approved. The application
has **not** been scaffolded yet, so there is no real portfolio dev server in this
repository today. The previous visual companion is a design aid, not the product.

The next implementation run starts with Task 1 of the plan, builds through the
sanitized evidence inventory in Task 5, and then stops for the required human
review before any project or case-study claims are published in Task 6.

## Canonical documents

- [Product and design specification](docs/superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md)
- [Executable implementation plan](docs/superpowers/plans/2026-07-21-public-ai-systems-portfolio.md)
- [Implementation handoff](docs/IMPLEMENTATION_HANDOFF.md)
- [Documentation index](docs/README.md)
- [Repository instructions](AGENTS.md)

When documents disagree, use the authority order in `AGENTS.md`.

## Product direction

The approved V1 is a dark, static-first Astro site with typed repository-owned
content. Its core surfaces are:

- a focused homepage led by "Software that strengthens human capability";
- a project atlas covering flagship and supporting work;
- three evidence-backed case studies with diagrams;
- a short engineering handbook describing principles and repeatable patterns;
- a Signal Library for useful resources, homelab notes, and adjacent interests;
- About and resume surfaces that present a nontraditional path honestly and
  professionally.

The editorial standard is straightforward: every public artifact must explain
what it solves, who benefits, how decisions were made, how it was validated,
which tradeoffs remain, and what comes next.

## Engineering principles

- Ground systems in trusted knowledge and visible provenance.
- Keep humans in control of consequential decisions.
- Prefer modular boundaries and replaceable parts.
- Evaluate behavior instead of relying on demos or intuition alone.
- Make operations, failure modes, and recovery paths legible.
- Connect technical choices to human or customer value.

## Implementation contract

- Use Astro 6, strict TypeScript, typed content collections, MDX, and static
  output as specified in the plan.
- Keep core content and navigation usable without client JavaScript.
- Treat publication state, source availability, and public review as separate
  concepts.
- Never expose secrets, private paths, private hosts, personal data, or
  unsupported claims in generated output.
- Keep local source-location mappings untracked and outside public content.
- Preserve the calm dark visual direction; use progressive enhancement only
  where it materially improves the experience.
- End implementation with working development and production-preview URLs, not
  only a successful build.

## Expected verification

Once the application is scaffolded, the plan requires type and Astro checks,
unit tests, content audits, production builds, browser tests, accessibility
checks, no-JavaScript coverage, responsive inspection, and smoke tests against
both development and production-preview servers.

Do not invent commands before Task 1 creates the package scripts. The executable
commands and expected URLs are defined in the implementation plan.

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

The portfolio is implemented as a static-first Astro 6 application with strict
TypeScript, typed content collections, MDX, automated content/output audits,
unit tests, and Playwright browser coverage. Repository-owned content currently
includes projects, case studies, cross-project system maps, handbook entries,
and Signal Library entries.

A GitHub Pages workflow builds and deploys the portfolio from
`codex/public-ai-systems-portfolio-v1`. The repository containing a built
application does not imply that a local development or preview server is
currently running; use the package scripts below and verify the reported URL in
the current session when a runtime handoff is required.

Public portfolio membership is deliberately separate from internal project
management. A project being registered with Chief of Staff, present in another
portfolio registry, or available as source does **not** publish it here. New or
changed public project and case-study claims still require source-backed
evidence plus the repository's explicit editorial/privacy review before their
publication state is advanced.

## Canonical documents

- [Product and design specification](docs/superpowers/specs/2026-07-21-public-ai-systems-portfolio-design.md)
- [Executable implementation plan](docs/superpowers/plans/2026-07-21-public-ai-systems-portfolio.md)
- [Implementation handoff](docs/IMPLEMENTATION_HANDOFF.md) — historical
  pre-scaffold implementation handoff; preserve it as provenance rather than
  treating its repository snapshot as current runtime state
- [Documentation index](docs/README.md)
- [Repository instructions](AGENTS.md)

When documents disagree, use the authority order in `AGENTS.md`. For current
implementation behavior, inspect the repository, content contracts, tests, and
build output rather than relying on an older status snapshot.

## Product direction

The approved V1 is a dark, static-first Astro site with typed repository-owned
content. Its core surfaces are:

- a focused homepage led by "Software that strengthens human capability";
- a project atlas covering flagship and supporting work;
- evidence-backed case studies with diagrams;
- a short engineering handbook describing principles and repeatable patterns;
- a Signal Library for useful resources, homelab notes, and adjacent interests;
- About and resume surfaces that present a nontraditional path honestly and
  professionally.

Within the wider Human Capability Ecosystem, this repository is the public
translation and experimentation surface: it projects public-safe mental models,
tests whether their explanations are understood, and routes questions or
contradictions back as reviewed learning candidates. It is not the reference
authority, and public response never mutates upstream knowledge or intent
automatically. See the [public learning-loop doctrine](docs/human-capability-public-learning-loop.md).

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

- Keep the Astro 6 application static-first, with strict TypeScript, typed
  content collections, MDX, and static output.
- Keep core content and navigation usable without client JavaScript.
- Treat publication state, source availability, and public review as separate
  concepts.
- Never expose secrets, private paths, private hosts, personal data, or
  unsupported claims in generated output.
- Keep local source-location mappings untracked and outside public content.
- Preserve the calm dark visual direction; use progressive enhancement only
  where it materially improves the experience.
- For runtime handoff work, verify real development and production-preview URLs
  rather than treating a successful build as a running server.

## Development and verification

Install the checked-in dependency set with:

```bash
npm ci
```

Use the repository-owned scripts rather than commands copied from historical
plans:

```bash
npm run dev            # Astro development server on loopback
npm run check          # Astro / TypeScript checks
npm run test           # Vitest suite
npm run audit:content  # public-content contract audit
npm run build          # check + test + content audit + static build + dist audit
npm run preview        # production preview on loopback
npm run verify         # full build plus Playwright end-to-end verification
```

The full browser/accessibility/no-JavaScript gates remain appropriate when
changing public behavior or making a runtime-completion claim. Documentation-only
changes should use the narrowest relevant repository checks plus Git diff
validation unless a broader gate is required by the change.

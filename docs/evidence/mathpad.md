# MathPad evidence inventory

## Public framing

Local-first calculation notebook focused on reliable, expressive calculation workspaces.

## Authoritative sources inspected

- Public repository: `AndehCreates/mathpad` at observed commit `6704730` on `main`.
- `README.md`, `CONTEXT.md`, `DESIGN.md`, `package.json`, calculation-engine and editor source layout, Vitest configuration, and recent commit history.

## Verified capabilities

- Evaluates arithmetic, variables, units, functions, and date/time expressions in a calculation notebook.
- Manages workspaces, sheets, working copies, saved content, and calculation feedback.
- Supports keyboard-oriented editing and exposes diagnostic and developer-inspection surfaces.

## Verified system decisions

- The calculation engine publishes revisioned semantic documents consumed through library-neutral editor ports.
- Workspace-document state is separated from the document-session connection to the calculation engine.
- Semantic styling, result alignment, responsive containment, and accessible state communication are explicit interface contracts.

## Validation evidence

- Repository scripts define lint, automated tests, stress tests, build, and production dependency-audit gates.
- Source includes unit-test configuration and recent commits that add command-palette keyboard-navigation coverage.

## Human or customer value

- Helps people work through multi-line calculations while retaining readable results, units, context, and error feedback.

## Known limitations

- The repository explicitly treats reverse-engineered behavior as characterization evidence, not complete parity with another calculation product.
- Release readiness requires the documented automated and browser checks on the same revision; those checks were inspected but not rerun for this inventory.

## Public-safe diagrams and media

- A sanitized diagram may show: workspace document state -> revisioned semantic document -> editor and result adapters -> feedback and inspection views.
- Consider only newly created, reviewed interface captures; no existing local artifact is approved for reuse here.

## Claims not currently supported

- Complete compatibility with any commercial calculation product.
- Production adoption, performance guarantees, or quantitative reliability claims.

## Candidate project and case-study copy

Draft only: “MathPad explores how a local-first calculation workspace can keep parsing, results, diagnostics, and editor behavior coherent through a shared semantic document contract.”

## Review date and public-review decision

- Review date: 2026-07-21.
- `publicationState`: pending.
- `sourceAvailability`: public.
- `publicReview`: pending user approval; no public route or project entry is authorized.

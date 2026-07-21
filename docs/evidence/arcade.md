# Arcade Workbench evidence inventory

## Public framing

Interactive-systems workbench for deterministic canvas games, tunable simulation, and inspectable gameplay behavior.

## Authoritative sources inspected

- Public repository: `AndehCreates/arcade` at observed commit `0490ff0` on `main`.
- `README.md`, `DESIGN.md`, `package.json`, source and test layout, Playwright/Vitest configuration, and recent commit history.

## Verified capabilities

- Provides Loop Lab and a top-down Arena Shooter behind a shared tuning and telemetry shell.
- Implements seeded runs, restart-only tuning, maps, collision, line-of-sight, bots, hitscan weapons, fog/visibility states, and input controls.
- Provides in-product telemetry and development-only semantic debug state for browser automation.

## Verified system decisions

- Game modes share simulation contracts while retaining their own gameplay surfaces.
- Tunable values become pending changes and apply only through an explicit restart path, preserving active-run determinism.
- Visibility, map geometry, bot behavior, and player-facing feedback are designed to avoid leaking hidden actor state.

## Validation evidence

- Repository scripts cover formatting, static checks, type checks, unit tests, production build, and end-to-end browser tests.
- The documented Playwright scope covers controls, maps, combat, deterministic completion, configuration transitions, audio preferences, and input cancellation.

## Human or customer value

- Makes simulation behavior easier to explore and debug by pairing playable systems with explicit tuning, observability, and predictable restart semantics.

## Known limitations

- The evidence supports a workbench and game experiment, not a claim of a broadly released game product.
- Validation commands and browser scenarios were inspected but not rerun for this inventory.

## Public-safe diagrams and media

- A sanitized diagram may show: configuration -> deterministic run -> simulation systems -> canvas experience and telemetry.
- Reviewed gameplay captures may be candidates after separate asset and public-content review.

## Claims not currently supported

- Player, commercial, accessibility-certification, or performance metrics.
- Claims that automation proves all gameplay quality or balance outcomes.

## Candidate project and case-study copy

Draft only: “Arcade Workbench pairs deterministic canvas simulations with restart-safe tuning and telemetry so interactive behavior can be played, observed, and refined.”

## Review date and public-review decision

- Review date: 2026-07-21.
- `publicationState`: pending.
- `sourceAvailability`: public.
- `publicReview`: pending user approval; no public route or project entry is authorized.

# V1 readiness record

**Recorded:** 2026-07-21 (America/Denver)  
**Revision verified:** `43803a7748e428e2e3e9f18cf0524547a767fa39` (`43803a7`, `test: enforce public portfolio quality gates`)  
**Git state at verification:** detached `HEAD`; no pre-existing uncommitted changes.

## Result

The static V1 artifact is locally ready for a hosting/domain decision. This is
not evidence of a public deployment: no public host or domain has been
configured or verified.

## Automated quality gate

`npm run verify` completed successfully. It ran `npm run build` followed by
Playwright coverage.

| Check | Result |
| --- | --- |
| `astro check` | 0 errors, 0 warnings, 1 deprecation hint (`z.string().url()` in `src/content.config.ts`) |
| Vitest | 10 files, 28 tests passed |
| `npm run audit:content` | Passed; public dispositions: projects 3 featured / 2 listed / 1 draft; case studies 3 featured / 1 draft; systems 3 featured / 1 draft; handbook 4 featured / 1 draft; signals 1 featured / 3 listed / 1 draft |
| Static build | Passed; 28 pages generated |
| `npm run audit:dist` | Passed; 28 HTML files checked |
| Playwright | 17 tests passed across Chromium and Chromium-without-JavaScript |

The Playwright set exercises route publication and exclusion rules, homepage
narrative, keyboard-operated Work filtering, no-JavaScript availability,
accessibility (including axe), reduced-motion behavior, and responsive layouts.

## Runtime evidence

Fresh local servers were started after the automated gate and were independently
smoke-tested with HTTP requests.

| Surface | URL | Evidence |
| --- | --- | --- |
| Development server | http://127.0.0.1:4321/ | `npm run dev -- --port 4321`; all 28 checked routes returned HTTP 200 |
| Production preview | http://127.0.0.1:4322/ | `npm run preview -- --port 4322`; all 28 checked routes returned HTTP 200 from `dist/` |

Routes checked against both servers (28 each): `/`, `/work/` and its five
public project details, `/case-studies/` and its three public details,
`/systems/` and its three public details, `/handbook/` and its four public
details, `/signals/` and its four public details, `/about/`, `/resume/`, and
`/rss.xml`.

## Publication and sanitization evidence

The content audit and distribution audit both passed. The content contract keeps
draft/internal material out of published surfaces, and the distribution audit
checks rendered static HTML for broken local references, sanitizer patterns, and
internal/draft markers. The local-only Chief of Staff narrative is also covered
by a dedicated route test that asserts there are no source links or private
location details.

## Browser and visual evidence

Automated browser evidence is current: 17 Playwright checks passed using desktop
Chromium, including 375, 768, 1280, and 1536 pixel responsive coverage and the
no-JavaScript project. The in-app browser control is policy-blocked in this
task, so no manual in-app visual inspection is claimed. No runtime or automated
browser defect was observed that warranted a code change.

## Final checks and known limitations

- `git diff --check` passed.
- `git status --short --branch` was clean before this readiness record was
  created; the expected remaining change is this uncommitted record.
- The Astro check deprecation hint is non-blocking and did not produce warnings
  or errors; it should be addressed during a dependency/API-maintenance pass.
- The two URLs are local-only and depend on their respective running processes.
- A public hosting target, domain, and production deployment verification remain
  an explicit next decision.

# Evidence candidate intake

This directory holds sanitized editorial input for potential future portfolio content. Candidate JSON is not published content and does not create a public project, case study, system, handbook entry, or signal.

Keep every candidate limited to public-safe editorial language. Do not include local or repository paths, hosts or URLs for private services, credentials or tokens, personal data, or unsupported delivery, performance, or operational claims. The shared public-content sanitizer enforces this boundary.

Candidates retain the required `state` and `publicSafety` fields. A candidate cannot become `review-ready` or `published` while `publicSafety` is `pending`; publishing additionally requires a recorded portfolio revision. Destination references are editorial intent only: the destination content must still satisfy its own `visibility` and `publicReview` requirements before it can appear publicly.

Run `npm run audit:evidence-candidates` to validate non-fixture JSON files in this directory. Files beginning with `_` are intentionally ignored so `_fixture.json` can remain a non-public test fixture.

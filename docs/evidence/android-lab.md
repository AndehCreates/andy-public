# Android Lab evidence inventory

## Public framing

Learning-oriented device-intelligence lab that makes sensor behavior observable without overstating what a single signal proves.

## Authoritative sources inspected

- Local-only project at observed commit `1f3186b` on feature branch `feature/capability-studio-android-device-lab-local`; no public repository remote was observed.
- `README.md`, Capability Studio and Sensor Workbench specifications, root package scripts, Android and browser source layout, Kotlin test layout, and recent commit history.

## Verified capabilities

- Defines a browser Studio, native Android Device Lab, and shared learning-oriented workspace boundaries.
- Android Device Lab source covers sensor streaming plus tilt, gyro, ambient, proximity, pressure, magnetic-cover, and sensor-discovery models.
- The sensor workbench provides availability states, raw readings, app-local instrument responses, and a reachable raw sensor catalog.

## Verified system decisions

- The learning loop is Observe -> Understand -> Experiment -> Leverage, with honest distinctions among live hardware, fixtures, simulations, and planned work.
- Sensor acquisition is separated from pure interpretation models and UI drawing.
- Only one sensor session is active; navigation, stop, backgrounding, and registration failure have explicit listener-lifecycle behavior.

## Validation evidence

- Repository scripts define web validation/tests/build plus Android test/build/verification entry points.
- Kotlin unit-test sources cover sensor stream lifecycle, availability, and instrument transformations; generated test-result artifacts were present.
- The project states that physical-device verification is not yet complete and must not be implied.

## Human or customer value

- Helps learners connect a real device signal to observable behavior, its limits, and familiar product uses without confusing an experiment with system control.

## Known limitations

- Browser Studio and native Android surfaces are explicitly in progress rather than shipped.
- Hardware verification is explicitly not complete; device-specific sensor behavior must not be generalized.
- The source is local-only and has uncommitted work, requiring separate public review before any narrative or media use.

## Public-safe diagrams and media

- A sanitized diagram may show: sensor catalog -> single managed stream -> pure instrument model -> accessible instrument view with boundary explanation.
- Use only newly reviewed diagrams or captures that clearly label execution surface and avoid device-specific identifiers.

## Claims not currently supported

- Physical-device validation, control of operating-system features, precise heading or altitude, gesture/identity inference, or hardware compatibility claims.
- Claims of production release, cloud synchronization, or background sensor logging.

## Candidate project and case-study copy

Draft only: “Android Lab turns raw device signals into small, inspectable experiments that teach both a sensor’s product relevance and the boundary of what it can establish.”

## Review date and public-review decision

- Review date: 2026-07-21.
- `publicationState`: pending.
- `sourceAvailability`: local-only.
- `publicReview`: pending user approval; no public route, source link, or project entry is authorized.

import { expect, it } from 'vitest';
import {
  auditEntries,
  auditEvidenceDocuments,
  collectProjectPresentationStrings,
  isAuditableContentFile,
  validateSignalAtlasEntries,
} from '../../scripts/audit-public-content';
import { canonicalRelationId } from '../../src/lib/content/relations';
import { toSignalAtlasRecord, type SignalAtlasConfig } from '../../src/lib/content/signalAtlas';

it('excludes underscored fixture filenames from the standalone content audit', () => {
  expect(isAuditableContentFile('projects/_fixture.mdx')).toBe(false);
  expect(isAuditableContentFile('projects/reliable-ai.mdx')).toBe(true);
});

it('accepts a public relationship that resolves through a canonical authored ID', () => {
  const projectId = canonicalRelationId('projects', 'chief-of-staff');
  const systemId = canonicalRelationId('systems', 'reliable-ai-work');

  expect(() => auditEntries([
    {
      id: projectId,
      slug: 'chief-of-staff',
      collection: 'projects',
      visibility: 'listed',
      publicReview: 'approved',
      sourceAvailability: 'local-only',
      sourceUrls: [],
      relatedIds: [systemId],
      title: 'Chief of Staff',
      summary: 'A reviewed orchestration system with explicit operator controls.',
      body: 'Public-safe project narrative.',
    },
    {
      id: systemId,
      slug: 'reliable-ai-work',
      collection: 'systems',
      visibility: 'listed',
      publicReview: 'approved',
      sourceAvailability: 'local-only',
      sourceUrls: [],
      relatedIds: [],
      title: 'Reliable AI work',
      summary: 'A cross-project system map for reliable AI architecture patterns.',
      body: 'Public-safe system narrative.',
    },
  ])).not.toThrow();
});

it('rejects a public case study whose related project is not approved for public content', () => {
  expect(() => auditEntries([
    {
      id: canonicalRelationId('caseStudies', 'chief-of-staff'),
      slug: 'chief-of-staff',
      collection: 'caseStudies',
      visibility: 'featured',
      publicReview: 'approved',
      sourceAvailability: 'local-only',
      sourceUrls: [],
      relatedIds: [],
      projectId: 'project-chief-of-staff',
      title: 'Chief of Staff',
      summary: 'A reviewed case study that depends on an approved project presentation.',
      body: 'Public-safe case study narrative.',
    },
    {
      id: canonicalRelationId('projects', 'project-chief-of-staff'),
      slug: 'chief-of-staff',
      collection: 'projects',
      visibility: 'listed',
      publicReview: 'pending',
      sourceAvailability: 'local-only',
      sourceUrls: [],
      relatedIds: [],
      title: 'Chief of Staff',
      summary: 'A pending project record that must not be joined into a public case study.',
      body: 'Pending project narrative.',
    },
  ])).toThrowError(
    /caseStudies:chief-of-staff: project: Project "project-chief-of-staff" is not approved for public content\./,
  );
});

it('groups evidence sanitizer findings by file and rule', () => {
  expect(() => auditEvidenceDocuments([
    {
      filePath: 'docs/evidence/example.md',
      content: 'Observed locally at C:\\private\\example.',
    },
  ])).toThrowError(/Evidence document audit failed:\n- docs\/evidence\/example\.md: windows-path: C:\\private\\example/);
});

it('scans nested public presentation strings with the existing sanitizer rules', () => {
  expect(() => auditEntries([
    {
      id: canonicalRelationId('projects', 'chief-of-staff'),
      slug: 'chief-of-staff',
      collection: 'projects',
      visibility: 'featured',
      publicReview: 'approved',
      sourceAvailability: 'local-only',
      sourceUrls: [],
      relatedIds: [],
      title: 'Chief of Staff',
      summary: 'A reviewed orchestration system with explicit operator controls.',
      body: 'Public-safe project narrative.',
      presentationStrings: collectProjectPresentationStrings({
        workHook: 'Coordinate work without replacing existing authority.',
        diagram: {
          description: 'Diagram provenance: C:\\private\\coordination.',
        },
      }),
    },
  ])).toThrowError(/projects:chief-of-staff: windows-path: C:\\private\\coordination/);
});

const atlasConfig: SignalAtlasConfig = {
  leadSignalId: 'signals:public-signal',
  paths: [
    { id: 'first-path', question: 'What does a complete public Signal establish?', premise: 'Follow the Signal into its reviewed continuation.', readingMinutes: 5, steps: [
      { targetId: 'signals:public-signal', intent: 'inspect', transition: 'The inspected artifact leads into a public continuation.' },
      { targetId: 'caseStudies:route-alpha', intent: 'practice' },
    ] },
  ],
};

function atlasEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: 'signals:public-signal', slug: 'research/public-signal', collection: 'signals' as const,
    visibility: 'listed' as const, publicReview: 'approved' as const, sourceAvailability: 'local-only' as const,
    sourceUrls: [], relatedIds: [], title: 'A complete public Signal', summary: 'A reviewed Signal with structured public presentation fields.', body: 'Public body.',
    signalPresentation: {
      artifactLabel: 'Reviewed readiness gate', finding: 'The artifact keeps promotion decisions inspectable.',
      evidenceSummary: 'Focused tests cover the relevant gate behavior.', evidenceBoundary: 'The test does not establish live outcomes.',
      continueTo: { targetId: 'caseStudies:route-alpha', annotation: 'Continue to inspect the system-level consequence of this gate.' },
    },
    ...overrides,
  };
}

function continuationEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: 'caseStudies:route-alpha', slug: 'alpha-screener', collection: 'caseStudies' as const,
    visibility: 'featured' as const, publicReview: 'approved' as const, sourceAvailability: 'local-only' as const,
    sourceUrls: [], relatedIds: [], projectId: 'alpha-screener', title: 'Alpha Screener', summary: 'A reviewed continuation record for the Signal.', body: 'Public case-study body.',
    ...overrides,
  };
}

it('accepts a complete public Signal and uses the route slug instead of its authored ID', () => {
  expect(validateSignalAtlasEntries([atlasEntry(), continuationEntry()], atlasConfig)).toEqual([]);
  expect(toSignalAtlasRecord({ collection: 'caseStudies', authoredId: 'route-alpha', routeSlug: 'alpha-screener', title: 'Alpha', summary: 'Reviewed case study.', visibility: 'featured', publicReview: 'approved' }).href)
    .toBe('/case-studies/alpha-screener/');
});

it.each([
  ['unknown', undefined],
  ['draft', continuationEntry({ visibility: 'draft' })],
  ['internal', continuationEntry({ visibility: 'internal' })],
  ['pending', continuationEntry({ publicReview: 'pending' })],
])('rejects a %s Signal continuation', (_label, continuation) => {
  const entries = continuation === undefined ? [atlasEntry()] : [atlasEntry(), continuation];
  expect(validateSignalAtlasEntries(entries, atlasConfig).join('\n')).toMatch(/continuation|caseStudies:route-alpha/i);
});

it.each(['evidenceSummary', 'evidenceBoundary'] as const)('requires signalPresentation.%s', (field) => {
  const presentation = { ...atlasEntry().signalPresentation, [field]: undefined };
  expect(validateSignalAtlasEntries([atlasEntry({ signalPresentation: presentation }), continuationEntry()], atlasConfig).join('\n')).toMatch(new RegExp(field));
});

it('requires a continuation annotation and reports unsafe structured strings', () => {
  const presentation = { ...atlasEntry().signalPresentation, evidenceSummary: 'token=private-value', continueTo: { targetId: 'caseStudies:route-alpha', annotation: '   ' } };
  expect(validateSignalAtlasEntries([atlasEntry({ signalPresentation: presentation }), continuationEntry()], atlasConfig).join('\n'))
    .toMatch(/annotation|secret-assignment/i);
});

it('reports a private Windows path nested in a Signal continuation annotation', () => {
  const presentation = {
    ...atlasEntry().signalPresentation,
    continueTo: {
      targetId: 'caseStudies:route-alpha',
      annotation: 'Continue through the reviewed artifact at C:\\private\\signal.',
    },
  };
  expect(validateSignalAtlasEntries([atlasEntry({ signalPresentation: presentation }), continuationEntry()], atlasConfig).join('\n'))
    .toMatch(/windows-path: C:\\private\\signal/);
});

it('includes resolver configuration failures while leaving unrelated non-Signal entries unaffected', () => {
  const invalid = { ...atlasConfig, leadSignalId: 'signals:missing' };
  const unrelated = continuationEntry({ collection: 'systems', id: 'systems:unrelated', slug: 'unrelated' });
  expect(validateSignalAtlasEntries([atlasEntry(), continuationEntry(), unrelated], invalid).join('\n')).toMatch(/Lead Signal/i);
});

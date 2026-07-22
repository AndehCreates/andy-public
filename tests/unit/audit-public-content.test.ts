import { expect, it } from 'vitest';
import {
  auditEntries,
  auditEvidenceDocuments,
  collectProjectPresentationStrings,
  isAuditableContentFile,
} from '../../scripts/audit-public-content';
import { canonicalRelationId } from '../../src/lib/content/relations';

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

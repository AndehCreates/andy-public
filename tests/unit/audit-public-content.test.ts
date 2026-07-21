import { expect, it } from 'vitest';
import { auditEntries, auditEvidenceDocuments, isAuditableContentFile } from '../../scripts/audit-public-content';
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

it('groups evidence sanitizer findings by file and rule', () => {
  expect(() => auditEvidenceDocuments([
    {
      filePath: 'docs/evidence/example.md',
      content: 'Observed locally at C:\\private\\example.',
    },
  ])).toThrowError(/Evidence document audit failed:\n- docs\/evidence\/example\.md: windows-path: C:\\private\\example/);
});

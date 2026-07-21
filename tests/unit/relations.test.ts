import { expect, it } from 'vitest';
import { canonicalRelationId, validatePublicRelations } from '../../src/lib/content/relations';
import type { RelatedRecord } from '../../src/lib/content/types';

const approved = { visibility: 'listed' as const, publicReview: 'approved' as const };

it('creates relation IDs from the collection and authored stable ID', () => {
  expect(canonicalRelationId('projects', 'chief-of-staff')).toBe('projects:chief-of-staff');
});

it('rejects a public entry that references an internal entry', () => {
  const errors = validatePublicRelations(
    { id: 'project:public', relatedIds: ['system:private'], ...approved },
    new Map<string, RelatedRecord>([
      ['project:public', approved],
      ['system:private', { visibility: 'internal' as const, publicReview: 'approved' as const }],
    ]),
  );

  expect(errors).toEqual(['Related entry "system:private" is internal and cannot be referenced by public content.']);
});

it('rejects missing related IDs', () => {
  const errors = validatePublicRelations(
    { id: 'project:public', relatedIds: ['system:missing'], ...approved },
    new Map([['project:public', approved]]),
  );

  expect(errors).toEqual(['Related entry "system:missing" does not exist.']);
});

it('allows nonpublic content to retain editorial relationships', () => {
  expect(
    validatePublicRelations(
      { id: 'project:draft', relatedIds: ['system:private'], visibility: 'draft', publicReview: 'pending' },
      new Map([['system:private', { visibility: 'internal', publicReview: 'pending' }]]),
    ),
  ).toEqual([]);
});

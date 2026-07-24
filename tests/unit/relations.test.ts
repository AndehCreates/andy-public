import { expect, it } from 'vitest';
import {
  buildInverseRelationship,
  canonicalRelationId,
  relationTypeValues,
  relationshipEdgeSchema,
  resolveRelationshipPathways,
  validatePublicRelations,
} from '../../src/lib/content/relations';
import type { RelatedRecord } from '../../src/lib/content/types';

const approved = { visibility: 'listed' as const, publicReview: 'approved' as const };
const publicTarget = {
  title: 'Modular architecture',
  href: '/handbook/modular-architecture/',
  ...approved,
};

it('creates relation IDs from the collection and authored stable ID', () => {
  expect(canonicalRelationId('projects', 'chief-of-staff')).toBe('projects:chief-of-staff');
});

it('defines every approved typed relation', () => {
  expect(relationTypeValues).toEqual([
    'part-of',
    'governs',
    'provides-context-to',
    'coordinates',
    'executes-through',
    'built-through',
    'validates',
    'informed-by',
    'applies-principle',
    'related-to',
  ]);
});

it('rejects a public entry that references an internal entry through legacy relatedIds', () => {
  const errors = validatePublicRelations(
    { id: 'project:public', relatedIds: ['system:private'], ...approved },
    new Map<string, RelatedRecord>([
      ['project:public', approved],
      ['system:private', { visibility: 'internal' as const, publicReview: 'approved' as const }],
    ]),
  );

  expect(errors).toEqual(['Related entry "system:private" is internal and cannot be referenced by public content.']);
});

it('rejects missing legacy related IDs', () => {
  const errors = validatePublicRelations(
    { id: 'project:public', relatedIds: ['system:missing'], ...approved },
    new Map([['project:public', approved]]),
  );

  expect(errors).toEqual(['Related entry "system:missing" does not exist.']);
});

it('requires relationship targets, annotations, and evidence notes for lineage relations', () => {
  expect(relationshipEdgeSchema.safeParse({
    target: 'handbook:modular-architecture',
    type: 'applies-principle',
    annotation: 'LifeOS uses explicit authority boundaries to preserve continuity.',
  }).success).toBe(true);

  expect(relationshipEdgeSchema.safeParse({
    target: 'systems:cognitive-infrastructure',
    type: 'built-through',
    annotation: 'This project was built through the cognitive-infrastructure workflow.',
  }).success).toBe(false);

  expect(relationshipEdgeSchema.safeParse({
    target: 'modular-architecture',
    type: 'applies-principle',
    annotation: 'Missing collection prefix.',
  }).success).toBe(false);
});

it('groups typed relationships into natural pathways and emits an inverse pathway when the target is public', () => {
  const pathway = resolveRelationshipPathways(
    {
      relationshipEdges: [{
        target: 'handbook:modular-architecture',
        type: 'applies-principle',
        annotation: 'LifeOS uses explicit authority boundaries to preserve continuity.',
      }],
    },
    new Map([['handbook:modular-architecture', { id: 'handbook:modular-architecture', ...publicTarget }]]),
  );

  expect(pathway).toEqual([{
    group: 'principle',
    heading: 'See the principle in practice',
    items: [{
      title: 'Modular architecture',
      href: '/handbook/modular-architecture/',
      annotation: 'LifeOS uses explicit authority boundaries to preserve continuity.',
    }],
  }]);

  expect(buildInverseRelationship(
    { title: 'LifeOS', href: '/work/lifeos/' },
    {
      target: 'handbook:modular-architecture',
      type: 'applies-principle',
      annotation: 'LifeOS uses explicit authority boundaries to preserve continuity.',
    },
    { id: 'handbook:modular-architecture', ...publicTarget },
  )).toEqual({
    group: 'principle',
    heading: 'See the principle in practice',
    items: [{
      title: 'LifeOS',
      href: '/work/lifeos/',
      annotation: 'Modular architecture applied by LifeOS.',
    }],
  });
});

it('rejects typed relationships to missing or nonpublic targets', () => {
  expect(
    validatePublicRelations(
      {
        id: 'projects:project-lifeos',
        relatedIds: [],
        relationshipEdges: [{
          target: 'handbook:modular-architecture',
          type: 'applies-principle',
          annotation: 'LifeOS uses explicit authority boundaries to preserve continuity.',
        }],
        ...approved,
      },
      new Map(),
    ),
  ).toEqual(['Relationship target "handbook:modular-architecture" does not exist.']);
});

it('allows nonpublic content to retain editorial relationships', () => {
  expect(
    validatePublicRelations(
      {
        id: 'project:draft',
        relatedIds: ['system:private'],
        relationshipEdges: [{
          target: 'handbook:modular-architecture',
          type: 'applies-principle',
          annotation: 'Drafts can retain editorial work in progress.',
        }],
        visibility: 'draft',
        publicReview: 'pending',
      },
      new Map([['system:private', { visibility: 'internal', publicReview: 'pending' }]]),
    ),
  ).toEqual([]);
});

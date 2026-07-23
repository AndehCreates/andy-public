import { z } from 'astro/zod';
import { publicString, relationIdSchema } from './catalog';
import { canPublish } from './publication';
import type { ContentCollectionName, RelatedRecord } from './types';
import type { PublicReview, Visibility } from './publication';

export const relationTypeValues = [
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
] as const;

export type RelationType = (typeof relationTypeValues)[number];
export type RelationshipGroup = 'understand' | 'principle' | 'evidence' | 'related' | 'lineage';

export const relationshipHeadingByGroup: Record<RelationshipGroup, string> = {
  understand: 'Understand the system',
  principle: 'See the principle in practice',
  evidence: 'Follow the evidence',
  related: 'Explore related work',
  lineage: 'Trace how this was built',
};

const lineageRelationTypes = new Set<RelationType>(['built-through', 'validates', 'informed-by']);

export const relationPresentation = {
  'part-of': { group: 'understand', inverse: 'contains' },
  governs: { group: 'understand', inverse: 'governed-by' },
  'provides-context-to': { group: 'understand', inverse: 'receives-context-from' },
  coordinates: { group: 'understand', inverse: 'coordinated-by' },
  'executes-through': { group: 'lineage', inverse: 'executes' },
  'built-through': { group: 'lineage', inverse: 'helped-build' },
  validates: { group: 'evidence', inverse: 'validated-by' },
  'informed-by': { group: 'evidence', inverse: 'informs' },
  'applies-principle': { group: 'principle', inverse: 'applied-by' },
  'related-to': { group: 'related', inverse: 'related-to' },
} as const satisfies Record<RelationType, { group: RelationshipGroup; inverse: string }>;

export const relationshipEdgeSchema = z.object({
  target: relationIdSchema,
  type: z.enum(relationTypeValues),
  annotation: publicString,
  inverseAnnotation: publicString.optional(),
  evidenceNote: publicString.optional(),
}).superRefine((edge, context) => {
  if (lineageRelationTypes.has(edge.type) && edge.evidenceNote === undefined) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceNote'],
      message: `${edge.type} relationships require evidenceNote.`,
    });
  }
});

export type RelationshipEdge = z.infer<typeof relationshipEdgeSchema>;

type RelationEntry = {
  id: string;
  relatedIds: string[];
  relationshipEdges?: RelationshipEdge[];
  visibility: Visibility;
  publicReview: PublicReview;
};

export type RelationshipTarget = RelatedRecord & {
  id: string;
  title: string;
  href?: string;
};

export type RelationshipPathway = {
  group: RelationshipGroup;
  heading: string;
  items: Array<{ title: string; href: string; annotation: string }>;
};

export function canonicalRelationId(collection: ContentCollectionName, authoredId: string): string {
  return `${collection}:${authoredId}`;
}

function validateLegacyRelatedIds(entry: RelationEntry, records: Map<string, RelatedRecord>): string[] {
  return entry.relatedIds.flatMap((relatedId) => {
    const related = records.get(relatedId);

    if (!related) return [`Related entry "${relatedId}" does not exist.`];
    if (related.visibility === 'internal') {
      return [`Related entry "${relatedId}" is internal and cannot be referenced by public content.`];
    }
    if (!canPublish(related)) {
      return [`Related entry "${relatedId}" is not approved for public content.`];
    }

    return [];
  });
}

function validateRelationshipEdges(edges: RelationshipEdge[], records: Map<string, RelatedRecord>): string[] {
  return edges.flatMap((edge) => {
    const related = records.get(edge.target);

    if (!related) return [`Relationship target "${edge.target}" does not exist.`];
    if (related.visibility === 'internal') {
      return [`Relationship target "${edge.target}" is internal and cannot be referenced by public content.`];
    }
    if (!canPublish(related)) {
      return [`Relationship target "${edge.target}" is not approved for public content.`];
    }
    if (lineageRelationTypes.has(edge.type) && edge.evidenceNote === undefined) {
      return [`Relationship "${edge.type}" targeting "${edge.target}" requires evidenceNote.`];
    }

    return [];
  });
}

export function validatePublicRelations(
  entry: RelationEntry,
  records: Map<string, RelatedRecord>,
): string[] {
  if (!canPublish(entry)) return [];

  return [
    ...validateLegacyRelatedIds(entry, records),
    ...validateRelationshipEdges(entry.relationshipEdges ?? [], records),
  ];
}

export function resolveRelationshipPathways(
  entry: Pick<RelationEntry, 'relationshipEdges'>,
  records: Map<string, RelationshipTarget>,
): RelationshipPathway[] {
  const grouped = new Map<RelationshipGroup, RelationshipPathway>();

  for (const edge of entry.relationshipEdges ?? []) {
    const target = records.get(edge.target);
    if (!target || !canPublish(target) || !target.href) continue;

    const { group } = relationPresentation[edge.type];
    const pathway = grouped.get(group) ?? {
      group,
      heading: relationshipHeadingByGroup[group],
      items: [],
    };

    pathway.items.push({
      title: target.title,
      href: target.href,
      annotation: edge.annotation,
    });
    grouped.set(group, pathway);
  }

  return (['understand', 'principle', 'evidence', 'related', 'lineage'] as const)
    .map((group) => grouped.get(group))
    .filter((pathway): pathway is RelationshipPathway => pathway !== undefined);
}

export function buildInverseRelationship(
  source: { title: string; href: string },
  edge: RelationshipEdge,
  target: RelationshipTarget,
): RelationshipPathway | undefined {
  if (!target.href || !canPublish(target)) return undefined;

  const { group, inverse } = relationPresentation[edge.type];
  return {
    group,
    heading: relationshipHeadingByGroup[group],
    items: [{
      title: source.title,
      href: source.href,
      annotation: edge.inverseAnnotation ?? `${target.title} ${inverse.replaceAll('-', ' ')} ${source.title}.`,
    }],
  };
}

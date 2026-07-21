import { canPublish } from './publication';
import type { RelatedRecord } from './types';
import type { ContentCollectionName } from './types';
import type { PublicReview, Visibility } from './publication';

type RelationEntry = {
  id: string;
  relatedIds: string[];
  visibility: Visibility;
  publicReview: PublicReview;
};

export function canonicalRelationId(collection: ContentCollectionName, authoredId: string): string {
  return `${collection}:${authoredId}`;
}

export function validatePublicRelations(
  entry: RelationEntry,
  records: Map<string, RelatedRecord>,
): string[] {
  if (!canPublish(entry)) return [];

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

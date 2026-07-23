import type { PublicReview, SourceAvailability, Visibility } from './publication';
import type { CapabilityId } from './taxonomy';
import type { CapabilityNarrative, SystemProjection } from './catalog';

export const projectStatusValues = ['active', 'stable', 'experimental', 'archived'] as const;
export type ProjectStatus = (typeof projectStatusValues)[number];

export const contentCollectionNames = ['projects', 'caseStudies', 'systems', 'handbook', 'signals'] as const;
export type ContentCollectionName = (typeof contentCollectionNames)[number];

export type Publishable = {
  visibility: Visibility;
  publicReview: PublicReview;
  order?: number;
  title: string;
};

export type RelatedRecord = Pick<Publishable, 'visibility' | 'publicReview'>;

export type ContentRecord = Publishable & {
  id: string;
  summary: string;
  sourceAvailability: SourceAvailability;
  sourceUrls: string[];
  capabilities: CapabilityId[];
  relatedIds: string[];
  capabilityNarrative?: CapabilityNarrative;
  systemProjection?: SystemProjection;
};

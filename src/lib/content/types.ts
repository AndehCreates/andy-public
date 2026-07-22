import type { PublicReview, SourceAvailability, Visibility } from './publication';
import type { CapabilityId } from './taxonomy';
import type { ProjectPresentation } from './presentation';

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
};

export type ProjectContentRecord = ContentRecord &
  Required<Pick<ProjectPresentation, 'workHook' | 'visualMark' | 'technicalDifferentiator'>> &
  Omit<ProjectPresentation, 'visibility' | 'publicReview' | 'workHook' | 'visualMark' | 'technicalDifferentiator'> & {
  projectId: string;
  status: 'active' | 'stable' | 'experimental' | 'archived';
};

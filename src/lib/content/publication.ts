export const visibilityValues = ['internal', 'draft', 'listed', 'featured'] as const;
export const reviewValues = ['pending', 'approved'] as const;
export const sourceAvailabilityValues = ['public', 'local-only', 'mixed'] as const;

export type Visibility = (typeof visibilityValues)[number];
export type PublicReview = (typeof reviewValues)[number];
export type SourceAvailability = (typeof sourceAvailabilityValues)[number];

export function canPublish(input: { visibility: Visibility; publicReview: PublicReview }) {
  return (input.visibility === 'listed' || input.visibility === 'featured') &&
    input.publicReview === 'approved';
}

export function validateSourcePolicy(input: {
  sourceAvailability: SourceAvailability;
  sourceUrls: string[];
}) {
  return input.sourceAvailability === 'public' && !input.sourceUrls.some((sourceUrl) => sourceUrl.trim())
    ? ['A public source URL is required when sourceAvailability is public.']
    : [];
}

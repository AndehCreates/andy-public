import { expect, it } from 'vitest';
import { canPublish, validateSourcePolicy } from '../../src/lib/content/publication';

it('publishes only approved listed and featured content', () => {
  expect(canPublish({ visibility: 'internal', publicReview: 'approved' })).toBe(false);
  expect(canPublish({ visibility: 'draft', publicReview: 'approved' })).toBe(false);
  expect(canPublish({ visibility: 'listed', publicReview: 'pending' })).toBe(false);
  expect(canPublish({ visibility: 'featured', publicReview: 'pending' })).toBe(false);
  expect(canPublish({ visibility: 'listed', publicReview: 'approved' })).toBe(true);
  expect(canPublish({ visibility: 'featured', publicReview: 'approved' })).toBe(true);
});

it('requires a public source URL only for public source availability', () => {
  expect(validateSourcePolicy({ sourceAvailability: 'public', sourceUrls: [] })).toEqual([
    'A public source URL is required when sourceAvailability is public.',
  ]);
  expect(validateSourcePolicy({ sourceAvailability: 'local-only', sourceUrls: [] })).toEqual([]);
  expect(validateSourcePolicy({ sourceAvailability: 'mixed', sourceUrls: [] })).toEqual([]);
});

it('requires a nonblank public source URL', () => {
  const error = ['A public source URL is required when sourceAvailability is public.'];

  expect(validateSourcePolicy({ sourceAvailability: 'public', sourceUrls: [''] })).toEqual(error);
  expect(validateSourcePolicy({ sourceAvailability: 'public', sourceUrls: ['  '] })).toEqual(error);
  expect(validateSourcePolicy({ sourceAvailability: 'public', sourceUrls: [' https://example.com/source '] })).toEqual([]);
});

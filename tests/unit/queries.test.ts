import { expect, it } from 'vitest';
import { approvedHomepageFeaturedProjects, byOrderThenTitle, featuredEntries, publicEntries } from '../../src/lib/content/queries';

const entries = [
  { id: 'draft', title: 'Draft', visibility: 'draft' as const, publicReview: 'approved' as const },
  { id: 'pending', title: 'Pending', visibility: 'listed' as const, publicReview: 'pending' as const },
  { id: 'listed', title: 'Listed', visibility: 'listed' as const, publicReview: 'approved' as const },
  { id: 'featured', title: 'Featured', visibility: 'featured' as const, publicReview: 'approved' as const },
  { id: 'internal', title: 'Internal', visibility: 'internal' as const, publicReview: 'approved' as const },
];

it('selects only approved listed and featured entries for public indexes', () => {
  expect(publicEntries(entries).map(({ id }) => id)).toEqual(['featured', 'listed']);
});

it('selects only approved featured entries for homepage placements', () => {
  expect(featuredEntries(entries).map(({ id }) => id)).toEqual(['featured']);
});

it('keeps homepage project features to the approved flagship set', () => {
  const projects = [
    { id: 'chief-of-staff', title: 'Chief of Staff', visibility: 'featured' as const, publicReview: 'approved' as const, order: 1 },
    { id: 'alpha-screener', title: 'Alpha Screener', visibility: 'featured' as const, publicReview: 'approved' as const, order: 3 },
    { id: 'future-feature', title: 'Future feature', visibility: 'featured' as const, publicReview: 'approved' as const, order: 0 },
  ];

  expect(approvedHomepageFeaturedProjects(projects).map(({ id }) => id)).toEqual([
    'chief-of-staff',
    'alpha-screener',
  ]);
});

it('sorts entries by explicit order and then title deterministically', () => {
  const ordered = [
    { title: 'Zulu' },
    { title: 'Bravo', order: 2 },
    { title: 'Alpha', order: 2 },
    { title: 'Charlie', order: 1 },
  ].sort(byOrderThenTitle);

  expect(ordered.map(({ title }) => title)).toEqual(['Charlie', 'Alpha', 'Bravo', 'Zulu']);
});

it('uses a fixed title comparison instead of the host locale', () => {
  const ordered = [{ title: 'Ångström' }, { title: 'Zulu' }].sort(byOrderThenTitle);

  expect(ordered.map(({ title }) => title)).toEqual(['Zulu', 'Ångström']);
});

import { expect, it } from 'vitest';
import { byOrderThenTitle, featuredEntries, publicEntries } from '../../src/lib/content/queries';

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

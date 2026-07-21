import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import matter from 'gray-matter';
import { expect, it } from 'vitest';
import { publicEntries } from '../../src/lib/content/queries';

const seedPaths = [
  'projects/schema-seed.mdx',
  'case-studies/schema-seed.mdx',
  'systems/schema-seed.mdx',
  'handbook/schema-seed.mdx',
  'signals/schema-seed.mdx',
];

it('keeps loader schema seeds non-public while preserving typed collection entries', async () => {
  const seeds = await Promise.all(seedPaths.map(async (seedPath) => {
    const source = await readFile(resolve(process.cwd(), 'src/content', seedPath), 'utf8');
    return matter(source).data as { id: string; visibility: 'draft'; publicReview: 'pending'; sourceAvailability: 'local-only' };
  }));

  expect(seeds).toHaveLength(5);
  expect(seeds).toEqual(expect.arrayContaining([
    expect.objectContaining({ visibility: 'draft', publicReview: 'pending', sourceAvailability: 'local-only' }),
  ]));
  expect(publicEntries(seeds.map((seed) => ({ ...seed, title: seed.id })))).toEqual([]);
});

import { existsSync } from 'node:fs';
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

it('keeps catalog fields optional on draft schema seeds', async () => {
  const source = await readFile(resolve(process.cwd(), 'src/content/projects/schema-seed.mdx'), 'utf8');
  const seed = matter(source).data as Record<string, unknown>;

  expect(seed.visibility).toBe('draft');
  expect(seed.capabilityNarrative).toBeUndefined();
});

it('publishes Nexus and Second Brain as approved featured capability dossiers', async () => {
  const projectPaths = [
    resolve(process.cwd(), 'src/content/projects/nexus.mdx'),
    resolve(process.cwd(), 'src/content/projects/second-brain.mdx'),
  ];

  expect(projectPaths.every(existsSync)).toBe(true);

  const projects = await Promise.all(projectPaths.map(async (projectPath) => {
    const source = await readFile(projectPath, 'utf8');
    return matter(source).data as {
      id: string;
      visibility: 'featured';
      publicReview: 'approved';
      sourceAvailability: 'local-only';
      capabilityNarrative: unknown;
      evidenceSummary: unknown;
      diagram: unknown;
    };
  }));

  expect(projects).toEqual([
    expect.objectContaining({
      id: 'project-nexus',
      visibility: 'featured',
      publicReview: 'approved',
      sourceAvailability: 'local-only',
      capabilityNarrative: expect.any(Object),
      evidenceSummary: expect.any(Object),
      diagram: expect.any(Object),
    }),
    expect.objectContaining({
      id: 'project-second-brain',
      visibility: 'featured',
      publicReview: 'approved',
      sourceAvailability: 'local-only',
      capabilityNarrative: expect.any(Object),
      evidenceSummary: expect.any(Object),
      diagram: expect.any(Object),
    }),
  ]);

  expect(publicEntries(projects.map((project) => ({ ...project, title: project.id })))).toHaveLength(2);
});

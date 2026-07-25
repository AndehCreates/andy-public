import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';
import { evidenceCandidateSchema } from '../../src/lib/content/evidenceCandidates';

const candidatePath = resolve(process.cwd(), 'docs/evidence/candidates/lifeos-connected-publication-pilot.json');

it('keeps the LifeOS continuity candidate sanitized and awaiting owner review', async () => {
  const candidate = evidenceCandidateSchema.parse(JSON.parse(await readFile(candidatePath, 'utf8')));

  expect(candidate).toMatchObject({
    candidateId: 'lifeos-connected-publication-pilot',
    projectId: 'project-lifeos',
    sourceRevision: '778f75dbea29db3894fb3ac6ae3ca52ce729d9b6',
    state: 'needs-shaping',
    publicSafety: 'pending',
  });
  expect(candidate.boundaries).toContain('The candidate is local-only and unpublished until explicit owner copy approval.');
  expect(candidate.boundaries).toContain('No MSI or Tower verification is represented by this candidate.');
  expect(candidate.boundaries).toContain('The invalid-route fallback behavior remains unproven by this evidence.');
});

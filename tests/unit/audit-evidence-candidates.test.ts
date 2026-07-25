import { expect, it } from 'vitest';
import { auditEvidenceCandidates, isEvidenceCandidateFile } from '../../scripts/audit-evidence-candidates';

const sourceRevision = 'a'.repeat(40);

function candidate(overrides: Record<string, unknown> = {}) {
  return {
    candidateId: 'candidate-chief-of-staff-intake',
    projectId: 'project-chief-of-staff',
    objectiveId: 'objective-public-case-study',
    sourceRevision,
    idempotencyKey: `candidate-chief-of-staff-intake:${sourceRevision}`,
    purpose: 'Explain how bounded coordination preserves human authority.',
    principles: ['Human judgment remains decisive.'],
    system: 'A thin coordination layer connects approved project work to verification.',
    build: 'Typed lifecycle contracts preserve ownership across systems.',
    evidence: 'Deterministic tests validate the public framing within scope.',
    boundaries: 'This is not a claim of autonomous delivery or live operational access.',
    destinations: [{ collection: 'projects', targetId: 'project-chief-of-staff' }],
    state: 'captured',
    publicSafety: 'pending',
    ...overrides,
  };
}

it('aggregates candidate schema errors by filename', () => {
  const inputs = [
    { file: 'docs/evidence/candidates/invalid.json', value: candidate({ purpose: '   ' }) },
    { file: 'docs/evidence/candidates/bad-key.json', value: candidate({ idempotencyKey: 'wrong' }) },
  ];

  expect(() => auditEvidenceCandidates(inputs)).toThrowError(/docs\/evidence\/candidates\/invalid\.json: purpose:/);
  expect(() => auditEvidenceCandidates(inputs)).toThrowError(/docs\/evidence\/candidates\/bad-key\.json: idempotencyKey:/);
});

it('reports malformed JSON as one file-scoped parse violation', async () => {
  const { auditEvidenceCandidateJson } = await import('../../scripts/audit-evidence-candidates');

  expect(() => auditEvidenceCandidateJson([
    { file: 'docs/evidence/candidates/malformed.json', content: '{' },
  ])).toThrowError('Evidence candidate audit failed:\n- docs/evidence/candidates/malformed.json: invalid JSON');
});

it('rejects duplicate candidate IDs from separate files', () => {
  expect(() => auditEvidenceCandidates([
    { file: 'docs/evidence/candidates/first.json', value: candidate() },
    { file: 'docs/evidence/candidates/second.json', value: candidate() },
  ])).toThrowError(/candidateId "candidate-chief-of-staff-intake" is duplicated in docs\/evidence\/candidates\/first\.json, docs\/evidence\/candidates\/second\.json/);
});

it('keeps pending safety from advancing a review-ready candidate', () => {
  expect(() => auditEvidenceCandidates([
    { file: 'docs/evidence/candidates/review-ready.json', value: candidate({ state: 'review-ready' }) },
  ])).toThrowError(/review-ready.json: publicSafety: Review-ready and published candidates must have reviewed public safety/);
});

it('rejects unsafe public strings through the shared sanitizer', () => {
  expect(() => auditEvidenceCandidates([
    { file: 'docs/evidence/candidates/unsafe.json', value: candidate({ purpose: 'Read C:\\private\\notes before publishing.' }) },
  ])).toThrowError(/unsafe\.json: purpose: Public content contains windows-path/);
});

it('ignores underscore-prefixed fixture filenames for filesystem reads', () => {
  expect(isEvidenceCandidateFile('_fixture.json')).toBe(false);
  expect(isEvidenceCandidateFile('captured.json')).toBe(true);
});

it('returns candidates in stable candidate ID order', () => {
  const candidates = auditEvidenceCandidates([
    { file: 'docs/evidence/candidates/z.json', value: candidate({ candidateId: 'candidate-z', idempotencyKey: `candidate-z:${sourceRevision}` }) },
    { file: 'docs/evidence/candidates/a.json', value: candidate({ candidateId: 'candidate-a', idempotencyKey: `candidate-a:${sourceRevision}` }) },
  ]);

  expect(candidates.map((entry) => entry.candidateId)).toEqual(['candidate-a', 'candidate-z']);
});

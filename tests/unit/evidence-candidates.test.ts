import { expect, it } from 'vitest';
import { evidenceCandidateRisks, evidenceCandidateSchema } from '../../src/lib/content/evidenceCandidates';

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

it('parses a sanitized captured editorial evidence candidate', () => {
  const result = evidenceCandidateSchema.parse(candidate());

  expect(result.candidateId).toBe('candidate-chief-of-staff-intake');
  expect(evidenceCandidateRisks(result)).toEqual([]);
});

it('requires a lowercase source SHA and exact candidate revision idempotency key', () => {
  expect(() => evidenceCandidateSchema.parse(candidate({ sourceRevision: 'A'.repeat(40) }))).toThrow();
  expect(() => evidenceCandidateSchema.parse(candidate({ idempotencyKey: 'candidate-chief-of-staff-intake:wrong' }))).toThrow();
  expect(() => evidenceCandidateSchema.parse(candidate({ purpose: '   ' }))).toThrow();
});

it('accepts only known content collection destinations with a target ID', () => {
  expect(() => evidenceCandidateSchema.parse(candidate({ destinations: [{ collection: 'unknown', targetId: 'project-chief-of-staff' }] }))).toThrow();
  expect(() => evidenceCandidateSchema.parse(candidate({ destinations: [{ collection: 'projects', targetId: '' }] }))).toThrow();
});

it('requires reviewed public safety before a candidate is review-ready', () => {
  expect(() => evidenceCandidateSchema.parse(candidate({ state: 'review-ready' }))).toThrow();
  expect(evidenceCandidateSchema.parse(candidate({ state: 'review-ready', publicSafety: 'reviewed' })).state).toBe('review-ready');
});

it('rejects private paths, hosts, and secret-like public copy through the shared sanitizer', () => {
  for (const unsafePurpose of [
    'Read D:\\coding\\private-repo notes before publishing.',
    'Inspect http://localhost:4321 before publishing.',
    'Inspect http://192.168.1.20:8080 before publishing.',
    'token=private-value must remain private.',
  ]) {
    expect(() => evidenceCandidateSchema.parse(candidate({ purpose: unsafePurpose }))).toThrow();
  }
});

it('requires a valid portfolio revision for published candidates', () => {
  expect(() => evidenceCandidateSchema.parse(candidate({ state: 'published', publicSafety: 'reviewed' }))).toThrow();
  expect(() => evidenceCandidateSchema.parse(candidate({ state: 'published', publicSafety: 'reviewed', portfolioRevision: 'not-a-revision' }))).toThrow();
  expect(() => evidenceCandidateSchema.parse(candidate({ state: 'published', portfolioRevision: 'b'.repeat(40) }))).toThrow();
  expect(evidenceCandidateSchema.parse(candidate({ state: 'published', publicSafety: 'reviewed', portfolioRevision: 'b'.repeat(40) })).portfolioRevision).toBe('b'.repeat(40));
});

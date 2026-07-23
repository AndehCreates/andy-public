import { z } from 'astro/zod';
import { expect, it } from 'vitest';
import { reviewValues, visibilityValues } from '../../src/lib/content/publication';
import { addSignalPresentationIssues, signalPresentationFields } from '../../src/lib/content/signals';

const signalSchema = z.object({
  visibility: z.enum(visibilityValues),
  publicReview: z.enum(reviewValues),
  ...signalPresentationFields,
}).superRefine(addSignalPresentationIssues);

const approvedPublicSignal = {
  visibility: 'listed',
  publicReview: 'approved',
  researchQuestion: 'What should a ranking prove before a person acts?',
  artifactLabel: 'Uncertainty and readiness gates',
  artifactType: 'implementation',
  finding: 'Insufficient evidence blocks promotion while deterministic scoring remains inspectable.',
  evidenceSummary: 'Focused tests cover insufficient samples, non-positive results, and readiness alignment.',
  evidenceBoundary: 'The tests do not establish live performance or investment outcomes.',
  readingMinutes: 8,
  sourceContext: 'Alpha Screener',
  continueTo: {
    targetId: 'caseStudies:case-study-alpha-screener',
    annotation: 'Continue to the case study to inspect the wider decision-support boundary.',
  },
};

it('accepts a complete approved public signal', () => {
  expect(signalSchema.safeParse(approvedPublicSignal).success).toBe(true);
});

it.each([
  'researchQuestion',
  'artifactLabel',
  'artifactType',
  'finding',
  'evidenceSummary',
  'evidenceBoundary',
  'continueTo',
] as const)('requires %s for a publishable signal', (field) => {
  expect(signalSchema.safeParse({
    ...approvedPublicSignal,
    [field]: undefined,
  }).success).toBe(false);
});

it('allows a draft pending editorial seed without presentation fields', () => {
  expect(signalSchema.safeParse({
    visibility: 'draft',
    publicReview: 'pending',
  }).success).toBe(true);
});

it('rejects a malformed continuation target', () => {
  expect(signalSchema.safeParse({
    ...approvedPublicSignal,
    continueTo: {
      targetId: 'case-studies:alpha-screener',
      annotation: approvedPublicSignal.continueTo.annotation,
    },
  }).success).toBe(false);
});

it('rejects a blank continuation annotation', () => {
  expect(signalSchema.safeParse({
    ...approvedPublicSignal,
    continueTo: {
      targetId: approvedPublicSignal.continueTo.targetId,
      annotation: '   ',
    },
  }).success).toBe(false);
});

import { z } from 'astro/zod';
import { findPublicContentRisks, type SanitizationFinding } from './sanitization';
import { contentCollectionNames } from './types';

export const evidenceCandidateStateValues = [
  'captured',
  'needs-shaping',
  'review-ready',
  'published',
  'superseded',
] as const;

export type EvidenceCandidateState = (typeof evidenceCandidateStateValues)[number];

const publicString = z.string().trim().min(1);
const revisionSchema = z.string().regex(/^[a-f0-9]{40}$/, 'Revision must be a lowercase 40-character SHA.');
const stableIdSchema = publicString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'ID must be lowercase kebab-case.');

const destinationSchema = z.object({
  collection: z.enum(contentCollectionNames),
  targetId: stableIdSchema,
});

const evidenceCandidateBaseSchema = z.object({
  candidateId: stableIdSchema,
  projectId: stableIdSchema,
  objectiveId: stableIdSchema,
  sourceRevision: revisionSchema,
  idempotencyKey: publicString,
  purpose: publicString,
  principles: z.array(publicString).min(1),
  system: publicString,
  build: publicString,
  evidence: publicString,
  boundaries: publicString,
  destinations: z.array(destinationSchema).min(1),
  state: z.enum(evidenceCandidateStateValues),
  publicSafety: z.enum(['pending', 'reviewed']),
  portfolioRevision: revisionSchema.optional(),
});

export type EvidenceCandidate = z.infer<typeof evidenceCandidateBaseSchema>;

function publicStringEntries(value: unknown, path: string[] = []): Array<{ path: string[]; value: string }> {
  if (typeof value === 'string') return [{ path, value }];

  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => publicStringEntries(entry, [...path, String(index)]));
  }

  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, entry]) => publicStringEntries(entry, [...path, key]));
  }

  return [];
}

export function evidenceCandidateRisks(candidate: EvidenceCandidate): SanitizationFinding[] {
  return publicStringEntries(candidate).flatMap(({ value }) => findPublicContentRisks(value));
}

export const evidenceCandidateSchema = evidenceCandidateBaseSchema.superRefine((candidate, context) => {
  if (candidate.idempotencyKey !== `${candidate.candidateId}:${candidate.sourceRevision}`) {
    context.addIssue({
      code: 'custom',
      path: ['idempotencyKey'],
      message: 'Idempotency key must exactly equal candidateId:sourceRevision.',
    });
  }

  if ((candidate.state === 'review-ready' || candidate.state === 'published') && candidate.publicSafety !== 'reviewed') {
    context.addIssue({
      code: 'custom',
      path: ['publicSafety'],
      message: 'Review-ready and published candidates must have reviewed public safety.',
    });
  }

  if (candidate.state === 'published' && candidate.portfolioRevision === undefined) {
    context.addIssue({
      code: 'custom',
      path: ['portfolioRevision'],
      message: 'Published candidates must record the portfolio revision.',
    });
  }

  for (const { path, value } of publicStringEntries(candidate)) {
    for (const finding of findPublicContentRisks(value)) {
      context.addIssue({
        code: 'custom',
        path,
        message: `Public content contains ${finding.rule}: ${finding.excerpt}`,
      });
    }
  }
});

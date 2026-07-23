import { z, type RefinementCtx } from 'astro/zod';
import { canPublish, type PublicReview, type Visibility } from './publication';
import { contentCollectionNames } from './types';

export const signalArtifactTypeValues = [
  'source',
  'implementation',
  'test',
  'interface',
  'decision-record',
  'failure',
  'diagram',
] as const;

const signalTargetIdPattern = new RegExp(
  `^(?:${contentCollectionNames.join('|')}):[a-z0-9]+(?:-[a-z0-9]+)*$`,
);

export const signalContinueToSchema = z.object({
  targetId: z.string().regex(signalTargetIdPattern),
  annotation: z.string().trim().min(20).max(220),
});

export const signalPresentationFields = {
  researchQuestion: z.string().trim().min(20).max(140).optional(),
  artifactLabel: z.string().trim().min(3).max(120).optional(),
  artifactType: z.enum(signalArtifactTypeValues).optional(),
  finding: z.string().trim().min(20).max(320).optional(),
  evidenceSummary: z.string().trim().min(20).max(320).optional(),
  evidenceBoundary: z.string().trim().min(20).max(320).optional(),
  readingMinutes: z.number().int().positive().max(60).optional(),
  sourceContext: z.string().trim().min(2).max(100).optional(),
  continueTo: signalContinueToSchema.optional(),
};

const requiredPublicSignalFields = [
  'researchQuestion',
  'artifactLabel',
  'artifactType',
  'finding',
  'evidenceSummary',
  'evidenceBoundary',
  'continueTo',
] as const;

type SignalPresentationInput = {
  visibility?: Visibility;
  publicReview?: PublicReview;
} & Partial<Record<(typeof requiredPublicSignalFields)[number], unknown>>;

export function addSignalPresentationIssues(
  signal: SignalPresentationInput,
  context: RefinementCtx<SignalPresentationInput>,
): void {
  const isPublishable = signal.visibility !== undefined && signal.publicReview !== undefined && canPublish({
    visibility: signal.visibility,
    publicReview: signal.publicReview,
  });

  if (!isPublishable) return;

  for (const field of requiredPublicSignalFields) {
    if (signal[field] === undefined) {
      context.addIssue({
        code: 'custom',
        path: [field],
        message: `${field} is required for publishable signals.`,
      });
    }
  }
}

export type SignalContinueTo = z.infer<typeof signalContinueToSchema>;
export type SignalArtifactType = (typeof signalArtifactTypeValues)[number];

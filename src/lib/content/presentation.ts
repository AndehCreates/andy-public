import { z } from 'astro/zod';

export const visualMarkValues = ['authority', 'continuity', 'evidence', 'semantic-document', 'deterministic-simulation'] as const;
export const flagshipThemeValues = ['authority', 'continuity', 'evidence'] as const;
export const diagramVariantValues = ['authority-boundaries', 'continuity-reentry', 'evidence-gates'] as const;
export const evidenceMethodValues = ['test-execution', 'static-check', 'source-inspection', 'none'] as const;
export const evidenceStateValues = ['validated-within-scope', 'inspected-only', 'not-yet-validated'] as const;

export const projectPresentationFieldNames = [
  'workHook',
  'visualMark',
  'technicalDifferentiator',
  'caseStudyHook',
  'theme',
  'artifactLabels',
  'pivotalDecision',
  'evidenceSummary',
  'diagram',
] as const;

const publicString = z.string().trim().min(1);

const compatibleEvidenceStates = {
  'test-execution': 'validated-within-scope',
  'static-check': 'validated-within-scope',
  'source-inspection': 'inspected-only',
  none: 'not-yet-validated',
} as const;

export const evidenceSummarySchema = z.object({
  evidenceMethod: z.enum(evidenceMethodValues),
  evidenceState: z.enum(evidenceStateValues),
  evidenceScope: publicString,
}).superRefine((evidence, context) => {
  if (compatibleEvidenceStates[evidence.evidenceMethod] !== evidence.evidenceState) {
    context.addIssue({
      code: 'custom',
      path: ['evidenceState'],
      message: `${evidence.evidenceMethod} evidence must use state ${compatibleEvidenceStates[evidence.evidenceMethod]}.`,
    });
  }
});

const diagramNodeSchema = z.object({
  id: publicString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: publicString,
  description: publicString,
});

const diagramEdgeSchema = z.object({
  from: publicString,
  to: publicString,
  label: publicString,
});

export const diagramConfigurationSchema = z.object({
  variant: z.enum(diagramVariantValues),
  title: publicString,
  description: publicString,
  nodes: z.array(diagramNodeSchema).min(2),
  edges: z.array(diagramEdgeSchema).min(1),
}).superRefine((diagram, context) => {
  const nodeIds = new Set(diagram.nodes.map((node) => node.id));

  diagram.edges.forEach((edge, index) => {
    for (const endpoint of ['from', 'to'] as const) {
      if (!nodeIds.has(edge[endpoint])) {
        context.addIssue({
          code: 'custom',
          path: ['edges', index, endpoint],
          message: `Diagram edge ${endpoint} must reference a configured node ID.`,
        });
      }
    }
  });
});

export const projectPresentationFields = {
  workHook: publicString.optional(),
  visualMark: z.enum(visualMarkValues).optional(),
  technicalDifferentiator: publicString.optional(),
  caseStudyHook: publicString.optional(),
  theme: z.enum(flagshipThemeValues).optional(),
  artifactLabels: z.array(publicString).min(2).optional(),
  pivotalDecision: publicString.optional(),
  evidenceSummary: evidenceSummarySchema.optional(),
  diagram: diagramConfigurationSchema.optional(),
};

const commonFieldNames = ['workHook', 'visualMark', 'technicalDifferentiator'] as const;
const flagshipFieldNames = ['caseStudyHook', 'theme', 'artifactLabels', 'pivotalDecision', 'evidenceSummary', 'diagram'] as const;

type PresentationRefinementInput = {
  visibility?: unknown;
  publicReview?: unknown;
} & Partial<Record<(typeof commonFieldNames)[number] | (typeof flagshipFieldNames)[number], unknown>>;

type PresentationRefinementContext = {
  addIssue(issue: { code: 'custom'; path: string[]; message: string }): void;
};

export function addProjectPresentationIssues(
  project: PresentationRefinementInput,
  context: PresentationRefinementContext,
): void {
  const isPublishable = (project.visibility === 'listed' || project.visibility === 'featured') &&
    project.publicReview === 'approved';

  if (!isPublishable) return;

  for (const field of commonFieldNames) {
    if (project[field] === undefined) {
      context.addIssue({
        code: 'custom',
        path: [field],
        message: `${field} is required for publishable projects.`,
      });
    }
  }

  if (project.visibility !== 'featured') return;

  for (const field of flagshipFieldNames) {
    if (project[field] === undefined) {
      context.addIssue({
        code: 'custom',
        path: [field],
        message: `${field} is required for featured flagship projects.`,
      });
    }
  }
}

export const projectPresentationSchema = z.object({
  visibility: z.enum(['internal', 'draft', 'listed', 'featured']),
  publicReview: z.enum(['pending', 'approved']),
  ...projectPresentationFields,
}).superRefine(addProjectPresentationIssues);

export type EvidenceSummary = z.infer<typeof evidenceSummarySchema>;
export type DiagramConfiguration = z.infer<typeof diagramConfigurationSchema>;
export type ProjectPresentation = z.infer<typeof projectPresentationSchema>;
export type ProjectPresentationInput = z.input<typeof projectPresentationSchema>;

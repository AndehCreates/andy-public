import { z } from 'astro/zod';

export const publicString = z.string().trim().min(1);
export const relationIdSchema = publicString.regex(/^(projects|caseStudies|systems|handbook|signals):[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const catalogThemeValues = ['authority', 'continuity', 'evidence', 'context', 'execution', 'feedback'] as const;
export type CatalogTheme = (typeof catalogThemeValues)[number];

const projectionIdSchema = publicString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const projectTargetSchema = publicString.regex(/^projects:project-[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const capabilityNarrativeSchema = z.object({
  capabilityThesis: publicString,
  humanFriction: publicString,
  whyItMatters: publicString,
  systemResponse: publicString,
  capabilityExtended: publicString,
  howItWorks: publicString,
  pivotalDecision: publicString,
  decisionTradeoff: publicString,
  principleIds: z.array(relationIdSchema).min(1),
  nextStep: publicString,
});

export const systemProjectionComponentSchema = z.object({
  id: projectionIdSchema,
  label: publicString,
  responsibility: publicString,
  authorityBoundary: publicString,
  projectTarget: projectTargetSchema.optional(),
  theme: z.enum(catalogThemeValues),
});

export const systemLayerSchema = z.object({
  id: projectionIdSchema,
  label: publicString,
  responsibility: publicString,
  authorityBoundary: publicString,
  theme: z.enum(catalogThemeValues),
  components: z.array(systemProjectionComponentSchema).min(1),
});

export const systemProjectionEdgeSchema = z.object({
  from: projectionIdSchema,
  to: projectionIdSchema,
  label: publicString,
});

export const systemProjectionSchema = z.object({
  thesis: publicString,
  layers: z.array(systemLayerSchema).min(2),
  edges: z.array(systemProjectionEdgeSchema).min(1),
}).superRefine((projection, context) => {
  const ids = new Set<string>();
  projection.layers.forEach((layer, layerIndex) => {
    const nodes = [
      { id: layer.id, path: ['layers', layerIndex, 'id'] },
      ...layer.components.map((component, componentIndex) => ({ id: component.id, path: ['layers', layerIndex, 'components', componentIndex, 'id'] })),
    ];
    nodes.forEach((node) => {
      if (ids.has(node.id)) context.addIssue({ code: 'custom', path: node.path, message: 'Projection layer and component IDs must be unique.' });
      ids.add(node.id);
    });
  });
  projection.edges.forEach((edge, index) => {
    (['from', 'to'] as const).forEach((endpoint) => {
      if (!ids.has(edge[endpoint])) context.addIssue({ code: 'custom', path: ['edges', index, endpoint], message: `Projection edge ${endpoint} must reference a configured layer or component ID.` });
    });
  });
});

export const catalogPresentationFields = {
  capabilityNarrative: capabilityNarrativeSchema.optional(),
  systemProjection: systemProjectionSchema.optional(),
};

export type CapabilityNarrative = z.infer<typeof capabilityNarrativeSchema>;
export type SystemProjectionComponent = z.infer<typeof systemProjectionComponentSchema>;
export type SystemLayer = z.infer<typeof systemLayerSchema>;
export type SystemProjectionEdge = z.infer<typeof systemProjectionEdgeSchema>;
export type SystemProjection = z.infer<typeof systemProjectionSchema>;

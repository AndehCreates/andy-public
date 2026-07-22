import { describe, expect, it } from 'vitest';
import {
  diagramConfigurationSchema,
  evidenceSummarySchema,
  projectPresentationSchema,
  type ProjectPresentationInput,
} from '../../src/lib/content/presentation';

const flagshipPresentation = {
  visibility: 'featured',
  publicReview: 'approved',
  workHook: 'Keep coordination authority-bounded and reviewable.',
  visualMark: 'authority',
  technicalDifferentiator: 'Typed lifecycle states keep repository and runtime authority separate.',
  caseStudyHook: 'Coordinate work without taking authority from the systems that execute it.',
  theme: 'authority',
  artifactLabels: ['Governance', 'Coordination', 'Human review'],
  pivotalDecision: 'Keep runtime, context, and repository authority distributed.',
  evidenceSummary: {
    evidenceMethod: 'test-execution',
    evidenceState: 'validated-within-scope',
    evidenceScope: 'Deterministic offline lifecycle fixtures.',
  },
  diagram: {
    variant: 'authority-boundaries',
    title: 'Authority-bounded coordination',
    description: 'Coordination observes work while existing systems retain authority.',
    nodes: [
      { id: 'governance', label: 'Governance', description: 'Defines consequential boundaries.' },
      { id: 'coordination', label: 'Coordination', description: 'Classifies lifecycle state.' },
    ],
    edges: [
      { from: 'governance', to: 'coordination', label: 'sets boundaries' },
    ],
  },
} satisfies ProjectPresentationInput;

describe('project presentation schema', () => {
  it('accepts complete approved presentation data for a featured flagship', () => {
    expect(projectPresentationSchema.safeParse(flagshipPresentation).success).toBe(true);
  });

  it.each([
    {
      evidenceMethod: 'browser-demo',
      evidenceState: 'validated-within-scope',
      evidenceScope: 'A focused browser scenario.',
    },
    {
      evidenceMethod: 'test-execution',
      evidenceState: 'complete',
      evidenceScope: 'Deterministic offline lifecycle fixtures.',
    },
    {
      evidenceMethod: 'source-inspection',
      evidenceState: 'validated-within-scope',
      evidenceScope: 'Typed state contracts.',
    },
    {
      evidenceMethod: 'none',
      evidenceState: 'not-yet-validated',
      evidenceScope: '   ',
    },
  ])('rejects invalid evidence method, state, pair, or scope: %#', (evidenceSummary) => {
    expect(evidenceSummarySchema.safeParse(evidenceSummary).success).toBe(false);
  });

  it('allows an approved local-only flagship without source or media fields', () => {
    expect(projectPresentationSchema.safeParse(flagshipPresentation).success).toBe(true);
  });

  it('rejects duplicate diagram node IDs', () => {
    expect(diagramConfigurationSchema.safeParse({
      ...flagshipPresentation.diagram,
      nodes: [
        ...flagshipPresentation.diagram.nodes,
        { id: 'governance', label: 'Duplicate governance', description: 'Must not overwrite the configured node.' },
      ],
    }).success).toBe(false);
  });

  it.each([
    { visualMark: 'continuity' },
    { diagram: { ...flagshipPresentation.diagram, variant: 'continuity-reentry' } },
  ])('rejects mismatched featured flagship visual language: %#', (overrides) => {
    expect(projectPresentationSchema.safeParse({
      ...flagshipPresentation,
      ...overrides,
    }).success).toBe(false);
  });

  it('does not require presentation completeness for non-public content', () => {
    expect(projectPresentationSchema.safeParse({
      visibility: 'draft',
      publicReview: 'pending',
    }).success).toBe(true);
  });

  it('requires the common presentation fields for every publishable project', () => {
    expect(projectPresentationSchema.safeParse({
      visibility: 'listed',
      publicReview: 'approved',
    }).success).toBe(false);
  });
});

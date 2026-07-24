import { describe, expect, it } from 'vitest';
import { capabilityNarrativeSchema, systemProjectionSchema } from '../../src/lib/content/catalog';

const capabilityNarrative = {
  capabilityThesis: 'Reduce the cognitive cost of returning to interrupted work.',
  humanFriction: 'Working context is expensive to reconstruct after interruption.',
  whyItMatters: 'Reconstruction delays action and increases dependence on recall.',
  systemResponse: 'Preserve a durable working state and explicit recovery path.',
  capabilityExtended: 'Reliable re-entry into meaningful work.',
  howItWorks: 'Shared contracts connect interface behavior, local state, and synchronization.',
  pivotalDecision: 'Extend the existing authority boundaries.',
  decisionTradeoff: 'Accept slower expansion in exchange for continuity and clear ownership.',
  principleIds: ['handbook:modular-architecture'],
  nextStep: 'Validate interruption and conflict-recovery scenarios.',
};

const systemProjection = {
  thesis: 'A connected cognitive infrastructure keeps context, intent, and recovery legible.',
  layers: [
    { id: 'context', label: 'Context', responsibility: 'Preserve the material needed for deliberate re-entry.', authorityBoundary: 'Does not replace the authority of product records.', theme: 'continuity', components: [{ id: 'lifeos', label: 'LifeOS', responsibility: 'Makes re-entry explicit after interruption.', authorityBoundary: 'Keeps consequential changes under user control.', projectTarget: 'projects:project-lifeos', theme: 'continuity' }] },
    { id: 'governance', label: 'Governance', responsibility: 'Makes consequential boundaries reviewable.', authorityBoundary: 'Does not own runtime execution.', theme: 'authority', components: [{ id: 'chief-of-staff', label: 'Chief of Staff', responsibility: 'Coordinates bounded AI-assisted work.', authorityBoundary: 'Does not replace source or runtime authority.', theme: 'authority' }] },
  ],
  edges: [{ from: 'lifeos', to: 'chief-of-staff', label: 'keeps handoff state legible' }],
};

describe('catalog contracts', () => {
  it('requires meaningful capability narrative fields and at least one principle', () => {
    expect(capabilityNarrativeSchema.safeParse(capabilityNarrative).success).toBe(true);
    expect(capabilityNarrativeSchema.safeParse({ ...capabilityNarrative, howItWorks: undefined }).success).toBe(false);
    expect(capabilityNarrativeSchema.safeParse({ ...capabilityNarrative, nextStep: '   ' }).success).toBe(false);
    expect(capabilityNarrativeSchema.safeParse({ ...capabilityNarrative, principleIds: [] }).success).toBe(false);
    expect(capabilityNarrativeSchema.safeParse({ ...capabilityNarrative, principleIds: ['modular-architecture'] }).success).toBe(false);
    expect(capabilityNarrativeSchema.safeParse({ ...capabilityNarrative, principleIds: ['unknown:modular-architecture'] }).success).toBe(false);
  });

  it('validates a projection with stable IDs and public-safe project targets', () => {
    expect(systemProjectionSchema.safeParse(systemProjection).success).toBe(true);
    expect(systemProjectionSchema.safeParse({ ...systemProjection, layers: [...systemProjection.layers, { ...systemProjection.layers[0], id: 'context' }] }).success).toBe(false);
    expect(systemProjectionSchema.safeParse({ ...systemProjection, edges: [{ from: 'unknown', to: 'chief-of-staff', label: 'breaks' }] }).success).toBe(false);
    const firstLayer = systemProjection.layers[0]!;
    const secondLayer = systemProjection.layers[1]!;
    const firstComponent = firstLayer.components[0]!;
    expect(systemProjectionSchema.safeParse({ ...systemProjection, layers: [{ ...firstLayer, components: [{ ...firstComponent, projectTarget: 'project-lifeos' }] }, secondLayer] }).success).toBe(false);
  });
});

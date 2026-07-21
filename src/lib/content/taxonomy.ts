export const capabilityIds = [
  'ai-systems',
  'evaluation-reliability',
  'knowledge-context',
  'product-engineering',
  'human-centered-design',
  'local-infrastructure-edge',
  'decision-intelligence',
  'interactive-creative-systems',
] as const;

export type CapabilityId = (typeof capabilityIds)[number];

export const capabilities: Readonly<Record<CapabilityId, string>> = {
  'ai-systems': 'AI systems & orchestration',
  'evaluation-reliability': 'Evaluation & reliability',
  'knowledge-context': 'Knowledge & context systems',
  'product-engineering': 'Product engineering',
  'human-centered-design': 'Human-centered design',
  'local-infrastructure-edge': 'Local infrastructure & edge',
  'decision-intelligence': 'Decision intelligence',
  'interactive-creative-systems': 'Interactive & creative systems',
};

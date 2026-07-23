import type { SignalAtlasConfig } from '@/lib/content/signalAtlas';

export const signalAtlasConfig = {
  leadSignalId: 'signals:evaluation-as-product-work',
  paths: [
    { id: 'evidence-before-action', question: 'What must evidence establish before a result advances?', premise: 'Follow a tested decision gate into the system and principle it shaped.', readingMinutes: 12, steps: [
      { targetId: 'signals:evaluation-as-product-work', intent: 'inspect', transition: 'The gate exposes a repeatable rule for evaluating product behavior.' },
      { targetId: 'handbook:evaluation-driven-development', intent: 'understand', transition: 'The principle becomes concrete in the Alpha Screener decision surface.' },
      { targetId: 'caseStudies:case-study-alpha-screener', intent: 'practice' },
    ] },
    { id: 'state-after-interruption', question: 'What state must survive an interruption?', premise: 'Trace recoverable state from a concrete implementation contract into a cognition system.', readingMinutes: 10, steps: [
      { targetId: 'signals:local-first-recovery-notes', intent: 'inspect', transition: 'The observed state contract clarifies why durable context is a product concern.' },
      { targetId: 'handbook:grounded-knowledge', intent: 'understand', transition: 'The principle is applied in the LifeOS continuity model.' },
      { targetId: 'caseStudies:case-study-lifeos', intent: 'practice' },
    ] },
    { id: 'public-output-boundary', question: 'Where does private state stop and public output begin?', premise: 'Follow the post-build audit into the portfolio publication boundary.', readingMinutes: 9, steps: [
      { targetId: 'signals:static-output-as-a-safety-boundary', intent: 'inspect', transition: 'The delivery artifact demonstrates the need for visible provenance and review.' },
      { targetId: 'handbook:grounded-knowledge', intent: 'understand', transition: 'The same boundary appears in the reliable-AI system map.' },
      { targetId: 'systems:reliable-ai-work', intent: 'practice' },
    ] },
  ],
} satisfies SignalAtlasConfig;

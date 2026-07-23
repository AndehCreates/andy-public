import { describe, expect, it } from 'vitest';
import {
  SignalAtlasConfigurationError,
  contentSlugFromRelativePath,
  resolveSignalAtlas,
  toSignalAtlasRecord,
  type SignalAtlasConfig,
  type SignalAtlasRecord,
} from '../../src/lib/content/signalAtlas';

const signal = toSignalAtlasRecord({
  collection: 'signals', authoredId: 'evaluation-as-product-work', routeSlug: 'research/evaluation-gate',
  title: 'Evaluation gate', summary: 'A reviewed artifact-first research note.', visibility: 'featured', publicReview: 'approved',
});
const alternateSignal = toSignalAtlasRecord({
  collection: 'signals', authoredId: 'alternate-public-signal', routeSlug: 'alternate-public-signal',
  title: 'Alternate Signal', summary: 'An eligible public Signal that must never become a fallback lead.', visibility: 'listed', publicReview: 'approved',
});
const handbook = toSignalAtlasRecord({
  collection: 'handbook', authoredId: 'evaluation-driven-development', routeSlug: 'evaluation-driven-development',
  title: 'Evaluation-driven development', summary: 'A public engineering principle.', visibility: 'featured', publicReview: 'approved',
});
const caseStudy = toSignalAtlasRecord({
  collection: 'caseStudies', authoredId: 'case-study-alpha-screener', routeSlug: 'alpha-screener',
  title: 'Alpha Screener', summary: 'A reviewed case study.', visibility: 'featured', publicReview: 'approved',
});
const records: SignalAtlasRecord[] = [signal, alternateSignal, handbook, caseStudy];
const config: SignalAtlasConfig = {
  leadSignalId: signal.canonicalId,
  paths: [
    { id: 'evidence-before-action', question: 'What must evidence establish before a result advances?', premise: 'Follow a gate into the system it shaped.', readingMinutes: 12, steps: [
      { targetId: signal.canonicalId, intent: 'inspect', transition: 'The gate becomes a repeatable development principle.' },
      { targetId: handbook.canonicalId, intent: 'understand', transition: 'The principle is visible in a decision-support system.' },
      { targetId: caseStudy.canonicalId, intent: 'practice' },
    ] },
  ],
};

function expectConfigurationError(candidate: unknown, candidateRecords = records): SignalAtlasConfigurationError {
  let result: unknown;
  try { result = resolveSignalAtlas(candidate, candidateRecords); } catch (error) {
    expect(error).toBeInstanceOf(SignalAtlasConfigurationError);
    expect(result).toBeUndefined();
    return error as SignalAtlasConfigurationError;
  }
  throw new Error('Expected SignalAtlasConfigurationError, but the atlas resolved.');
}

describe('resolveSignalAtlas', () => {
  it('accepts one configured path and uses the exact manual lead with normalized hrefs', () => {
    const atlas = resolveSignalAtlas(config, records);
    expect(atlas.lead).toEqual(signal);
    expect(atlas.paths.map((path) => path.id)).toEqual(['evidence-before-action']);
    expect(atlas.paths[0]?.steps.map((step) => step.record.href)).toEqual([
      '/signals/research/evaluation-gate/', '/handbook/evaluation-driven-development/', '/case-studies/alpha-screener/',
    ]);
  });

  it('preserves the deliberately authored order of two valid paths', () => {
    const secondPath = {
      id: 'second-authored-path',
      question: 'Where should the inspection continue after the first path?',
      premise: 'A second reviewed path verifies that ordering is authored rather than inferred.',
      readingMinutes: 6,
      steps: [
        { targetId: alternateSignal.canonicalId, intent: 'inspect' as const, transition: 'The alternate record continues into the same reviewed case study.' },
        { targetId: caseStudy.canonicalId, intent: 'practice' as const },
      ],
    };
    const atlas = resolveSignalAtlas({ ...config, paths: [secondPath, config.paths[0]!] }, records);
    expect(atlas.paths.map((path) => path.id)).toEqual(['second-authored-path', 'evidence-before-action']);
  });

  it.each([
    ['missing', { ...config, leadSignalId: 'signals:missing' }],
    ['pending', { ...config }, records.map((record) => record === signal ? { ...record, publicReview: 'pending' as const } : record)],
    ['draft', { ...config }, records.map((record) => record === signal ? { ...record, visibility: 'draft' as const } : record)],
    ['internal', { ...config }, records.map((record) => record === signal ? { ...record, visibility: 'internal' as const } : record)],
  ])('rejects a %s manual lead without choosing a fallback', (_label, candidate, candidateRecords = records) => {
    const error = expectConfigurationError(candidate, candidateRecords);
    expect(error.issues).toEqual(expect.arrayContaining([expect.stringMatching(/lead/i)]));
    expect(error.issues.join('\n')).not.toContain(alternateSignal.canonicalId);
  });

  it('rejects an unknown configured step without removing it', () => {
    const candidate = { ...config, paths: [{ ...config.paths[0]!, steps: [{ targetId: 'systems:missing', intent: 'inspect', transition: 'A valid annotation remains present for the failure case.' }, config.paths[0]!.steps[2]! ] }] };
    expect(expectConfigurationError(candidate).issues.join('\n')).toMatch(/systems:missing/);
  });

  it.each([
    ['pending', { publicReview: 'pending' as const }],
    ['draft', { visibility: 'draft' as const }],
    ['internal', { visibility: 'internal' as const }],
  ])('rejects a %s configured step target', (_label, change) => {
    const candidateRecords = records.map((record) => record === handbook ? { ...record, ...change } : record);
    expect(expectConfigurationError(config, candidateRecords).issues.join('\n')).toMatch(new RegExp(handbook.canonicalId));
  });

  it('rejects a path with fewer than two steps', () => {
    const candidate = { ...config, paths: [{ ...config.paths[0]!, steps: [config.paths[0]!.steps[0]!] }] };
    expect(expectConfigurationError(candidate).issues.join('\n')).toMatch(/>=2 items/);
  });

  it.each([0, 1])('rejects a missing transition at non-final step %i', (stepIndex) => {
    const steps = config.paths[0]!.steps.map((step, index) => index === stepIndex ? { ...step, transition: ' ' } : step);
    expect(expectConfigurationError({ ...config, paths: [{ ...config.paths[0]!, steps }] }).issues.join('\n')).toMatch(/transition/);
  });

  it('aggregates structural and publication failures instead of returning a partial atlas', () => {
    const issues = expectConfigurationError({ leadSignalId: '', paths: [{ id: '', question: '', premise: '', readingMinutes: 0, steps: [] }] }, []).issues;
    expect(issues.length).toBeGreaterThan(3);
    expect(issues.join('\n')).toMatch(/eligible public Signal/i);
  });

  it('rejects an atlas without an eligible public Signal record', () => {
    expect(expectConfigurationError(config, records.map((record) => ({ ...record, collection: 'handbook' as const }))).issues).toEqual(expect.arrayContaining([
      expect.stringMatching(/eligible public Signal/i),
    ]));
  });
});

describe('signal atlas normalization', () => {
  it('normalizes nested content paths and keeps authored IDs separate from route slugs', () => {
    expect(contentSlugFromRelativePath('research\\gate-note.mdx')).toBe('research/gate-note');
    expect(caseStudy.canonicalId).toBe('caseStudies:case-study-alpha-screener');
    expect(caseStudy.href).toBe('/case-studies/alpha-screener/');
  });
});

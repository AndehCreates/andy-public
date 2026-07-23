import { z } from 'astro/zod';
import { canPublish, type PublicReview, type Visibility } from './publication';
import type { ContentCollectionName } from './types';

export const signalAtlasIntentValues = ['inspect', 'understand', 'practice', 'evidence', 'continue'] as const;

export const signalAtlasStepSchema = z.object({
  targetId: z.string().trim().min(1),
  intent: z.enum(signalAtlasIntentValues),
  transition: z.string().optional(),
});

export const signalAtlasPathSchema = z.object({
  id: z.string().trim().min(1),
  question: z.string().trim().min(1),
  premise: z.string().trim().min(1),
  readingMinutes: z.number().int().positive(),
  steps: z.array(signalAtlasStepSchema).min(2),
});

export const signalAtlasConfigSchema = z.object({
  leadSignalId: z.string().trim().min(1),
  paths: z.array(signalAtlasPathSchema).min(1),
});

export type SignalAtlasConfig = z.infer<typeof signalAtlasConfigSchema>;

export type SignalAtlasRecord = {
  canonicalId: string;
  collection: ContentCollectionName;
  slug: string;
  href: string;
  title: string;
  summary: string;
  visibility: Visibility;
  publicReview: PublicReview;
};

export type ResolvedSignalAtlas = {
  lead: SignalAtlasRecord;
  paths: Array<Omit<SignalAtlasConfig['paths'][number], 'steps'> & {
    steps: Array<SignalAtlasConfig['paths'][number]['steps'][number] & { record: SignalAtlasRecord }>;
  }>;
};

export class SignalAtlasConfigurationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super(`Signal atlas configuration failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`);
    this.name = 'SignalAtlasConfigurationError';
    this.issues = issues;
  }
}

export const publicContentRoutePrefixes: Record<ContentCollectionName, string> = {
  projects: '/work',
  caseStudies: '/case-studies',
  systems: '/systems',
  handbook: '/handbook',
  signals: '/signals',
};

export function contentSlugFromRelativePath(relativePath: string): string {
  return relativePath.replaceAll('\\', '/').replace(/\.(?:md|mdx)$/i, '');
}

export function toSignalAtlasRecord(input: {
  collection: ContentCollectionName;
  authoredId: string;
  routeSlug: string;
  title: string;
  summary: string;
  visibility: Visibility;
  publicReview: PublicReview;
}): SignalAtlasRecord {
  const slug = contentSlugFromRelativePath(input.routeSlug).replace(/^\/+|\/+$/g, '');
  return {
    canonicalId: `${input.collection}:${input.authoredId}`,
    collection: input.collection,
    slug,
    href: `${publicContentRoutePrefixes[input.collection]}/${slug}/`,
    title: input.title,
    summary: input.summary,
    visibility: input.visibility,
    publicReview: input.publicReview,
  };
}

function zodIssues(config: unknown): string[] {
  const result = signalAtlasConfigSchema.safeParse(config);
  if (result.success) return [];
  return result.error.issues.map((issue) => `${issue.path.join('.') || 'config'}: ${issue.message}`);
}

export function resolveSignalAtlas(config: unknown, records: SignalAtlasRecord[]): ResolvedSignalAtlas {
  const issues = zodIssues(config);
  const publicSignals = records.filter((record) => record.collection === 'signals' && canPublish(record));
  if (publicSignals.length === 0) issues.push('Atlas requires at least one eligible public Signal record.');
  const configObject = typeof config === 'object' && config !== null ? config as Record<string, unknown> : {};
  const leadSignalId = typeof configObject.leadSignalId === 'string' ? configObject.leadSignalId : undefined;
  const paths = Array.isArray(configObject.paths) ? configObject.paths : [];
  const recordById = new Map(records.map((record) => [record.canonicalId, record]));
  const lead = leadSignalId ? recordById.get(leadSignalId) : undefined;
  if (leadSignalId && !lead) {
    issues.push(`Lead Signal "${leadSignalId}" does not exist.`);
  } else if (lead && lead.collection !== 'signals') {
    issues.push(`Lead "${leadSignalId}" must be a Signal.`);
  } else if (lead && !canPublish(lead)) {
    issues.push(`Lead Signal "${leadSignalId}" is not approved for public content.`);
  }

  const resolvedPaths: ResolvedSignalAtlas['paths'] = [];
  for (const rawPath of paths) {
    const pathResult = signalAtlasPathSchema.safeParse(rawPath);
    if (!pathResult.success) continue;
    const path = pathResult.data;
    const resolvedSteps: ResolvedSignalAtlas['paths'][number]['steps'] = [];
    for (const [stepIndex, step] of path.steps.entries()) {
      if (stepIndex < path.steps.length - 1 && !step.transition?.trim()) {
        issues.push(`Path "${path.id}" step ${stepIndex + 1} requires a nonblank transition.`);
      }
      const record = recordById.get(step.targetId);
      if (!record) {
        issues.push(`Path "${path.id}" target "${step.targetId}" does not exist.`);
        continue;
      }
      if (!canPublish(record)) {
        issues.push(`Path "${path.id}" target "${step.targetId}" is not approved for public content.`);
        continue;
      }
      resolvedSteps.push({ ...step, record });
    }
    if (resolvedSteps.length < 2) issues.push(`Path "${path.id}" must retain at least 2 public steps.`);
    resolvedPaths.push({ ...path, steps: resolvedSteps });
  }

  if (issues.length) throw new SignalAtlasConfigurationError(issues);
  return { lead: lead!, paths: resolvedPaths };
}

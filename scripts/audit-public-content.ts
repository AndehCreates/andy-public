import { readFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';
import {
  canonicalRelationId,
  type RelationshipEdge,
  validatePublicRelations,
} from '../src/lib/content/relations';
import { canPublish, type PublicReview, type SourceAvailability, type Visibility, validateSourcePolicy } from '../src/lib/content/publication';
import { findPublicContentRisks } from '../src/lib/content/sanitization';
import { projectPresentationFieldNames } from '../src/lib/content/presentation';
import { signalArtifactTypeValues } from '../src/lib/content/signals';
import type { ContentCollectionName } from '../src/lib/content/types';
import { signalAtlasConfig } from '../src/data/signalAtlas';
import {
  SignalAtlasConfigurationError,
  contentSlugFromRelativePath,
  resolveSignalAtlas,
  toSignalAtlasRecord,
  type SignalAtlasConfig,
} from '../src/lib/content/signalAtlas';

const contentRoot = resolve(process.cwd(), 'src/content');
const collectionDirectories = [
  ['projects', 'projects'],
  ['caseStudies', 'case-studies'],
  ['systems', 'systems'],
  ['handbook', 'handbook'],
  ['signals', 'signals'],
] as const;

export type AuditedEntry = {
  id: string;
  slug: string;
  collection: ContentCollectionName;
  visibility: Visibility;
  publicReview: PublicReview;
  sourceAvailability: SourceAvailability;
  sourceUrls: string[];
  relatedIds: string[];
  relationshipEdges: RelationshipEdge[];
  projectId?: string;
  title: string;
  summary: string;
  body: string;
  presentationStrings?: string[];
  signalPresentation?: SignalPresentationAuditPayload;
};

export type SignalPresentationAuditPayload = {
  researchQuestion?: string;
  artifactLabel?: string;
  artifactType?: string;
  finding?: string;
  evidenceSummary?: string;
  evidenceBoundary?: string;
  readingMinutes?: number;
  sourceContext?: string;
  continueTo?: {
    targetId?: string;
    annotation?: string;
  };
};

export type EvidenceDocument = {
  filePath: string;
  content: string;
};

export function isAuditableContentFile(filePath: string): boolean {
  return !basename(filePath).startsWith('_');
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

export function collectProjectPresentationStrings(data: Record<string, unknown>): string[] {
  return projectPresentationFieldNames.flatMap((field) => collectStrings(data[field]));
}

export function collectSignalPresentation(data: Record<string, unknown>): SignalPresentationAuditPayload {
  const continueTo = data.continueTo && typeof data.continueTo === 'object' && !Array.isArray(data.continueTo)
    ? data.continueTo as Record<string, unknown>
    : undefined;
  return {
    ...(typeof data.researchQuestion === 'string' ? { researchQuestion: data.researchQuestion } : {}),
    ...(typeof data.artifactLabel === 'string' ? { artifactLabel: data.artifactLabel } : {}),
    ...(typeof data.artifactType === 'string' ? { artifactType: data.artifactType } : {}),
    ...(typeof data.finding === 'string' ? { finding: data.finding } : {}),
    ...(typeof data.evidenceSummary === 'string' ? { evidenceSummary: data.evidenceSummary } : {}),
    ...(typeof data.evidenceBoundary === 'string' ? { evidenceBoundary: data.evidenceBoundary } : {}),
    ...(typeof data.readingMinutes === 'number' ? { readingMinutes: data.readingMinutes } : {}),
    ...(typeof data.sourceContext === 'string' ? { sourceContext: data.sourceContext } : {}),
    ...(continueTo ? {
      continueTo: {
        ...(typeof continueTo.targetId === 'string' ? { targetId: continueTo.targetId } : {}),
        ...(typeof continueTo.annotation === 'string' ? { annotation: continueTo.annotation } : {}),
      },
    } : {}),
  };
}

function asEntry(collection: ContentCollectionName, routeSlug: string, parsed: matter.GrayMatterFile<string>): AuditedEntry {
  const data = parsed.data as Record<string, unknown>;
  const authoredId = typeof data.id === 'string' ? data.id : '';

  const entry: AuditedEntry = {
    id: canonicalRelationId(collection, authoredId),
    slug: routeSlug,
    collection,
    visibility: data.visibility as Visibility,
    publicReview: data.publicReview as PublicReview,
    sourceAvailability: data.sourceAvailability as SourceAvailability,
    sourceUrls: toStringArray(data.sourceUrls),
    relatedIds: toStringArray(data.relatedIds),
    relationshipEdges: Array.isArray(data.relationshipEdges)
      ? data.relationshipEdges.filter((edge): edge is RelationshipEdge => edge !== null && typeof edge === 'object')
      : [],
    ...(collection === 'caseStudies' && typeof data.projectId === 'string' ? { projectId: data.projectId } : {}),
    title: typeof data.title === 'string' ? data.title : '',
    summary: typeof data.summary === 'string' ? data.summary : '',
    body: parsed.content,
  };

  if (canPublish(entry)) entry.presentationStrings = collectProjectPresentationStrings(data);
  if (collection === 'signals') entry.signalPresentation = collectSignalPresentation(data);
  return entry;
}

async function readEntries(): Promise<AuditedEntry[]> {
  const files = await fg(collectionDirectories.map(([, directory]) => `${directory}/**/[^_]*.{md,mdx}`), {
    cwd: contentRoot,
    absolute: true,
  });

  return Promise.all(files.filter(isAuditableContentFile).map(async (filePath) => {
    const collection = collectionDirectories.find(([, directory]) => filePath.includes(`${directory}\\`) || filePath.includes(`${directory}/`))?.[0];
    if (!collection) throw new Error(`Unable to determine collection for ${filePath}.`);
    const raw = await readFile(filePath, 'utf8');
    const directory = collectionDirectories.find(([candidate]) => candidate === collection)?.[1];
    if (!directory) throw new Error(`Unable to determine directory for ${collection}.`);
    const routeSlug = contentSlugFromRelativePath(relative(resolve(contentRoot, directory), filePath));
    return asEntry(collection, routeSlug, matter(raw));
  }));
}

function signalAtlasRecords(entries: AuditedEntry[]) {
  return entries.map((entry) => toSignalAtlasRecord({
    collection: entry.collection,
    authoredId: entry.id.slice(`${entry.collection}:`.length),
    routeSlug: entry.slug,
    title: entry.title,
    summary: entry.summary,
    visibility: entry.visibility,
    publicReview: entry.publicReview,
  }));
}

function presentString(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateSignalAtlasEntries(
  entries: AuditedEntry[],
  atlasConfig: SignalAtlasConfig = signalAtlasConfig,
): string[] {
  const violations: string[] = [];
  const records = signalAtlasRecords(entries);
  const recordById = new Map(records.map((record) => [record.canonicalId, record]));

  for (const entry of entries) {
    if (entry.collection !== 'signals' || !canPublish(entry)) continue;
    const presentation = entry.signalPresentation;
    const requiredFields: Array<keyof Pick<SignalPresentationAuditPayload, 'researchQuestion' | 'artifactLabel' | 'artifactType' | 'finding' | 'evidenceSummary' | 'evidenceBoundary'>> = [
      'researchQuestion', 'artifactLabel', 'artifactType', 'finding', 'evidenceSummary', 'evidenceBoundary',
    ];
    for (const field of requiredFields) {
      if (!presentString(presentation?.[field])) violations.push(`${entry.id}: signal-presentation: ${field} is required for publishable signals.`);
    }
    if (presentation?.artifactType && !signalArtifactTypeValues.includes(presentation.artifactType as typeof signalArtifactTypeValues[number])) {
      violations.push(`${entry.id}: signal-presentation: artifactType must be one of ${signalArtifactTypeValues.join(', ')}.`);
    }
    if (!presentation?.continueTo || !presentString(presentation.continueTo.annotation)) {
      violations.push(`${entry.id}: signal-presentation: continueTo.annotation is required for publishable signals.`);
    }
    const continuationTargetId = presentation?.continueTo?.targetId;
    if (typeof continuationTargetId !== 'string' || continuationTargetId.trim().length === 0) {
      violations.push(`${entry.id}: signal-presentation: continueTo.targetId is required for publishable signals.`);
    } else {
      const continuation = recordById.get(continuationTargetId);
      if (!continuation) violations.push(`${entry.id}: continuation: "${continuationTargetId}" does not exist.`);
      else if (!canPublish(continuation)) violations.push(`${entry.id}: continuation: "${continuationTargetId}" is not approved for public content.`);
    }
    for (const finding of findPublicContentRisks(collectStrings(presentation).join('\n'))) {
      violations.push(`${entry.id}: ${finding.rule}: ${finding.excerpt}`);
    }
  }

  try {
    resolveSignalAtlas(atlasConfig, records);
  } catch (error) {
    if (error instanceof SignalAtlasConfigurationError) violations.push(...error.issues);
    else throw error;
  }
  return violations;
}

export function auditEntries(
  entries: AuditedEntry[],
  atlasConfig: SignalAtlasConfig = signalAtlasConfig,
): void {
  const records = new Map(entries.map((entry) => [entry.id, entry]));
  const violations: string[] = [];

  for (const entry of entries) {
    if (canPublish(entry)) {
      for (const rule of validateSourcePolicy(entry)) violations.push(`${entry.id}: source-policy: ${rule}`);
      for (const finding of findPublicContentRisks([
        entry.title,
        entry.summary,
        ...entry.sourceUrls,
        ...(entry.presentationStrings ?? []),
        ...collectStrings(entry.signalPresentation),
        ...entry.relationshipEdges.flatMap((edge) => [edge.annotation, edge.inverseAnnotation ?? '', edge.evidenceNote ?? '']),
        entry.body,
      ].join('\n'))) {
        violations.push(`${entry.id}: ${finding.rule}: ${finding.excerpt}`);
      }
    }
    for (const rule of validatePublicRelations(entry, records)) violations.push(`${entry.id}: relation: ${rule}`);

    if (canPublish(entry) && entry.collection === 'caseStudies') {
      const project = entry.projectId ? records.get(canonicalRelationId('projects', entry.projectId)) : undefined;

      if (!entry.projectId || !project) {
        violations.push(`${entry.id}: project: Project "${entry.projectId ?? ''}" does not exist.`);
      } else if (!canPublish(project)) {
        violations.push(`${entry.id}: project: Project "${entry.projectId}" is not approved for public content.`);
      }
    }
  }

  violations.push(...validateSignalAtlasEntries(entries, atlasConfig));

  const uniqueViolations = [...new Set(violations)];
  if (uniqueViolations.length) throw new Error(`Public content audit failed:\n${uniqueViolations.map((violation) => `- ${violation}`).join('\n')}`);
}

export function auditEvidenceDocuments(documents: EvidenceDocument[]): void {
  const violations = documents.flatMap(({ filePath, content }) =>
    findPublicContentRisks(content).map((finding) => `${filePath.replaceAll('\\', '/')}: ${finding.rule}: ${finding.excerpt}`),
  );

  if (violations.length) throw new Error(`Evidence document audit failed:\n${violations.map((violation) => `- ${violation}`).join('\n')}`);
}

async function readEvidenceDocuments(): Promise<EvidenceDocument[]> {
  const files = await fg('docs/evidence/**/*.md', { cwd: process.cwd(), absolute: true });

  return Promise.all(files.map(async (filePath) => ({
    filePath: filePath.slice(process.cwd().length + 1).replaceAll('\\', '/'),
    content: await readFile(filePath, 'utf8'),
  })));
}

async function audit(): Promise<void> {
  const entries = await readEntries();
  auditEntries(entries);
  auditEvidenceDocuments(await readEvidenceDocuments());

  for (const [collection] of collectionDirectories) {
    const counts = entries.filter((entry) => entry.collection === collection).reduce<Record<string, number>>((accumulator, entry) => {
      accumulator[entry.visibility] = (accumulator[entry.visibility] ?? 0) + 1;
      return accumulator;
    }, {});
    console.log(`${collection}: ${Object.entries(counts).map(([visibility, count]) => `${visibility}=${count}`).join(', ') || '0 entries'}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  audit().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

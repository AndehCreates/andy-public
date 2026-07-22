import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { canonicalRelationId, validatePublicRelations } from '../src/lib/content/relations';
import { canPublish, type PublicReview, type SourceAvailability, type Visibility, validateSourcePolicy } from '../src/lib/content/publication';
import { findPublicContentRisks } from '../src/lib/content/sanitization';
import { projectPresentationFieldNames } from '../src/lib/content/presentation';
import type { ContentCollectionName } from '../src/lib/content/types';

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
  collection: ContentCollectionName;
  visibility: Visibility;
  publicReview: PublicReview;
  sourceAvailability: SourceAvailability;
  sourceUrls: string[];
  relatedIds: string[];
  projectId?: string;
  title: string;
  summary: string;
  body: string;
  presentationStrings?: string[];
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

function asEntry(collection: ContentCollectionName, parsed: matter.GrayMatterFile<string>): AuditedEntry {
  const data = parsed.data as Record<string, unknown>;
  const authoredId = typeof data.id === 'string' ? data.id : '';

  const entry: AuditedEntry = {
    id: canonicalRelationId(collection, authoredId),
    collection,
    visibility: data.visibility as Visibility,
    publicReview: data.publicReview as PublicReview,
    sourceAvailability: data.sourceAvailability as SourceAvailability,
    sourceUrls: toStringArray(data.sourceUrls),
    relatedIds: toStringArray(data.relatedIds),
    ...(collection === 'caseStudies' && typeof data.projectId === 'string' ? { projectId: data.projectId } : {}),
    title: typeof data.title === 'string' ? data.title : '',
    summary: typeof data.summary === 'string' ? data.summary : '',
    body: parsed.content,
  };

  if (canPublish(entry)) entry.presentationStrings = collectProjectPresentationStrings(data);
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
    return asEntry(collection, matter(raw));
  }));
}

export function auditEntries(entries: AuditedEntry[]): void {
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

  if (violations.length) throw new Error(`Public content audit failed:\n${violations.map((violation) => `- ${violation}`).join('\n')}`);
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

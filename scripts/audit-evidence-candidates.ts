import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import fg from 'fast-glob';
import { evidenceCandidateSchema, type EvidenceCandidate } from '../src/lib/content/evidenceCandidates';

export type EvidenceCandidateInput = {
  file: string;
  value: unknown;
};

export type EvidenceCandidateJsonInput = {
  file: string;
  content: string;
};

export function isEvidenceCandidateFile(filePath: string): boolean {
  const filename = basename(filePath);
  return filename.endsWith('.json') && !filename.startsWith('_');
}

function candidateIssues(file: string, value: unknown): { candidate?: EvidenceCandidate; violations: string[] } {
  const result = evidenceCandidateSchema.safeParse(value);
  if (result.success) return { candidate: result.data, violations: [] };

  return {
    violations: result.error.issues.map((issue) => `${file}: ${issue.path.join('.') || 'candidate'}: ${issue.message}`),
  };
}

function throwAuditViolations(violations: string[]): void {
  if (violations.length) {
    throw new Error(`Evidence candidate audit failed:\n${violations.sort().map((violation) => `- ${violation}`).join('\n')}`);
  }
}

function collectEvidenceCandidates(inputs: EvidenceCandidateInput[]): { candidates: EvidenceCandidate[]; violations: string[] } {
  const violations: string[] = [];
  const candidates: Array<{ file: string; candidate: EvidenceCandidate }> = [];

  for (const input of inputs) {
    const result = candidateIssues(input.file, input.value);
    violations.push(...result.violations);
    if (result.candidate) candidates.push({ file: input.file, candidate: result.candidate });
  }

  const filesByCandidateId = new Map<string, string[]>();
  for (const { file, candidate } of candidates) {
    filesByCandidateId.set(candidate.candidateId, [...(filesByCandidateId.get(candidate.candidateId) ?? []), file]);
  }
  for (const [candidateId, files] of filesByCandidateId) {
    if (files.length > 1) violations.push(`candidateId "${candidateId}" is duplicated in ${files.sort().join(', ')}`);
  }

  return { candidates: candidates.map(({ candidate }) => candidate).sort((left, right) => left.candidateId.localeCompare(right.candidateId)), violations };
}

export function auditEvidenceCandidates(inputs: EvidenceCandidateInput[]): EvidenceCandidate[] {
  const result = collectEvidenceCandidates(inputs);
  throwAuditViolations(result.violations);
  return result.candidates;
}

export function auditEvidenceCandidateJson(inputs: EvidenceCandidateJsonInput[]): EvidenceCandidate[] {
  const parseViolations: string[] = [];
  const values: EvidenceCandidateInput[] = [];

  for (const input of inputs) {
    try {
      values.push({ file: input.file, value: JSON.parse(input.content) });
    } catch {
      parseViolations.push(`${input.file}: invalid JSON`);
    }
  }

  const result = collectEvidenceCandidates(values);
  throwAuditViolations([...parseViolations, ...result.violations]);
  return result.candidates;
}

async function readEvidenceCandidateJsonInputs(): Promise<EvidenceCandidateJsonInput[]> {
  const candidateRoot = resolve(process.cwd(), 'docs/evidence/candidates');
  const files = (await fg('*.json', { cwd: candidateRoot, absolute: true })).filter(isEvidenceCandidateFile);

  return Promise.all(files.map(async (file) => ({
    file: file.slice(process.cwd().length + 1).replaceAll('\\', '/'),
    content: await readFile(file, 'utf8'),
  })));
}

async function audit(): Promise<void> {
  const candidates = auditEvidenceCandidateJson(await readEvidenceCandidateJsonInputs());
  const counts = candidates.reduce<Record<string, number>>((all, candidate) => {
    all[candidate.state] = (all[candidate.state] ?? 0) + 1;
    return all;
  }, {});
  console.log(`evidence candidates: ${Object.entries(counts).map(([state, count]) => `${state}=${count}`).join(', ') || '0 candidates'}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  audit().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

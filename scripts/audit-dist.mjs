import { access, readFile, readdir } from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const sanitizerRules = [
  ['private path', /\b[A-Za-z]:\\[^\s)<]+/g],
  ['local URL', /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?[^\s)<]*/gi],
  ['private-network URL', /https?:\/\/(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})(?::\d+)?[^\s)<]*/gi],
  ['secret-like assignment', /\b(?:api[_-]?key|client[_-]?secret|password|token)\s*[:=]\s*[^\s<]+/gi],
];
const internalMarker = /\b(?:publicationState|visibility)\s*[:=]\s*["']?(?:internal|draft)\b/gi;
const localAttribute = /\b(?:href|src|poster)\s*=\s*["']([^"']+)["']/gi;
const srcSetAttribute = /\bsrcset\s*=\s*["']([^"']+)["']/gi;

function displayPath(root, filePath) {
  return relative(root, filePath).replaceAll(sep, '/');
}

function isIgnoredReference(reference) {
  return !reference || reference.startsWith('#') || reference.startsWith('//') || /^(?:[a-z][a-z\d+.-]*:)/i.test(reference);
}

function normalizeBasePath(basePath) {
  if (!basePath || basePath === '/') return '';
  return `/${basePath.replace(/^\/+|\/+$/g, '')}`;
}

function candidateTargets(root, sourceFile, reference, basePath) {
  let pathname = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || '/';
  }
  if (!pathname || pathname.endsWith('/')) {
    return [resolve(root, `.${pathname}`, 'index.html')];
  }

  const base = pathname.startsWith('/') ? root : resolve(sourceFile, '..');
  const target = resolve(base, pathname.startsWith('/') ? `.${pathname}` : pathname);
  return extname(target) ? [target] : [target, resolve(target, 'index.html')];
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function outputFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(root, entry.name);
    if (entry.isDirectory()) return outputFiles(entryPath);
    return entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.xml')) ? [entryPath] : [];
  }));
  return nested.flat();
}

function referencesIn(document, includeXmlText) {
  const references = [];
  for (const match of document.matchAll(localAttribute)) references.push(match[1]);
  for (const match of document.matchAll(srcSetAttribute)) {
    for (const item of match[1].split(',')) references.push(item.trim().split(/\s+/, 1)[0]);
  }
  if (includeXmlText) {
    for (const match of document.matchAll(/<(?:atom:)?(?:link|loc)\b[^>]*>([^<]+)<\/(?:atom:)?(?:link|loc)>/gi)) references.push(match[1]);
  }
  return references;
}

function sameOriginPath(reference, siteUrl) {
  if (!siteUrl) return reference;
  try {
    const url = new URL(reference);
    return url.origin === new URL(siteUrl).origin ? `${url.pathname}${url.search}${url.hash}` : reference;
  } catch {
    return reference;
  }
}

/** @typedef {{ files: string[], errors: string[] }} DistAuditResult */

/**
 * @param {string} outputRoot
 * @param {string} [basePath]
 * @param {string} [siteUrl]
 * @returns {Promise<DistAuditResult>}
 */
export async function auditDist(outputRoot, basePath = process.env.PUBLIC_SITE_BASE, siteUrl = process.env.PUBLIC_SITE_URL) {
  const root = resolve(outputRoot);
  const deploymentBase = normalizeBasePath(basePath);
  const files = await outputFiles(root);
  const errors = [];

  for (const filePath of files) {
    const document = await readFile(filePath, 'utf8');
    const label = displayPath(root, filePath);

    for (const [rule, pattern] of sanitizerRules) {
      const matcher = new RegExp(pattern.source, pattern.flags);
      for (const match of document.matchAll(matcher)) errors.push(`${label}: ${rule}: ${match[0]}`);
    }
    for (const match of document.matchAll(internalMarker)) errors.push(`${label}: internal/draft marker: ${match[0]}`);

    const isXml = filePath.endsWith('.xml');
    for (const rawReference of referencesIn(document, isXml)) {
      const reference = isXml ? sameOriginPath(rawReference, siteUrl) : rawReference;
      if (isXml && deploymentBase && reference.startsWith('/') && !(reference === deploymentBase || reference.startsWith(`${deploymentBase}/`))) {
        errors.push(`${label}: missing deployment base: ${rawReference}`);
        continue;
      }
      if (isIgnoredReference(reference)) continue;
      const candidates = candidateTargets(root, filePath, reference, deploymentBase);
      if (candidates.some((candidate) => candidate === root || candidate.startsWith(`${root}${sep}`)) && await Promise.all(candidates.map(exists)).then((matches) => matches.some(Boolean))) continue;
      errors.push(`${label}: missing local target: ${rawReference}`);
    }
  }

  return { files: files.map((filePath) => displayPath(root, filePath)), errors };
}

async function main() {
  const outputRoot = process.argv[2] ?? resolve(process.cwd(), 'dist');
  const result = await auditDist(outputRoot);
  if (result.errors.length) throw new Error(`Distribution audit failed:\n${result.errors.map((error) => `- ${error}`).join('\n')}`);
  console.log(`Distribution audit passed: ${result.files.length} HTML files checked.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

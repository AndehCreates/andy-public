export type SanitizationFinding = { rule: string; excerpt: string };

const rules = [
  { rule: 'windows-path', pattern: /\b[A-Za-z]:\\[^\s)]+/g },
  { rule: 'localhost-url', pattern: /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?[^\s)]*/gi },
  { rule: 'private-network-url', pattern: /https?:\/\/(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})(?::\d+)?[^\s)]*/gi },
  { rule: 'secret-assignment', pattern: /\b(?:api[_-]?key|client[_-]?secret|password|token)\s*[:=]\s*[^\s]+/gi },
] as const;

export function findPublicContentRisks(value: string): SanitizationFinding[] {
  return rules.flatMap(({ rule, pattern }) => {
    const matcher = new RegExp(pattern.source, pattern.flags);

    return [...value.matchAll(matcher)].map((match) => ({ rule, excerpt: match[0] }));
  });
}

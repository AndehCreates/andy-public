import { expect, it } from 'vitest';
import { findPublicContentRisks } from '../../src/lib/content/sanitization';

it('finds Windows absolute paths', () => {
  expect(findPublicContentRisks('D:\\coding\\private-repo E:\\repos\\private-app C:\\Temp\\notes')).toEqual([
    { rule: 'windows-path', excerpt: 'D:\\coding\\private-repo' },
    { rule: 'windows-path', excerpt: 'E:\\repos\\private-app' },
    { rule: 'windows-path', excerpt: 'C:\\Temp\\notes' },
  ]);
});

it('finds local and private-network URLs', () => {
  expect(findPublicContentRisks('http://localhost:4321 http://192.168.1.20:8080 http://172.16.0.1:3000')).toEqual([
    { rule: 'localhost-url', excerpt: 'http://localhost:4321' },
    { rule: 'private-network-url', excerpt: 'http://192.168.1.20:8080' },
    { rule: 'private-network-url', excerpt: 'http://172.16.0.1:3000' },
  ]);
});

it('finds secret-like assignments', () => {
  expect(findPublicContentRisks('api_key=actual-value')).toEqual([
    { rule: 'secret-assignment', excerpt: 'api_key=actual-value' },
  ]);
});

it('allows ordinary public-safe discussion', () => {
  const discussion = 'API keys should be protected in a local AI system with private-by-design architecture.';

  expect(findPublicContentRisks(discussion)).toEqual([]);
});

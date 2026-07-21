import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

it('runs the TypeScript test harness', () => {
  expect('andy-public').toMatch(/^andy-public$/);
});

it('uses the approved semantic site title without mojibake', async () => {
  const pagePath = resolve(process.cwd(), 'src/pages/index.astro');
  const source = await readFile(pagePath, 'utf8');
  const encodedTitle = source.match(/<title>(.*?)<\/title>/)?.[1];

  expect(source).toContain('<title>Andy &mdash; AI Systems</title>');
  expect(encodedTitle?.replace('&mdash;', '\u2014')).toBe('Andy \u2014 AI Systems');
  expect(source).not.toMatch(/â€|â€”/);
});

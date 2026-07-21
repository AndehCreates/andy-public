import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

it('runs the TypeScript test harness', () => {
  expect('andy-public').toMatch(/^andy-public$/);
});

it('keeps title and semantic metadata in the shared document head without mojibake', async () => {
  const [headSource, siteSource] = await Promise.all([
    readFile(resolve(process.cwd(), 'src/components/meta/DocumentHead.astro'), 'utf8'),
    readFile(resolve(process.cwd(), 'src/config/site.ts'), 'utf8'),
  ]);

  expect(siteSource).toContain('const emDash = String.fromCharCode(0x2014);');
  expect(siteSource).toContain('title: `Andy ${emDash} AI Systems`');
  expect(headSource).toContain('title = site.title');
  expect(headSource).toContain('<title>{title}</title>');
  expect(headSource).toContain('<meta charset="utf-8" />');
  expect(headSource).toContain('<meta name="viewport" content="width=device-width, initial-scale=1" />');
  expect(headSource).toContain('<meta name="description" content={description} />');
  expect(headSource).toContain('<link rel="canonical" href={canonical.href} />');
  expect(headSource).toContain('<meta property="og:title" content={title} />');
  expect(headSource).toContain('<meta name="twitter:card"');
  expect(headSource).not.toMatch(/Ã¢â‚¬|Ã¢â‚¬â€/);
  expect(siteSource).not.toMatch(/Ã¢â‚¬|Ã¢â‚¬â€/);
});

it('uses BaseLayout for the homepage shell', async () => {
  const source = await readFile(resolve(process.cwd(), 'src/pages/index.astro'), 'utf8');

  expect(source).toContain("import BaseLayout from '@/layouts/BaseLayout.astro';");
  expect(source).toMatch(/<BaseLayout(?:\s|>)/);
  expect(source).toContain('<h1 id="home-title">Software that strengthens human capability.</h1>');
  expect(source).not.toContain('<!doctype html>');
});

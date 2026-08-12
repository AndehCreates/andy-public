import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { auditDist } from '../../scripts/audit-dist.mjs';

const fixtureRoots: string[] = [];

afterEach(async () => {
  await Promise.all(fixtureRoots.splice(0).map((root) => rm(root, { force: true, recursive: true })));
});

describe('auditDist', () => {
  test('reports broken local links and sanitized-output violations together', async () => {
    const root = await mkdtemp(join(tmpdir(), 'andy-public-dist-audit-'));
    fixtureRoots.push(root);
    await mkdir(join(root, 'work'), { recursive: true });
    await writeFile(
      join(root, 'index.html'),
      '<a href="/work/missing/">Missing work</a><img src="/media/missing.svg"><p>C:\\private\\checkout</p><p>publicationState: internal</p>',
    );
    await writeFile(join(root, 'work', 'index.html'), '<a href="/">Home</a>');

    const result = await auditDist(root);

    expect(result.errors).toEqual(expect.arrayContaining([
      expect.stringContaining('/work/missing/'),
      expect.stringContaining('/media/missing.svg'),
      expect.stringContaining('private path'),
      expect.stringContaining('internal/draft marker'),
    ]));
  });

  test('resolves project-site links below an explicit deployment base', async () => {
    const root = await mkdtemp(join(tmpdir(), 'andy-public-dist-audit-'));
    fixtureRoots.push(root);
    await mkdir(join(root, 'work'), { recursive: true });
    await writeFile(join(root, 'index.html'), '<a href="/andy-public/work/">Work</a><img src="/andy-public/media.svg">');
    await writeFile(join(root, 'work', 'index.html'), '<a href="/andy-public/">Home</a>');
    await writeFile(join(root, 'media.svg'), '<svg xmlns="http://www.w3.org/2000/svg" />');
    await writeFile(join(root, 'rss.xml'), '<rss><channel><link>https://andehcreates.github.io/andy-public/</link><item><link>https://andehcreates.github.io/andy-public/work/</link></item></channel></rss>');

    const result = await auditDist(root, '/andy-public', 'https://andehcreates.github.io');

    expect(result.errors).toEqual([]);
  });

  test('rejects same-origin XML links that omit the deployment base', async () => {
    const root = await mkdtemp(join(tmpdir(), 'andy-public-dist-audit-'));
    fixtureRoots.push(root);
    await writeFile(join(root, 'rss.xml'), '<rss><channel><link>https://andehcreates.github.io/work/</link></channel></rss>');

    const result = await auditDist(root, '/andy-public', 'https://andehcreates.github.io');

    expect(result.errors).toEqual(expect.arrayContaining([
      expect.stringContaining('missing deployment base'),
    ]));
  });
});

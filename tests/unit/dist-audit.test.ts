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
});

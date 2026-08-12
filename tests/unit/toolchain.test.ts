import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
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

it('isolates Vite optimized dependencies between development and production', () => {
  const configUrl = pathToFileURL(resolve(process.cwd(), 'astro.config.mjs')).href;
  const readCacheDir = (nodeEnv: 'development' | 'production') =>
    execFileSync(
      process.execPath,
      ['--input-type=module', '--eval', `import config from '${configUrl}'; console.log(config.vite.cacheDir);`],
      {
        encoding: 'utf8',
        env: { ...process.env, NODE_ENV: nodeEnv },
      },
    ).trim();

  expect(readCacheDir('development')).toBe('node_modules/.vite-development');
  expect(readCacheDir('production')).toBe('node_modules/.vite-production');
});

it('uses an explicit public base path for project-site deployments', () => {
  const configUrl = pathToFileURL(resolve(process.cwd(), 'astro.config.mjs')).href;
  const readDeploymentConfig = () =>
    JSON.parse(
      execFileSync(
        process.execPath,
        [
          '--input-type=module',
          '--eval',
          `import config from '${configUrl}'; console.log(JSON.stringify({ site: config.site, base: config.base }));`,
        ],
        {
          encoding: 'utf8',
          env: {
            ...process.env,
            PUBLIC_SITE_URL: 'https://andehcreates.github.io',
            PUBLIC_SITE_BASE: '/andy-public',
          },
        },
      ),
    );

  expect(readDeploymentConfig()).toEqual({
    site: 'https://andehcreates.github.io',
    base: '/andy-public',
  });
});

it('keeps the Pages deployment workflow scoped to verified static output', async () => {
  const workflow = await readFile(resolve(process.cwd(), '.github/workflows/deploy-pages.yml'), 'utf8');

  expect(workflow).toContain('PUBLIC_SITE_URL: https://andehcreates.github.io');
  expect(workflow).toContain('PUBLIC_SITE_BASE: /andy-public');
  expect(workflow).toContain('npm run build');
  expect(workflow).toContain('actions/upload-pages-artifact@v4');
  expect(workflow).toContain('actions/deploy-pages@v4');
  expect(workflow).toContain('path: ./dist');
  expect(workflow).toContain('branches: [codex/public-ai-systems-portfolio-v1]');
});

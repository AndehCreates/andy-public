import { afterEach, describe, expect, it, vi } from 'vitest';

const executableEnvironmentVariable = 'PLAYWRIGHT_CHROMIUM_EXECUTABLE';
const originalExecutable = process.env[executableEnvironmentVariable];

async function loadPlaywrightConfig(executablePath?: string) {
  if (executablePath === undefined) {
    delete process.env[executableEnvironmentVariable];
  } else {
    process.env[executableEnvironmentVariable] = executablePath;
  }

  vi.resetModules();
  return (await import('../../playwright.config')).default;
}

afterEach(() => {
  if (originalExecutable === undefined) {
    delete process.env[executableEnvironmentVariable];
  } else {
    process.env[executableEnvironmentVariable] = originalExecutable;
  }
  vi.resetModules();
});

describe('Playwright browser executable selection', () => {
  it('keeps Playwright browser resolution unchanged when no override is configured', async () => {
    const config = await loadPlaywrightConfig();

    expect(config.use?.launchOptions).toBeUndefined();
  });

  it('uses the managed Chromium executable for every browser project when configured', async () => {
    const config = await loadPlaywrightConfig('  /managed/bin/chromium  ');

    expect(config.use?.launchOptions).toEqual({
      executablePath: '/managed/bin/chromium',
    });
    expect(config.projects).toHaveLength(2);

    for (const project of config.projects ?? []) {
      const effectiveUse = { ...config.use, ...project.use };

      expect(effectiveUse.launchOptions).toEqual({
        executablePath: '/managed/bin/chromium',
      });
    }
  });

  it('ignores a blank override instead of passing an invalid executable path', async () => {
    const config = await loadPlaywrightConfig('   ');

    expect(config.use?.launchOptions).toBeUndefined();
  });
});

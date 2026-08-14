import { defineConfig, devices } from '@playwright/test';

const verificationPort = 4342;
const verificationBaseUrl = `http://127.0.0.1:${verificationPort}`;
const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  webServer: {
    command: `npm run preview -- --port ${verificationPort}`,
    url: verificationBaseUrl,
    timeout: 120_000,
    // Verification must exercise the build produced by this command, never a
    // possibly stale preview process already bound to the fixed local port.
    reuseExistingServer: false,
  },
  use: {
    baseURL: verificationBaseUrl,
    trace: 'retain-on-failure',
    ...(chromiumExecutable ? { launchOptions: { executablePath: chromiumExecutable } } : {}),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /no-javascript\.spec\.ts/,
    },
    {
      name: 'chromium-no-js',
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
      testMatch: /no-javascript\.spec\.ts/,
    },
  ],
});

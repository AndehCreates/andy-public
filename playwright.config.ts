import { defineConfig, devices } from '@playwright/test';

const verificationPort = 4342;
const verificationBaseUrl = `http://127.0.0.1:${verificationPort}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
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

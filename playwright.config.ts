import { defineConfig, devices } from '@playwright/test';

const verificationPort = 4342;
const verificationBaseUrl = `http://127.0.0.1:${verificationPort}`;
// Managed hosts may supply a compatible system Chromium without changing the
// suite, while local development and CI keep Playwright's default browser.
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?.trim();
const browserLaunchOverride = chromiumExecutablePath
  ? { launchOptions: { executablePath: chromiumExecutablePath } }
  : {};

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
    ...browserLaunchOverride,
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

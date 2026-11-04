import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: 'test-results',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:43187',
    trace: 'on-first-retry',
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
  },
  projects: [
    ...[375, 768, 1024, 1440].map((width) => ({
      name: `chromium-${width}`,
      use: { browserName: 'chromium' as const, viewport: { width, height: 900 } },
    })),
    { name: 'firefox-1440', use: { browserName: 'firefox', viewport: { width: 1440, height: 900 } } },
    { name: 'webkit-375', use: { browserName: 'webkit', viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run build && node e2e/serve.mjs',
    url: 'http://127.0.0.1:43187',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

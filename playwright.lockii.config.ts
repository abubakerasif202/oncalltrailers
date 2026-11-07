import { defineConfig } from '@playwright/test';

/**
 * Preview-build suite: the booking widget is switched on in shielded preview mode and every request to the
 * widget provider is stubbed or aborted inside the tests. Run after the default suite (both build into out/):
 *   npm run test:e2e:lockii
 */
const LIVE = process.env.LOCKII_E2E_MODE === 'live';
const PORT = LIVE ? 43190 : 43188;

export default defineConfig({
  testDir: './e2e-lockii',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: 'test-results-lockii',
  reporter: [['list']],
  use: { baseURL: `http://127.0.0.1:${PORT}`, reducedMotion: 'reduce' },
  projects: [360, 390, 768, 1440].map((width) => ({
    name: `chromium-${width}`,
    use: { browserName: 'chromium' as const, viewport: { width, height: 900 } },
  })),
  webServer: {
    command: 'npm run build && node e2e/serve.mjs',
    env: LIVE
      ? { NEXT_PUBLIC_LOCKII_MODE: 'live', NEXT_PUBLIC_LOCKII_OWNER_APPROVED: 'true', E2E_PORT: String(PORT) }
      : { NEXT_PUBLIC_LOCKII_MODE: 'preview', E2E_PORT: String(PORT) },
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});

// Cross-platform wrapper: runs the widget suite against a live-mode build (provider stubbed in every test).
import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['playwright', 'test', '-c', 'playwright.lockii.config.ts'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, LOCKII_E2E_MODE: 'live' },
});
process.exit(result.status ?? 1);

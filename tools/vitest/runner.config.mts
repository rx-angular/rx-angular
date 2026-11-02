import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Shared vitest config for the Angular libs, passed to `@nx/angular:unit-test` via `runnerConfig`.
export default defineConfig({
  test: {
    environment: fileURLToPath(new URL('./jsdom-zone.ts', import.meta.url)),
    // schematics specs are slow without a warm cache
    testTimeout: 100_000,
  },
});

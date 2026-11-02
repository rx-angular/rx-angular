import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [angular({ jit: true })],
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts', '../../tools/vitest/setup-schematics.ts'],
    // schematics have long-running tests that time out without a cache hit
    testTimeout: 100_000,
    bail: 1,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: '../../coverage/cdk',
    },
  },
});

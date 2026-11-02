import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [angular({ jit: true })],
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: '../../coverage/isr',
    },
  },
});

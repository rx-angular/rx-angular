import { ngp } from '@push-based/vite-plugin-ngp';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import runnerConfig from './runner.config.mts';

const tools = (file: string) =>
  fileURLToPath(new URL(`./${file}`, import.meta.url));

// Runs a project's specs through @push-based/vite-plugin-ngp instead of the Angular CLI unit-test builder.
// `projectUrl` is the project's `vitest.config.mts` (`import.meta.url`).
export const ngpVitestConfig = (projectUrl: string) =>
  mergeConfig(
    runnerConfig,
    defineConfig({
      root: fileURLToPath(new URL('.', projectUrl)),
      resolve: { tsconfigPaths: true },
      oxc: { decorator: { legacy: true, emitDecoratorMetadata: false } },
      plugins: [ngp({ tsconfig: 'tsconfig.spec.json' })],
      test: {
        globals: true,
        include: ['**/*.spec.ts'],
        setupFiles: [
          'zone.js/testing',
          tools('setup-zone.ts'),
          tools('setup-schematics.ts'),
          tools('setup-testbed.ts'),
        ],
      },
    }),
  );

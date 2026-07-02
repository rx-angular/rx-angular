import type { Metafile } from 'esbuild';
import { createBundleGraph } from './graph';
import { createReachabilityMergeGroups } from './reachability-strategy';

describe('createReachabilityMergeGroups', () => {
  it('groups each entry point with dependencies only reachable through it', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(
      toEntries(createReachabilityMergeGroups('dist/main.js', graph)),
    ).toEqual([
      ['dist/main.js', ['dist/main.js', 'dist/root-shared.js']],
      ['dist/settings.js', ['dist/settings.js']],
      ['dist/admin.js', ['dist/admin.js', 'dist/admin-only.js']],
    ]);
  });

  it('keeps shared dependencies out of lazy entry point groups', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(
      toEntries(createReachabilityMergeGroups('dist/main.js', graph)).some(
        ([owner, chunks]) =>
          owner !== 'dist/main.js' && chunks.includes('dist/shared-feature.js'),
      ),
    ).toBe(false);
  });
});

function createMetafile(): Metafile {
  return {
    inputs: {},
    outputs: {
      'dist/main.js': output({
        entryPoint: 'src/main.ts',
        imports: [
          importStatement('dist/root-shared.js'),
          dynamicImport('dist/admin.js'),
          dynamicImport('dist/settings.js'),
        ],
      }),
      'dist/root-shared.js': output(),
      'dist/admin.js': output({
        entryPoint: 'src/admin.ts',
        imports: [
          importStatement('dist/admin-only.js'),
          importStatement('dist/shared-feature.js'),
        ],
      }),
      'dist/settings.js': output({
        entryPoint: 'src/settings.ts',
        imports: [importStatement('dist/shared-feature.js')],
      }),
      'dist/admin-only.js': output(),
      'dist/shared-feature.js': output(),
    },
  };
}

function output(options: Partial<Metafile['outputs'][string]> = {}) {
  return {
    imports: [],
    exports: [],
    inputs: {},
    bytes: 1,
    ...options,
  } satisfies Metafile['outputs'][string];
}

function importStatement(path: string) {
  return {
    path,
    kind: 'import-statement',
  } satisfies Metafile['outputs'][string]['imports'][number];
}

function dynamicImport(path: string) {
  return {
    path,
    kind: 'dynamic-import',
  } satisfies Metafile['outputs'][string]['imports'][number];
}

function toEntries(strategy: Map<string, string[]>): [string, string[]][] {
  return [...strategy.entries()];
}

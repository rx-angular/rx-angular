import type { Metafile } from 'esbuild';
import { createCommonMergeGroups } from './common-strategy';
import { createBundleGraph } from './graph';
import { STRATEGY_TYPE } from './types';

describe('createCommonMergeGroups', () => {
  it('creates one merge group from selected entry point static closures', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(
      toEntries(
        createCommonMergeGroups(
          {
            label: 'shared feature deps',
            type: STRATEGY_TYPE.COMMON,
            entryPoints: ['src/admin.ts', 'src/settings.ts'],
          },
          {
            assigned: new Set(),
            graph,
            metafile,
          },
        ),
      ),
    ).toEqual([['dist/common-a.js', ['dist/common-a.js', 'dist/common-b.js']]]);
  });

  it('does not include already assigned chunks', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(
      toEntries(
        createCommonMergeGroups(
          {
            label: 'shared feature deps',
            type: STRATEGY_TYPE.COMMON,
            entryPoints: ['src/admin.ts', 'src/settings.ts'],
          },
          {
            assigned: new Set(['dist/common-a.js']),
            graph,
            metafile,
          },
        ),
      ),
    ).toEqual([['dist/common-b.js', ['dist/common-b.js']]]);
  });

  it('throws when a configured entry point cannot be resolved', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(() =>
      createCommonMergeGroups(
        {
          label: 'missing entry',
          type: STRATEGY_TYPE.COMMON,
          entryPoints: ['src/missing.ts'],
        },
        {
          assigned: new Set(),
          graph,
          metafile,
        },
      ),
    ).toThrow(
      'Entry point "src/missing.ts" specified in "missing entry" was not found',
    );
  });
});

function createMetafile(): Metafile {
  return {
    inputs: {},
    outputs: {
      'dist/main.js': output({
        entryPoint: 'src/main.ts',
        imports: [
          dynamicImport('dist/admin.js'),
          dynamicImport('dist/settings.js'),
        ],
      }),
      'dist/admin.js': output({
        entryPoint: 'src/admin.ts',
        imports: [
          importStatement('dist/common-a.js'),
          importStatement('dist/common-b.js'),
        ],
      }),
      'dist/settings.js': output({
        entryPoint: 'src/settings.ts',
        imports: [
          importStatement('dist/common-a.js'),
          importStatement('dist/common-b.js'),
        ],
      }),
      'dist/common-a.js': output(),
      'dist/common-b.js': output(),
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

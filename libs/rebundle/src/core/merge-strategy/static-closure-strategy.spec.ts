import type { Metafile } from 'esbuild';
import { createBundleGraph } from './graph';
import { createStaticClosureMergeGroups } from './static-closure-strategy';
import { STRATEGY_TYPE } from './types';

describe('createStaticClosureMergeGroups', () => {
  it('creates one merge group from an entry point static closure', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(
      toEntries(
        createStaticClosureMergeGroups(
          {
            label: 'feature closure',
            type: STRATEGY_TYPE.STATIC_CLOSURE,
            entryPoint: 'src/feature.ts',
          },
          {
            graph,
            metafile,
          },
        ),
      ),
    ).toEqual([
      [
        'dist/feature.js',
        ['dist/feature.js', 'dist/feature-a.js', 'dist/feature-b.js'],
      ],
    ]);
  });

  it('does not include dynamic imports in the static closure', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(
      toEntries(
        createStaticClosureMergeGroups(
          {
            label: 'main closure',
            type: STRATEGY_TYPE.STATIC_CLOSURE,
            entryPoint: 'src/main.ts',
          },
          {
            graph,
            metafile,
          },
        ),
      ),
    ).toEqual([['dist/main.js', ['dist/main.js', 'dist/root-shared.js']]]);
  });

  it('throws when the configured entry point cannot be resolved', () => {
    const metafile = createMetafile();
    const graph = createBundleGraph('dist/main.js', metafile);

    expect(() =>
      createStaticClosureMergeGroups(
        {
          label: 'missing closure',
          type: STRATEGY_TYPE.STATIC_CLOSURE,
          entryPoint: 'src/missing.ts',
        },
        {
          graph,
          metafile,
        },
      ),
    ).toThrow(
      'Entry point "src/missing.ts" specified in "missing closure" was not found',
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
          importStatement('dist/root-shared.js'),
          dynamicImport('dist/feature.js'),
        ],
      }),
      'dist/root-shared.js': output(),
      'dist/feature.js': output({
        entryPoint: 'src/feature.ts',
        imports: [
          importStatement('dist/feature-a.js'),
          dynamicImport('dist/feature-lazy.js'),
        ],
      }),
      'dist/feature-a.js': output({
        imports: [importStatement('dist/feature-b.js')],
      }),
      'dist/feature-b.js': output(),
      'dist/feature-lazy.js': output({
        entryPoint: 'src/feature-lazy.ts',
      }),
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

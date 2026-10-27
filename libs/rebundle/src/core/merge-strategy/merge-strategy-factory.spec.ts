import type { Metafile } from 'esbuild';
import { mergeStrategyFactory, STRATEGY_TYPE } from './index';

describe('mergeStrategyFactory', () => {
  it('applies the default reachability strategy', () => {
    const metafile = createMetafile({
      'dist/main.js': output({
        entryPoint: 'src/main.ts',
        imports: [
          importStatement('dist/shared.js'),
          dynamicImport('dist/feature.js'),
        ],
      }),
      'dist/shared.js': output(),
      'dist/feature.js': output({
        entryPoint: 'src/feature.ts',
        imports: [importStatement('dist/feature-dep.js')],
      }),
      'dist/feature-dep.js': output(),
      'dist/styles.css': output(),
    });

    expect(toEntries(mergeStrategyFactory('dist/main.js', metafile))).toEqual([
      ['dist/main.js', ['dist/main.js', 'dist/shared.js']],
      ['dist/feature.js', ['dist/feature.js', 'dist/feature-dep.js']],
    ]);
  });

  it('applies a static closure strategy and keeps remaining chunks standalone', () => {
    const metafile = createMetafile({
      'dist/main.js': output({
        entryPoint: 'src/main.ts',
        imports: [
          importStatement('dist/shared.js'),
          dynamicImport('dist/feature.js'),
        ],
      }),
      'dist/shared.js': output(),
      'dist/feature.js': output({
        entryPoint: 'src/feature.ts',
        imports: [importStatement('dist/feature-dep.js')],
      }),
      'dist/feature-dep.js': output(),
    });

    expect(
      toEntries(
        mergeStrategyFactory('dist/main.js', metafile, {
          name: 'feature',
          strategies: [
            {
              label: 'feature closure',
              type: STRATEGY_TYPE.STATIC_CLOSURE,
              entryPoint: 'src/feature.ts',
            },
          ],
        }),
      ),
    ).toEqual([
      ['dist/feature.js', ['dist/feature.js', 'dist/feature-dep.js']],
      ['dist/main.js', ['dist/main.js']],
      ['dist/shared.js', ['dist/shared.js']],
    ]);
  });

  it('applies a common strategy for selected entry point static closures', () => {
    const metafile = createMetafile({
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
    });

    expect(
      toEntries(
        mergeStrategyFactory('dist/main.js', metafile, {
          name: 'common',
          strategies: [
            {
              label: 'admin settings common',
              type: STRATEGY_TYPE.COMMON,
              entryPoints: ['src/admin.ts', 'src/settings.ts'],
            },
          ],
        }),
      ),
    ).toEqual([
      ['dist/common-a.js', ['dist/common-a.js', 'dist/common-b.js']],
      ['dist/main.js', ['dist/main.js']],
      ['dist/admin.js', ['dist/admin.js']],
      ['dist/settings.js', ['dist/settings.js']],
    ]);
  });

  it('rejects a graph where the same output is imported statically and dynamically', () => {
    const metafile = createMetafile({
      'dist/main.js': output({
        entryPoint: 'src/main.ts',
        imports: [
          importStatement('dist/shared.js'),
          dynamicImport('dist/shared.js'),
        ],
      }),
      'dist/shared.js': output(),
    });

    expect(() => mergeStrategyFactory('dist/main.js', metafile)).toThrow(
      'imports "dist/shared.js" as both "import-statement" and "dynamic-import"',
    );
  });
});

function createMetafile(outputs: Metafile['outputs']): Metafile {
  return {
    inputs: {},
    outputs,
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

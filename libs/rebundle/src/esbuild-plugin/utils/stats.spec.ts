import type { Metafile, OutputFile } from 'esbuild';
import {
  calculateChange,
  calculateReduction,
  createRebundleStats,
  formatFileCount,
  formatRebundleStats,
  formatReduction,
  formatSignedBytes,
  formatSignedFileCount,
} from './stats';

describe('rebundle stats', () => {
  it('reports initial and total file count and size changes', () => {
    const beforeOutputs: Metafile['outputs'] = {
      'dist/main.js': {
        entryPoint: 'src/main.ts',
        imports: [{ path: 'dist/chunk-a.js', kind: 'import-statement' }],
        exports: [],
        inputs: {},
        bytes: 2048,
      },
      'dist/chunk-a.js': {
        imports: [],
        exports: [],
        inputs: {},
        bytes: 1024,
      },
      'dist/lazy.js': {
        imports: [],
        exports: [],
        inputs: {},
        bytes: 512,
      },
    };
    const afterOutputs: Metafile['outputs'] = {
      'dist/main.js': {
        entryPoint: 'src/main.ts',
        imports: [],
        exports: [],
        inputs: {},
        bytes: 4096,
      },
      'dist/lazy.js': {
        imports: [],
        exports: [],
        inputs: {},
        bytes: 512,
      },
    };

    const stats = createRebundleStats(
      'dist/main.js',
      beforeOutputs,
      [
        outputFile('dist/main.js', 2048),
        outputFile('dist/chunk-a.js', 1024),
        outputFile('dist/lazy.js', 512),
      ],
      afterOutputs,
      [outputFile('dist/main.js', 4096), outputFile('dist/lazy.js', 512)],
      123.45,
    );

    expect(stats).toEqual({
      durationMs: 123.45,
      initialBefore: {
        files: 2,
        bytes: 3072,
        transferBytes: 64,
      },
      initialAfter: {
        files: 1,
        bytes: 4096,
        transferBytes: 38,
      },
      totalBefore: {
        files: 3,
        bytes: 3584,
        transferBytes: 90,
      },
      totalAfter: {
        files: 2,
        bytes: 4608,
        transferBytes: 64,
      },
    });
    expect(
      formatRebundleStats(stats, {
        colors: false,
      }),
    ).toBe(
      [
        'Rebundle completed in 123 ms',
        '',
        'Scope      | Metric        |   Before |    After |    Change | Reduction',
        'Initial JS | Files         |        2 |        1 |        -1 |     50.0%',
        '           | Raw size      |  3.07 kB |  4.10 kB |  +1.02 kB |    -33.3%',
        '           | Transfer size | 64 bytes | 38 bytes | -26 bytes |     40.6%',
        '',
        'Total      | Files         |        3 |        2 |        -1 |     33.3%',
        '           | Raw size      |  3.58 kB |  4.61 kB |  +1.02 kB |    -28.6%',
        '           | Transfer size | 90 bytes | 64 bytes | -26 bytes |     28.9%',
      ].join('\n'),
    );
  });

  it('supports colored terminal output', () => {
    const output = formatRebundleStats(
      {
        durationMs: 10,
        initialBefore: { files: 2, bytes: 2048, transferBytes: 80 },
        initialAfter: { files: 1, bytes: 1024, transferBytes: 40 },
        totalBefore: { files: 2, bytes: 2048, transferBytes: 80 },
        totalAfter: { files: 1, bytes: 1024, transferBytes: 40 },
      },
      { colors: true },
    );

    expect(output).toContain('\u001B[1mScope\u001B[0m');
    expect(output).toContain(
      '\u001B[32mInitial JS\u001B[0m\u001B[2m | \u001B[0m\u001B[2mFiles\u001B[0m',
    );
    expect(output).toContain('\u001B[32m-1.02 kB\u001B[0m');
    expect(output).toContain('\u001B[32m50.0%\u001B[0m');
  });

  it('formats file counts with deterministic thousands separators', () => {
    expect(formatFileCount(1748)).toBe('1,748');
    expect(formatFileCount(-1748)).toBe('-1,748');
    expect(formatSignedFileCount(20)).toBe('+20');
    expect(formatSignedFileCount(-870)).toBe('-870');
    expect(formatSignedFileCount(0)).toBe('0');
  });

  it('formats byte changes from numeric values', () => {
    expect(formatSignedBytes(-72870)).toBe('-72.87 kB');
    expect(formatSignedBytes(1024)).toBe('+1.02 kB');
    expect(formatSignedBytes(0)).toBe('0 bytes');
  });

  it('calculates reductions, increases, no change, and zero baselines', () => {
    expect(calculateChange(100, 120)).toBe(20);
    expect(formatReduction(calculateReduction(100, 120))).toBe('-20.0%');
    expect(calculateChange(100, 100)).toBe(0);
    expect(formatReduction(calculateReduction(100, 100))).toBe('0.0%');
    expect(calculateReduction(0, 10)).toBeUndefined();
    expect(formatReduction(undefined)).toBe('—');
  });

  it('formats increases and zero baselines in the table', () => {
    expect(
      formatRebundleStats(
        {
          durationMs: 10,
          initialBefore: { files: 100, bytes: 0, transferBytes: 100 },
          initialAfter: { files: 120, bytes: 1024, transferBytes: 100 },
          totalBefore: { files: 0, bytes: 0, transferBytes: 0 },
          totalAfter: { files: 10, bytes: 1024, transferBytes: 0 },
        },
        { colors: false },
      ),
    ).toContain(
      [
        'Initial JS | Files         |       100 |       120 |      +20 |    -20.0%',
        '           | Raw size      |   0 bytes |   1.02 kB | +1.02 kB |         —',
        '           | Transfer size | 100 bytes | 100 bytes |  0 bytes |      0.0%',
      ].join('\n'),
    );
  });
});

function outputFile(path: string, bytes: number): OutputFile {
  return {
    path,
    contents: new Uint8Array(bytes),
    hash: '',
    text: '',
  };
}

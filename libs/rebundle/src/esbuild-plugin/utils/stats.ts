import type { Metafile, OutputFile } from 'esbuild';
import { basename } from 'node:path';
import { stripVTControlCharacters } from 'node:util';
import { gzipSync } from 'node:zlib';
import type { OutputPath } from '../../core';
import { importsInEntryPoint } from './esbuild';

export interface RebundleStats {
  durationMs: number;
  initialBefore: FileStats;
  initialAfter: FileStats;
  totalBefore: FileStats;
  totalAfter: FileStats;
}

export interface FileStats {
  files: number;
  bytes: number;
  transferBytes: number;
}

export function createRebundleStats(
  entryChunk: OutputPath,
  beforeMetafileOutputs: Metafile['outputs'],
  beforeOutputFiles: OutputFile[],
  afterMetafileOutputs: Metafile['outputs'],
  afterOutputFiles: OutputFile[],
  durationMs: number,
): RebundleStats {
  return {
    durationMs,
    initialBefore: getInitialStats(
      entryChunk,
      beforeMetafileOutputs,
      beforeOutputFiles,
    ),
    initialAfter: getInitialStats(
      entryChunk,
      afterMetafileOutputs,
      afterOutputFiles,
    ),
    totalBefore: getOutputFileStats(beforeOutputFiles),
    totalAfter: getOutputFileStats(afterOutputFiles),
  };
}

export function formatRebundleStats(
  stats: RebundleStats,
  options: { colors?: boolean } = {},
): string {
  const colors = createColors(options.colors ?? shouldUseColor());
  const rows = createComparisonRows(stats, colors);
  const widths = getColumnWidths(rows);

  return [
    `Rebundle completed in ${formatDuration(stats.durationMs)}`,
    colors.blankLine(),
    ...rows.map((row) => formatTableRow(row, widths, colors)),
  ].join('\n');
}

function getInitialStats(
  entryChunk: OutputPath,
  outputs: Metafile['outputs'],
  outputFiles: OutputFile[],
): FileStats {
  const initialFiles = importsInEntryPoint(entryChunk, outputs);

  return {
    files: initialFiles.length,
    bytes: sumMetafileOutputBytes(initialFiles, outputs),
    transferBytes: sumOutputFileTransferBytes(initialFiles, outputFiles),
  };
}

function getOutputFileStats(outputFiles: OutputFile[]): FileStats {
  return {
    files: outputFiles.length,
    bytes: outputFiles.reduce((total, file) => total + file.contents.length, 0),
    transferBytes: sumTransferBytes(outputFiles),
  };
}

function sumMetafileOutputBytes(
  outputPaths: string[],
  outputs: Metafile['outputs'],
): number {
  return outputPaths.reduce(
    (total, outputPath) => total + (outputs[outputPath]?.bytes ?? 0),
    0,
  );
}

type TableRow = [string, string, string, string, string, string] | [];

function createComparisonRows(
  stats: RebundleStats,
  colors: Colors,
): TableRow[] {
  return [
    [
      colors.bold('Scope'),
      colors.bold('Metric'),
      colors.bold('Before'),
      colors.bold('After'),
      colors.bold('Change'),
      colors.bold('Reduction'),
    ],
    ...createScopeRows(
      'Initial JS',
      stats.initialBefore,
      stats.initialAfter,
      colors,
    ),
    [],
    ...createScopeRows('Total', stats.totalBefore, stats.totalAfter, colors),
  ];
}

function createScopeRows(
  scope: string,
  before: FileStats,
  after: FileStats,
  colors: Colors,
): TableRow[] {
  return [
    createMetricRow(scope, 'Files', before.files, after.files, 'files', colors),
    createMetricRow('', 'Raw size', before.bytes, after.bytes, 'bytes', colors),
    createMetricRow(
      '',
      'Transfer size',
      before.transferBytes,
      after.transferBytes,
      'bytes',
      colors,
    ),
  ];
}

function createMetricRow(
  scope: string,
  metric: string,
  before: number,
  after: number,
  type: 'bytes' | 'files',
  colors: Colors,
): TableRow {
  const change = calculateChange(before, after);
  const reduction = calculateReduction(before, after);

  return [
    scope ? colors.green(scope) : '',
    colors.dim(metric),
    colors.cyan(formatValue(before, type)),
    colors.cyan(formatValue(after, type)),
    colorChange(formatSignedValue(change, type), change, colors),
    colorReduction(formatReduction(reduction), reduction, colors),
  ];
}

function sumOutputFileTransferBytes(
  outputPaths: string[],
  outputFiles: OutputFile[],
): number {
  const outputFilesByPath = createOutputFilesByPath(outputFiles);

  return sumTransferBytes(
    outputPaths
      .map(
        (outputPath) =>
          outputFilesByPath.get(outputPath) ??
          outputFilesByPath.get(basename(outputPath)),
      )
      .filter((file): file is OutputFile => Boolean(file)),
  );
}

function createOutputFilesByPath(
  outputFiles: OutputFile[],
): Map<string, OutputFile> {
  return new Map(
    outputFiles.flatMap((outputFile) => [
      [outputFile.path, outputFile],
      [basename(outputFile.path), outputFile],
    ]),
  );
}

function sumTransferBytes(outputFiles: OutputFile[]): number {
  return outputFiles.reduce(
    (total, outputFile) => total + gzipSync(outputFile.contents).length,
    0,
  );
}

function getColumnWidths(rows: TableRow[]): number[] {
  return rows.reduce((widths, row) => {
    if (row.length === 0) {
      return widths;
    }

    return row.map((column, index) =>
      Math.max(widths[index] ?? 0, stripVTControlCharacters(column).length),
    );
  }, [] as number[]);
}

function formatTableRow(
  columns: string[],
  widths: number[],
  colors: Colors,
): string {
  if (columns.length === 0) {
    return colors.blankLine();
  }

  return columns
    .map((column, index) => {
      const width = widths[index] ?? stripVTControlCharacters(column).length;
      const padding = ' '.repeat(
        width - stripVTControlCharacters(column).length,
      );

      return index >= 2 ? padding + column : column + padding;
    })
    .join(colors.dim(' | '));
}

export function calculateChange(before: number, after: number): number {
  return after - before;
}

export function calculateReduction(
  before: number,
  after: number,
): number | undefined {
  if (before === 0) {
    return undefined;
  }

  return ((before - after) / before) * 100;
}

export function formatFileCount(value: number): string {
  const sign = value < 0 ? '-' : '';
  const absoluteValue = Math.abs(value).toString();
  const formattedValue = absoluteValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${sign}${formattedValue}`;
}

export function formatSignedFileCount(value: number): string {
  if (value === 0) {
    return '0';
  }

  return `${value > 0 ? '+' : ''}${formatFileCount(value)}`;
}

export function formatSignedBytes(value: number): string {
  if (value === 0) {
    return '0 bytes';
  }

  return `${value > 0 ? '+' : '-'}${formatBytes(Math.abs(value))}`;
}

export function formatReduction(value: number | undefined): string {
  if (value === undefined) {
    return '—';
  }

  return `${value.toFixed(1)}%`;
}

function formatValue(value: number, type: 'bytes' | 'files'): string {
  return type === 'bytes' ? formatBytes(value) : formatFileCount(value);
}

function formatSignedValue(value: number, type: 'bytes' | 'files'): string {
  return type === 'bytes'
    ? formatSignedBytes(value)
    : formatSignedFileCount(value);
}

function colorChange(value: string, change: number, colors: Colors): string {
  if (change < 0) {
    return colors.green(value);
  }

  if (change > 0) {
    return colors.yellow(value);
  }

  return value;
}

function colorReduction(
  value: string,
  reduction: number | undefined,
  colors: Colors,
): string {
  if (reduction === undefined || reduction === 0) {
    return value;
  }

  if (reduction > 0) {
    return colors.green(value);
  }

  return colors.yellow(value);
}

interface Colors {
  blankLine: () => string;
  bold: (value: string) => string;
  cyan: (value: string) => string;
  dim: (value: string) => string;
  green: (value: string) => string;
  yellow: (value: string) => string;
}

function createColors(enabled: boolean): Colors {
  if (!enabled) {
    return {
      blankLine: () => '',
      bold: identity,
      cyan: identity,
      dim: identity,
      green: identity,
      yellow: identity,
    };
  }

  return {
    blankLine: () => ansi(2)(''),
    bold: ansi(1),
    cyan: ansi(36),
    dim: ansi(2),
    green: ansi(32),
    yellow: ansi(33),
  };
}

function ansi(code: number): (value: string) => string {
  return (value) => `\u001B[${code}m${value}\u001B[0m`;
}

function identity(value: string): string {
  return value;
}

function shouldUseColor(): boolean {
  return (
    Boolean(process.env['FORCE_COLOR']) ||
    (process.env['NO_COLOR'] === undefined && Boolean(process.stdout.isTTY))
  );
}

function formatDuration(durationMs: number): string {
  return `${Math.round(durationMs)} ms`;
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) {
    return '0 bytes';
  }

  const abbreviations = ['bytes', 'kB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  const roundedSize = bytes / Math.pow(1000, index);

  return `${roundedSize.toFixed(index === 0 ? 0 : 2)} ${abbreviations[index]}`;
}

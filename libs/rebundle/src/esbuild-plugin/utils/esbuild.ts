import type { BuildOptions, Metafile, OutputFile } from 'esbuild';
import { createHash } from 'node:crypto';
import { posix, sep } from 'node:path';
import type { OutputPath } from '../../core';

export function getAppEntryPoint(
  { absWorkingDir, entryPoints }: BuildOptions,
  { outputs }: Metafile,
): OutputPath {
  const entryFileName = pathToFileName(
    absWorkingDir,
    getEntryPointPath(entryPoints),
  );
  const chunkName = getChunkNameByEntryPoint(entryFileName, outputs);

  if (!chunkName) {
    throw new Error(`Could not find chunk for entry point "${entryFileName}".`);
  }

  return chunkName;
}

export function importsInEntryPoint(
  entryPoint: OutputPath,
  outputs: Metafile['outputs'],
): OutputPath[] {
  const visited = new Set<OutputPath>();
  const pending: OutputPath[] = [entryPoint];

  while (pending.length > 0) {
    const current = pending.pop();

    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);

    const output = outputs[current];

    if (!output) {
      continue;
    }

    for (const imported of output.imports) {
      if (
        imported.kind === 'dynamic-import' ||
        imported.external ||
        !isJavaScriptOutputFile(imported.path)
      ) {
        continue;
      }

      if (!visited.has(imported.path)) {
        pending.push(imported.path);
      }
    }
  }

  return [...visited];
}

export function pathToFileName(
  absWorkingDir: BuildOptions['absWorkingDir'],
  path: OutputFile['path'],
): string {
  if (!absWorkingDir) {
    return path.replaceAll(sep, posix.sep);
  }

  return path.replace(absWorkingDir + sep, '').replaceAll(sep, posix.sep);
}

export function hashFromOutputPaths(paths: OutputPath[]): string {
  return createHash('sha256')
    .update(paths.join(''))
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
}

export function getEntryPointPath(
  entryPoints: BuildOptions['entryPoints'],
): string {
  if (!entryPoints) {
    throw new Error('Could not extract entryPoints from esbuild options.');
  }

  if (Array.isArray(entryPoints)) {
    if (entryPoints.length > 1) {
      throw new Error('Multiple entry points are not currently supported.');
    }

    const entryPoint = entryPoints[0];

    if (!entryPoint) {
      throw new Error('Entry points array is empty.');
    }

    if (typeof entryPoint === 'string') {
      return entryPoint;
    }

    return entryPoint.in;
  }

  if ('main' in entryPoints) {
    return entryPoints['main'];
  }

  throw new Error(
    'Could not extract the main entry point from esbuild options.',
  );
}

export function isJavaScriptOutputFile(path: string): path is OutputPath {
  return /\.(?:cjs|js|mjs)(?:\.map)?$/.test(path);
}

function getChunkNameByEntryPoint(
  entryPoint: string,
  outputs: Metafile['outputs'],
): OutputPath | undefined {
  return Object.keys(outputs).find(
    (chunkName): chunkName is OutputPath =>
      outputs[chunkName].entryPoint === entryPoint,
  );
}

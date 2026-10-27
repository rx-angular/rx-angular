import type { Metafile } from 'esbuild';
import type { OutputPath } from '../../core';
import { hashFromOutputPaths, importsInEntryPoint } from './esbuild';
import { toEsbuildOutputFile } from './output-file';

export function initialChunks(
  entryChunk: OutputPath,
  outputs: Metafile['outputs'],
  filename: string,
) {
  const chunks = [
    ...new Set(
      importsInEntryPoint(entryChunk, outputs).filter(
        (chunk) => chunk !== entryChunk,
      ),
    ),
  ];
  const content = JSON.stringify(chunks);
  const initialChunksFile = toEsbuildOutputFile(
    filename,
    content,
    hashFromOutputPaths(chunks),
  );
  const initialChunksFileMeta: Metafile['outputs'][string] = {
    imports: [],
    exports: [],
    inputs: {},
    bytes: initialChunksFile.contents.length,
  };

  return { initialChunksFile, initialChunksFileMeta };
}

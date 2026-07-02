import type { BuildOptions, OutputFile } from 'esbuild';
import type { Plugin } from 'rolldown';
import { pathToFileName } from '../utils/esbuild';

export function esbuildOutputLoaderPlugin(
  outputFiles: OutputFile[],
  { absWorkingDir, sourcemap }: BuildOptions,
): Plugin {
  const outputFileIndex = new Map(
    outputFiles.map((file, index) => [
      pathToFileName(absWorkingDir, file.path),
      index,
    ]),
  );

  return {
    name: 'rebundle-esbuild-output-loader',
    resolveId: (id) => id.split('/').at(-1),
    load(id) {
      if (sourcemap) {
        return {
          code: getCode(outputFiles, outputFileIndex, id),
          map: getCode(outputFiles, outputFileIndex, `${id}.map`),
        };
      }

      return getCode(outputFiles, outputFileIndex, id);
    },
  };
}

function getCode(
  outputFiles: OutputFile[],
  outputFileIndex: Map<string, number>,
  id: string,
): string {
  const index = outputFileIndex.get(id);

  if (typeof index !== 'number') {
    throw new Error(`Could not load esbuild output "${id}".`);
  }

  return outputFiles[index].text;
}

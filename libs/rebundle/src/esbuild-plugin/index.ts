/* eslint-disable no-param-reassign */
import type { Plugin } from 'esbuild';
import { type MergeStrategyConfig, mergeStrategyFactory } from '../core';
import { esbuildOutputLoaderPlugin } from './rolldown/esbuild-output-loader.plugin';
import { rolldownRebundle } from './rolldown/rebundle';
import { rolldownOutputsToEsbuildOutputs } from './rolldown/to-esbuild-outputs';
import { getAppEntryPoint, isJavaScriptOutputFile } from './utils/esbuild';
import { initialChunks } from './utils/initial-chunks';

export interface RebundlePluginOptions {
  mergeStrategy?: MergeStrategyConfig;
}

export default function rebundlePlugin(
  options: RebundlePluginOptions = {},
): Plugin {
  return {
    name: 'rebundle',
    setup({ onEnd, initialOptions }) {
      onEnd(async (result) => {
        if (
          initialOptions.platform === 'node' ||
          initialOptions.define?.['ngServerMode'] === 'true'
        ) {
          return;
        }

        if (initialOptions.define?.['ngDevMode'] !== 'false') {
          return;
        }

        if (!result.metafile) {
          throw new Error('Unable to extract metafile from esbuild result.');
        }

        if (!result.outputFiles) {
          throw new Error('Unable to extract outputFiles from esbuild result.');
        }

        const entryChunk = getAppEntryPoint(initialOptions, result.metafile);
        const mergeStrategy = mergeStrategyFactory(
          entryChunk,
          result.metafile,
          options.mergeStrategy,
        );
        const loaderPlugin = esbuildOutputLoaderPlugin(
          result.outputFiles,
          initialOptions,
        );
        const rebundledOutput = await rolldownRebundle(
          entryChunk,
          Boolean(initialOptions.sourcemap),
          mergeStrategy,
          loaderPlugin,
        );
        const { newMetafileOutputs, newOutputFiles } =
          rolldownOutputsToEsbuildOutputs(rebundledOutput, result.metafile);
        const preservedOutputFiles = result.outputFiles.filter(
          (file) => !isJavaScriptOutputFile(file.path),
        );
        const preservedMetafileOutputs = Object.fromEntries(
          Object.entries(result.metafile.outputs).filter(
            ([outputPath]) => !isJavaScriptOutputFile(outputPath),
          ),
        );

        result.outputFiles = [...preservedOutputFiles, ...newOutputFiles];
        result.metafile.outputs = {
          ...preservedMetafileOutputs,
          ...newMetafileOutputs,
        };

        const { initialChunksFile, initialChunksFileMeta } = initialChunks(
          entryChunk,
          newMetafileOutputs,
          'main-chunks.json',
        );

        result.outputFiles.push(initialChunksFile);
        result.metafile.outputs[initialChunksFile.path] = initialChunksFileMeta;
      });
    },
  };
}

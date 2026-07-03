import { DEFAULT_MERGE_STRATEGY_CONFIG } from './config';
import { createBundleGraph, isJavaScriptOutput } from './graph';
import { applyStrategies } from './strategy-applicator';
import type {
  MergeStrategyContext,
  MergeStrategyFactory,
  OutputPath,
} from './types';

export const mergeStrategyFactory: MergeStrategyFactory = (
  entryPointChunk,
  metafile,
  config = DEFAULT_MERGE_STRATEGY_CONFIG,
) => {
  const context: MergeStrategyContext = {
    assigned: new Set(),
    mergeStrategy: new Map(),
    graph: createBundleGraph(entryPointChunk, metafile),
    entryPointChunk,
    metafile,
  };

  applyStrategies(config, context);
  assignRemainingOutputs(context);

  return context.mergeStrategy;
};

function assignRemainingOutputs(context: MergeStrategyContext): void {
  for (const outputPath of Object.keys(context.metafile.outputs)) {
    if (!isJavaScriptOutput(outputPath)) {
      continue;
    }

    if (context.assigned.has(outputPath)) {
      continue;
    }

    context.mergeStrategy.set(outputPath, [outputPath as OutputPath]);
    context.assigned.add(outputPath);
  }
}

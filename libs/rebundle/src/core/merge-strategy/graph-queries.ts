import { getTransitiveStaticDependencies } from './graph';
import type { MergeStrategyContext, OutputPath } from './types';

export function getStaticClosure(
  context: Pick<MergeStrategyContext, 'graph'>,
  entryPointChunk: OutputPath,
): OutputPath[] {
  return getTransitiveStaticDependencies(context.graph, entryPointChunk).filter(
    (outputPath) => !context.graph.get(outputPath)?.isEntryPoint,
  );
}

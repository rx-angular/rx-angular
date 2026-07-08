import { getTransitiveStaticDependencies } from './graph.ts';
import type { MergeStrategyContext, OutputPath } from './types.ts';

export function getStaticClosure(
  context: Pick<MergeStrategyContext, 'graph'>,
  entryPointChunk: OutputPath,
): OutputPath[] {
  return getTransitiveStaticDependencies(context.graph, entryPointChunk).filter(
    (outputPath) => !context.graph.get(outputPath)?.isEntryPoint,
  );
}

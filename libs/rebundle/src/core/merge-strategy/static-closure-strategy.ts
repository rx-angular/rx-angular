import { findOutputForEntryPoint } from './graph.ts';
import { getStaticClosure } from './graph-queries.ts';
import type {
  MergeStrategy,
  MergeStrategyContext,
  StaticClosureStrategyDefinition,
} from './types.ts';

export function createStaticClosureMergeGroups(
  strategy: StaticClosureStrategyDefinition,
  context: Pick<MergeStrategyContext, 'graph' | 'metafile'>,
): MergeStrategy {
  const entryPointChunk = findOutputForEntryPoint(
    strategy.entryPoint,
    context.metafile,
  );

  if (!entryPointChunk) {
    throw new Error(
      `Entry point "${strategy.entryPoint}" specified in "${strategy.label}" was not found in the metafile outputs.`,
    );
  }

  return new Map([
    [
      entryPointChunk,
      [entryPointChunk, ...getStaticClosure(context, entryPointChunk)],
    ],
  ]);
}

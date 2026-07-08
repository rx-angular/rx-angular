import { findOutputForEntryPoint } from './graph.ts';
import { getStaticClosure } from './graph-queries.ts';
import type {
  CommonStrategyDefinition,
  MergeStrategy,
  MergeStrategyContext,
  OutputPath,
} from './types.ts';

export function createCommonMergeGroups(
  strategy: CommonStrategyDefinition,
  context: Pick<MergeStrategyContext, 'assigned' | 'graph' | 'metafile'>,
): MergeStrategy {
  const entryPointChunks = strategy.entryPoints.map((entryPoint) =>
    resolveEntryPointChunk(strategy, entryPoint, context),
  );

  const commonChunks = getCommonChunks(entryPointChunks, context);
  const owner = commonChunks[0];

  if (!owner) {
    return new Map();
  }

  return new Map([[owner, commonChunks]]);
}

function resolveEntryPointChunk(
  strategy: CommonStrategyDefinition,
  entryPoint: string,
  context: Pick<MergeStrategyContext, 'assigned' | 'metafile'>,
): OutputPath {
  const entryPointChunk = findOutputForEntryPoint(entryPoint, context.metafile);

  if (!entryPointChunk) {
    throw new Error(
      `Entry point "${entryPoint}" specified in "${strategy.label}" was not found in the metafile outputs.`,
    );
  }

  if (context.assigned.has(entryPointChunk)) {
    throw new Error(
      `Entry point chunk "${entryPointChunk}" specified in "${strategy.label}" has already been assigned.`,
    );
  }

  return entryPointChunk;
}

function getCommonChunks(
  entryPointChunks: OutputPath[],
  context: Pick<MergeStrategyContext, 'assigned' | 'graph'>,
): OutputPath[] {
  const commonChunks = new Set<OutputPath>();

  for (const entryPointChunk of entryPointChunks) {
    for (const outputPath of getStaticClosure(context, entryPointChunk)) {
      if (context.assigned.has(outputPath)) {
        continue;
      }

      commonChunks.add(outputPath);
    }
  }

  return [...commonChunks];
}

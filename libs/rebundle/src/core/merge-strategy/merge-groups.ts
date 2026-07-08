import type { MergeStrategyContext, OutputPath } from './types.ts';

export function assignMergeGroup(
  owner: OutputPath,
  chunks: OutputPath[],
  context: Pick<MergeStrategyContext, 'assigned' | 'mergeStrategy'>,
): void {
  if (context.assigned.has(owner)) {
    throw new Error(`Merge group owner "${owner}" has already been assigned.`);
  }

  const unassignedChunks = chunks.filter(
    (chunk) => !context.assigned.has(chunk),
  );

  if (!unassignedChunks.includes(owner)) {
    unassignedChunks.unshift(owner);
  }

  if (unassignedChunks.length <= 1) {
    return;
  }

  context.mergeStrategy.set(owner, unassignedChunks);

  for (const chunk of unassignedChunks) {
    context.assigned.add(chunk);
  }
}

import type { BundleGraph, BundleGraphImport } from './contracts';
import { getReachableGraphOutputPaths } from './graph';
import { getStaticClosure } from './graph-queries';
import type { MergeStrategy, OutputPath } from './types';

export function createReachabilityMergeGroups(
  entryPointChunk: OutputPath,
  graph: BundleGraph,
): MergeStrategy {
  const mergeGroups: MergeStrategy = new Map();
  const assigned = new Set<OutputPath>();
  const rootStaticClosure = getStaticClosure({ graph }, entryPointChunk);

  mergeGroups.set(entryPointChunk, [entryPointChunk, ...rootStaticClosure]);
  assigned.add(entryPointChunk);

  for (const outputPath of rootStaticClosure) {
    assigned.add(outputPath);
  }

  for (const entryPoint of getOrderedEntryPointChunks(graph, entryPointChunk)) {
    if (entryPoint === entryPointChunk) {
      continue;
    }

    const staticClosure = getStaticClosure({ graph }, entryPoint);
    const reachableOutsideEntryPoint = getReachableOutputsExcludingEntries(
      graph,
      entryPointChunk,
      [entryPoint],
    );
    const chunks: OutputPath[] = [entryPoint];

    assigned.add(entryPoint);

    for (const outputPath of staticClosure) {
      if (
        assigned.has(outputPath) ||
        reachableOutsideEntryPoint.has(outputPath) ||
        graph.get(outputPath)?.isEntryPoint
      ) {
        continue;
      }

      chunks.push(outputPath);
      assigned.add(outputPath);
    }

    mergeGroups.set(entryPoint, chunks);
  }

  return mergeGroups;
}

function getOrderedEntryPointChunks(
  graph: BundleGraph,
  entryPointChunk: OutputPath,
): OutputPath[] {
  return topologicalSort(graph, entryPointChunk)
    .filter((outputPath) => graph.get(outputPath)?.isEntryPoint)
    .reverse();
}

function getReachableOutputsExcludingEntries(
  graph: BundleGraph,
  entryPointChunk: OutputPath,
  excludedEntryPoints: OutputPath[],
): Set<OutputPath> {
  const excluded = new Set(excludedEntryPoints);
  const reachable = getReachableGraphOutputPaths(
    graph,
    entryPointChunk,
    (imported) => excluded.has(imported.path),
  );

  return new Set(
    reachable.filter((outputPath) => !graph.get(outputPath)?.isEntryPoint),
  );
}

function topologicalSort(
  graph: BundleGraph,
  entryPointChunk: OutputPath,
): OutputPath[] {
  const visited = new Set<OutputPath>();
  const ordered: OutputPath[] = [];

  visit(graph, entryPointChunk, visited, ordered);

  return ordered;
}

function visit(
  graph: BundleGraph,
  outputPath: OutputPath,
  visited: Set<OutputPath>,
  ordered: OutputPath[],
): void {
  if (visited.has(outputPath)) {
    return;
  }

  visited.add(outputPath);

  for (const imported of getImports(graph, outputPath)) {
    visit(graph, imported.path, visited, ordered);
  }

  ordered.push(outputPath);
}

function getImports(
  graph: BundleGraph,
  outputPath: OutputPath,
): BundleGraphImport[] {
  const node = graph.get(outputPath);

  if (!node) {
    throw new Error(
      `Output "${outputPath}" does not exist in the bundle graph.`,
    );
  }

  return node.imports;
}

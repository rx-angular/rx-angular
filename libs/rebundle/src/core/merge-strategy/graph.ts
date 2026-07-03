import type { Metafile } from 'esbuild';
import type {
  BundleGraph,
  BundleGraphImport,
  BundleGraphNode,
  ImportKind,
  OutputImport,
  OutputPath,
} from './contracts';

export function createBundleGraph(
  entryPointChunk: OutputPath,
  metafile: Metafile,
): BundleGraph {
  if (!metafile.outputs[entryPointChunk]) {
    throw new Error(`Entry point chunk "${entryPointChunk}" does not exist.`);
  }

  if (!isJavaScriptOutput(entryPointChunk)) {
    throw new Error(
      `Entry point chunk "${entryPointChunk}" is not JavaScript.`,
    );
  }

  const graph: BundleGraph = new Map();

  for (const outputPath of getReachableOutputPaths(entryPointChunk, metafile)) {
    if (!isJavaScriptOutput(outputPath)) {
      continue;
    }

    const output = metafile.outputs[outputPath];

    graph.set(outputPath, {
      path: outputPath,
      imports: getOutputImports(outputPath, metafile),
      entryPoint: output.entryPoint,
      isEntryPoint: typeof output.entryPoint === 'string',
      bytes: output.bytes,
    });
  }

  return graph;
}

export function isJavaScriptOutput(
  outputPath: string,
): outputPath is OutputPath {
  return /\.(?:cjs|js|mjs)$/.test(outputPath);
}

export function findOutputForEntryPoint(
  entryPoint: string,
  metafile: Metafile,
): OutputPath | undefined {
  return Object.keys(metafile.outputs).find(
    (outputPath): outputPath is OutputPath =>
      metafile.outputs[outputPath].entryPoint === entryPoint,
  );
}

export function getStaticDependencies(
  graph: BundleGraph,
  outputPath: OutputPath,
): OutputPath[] {
  return getGraphNode(graph, outputPath)
    .imports.filter((imported) => imported.kind === 'import-statement')
    .map((imported) => imported.path);
}

export function getDynamicDependencies(
  graph: BundleGraph,
  outputPath: OutputPath,
): OutputPath[] {
  return getGraphNode(graph, outputPath)
    .imports.filter((imported) => imported.kind === 'dynamic-import')
    .map((imported) => imported.path);
}

export function getTransitiveStaticDependencies(
  graph: BundleGraph,
  outputPath: OutputPath,
): OutputPath[] {
  const visited = new Set<OutputPath>();
  const pending = [...getStaticDependencies(graph, outputPath)];

  while (pending.length > 0) {
    const current = pending.shift();

    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);
    pending.push(...getStaticDependencies(graph, current));
  }

  return [...visited];
}

export function getReachableGraphOutputPaths(
  graph: BundleGraph,
  entryPointChunk: OutputPath,
  shouldSkipImport?: (imported: BundleGraphImport) => boolean,
): OutputPath[] {
  const visited = new Set<OutputPath>();
  const pending: OutputPath[] = [entryPointChunk];

  while (pending.length > 0) {
    const current = pending.shift();

    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);

    for (const imported of getGraphNode(graph, current).imports) {
      if (shouldSkipImport?.(imported) || visited.has(imported.path)) {
        continue;
      }

      pending.push(imported.path);
    }
  }

  return [...visited];
}

function getReachableOutputPaths(
  entryPointChunk: OutputPath,
  metafile: Metafile,
): OutputPath[] {
  const visited = new Set<OutputPath>();
  const pending: OutputPath[] = [entryPointChunk];

  while (pending.length > 0) {
    const current = pending.shift();

    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);

    const output = metafile.outputs[current];

    if (!output) {
      continue;
    }

    for (const imported of output.imports) {
      if (imported.external || !isSupportedImportKind(imported.kind)) {
        continue;
      }

      const nextPath = imported.path;

      if (!isJavaScriptOutput(nextPath) || visited.has(nextPath)) {
        continue;
      }

      pending.push(nextPath);
    }
  }

  return [...visited];
}

function getOutputImports(
  outputPath: OutputPath,
  metafile: Metafile,
): BundleGraphImport[] {
  const imports: BundleGraphImport[] = [];

  for (const imported of metafile.outputs[outputPath].imports) {
    if (
      imported.external ||
      !isSupportedImportKind(imported.kind) ||
      !isJavaScriptOutput(imported.path)
    ) {
      continue;
    }

    const duplicate = imports.find(
      (candidate) => candidate.path === imported.path,
    );

    if (duplicate) {
      if (duplicate.kind !== imported.kind) {
        throw new Error(
          `Output "${outputPath}" imports "${imported.path}" as both "${duplicate.kind}" and "${imported.kind}".`,
        );
      }

      continue;
    }

    imports.push({
      path: imported.path,
      kind: imported.kind,
    });
  }

  return imports;
}

function getGraphNode(
  graph: BundleGraph,
  outputPath: OutputPath,
): BundleGraphNode {
  const node = graph.get(outputPath);

  if (!node) {
    throw new Error(
      `Output "${outputPath}" does not exist in the bundle graph.`,
    );
  }

  return node;
}

function isSupportedImportKind(kind: OutputImport['kind']): kind is ImportKind {
  return kind === 'import-statement' || kind === 'dynamic-import';
}

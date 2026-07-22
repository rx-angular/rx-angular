---
id: merge-strategies
title: 'Merge strategies'
diataxis_type: reference
package: rebundle
legacy_guard: false
sidebar_label: 'Merge strategies'
sidebar_position: 1
tags: [rebundle, api-reference]
---

# Merge strategies

Merge strategies are the policy layer of the optimizer. The esbuild plugin first
reads the current bundle shape from the esbuild metafile, converts that output
graph into a simpler module graph, and then runs the configured strategies to
produce a new chunk grouping plan.

In other words, a merge strategy is a pipeline:

1. Take the current bundle graph.
2. Apply the configured strategy definitions in order.
3. Assign emitted JavaScript chunks to merge groups.
4. Leave any unassigned JavaScript chunks as standalone chunks.
5. Hand the final merge map to the rebundling step.

The result is a map from an output chunk to the list of chunks that should be
merged into it:

```ts
type MergeStrategyMap = Map<string, string[]>;
```

For example, this map says that the emitted `dist/my-app/browser/main.js` chunk
should absorb two other chunks, while `admin.routes.js` should absorb one
route-only dependency chunk:

```ts
new Map([
  ['dist/my-app/browser/main.js', ['dist/my-app/browser/main.js', 'dist/my-app/browser/chunk-A.js', 'dist/my-app/browser/chunk-B.js']],
  ['dist/my-app/browser/admin.routes.js', ['dist/my-app/browser/admin.routes.js', 'dist/my-app/browser/chunk-C.js']],
]);
```

The built-in configuration API gives you strategy definitions instead of asking
you to build that map directly.

```ts
interface MergeStrategyConfig {
  name: string;
  strategies: StrategyDefinition[];
  verbose?: boolean;
}
```

Each strategy definition is turned into merge groups against a shared context
that the applicator maintains across the whole run:

```ts
interface MergeStrategyContext {
  assigned: Set<OutputPath>;
  mergeStrategy: MergeStrategy;
  graph: BundleGraph;
  entryPointChunk: OutputPath;
  metafile: Metafile;
}
```

A strategy does not mutate that context directly. Instead it reads the context
(`graph`, `metafile`, `entryPointChunk`, and the current `assigned` set) and
returns its own `MergeStrategy` map of proposed groups. The applicator then
folds each group into the shared context, and that is where the contract is
enforced:

- Every group's owner chunk is the key; the chunks merged into it are the value.
- A group whose owner is already assigned throws — a chunk can only be assigned
  once.
- Already-assigned chunks are dropped from a group before it is recorded, so
  later strategies cannot re-claim them.
- Groups that end up with a single chunk are skipped, because no merge is needed.
- Recorded groups mark all their chunks in `assigned`.
- Strategy definitions run in the order they appear in `strategies`.
- JavaScript chunks that remain unassigned after every strategy runs are mapped
  to themselves.

Order matters because strategies are not independent suggestions. They are a
sequence of decisions. If the first strategy assigns `chunk-A.js`, a later
strategy cannot also place `chunk-A.js` in a different group.

For how to wire these definitions into your build, see
[Configure merge strategies](../how-to/configure-merge-strategies.md).

## Built-in strategies

The package currently provides three strategy definitions:

- [Reachability](./reachability.md): the default strategy. It groups chunks by
  whether they are only reachable through a specific entry point.
- [Static closure](./static-closure.md): a targeted strategy for merging one
  entry point with its static import closure.
- [Common](./common.md): a targeted strategy for creating a shared dependency
  group for selected entry points.

## Entry points

Strategy config uses source entry point paths, not emitted chunk filenames.

For a lazy route like this:

```ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
}
```

The strategy entry point is the source file from the esbuild metafile, for
example:

```ts
'src/app/admin/admin.routes.ts';
```

The optimizer resolves that source entry point to the emitted output chunk before
applying the strategy.

## Custom strategies

The built-in strategies are convenience policies. The lower-level contract is the
final merge map: a `Map<string, string[]>` where each key is the output chunk
that should remain and each value is the list of output chunks that should be
merged into that key.

If you build your own strategy layer, follow the same invariants as the built-in
applicator:

- Only include JavaScript outputs from the esbuild metafile.
- Include the group owner chunk in its own chunk list.
- Do not put the same chunk in more than one group.
- Preserve async boundaries intentionally; merging across dynamic imports changes
  when code is downloaded.
- Keep unmerged chunks mapped to themselves.

Custom strategies are useful when the application has domain-specific loading
rules that the built-in strategies cannot infer from the graph alone.

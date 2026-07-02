# Reachability

Reachability is the default merge strategy. If you add the plugin without configuration, this is the strategy that runs.

```ts
{
  label: 'reachability',
  type: 'reachability',
}
```

It is designed for large Angular applications where esbuild creates many small chunks around lazy routes. Instead of asking you to name those routes manually, it reads the bundle graph and groups chunks by the entry point that dominates them.

## What It Does

Reachability starts at the application entry chunk and builds a graph from esbuild's metafile outputs. The graph includes both static imports and dynamic imports, but the strategy treats them differently when deciding what can be merged.

The strategy creates groups in two passes:

1. It groups the root application entry chunk with its static closure.
2. It visits each dynamic entry point and groups chunks that are statically reachable from that entry point and not reachable from outside that entry point.

A static closure is the set of chunks reachable by following only static `import-statement` edges. Dynamic import edges are treated as boundaries.

## Why It Helps

Angular applications often have one real application entry point and many lazy route entry points. esbuild optimizes each dynamic import as an entry point, which can produce many small shared chunks. That is correct for esbuild's generic model, but it can create too many initial or near-initial requests for a single page application.

Reachability reduces that fragmentation by merging chunks into the entry point that owns them from the application's loading perspective.

## Behavior

- The root application entry point is grouped with its static closure.
- Dynamic entry points are processed separately.
- A chunk is merged into a dynamic entry point only when it is not reachable from outside that entry point's closure.
- Entry point chunks are not merged into other entry point chunks.
- Groups with only one chunk are ignored because no merge is needed.
- Chunks assigned by reachability cannot be assigned again by later strategies.

## Recommended Use

Use reachability as the default for most applications:

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';

export default optimizeChunksPlugin();
```

Or configure it explicitly:

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';
import type { MergeStrategyConfig } from '@rx-angular/rebundle';

const mergeStrategy: MergeStrategyConfig = {
  name: 'main',
  strategies: [
    {
      label: 'default reachability',
      type: 'reachability',
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

Reachability should normally be the first strategy in the list. The current implementation is defensive about already assigned chunks, so running it after targeted strategies can throw if those earlier strategies claimed chunks reachability also wants to claim.

## When Not To Use It Alone

Reachability is intentionally graph-driven. Add another strategy when the graph alone does not express the loading policy you want.

Use [static closure](static-closure.md) when a specific entry point should carry more of its static dependencies.

Use [common](common.md) when selected entry points should share a deliberate dependency group.

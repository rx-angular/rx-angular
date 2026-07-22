---
id: static-closure
title: 'Static closure strategy'
diataxis_type: reference
package: rebundle
legacy_guard: false
sidebar_label: 'Static closure'
sidebar_position: 3
tags: [rebundle, api-reference]
---

# Static closure

Static closure is a targeted merge strategy for one entry point.

```ts
{
  label: 'admin route closure',
  type: 'static-closure',
  entryPoint: 'src/app/admin/admin.routes.ts',
}
```

It resolves the configured source entry point to the emitted esbuild output
chunk, follows that chunk's static imports, and merges the entry point chunk with
its unassigned static dependency closure.

## What it does

Static closure walks only `import-statement` edges from the selected entry point.
It does not cross dynamic import boundaries.

For example, if `admin.routes.ts` statically imports an admin shell component, a
table component, and a local utility chunk, those chunks can be grouped with the
admin route entry chunk. If the admin route dynamically imports a nested detail
route, that nested dynamic entry point is not pulled into the static closure.

## Configuration

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';
import type { MergeStrategyConfig } from '@rx-angular/rebundle';

const mergeStrategy: MergeStrategyConfig = {
  name: 'targeted-routes',
  strategies: [
    {
      label: 'admin route closure',
      type: 'static-closure',
      entryPoint: 'src/app/admin/admin.routes.ts',
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

The `entryPoint` value is the source entry point path from the esbuild metafile.
It is not the emitted chunk filename.

## Behavior

- `entryPoint` must resolve to an esbuild output whose metadata has a matching
  `entryPoint` value.
- The strategy includes the entry point output chunk in the merge group.
- The strategy follows only static imports.
- Dynamic imports remain separate entry points.
- Chunks already assigned by earlier strategies are skipped.
- The resulting merge group is keyed by the emitted output chunk for the
  configured entry point.

## Recommended use

Use static closure when a specific lazy route or feature entry point should load
as a more cohesive bundle.

Good fits include:

- A route where the first screen immediately needs most of its statically
  imported dependencies.
- A feature whose generated output has too many small chunks.
- A feature where a slightly larger route chunk is preferable to a burst of small
  requests.

Avoid applying static closure broadly to every lazy route by default. It is a
manual policy and should describe a specific loading decision.

## Ordering

Static closure respects previous assignments. If an earlier strategy already
assigned a dependency, static closure leaves that dependency alone.

For targeted configs, put more specific rules before broader rules. For example,
create a custom [common](./common.md) group first, then use static closure for
the remaining feature-specific dependencies.

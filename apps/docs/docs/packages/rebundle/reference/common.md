---
id: common
title: 'Common strategy'
diataxis_type: reference
package: rebundle
legacy_guard: false
sidebar_label: 'Common'
sidebar_position: 4
tags: [rebundle, api-reference]
---

# Common

Common is a targeted merge strategy for creating one shared dependency group from
selected entry points.

```ts
{
  label: 'admin settings common',
  type: 'common',
  entryPoints: [
    'src/app/admin/admin.routes.ts',
    'src/app/settings/settings.routes.ts',
  ],
}
```

It resolves each configured source entry point to its emitted output chunk,
computes static closures for those entry points, excludes chunks already assigned
by earlier strategies, and places the remaining dependencies into a shared group.

## What it does

Common is useful when multiple lazy entry points should share dependencies
intentionally. Instead of allowing each feature to keep separate static
dependency groups, you can create a shared group for those features.

The current implementation builds the common group from the selected entry points
after exclusions. It does not require every dependency in the group to be used by
every selected entry point.

## Configuration

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';
import type { MergeStrategyConfig } from '@rx-angular/rebundle';

const mergeStrategy: MergeStrategyConfig = {
  name: 'shared-feature-deps',
  strategies: [
    {
      label: 'admin settings shared dependencies',
      type: 'common',
      entryPoints: ['src/app/admin/admin.routes.ts', 'src/app/settings/settings.routes.ts'],
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

Each `entryPoints` value is a source entry point path from the esbuild metafile.
It is not an emitted chunk filename.

## Behavior

- Every configured entry point must resolve to an emitted esbuild entry chunk.
- Entry point chunks already assigned by earlier strategies are rejected.
- Dependencies already assigned by earlier strategies are excluded from the
  common group.
- Entry point chunks themselves are not included as shared dependencies.
- The strategy creates a single group from the remaining selected dependencies.

## Recommended use

Use common when you have a known set of lazy entry points with related loading
behavior.

Good fits include:

- A group of authenticated dashboard routes that are commonly visited together.
- Sibling feature areas that share large static dependencies.
- A workflow where users usually move between two or more lazy features in one
  session.

Avoid common when the selected entry points are rarely loaded in the same
session. In that case, a shared group can make the first visited route download
dependencies for routes the user may never open.

## Ordering

Common uses the already assigned set as an exclusion list. That means earlier
strategies shape what can be included in the common group.

If the shared group is the most important policy, place common before static
closure rules:

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';
import type { MergeStrategyConfig } from '@rx-angular/rebundle';

const mergeStrategy: MergeStrategyConfig = {
  name: 'feature-groups',
  strategies: [
    {
      label: 'admin settings shared dependencies',
      type: 'common',
      entryPoints: ['src/app/admin/admin.routes.ts', 'src/app/settings/settings.routes.ts'],
    },
    {
      label: 'admin remaining closure',
      type: 'static-closure',
      entryPoint: 'src/app/admin/admin.routes.ts',
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

This keeps the shared dependencies in the common group and lets the later static
closure rule claim only unassigned admin-specific chunks.

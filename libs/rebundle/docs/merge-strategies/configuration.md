# Configuration

You can add the plugin without any configuration. The default configuration uses the reachability strategy:

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';

export default optimizeChunksPlugin();
```

That is equivalent to this merge strategy config:

```ts
{
  name: 'main',
  strategies: [
    {
      label: 'reachability',
      type: 'reachability',
    },
  ],
}
```

The default is the recommended starting point. It analyzes the esbuild output graph from the application entry chunk and merges chunks into the entry point that dominates them in the reachable graph.

If you need more control, configure the plugin in one of two ways:

1. Pass a static config from the build target.
2. Reference a plugin file and build the config in TypeScript.

### Static target config

Use target config when the strategy is static JSON and does not need environment variables, helper functions, comments, or shared TypeScript constants.

```json title="angular.json"
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": [
              {
                "path": "./esbuild.plugins.ts",
                "options": {
                  "mergeStrategy": {
                    "name": "main",
                    "strategies": [
                      {
                        "label": "default reachability",
                        "type": "reachability"
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
}
```

Then export the plugin factory from the referenced file:

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';

export default optimizeChunksPlugin;
```

The custom esbuild builder passes the `options` object from `angular.json` to the exported factory.

### Plugin file config

Use a plugin file when the config benefits from TypeScript: shared constants, comments, conditionals, helper functions, or different configs per build mode.

```ts title="esbuild.plugins.ts"
import optimizeChunksPlugin from '@rx-angular/rebundle';
import type { MergeStrategyConfig } from '@rx-angular/rebundle';

const mergeStrategy: MergeStrategyConfig = {
  name: 'main',
  strategies: [
    {
      label: 'group each route by reachability',
      type: 'reachability',
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

The build target only needs to reference the file:

```json title="angular.json"
{
  "plugins": ["./esbuild.plugins.ts"]
}
```

### Merge strategy config

The merge strategy config has this shape:

```ts
interface MergeStrategyConfig {
  name: string;
  strategies: StrategyDefinition[];
  verbose?: boolean;
}
```

`name` identifies the config in logs and diagnostics. `strategies` is applied in order. `verbose` is reserved for more detailed diagnostics.

Strategies are intentionally order-dependent. Each strategy assigns one or more emitted JavaScript chunks to a merge group. Once a chunk has been assigned, later strategies cannot assign it again. Any JavaScript chunks left unassigned after all configured strategies run are kept as their own chunks.

Entry point values in strategy config refer to esbuild metafile entry points, not emitted output filenames. In practice, that usually means source paths such as `src/main.ts`, `src/app/admin/admin.routes.ts`, or another source file used as a dynamic import entry point.

### Strategy examples

For detailed strategy behavior, see:

- [Reachability](reachability.md)
- [Static closure](static-closure.md)
- [Common](common.md)

Example with reachability plus one explicit static closure:

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
    {
      label: 'admin route closure',
      type: 'static-closure',
      entryPoint: 'src/app/admin/admin.routes.ts',
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

Example with a custom common group before a broader static closure:

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
      label: 'reports route closure',
      type: 'static-closure',
      entryPoint: 'src/app/reports/reports.routes.ts',
    },
  ],
};

export default optimizeChunksPlugin({ mergeStrategy });
```

### Choosing a strategy

Start with no config. That uses reachability and is the safest default for large Angular applications with many lazy routes.

Add `static-closure` when a specific entry point should carry more of its static dependencies with it.

Add `common` when you have a known set of entry points that should share a dependency group.

Prefer small, intentional configs. A strategy config is a bundling policy, so each extra rule should describe a real loading behavior you want in the application.

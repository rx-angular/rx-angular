# Research & Explorations

This document tracks ongoing research and considerations for future bundle optimization strategies in `@rx-angular/rebundle`.

## Query Imports via Import Attributes

Investigating the use of import attributes to dynamically control bundle chunks directly from the source code. This allows for fine-grained control such as defining named entry point maps, explicit bundle inclusion/exclusion, and metadata like `fetch-priority`.

```json-c
{
  "with": {
    "tag": "EntryPointMapKey", // Adds an entry to the optimized bundle to allow referencing by tag name
    "bundle": "common",        // File will be bundled into the designated 'common' bundle
    "target": "entry"
  }
}
```

## Bundling Strategies Comparison

| Idea                                                         | Number of Bundles | Bundle Size | Build Time | Caching | Maintainability | DX (Configurability) | Notes / Explanation                                                                                            |
| :----------------------------------------------------------- | :---------------- | :---------- | :--------- | :------ | :-------------- | :------------------- | :------------------------------------------------------------------------------------------------------------- |
| **Merging bootstrap imports into main (or by reachability)** | ++                | ++          | +          | --      | -               | +                    | Great for merging early bootstrap deps. Increases cache busting because main bundle changes more often.        |
| **Import Attributes**                                        | 0                 | 0           | +          | +       | +               | ++                   | Improves clarity of static/server config. Very high DX because config becomes explicit.                        |
| **Pre-bundling libs**                                        | +                 | +           | ++         | -       | -               | +                    | Tremendously speeds up incremental builds. But requires a dependency graph upfront.                            |
| **Dynamic entry-point merging**                              | ++                | +           | -          | --      | --              | -                    | Removes the limitation of "1 chunk per dynamic import", allowing smarter merging. Causes cache ripple effects. |

## Cache Persistence

Splitting the main module outside of itself and treating it as external will allow it to be cached across different entry points. However, aggressively merging bootstrap imports into main increases cache invalidation.

## Preload Module Map

We can use import attributes to generate a map of assets which can be used to make smart preloading decisions. The import map would collect the list of features and assets making them available as a map, so we can manually import them at runtime, or add them on the server directly to the HTML as a preload tag.

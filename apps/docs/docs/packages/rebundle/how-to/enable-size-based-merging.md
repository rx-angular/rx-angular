---
id: enable-size-based-merging
title: 'How to enable size-based chunk merging'
diataxis_type: how-to
package: rebundle
legacy_guard: false
sidebar_label: 'Enable size-based merging'
sidebar_position: 3
tags: [rebundle, guides]
---

# How to enable size-based chunk merging

## Goal

Turn on `@rx-angular/rebundle`'s size-based chunk merging to intelligently
consolidate small chunks and reduce bundle request overhead. This feature
extends the existing merge strategy with analysis-driven chunk consolidation.

It offers:

- **Intelligent size analysis** — detects small chunks under configurable
  thresholds (default: 8KB) and estimates gzip compression impact for network
  optimization.
- **Smart merge detection** — prioritizes chunks with shared dependencies, close
  in the dependency graph, likely to be requested together, and optimized for
  maximum size reduction.
- **Performance-preserving constraints** — reduces HTTP request overhead while
  maintaining bundle splitting for larger chunks and preserving the critical
  path and dynamic import boundaries.

## Basic usage (auto-configuration)

```typescript
import optimizeChunksPlugin from '@rx-angular/rebundle';

// Auto-analyzes bundle and applies recommended settings
const plugin = optimizeChunksPlugin({
  autoAnalyze: true, // Default: true
  verbose: true, // Show detailed optimization logs
});
```

## Manual configuration

```typescript
import optimizeChunksPlugin from '@rx-angular/rebundle';

const plugin = optimizeChunksPlugin({
  enableSizeBasedMerging: true,
  verbose: true,
  sizeBasedOptions: {
    sizeAnalysis: {
      sizeThreshold: 6144, // 6KB threshold (default: 8KB)
      maxCombinedSize: 24576, // 24KB max combined (default: 32KB)
      gzipRatio: 0.3, // 30% compression estimate
    },
    constraints: {
      maxCombinedSize: 24576,
      preserveCriticalPath: true, // Don't merge entry-point chunks
      respectDynamicBoundaries: true, // Don't merge across dynamic imports
      minPriorityScore: 25, // Minimum score for merge consideration
      maxChunksPerMerge: 3, // Max chunks per merge group
    },
  },
});
```

For the full list of options, see the
[size-based merging options reference](../reference/size-based-merging-options.md).

## Advanced usage with bundle analysis

```typescript
import { analyzeBundleCharacteristics } from '@rx-angular/rebundle/merge-strategy-v3';

// Analyze bundle characteristics first
const analysis = analyzeBundleCharacteristics(metafile);
console.log('Bundle Analysis:', analysis);

// Use analysis-driven configuration
const plugin = optimizeChunksPlugin({
  enableSizeBasedMerging: true,
  sizeBasedOptions: analysis.recommendations,
});
```

## Performance impact

- **HTTP requests**: 30-50% reduction in chunk count for fragmented bundles.
- **Total payload**: 5-10% reduction through better compression ratios.
- **Cache efficiency**: Maintained through content-hash naming.
- **Initial load**: Preserved or improved through intelligent consolidation.

## Best practices

1. **Start with auto-analysis**: Enable `autoAnalyze: true`.
2. **Monitor bundle reports**: Enable `verbose: true` to check merge decisions.
3. **Adjust thresholds**: Use 12KB for small apps, 8KB for medium, 6KB for large
   apps.
4. **Dynamic import patterns**: Enable `respectDynamicBoundaries: true` for apps
   heavily reliant on lazy loading.

## Troubleshooting

1. **No merges applied**: Check if chunks meet the size threshold and priority
   requirements.
2. **Unexpected merges**: Adjust `minPriorityScore` or enable stricter
   constraints.
3. **Performance regression**: Ensure `preserveCriticalPath` is enabled.
4. **Bundle size increase**: Check if `maxCombinedSize` is appropriate for your
   use case.

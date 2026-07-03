# Size-Based Chunk Merging

## Overview

The `@rx-angular/rebundle` plugin includes advanced size-based chunk merging capabilities that intelligently consolidate small chunks to optimize bundle performance. This feature extends the existing merge strategy with analysis-driven chunk consolidation.

## Features

### 🔍 Intelligent Size Analysis

- Automatically detects small chunks under configurable thresholds (default: 8KB).
- Estimates gzip compression impact for network optimization.
- Provides comprehensive bundle analysis and recommendations.

### 🎯 Smart Merge Detection

- **Shared Dependencies**: Prioritizes chunks with common imports.
- **Geographic Proximity**: Merges chunks close in the dependency graph.
- **Load Timing**: Considers chunks likely to be requested together.
- **Size Efficiency**: Optimizes for maximum size reduction.

### ⚡ Performance Optimizations

- Reduces HTTP request overhead (major performance win).
- Maintains bundle splitting benefits for larger chunks.
- Preserves critical path and dynamic import boundaries.
- Configurable constraints for fine-tuned control.

## Usage

### Basic Usage (Auto-Configuration)

```typescript
import optimizeChunksPlugin from '@rx-angular/rebundle';

// Auto-analyzes bundle and applies recommended settings
const plugin = optimizeChunksPlugin({
  autoAnalyze: true, // Default: true
  verbose: true, // Show detailed optimization logs
});
```

### Manual Configuration

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

### Advanced Usage with Bundle Analysis

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

## Configuration Options

### Plugin Options

| Option                   | Type                      | Default       | Description                              |
| ------------------------ | ------------------------- | ------------- | ---------------------------------------- |
| `enableSizeBasedMerging` | `boolean`                 | auto-detected | Enable size-based chunk merging          |
| `autoAnalyze`            | `boolean`                 | `true`        | Auto-analyze bundle for optimal settings |
| `verbose`                | `boolean`                 | `false`       | Enable detailed logging                  |
| `sizeBasedOptions`       | `SizeBasedMergingOptions` | `{}`          | Fine-tune merging behavior               |

### Size Analysis Options

| Option            | Type     | Default | Description                                   |
| ----------------- | -------- | ------- | --------------------------------------------- |
| `sizeThreshold`   | `number` | `8192`  | Size threshold in bytes for merge eligibility |
| `maxCombinedSize` | `number` | `32768` | Maximum combined size for merged chunks       |
| `gzipRatio`       | `number` | `0.3`   | Estimated gzip compression ratio              |

### Merging Constraints

| Option                     | Type      | Default | Description                        |
| -------------------------- | --------- | ------- | ---------------------------------- |
| `maxCombinedSize`          | `number`  | `32768` | Maximum size for merged chunks     |
| `preserveCriticalPath`     | `boolean` | `true`  | Keep critical path chunks separate |
| `respectDynamicBoundaries` | `boolean` | `true`  | Don't merge across dynamic imports |
| `minPriorityScore`         | `number`  | `20`    | Minimum priority score for merging |
| `maxChunksPerMerge`        | `number`  | `4`     | Maximum chunks per merge operation |

## Performance Impact

- **HTTP Requests**: 30-50% reduction in chunk count for fragmented bundles.
- **Total Payload**: 5-10% reduction through better compression ratios.
- **Cache Efficiency**: Maintained through content-hash naming.
- **Initial Load**: Preserved or improved through intelligent consolidation.

## Best Practices

1. **Start with Auto-Analysis**: Enable `autoAnalyze: true`.
2. **Monitor Bundle Reports**: Enable `verbose: true` to check merge decisions.
3. **Adjust Thresholds**: Use 12KB for small apps, 8KB for medium, 6KB for large apps.
4. **Dynamic Import Patterns**: Enable `respectDynamicBoundaries: true` for apps heavily reliant on lazy loading.

## Troubleshooting

1. **No merges applied**: Check if chunks meet size threshold and priority requirements.
2. **Unexpected merges**: Adjust `minPriorityScore` or enable stricter constraints.
3. **Performance regression**: Ensure `preserveCriticalPath` is enabled.
4. **Bundle size increase**: Check if `maxCombinedSize` is appropriate for your use case.

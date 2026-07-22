---
id: size-based-merging-options
title: 'Size-based merging options'
diataxis_type: reference
package: rebundle
legacy_guard: false
sidebar_label: 'Size-based merging options'
sidebar_position: 5
tags: [rebundle, api-reference]
---

# Size-based merging options

Configuration options for `@rx-angular/rebundle`'s size-based chunk merging. For
a task-oriented walkthrough, see
[Enable size-based chunk merging](../how-to/enable-size-based-merging.md).

## Plugin options

| Option                   | Type                      | Default       | Description                              |
| ------------------------ | ------------------------- | ------------- | ---------------------------------------- |
| `enableSizeBasedMerging` | `boolean`                 | auto-detected | Enable size-based chunk merging          |
| `autoAnalyze`            | `boolean`                 | `true`        | Auto-analyze bundle for optimal settings |
| `verbose`                | `boolean`                 | `false`       | Enable detailed logging                  |
| `sizeBasedOptions`       | `SizeBasedMergingOptions` | `{}`          | Fine-tune merging behavior               |

## Size analysis options

| Option            | Type     | Default | Description                                   |
| ----------------- | -------- | ------- | --------------------------------------------- |
| `sizeThreshold`   | `number` | `8192`  | Size threshold in bytes for merge eligibility |
| `maxCombinedSize` | `number` | `32768` | Maximum combined size for merged chunks       |
| `gzipRatio`       | `number` | `0.3`   | Estimated gzip compression ratio              |

## Merging constraints

| Option                     | Type      | Default | Description                        |
| -------------------------- | --------- | ------- | ---------------------------------- |
| `maxCombinedSize`          | `number`  | `32768` | Maximum size for merged chunks     |
| `preserveCriticalPath`     | `boolean` | `true`  | Keep critical path chunks separate |
| `respectDynamicBoundaries` | `boolean` | `true`  | Don't merge across dynamic imports |
| `minPriorityScore`         | `number`  | `20`    | Minimum priority score for merging |
| `maxChunksPerMerge`        | `number`  | `4`     | Maximum chunks per merge operation |

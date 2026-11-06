# Autosize virtual scroll benchmark

Route: `/template/rx-virtual-for/benchmark` (menu: _Virtual Scrolling → Benchmark_).

A deterministic benchmark for the `autosize` strategy. Data is seeded, every
scenario starts with fresh (never measured) items, so runs are comparable
across builds.

## Configuration (query params)

| param      | default  | values                                                              |
| ---------- | -------- | ------------------------------------------------------------------- |
| `items`    | `10000`  | number of items                                                     |
| `mode`     | `runway` | `runway` (viewport scrolls) or `element` (`rxVirtualScrollElement`) |
| `template` | `heavy`  | `light` (one text node) or `heavy` (card with ~20 nodes)            |
| `ro`       | `1`      | `withResizeObserver`                                                |
| `strategy` | `normal` | render strategy                                                     |
| `runway`   | `10`     | `runwayItems`                                                       |

## Scenarios

Run them from the UI or scripted through `window.__vsBench` (e.g. from the
devtools protocol while recording a trace):

| scenario         | what it does                                                                         |
| ---------------- | ------------------------------------------------------------------------------------ |
| `scrollDown`     | scrolls through fresh items, `px` per frame (`startIndex` to start deep in the list) |
| `scrollUp`       | measures items, re-emits them (new references, same content), scrolls back up        |
| `updates`        | immutable update, re-map, in-place mutation, shuffle, prepend, remove                |
| `jumps`          | far `scrollToIndex` jumps                                                            |
| `replaceVisible` | replaces visible items with new ones of the same size                                |
| `smallList`      | lists around the container size, the content grows beyond and shrinks below it       |

The scroll driver applies its step in a task between two frames, where real
input lands. The scroll event then fires in the next frame, before its layout
and `ResizeObserver` callbacks.

```js
await __vsBench.scrollDown({ px: 150, frames: 150 }); // perf
await __vsBench.scrollDown({ px: 150, frames: 150, ux: true }); // ux checks
```

## Measurements

- **perf** (default): frame timings and long animation frames. Nothing reads
  layout. For main thread work record a trace: `performance.mark`s named
  `bench:<label>:<rep>:start|end` (set `window.__benchMark = { label, rep }`)
  frame the measured part of a scenario. Count `Layout` / `UpdateLayoutTree`
  events and their duration within the marks, events with a JS stack trace are
  forced (synchronous) layouts.
- **ux** (`ux: true`): after the layout of every frame (the state that gets
  painted) it checks the rendered items for blank areas, overlaps, gaps, wrong
  order, visual jumps of the topmost item and uncaught errors (e.g.
  `ResizeObserver loop completed with undelivered notifications`). It reads
  layout, never combine it with a perf measurement.

Headless Chrome hides scrollbars. Layout affecting (classic) scrollbars are
covered by the cypress component tests.

## Results: `ResizeObserver` measuring + prefix sums

Chrome 156 headless, 1280x900, no CPU throttling, `heavy` template, `runway`
mode, `normal` strategy. Median of 3 runs of the measured section.

| scenario                    | main thread (task) ms | layout passes             | style recalc ms |
| --------------------------- | --------------------- | ------------------------- | --------------- |
| 10k `scrollDown`            | 184 → 168 (−9%)       | 180 → 150                 | 12.2 → 7.7      |
| 10k `scrollUp`              | 165 → 121 (−27%)      | 327 → 150                 | 12.4 → 4.7      |
| 10k `updates`               | 46 → 33 (−29%)        | 74 → 8                    | 4.5 → 1.2       |
| 10k `jumps`                 | 69 → 37 (−46%)        | 156 → 12 (forced 151 → 0) | 7.4 → 2.2       |
| 100k `scrollDown` at 90 000 | 143 → 120 (−17%)      | 143 → 120                 | 8.2 → 5.9       |
| 100k `updates` at 90 000    | 138 → 113 (−18%)      | 56 → 7                    | 3.2 → 1.4       |

Interleaved in a single trace (same page load, so less noise), the 100k
scenarios measured 201 → 122 ms (`scrollDown`, −39%) and 184 → 110 ms
(`updates`, −40%).

The ux checks report identical results for both builds in every scenario
(`light`/`heavy`, `runway`/`element`, 4x CPU throttling, 200px per frame).

While scrolling, a layout per frame is unavoidable: the scroll position read
in the scroll handler lays out what the render tasks added since the last
frame. In the trace the remaining forced layouts while scrolling are that read.

### What changed

- **Measuring**: rendered views are measured by the `ResizeObserver` only,
  right after the layout of the frame and before it gets painted, instead of
  reading `offsetHeight` per rendered view (a forced layout each).
  - While the content doesn't overflow the container, views are still
    measured synchronously: growing beyond the container within a
    `ResizeObserver` callback adds a (classic) scrollbar, which changes the
    width of all views - the observer could only report that with the next
    frame, an error.
  - Synchronous render strategies (`native`, `noop`) render within the range
    emission, possibly within a `ResizeObserver` callback: they keep measuring
    synchronously and start observing with the next frame.
  - A content size shrink that would end the overflow is applied with the
    next frame for the same reason.
  - A view that is still observed for a former item gets its observation
    restarted, so a same-sized item is reported as well.
- **Batching**: size changes of one `ResizeObserver` callback are booked per
  item, the views are positioned and the content size is updated once per
  callback (before: per resized view, each with a full repositioning pass and
  scroll correction).
- **Prefix sums**: positions, the anchor and the content size were sums over
  all items before the anchor / after the rendered range, `O(n)` per render
  pass and resize. A Fenwick tree (`SizeTree`) answers them in `O(log n)`.
- **Data emissions**: the trackBy cache entries are updated in place and
  removed entries are swept by a generation stamp instead of a `Set` of all
  ids (halves the handler at 100k items).
- Unchanged positions aren't rewritten after a resize, `position: absolute`
  is written once per element.

### Evaluated, not adopted

- **Reading the scroll position after layout** (`afterNextLayout`) instead of
  in the scroll handler: no gain, the layout only moves from the handler to the
  frame, the total work is the same.
- **Caching the viewport offset** (`measureOffset`): the `scrollTop` read in
  the same handler forces the layout anyway.
- **Batching the animation engine flush** of detached views
  (`detectChanges()` on detach): nearly all of its cost is the DOM removal
  itself, which happens anyway.
- **Skipping invalidation of unchanged items** (identity check): unsafe for
  in-place mutations without a `ResizeObserver`. With the `ResizeObserver`
  measuring, re-entering items use their last size as estimate and are
  confirmed after layout, there's nothing left to skip.

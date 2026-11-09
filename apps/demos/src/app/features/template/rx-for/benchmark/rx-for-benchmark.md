# rxFor reconciliation benchmark

Route: `/template/rx-for/benchmark` (menu: _rxFor → Benchmark_).

A deterministic benchmark for list updates rendered by `rxFor`. Data is seeded,
every repetition renders an empty list, then the base list, then measures the
change, so runs are comparable across builds.

## Configuration (query params)

| param        | default  | values                                                           |
| ------------ | -------- | ---------------------------------------------------------------- |
| `items`      | `1000`   | number of items                                                  |
| `template`   | `plain`  | `plain` (id + label) or `index` (additionally renders the index) |
| `strategy`   | `normal` | render strategy                                                  |
| `reconciler` | `new`    | `new` (`provideExperimentalRxForReconciliation`) or `legacy`     |

## Scenarios

`append`, `prepend`, `insertMiddle`, `removeFirst`, `removeMiddle`,
`slidingWindow` (remove first + append), `swap` (index 10 ↔ n-10), `moveOne`
(index 10 → n-10), `relocate10` (10 random relocations), `sortNearlySorted`
(sort a list with 5% of the items displaced), `shuffle`, `reverse`,
`updateEvery10th` / `updateAll` (new object identity, same key), `filterHalf`,
`replaceAll` (all keys new).

```js
await __rxForBench.run('relocate10', 15);
await __rxForBench.runAll(15);
```

## Measurements

- **render**: wall time from setting the new list until `rxFor` reports it as
  rendered (the `renderCallback` emitting exactly that list). With concurrent
  strategies this includes the frames rendered in between when the work is split.
- **settled**: wall time until the DOM shows the new list (rows and, for the
  `index` template, indices). Later than `render` when the render callback fired
  before the DOM was up to date, these repetitions are counted in `staleDom`
  (e.g. the renderer of `@angular/platform-browser/animations` removes elements
  only at the end of a render pass).
- **layout**: style recalculation + layout of the DOM changes, forced once the
  DOM settled.

Each repetition is framed by `performance.mark`s named
`bench:<scenario>:<rep>:start|end` to inspect it in a trace.

Compare builds in headless Chrome with a production build of the demos app,
alternating the order of the builds per round.

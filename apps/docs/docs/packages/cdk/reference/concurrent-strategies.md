---
id: concurrent-strategies
title: "Concurrent strategies"
diataxis_type: reference
package: cdk
legacy_guard: false
sidebar_label: "Concurrent strategies"
tags: [cdk, api-reference]
concepts: [E5]
---

# Concurrent strategies

The concurrent strategies are a set of five named render strategies that schedule
change detection against a **frame budget** and a per-priority **render deadline**,
so heavy rendering yields to the main thread instead of blocking it. They are the
one capability in RxAngular with no native Angular equivalent: Angular schedules
*what* to re-render but has no notion of *how long* a re-render may run before it
should pause for user input ([angular#43168](https://github.com/angular/angular/issues/43168)).

For the mental model (frame budget, chunking, priority, and render deadlines),
see [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).
For task-oriented usage, see
[How to render heavy UI work without blocking the frame](../../template/how-to/concurrent-rendering.md).

## Strategy names, priorities, and render deadlines

Each strategy chunks work in cycles of scheduling → prioritization → execution.
It renders by running change detection on the target view, and schedules each
chunk through `setImmediate` (Node.js / old IE), `MessageChannel` (all modern
browsers), or `setTimeout` as a final fallback. The **render deadline** is the point after which
the strategy stops chunking and flushes all remaining work synchronously, trading
a possible frame drop for guaranteed completion. `idle` has no deadline.

| Name             | Priority | Render method   | Scheduling       | Render deadline |
| ---------------- | -------- | --------------- | ---------------- | --------------- |
| `"immediate"`    | 1        | `detectChanges` | `MessageChannel` | -1 ms (always expired) |
| `"userBlocking"` | 2        | `detectChanges` | `MessageChannel` | 250 ms          |
| `"normal"`       | 3        | `detectChanges` | `MessageChannel` | 5000 ms         |
| `"low"`          | 4        | `detectChanges` | `MessageChannel` | 10000 ms        |
| `"idle"`         | 5        | `detectChanges` | `MessageChannel` | — (none)        |

Priority `1` is the most urgent, `5` the least. The default strategy across the
render-strategy system is `normal`.

### `immediate`

Urgent work that must happen right now and is visible to the user. Runs right
after the current task, at the highest priority, with a `-1 ms` render deadline —
the task's expiration is set in the past, so it flushes immediately without
chunking. Fits a tooltip that must appear on hover.

Avoid scheduling large or non-urgent work at `immediate`; it blocks rendering to
meet its deadline.

### `userBlocking`

Critical work that must land in the current frame and is visible to the user, but
lightweight: DOM manipulation that should render quickly. Render deadline
`250 ms`. Fits a dropdown that must open on interaction. Keep the work small;
heavier work belongs at `normal`.

### `normal`

Heavy work visible to the user, with a generous `5000 ms` render deadline: the
right default for rendering data lists. Combined with `*rxFor`, list rendering
becomes non-blocking.

### `low`

Work that is not urgent and typically not the focus of the user's interaction,
with a `10000 ms` render deadline. Fits lazy-loading a component such as a popup.

### `idle`

Background work that is not initiated by the user, at the lowest priority, with
**no** render deadline; it never forces a synchronous flush. Fits background
processes such as a background sync that must not affect user interactions.

## Scheduling APIs

The concurrent strategies build on browser scheduling primitives. For reducing
main-thread blocking, the relevant APIs are:

- **`MessageChannel`**: the primitive the scheduler uses to post the next chunk
  of work as a fresh macrotask (via `port.postMessage`), so the browser can paint
  and process input between chunks. Unlike `requestAnimationFrame`, it is not tied
  to the paint cycle, so it can yield multiple times per frame.
- **`postTask`** (`scheduler.postTask`): the native browser task scheduler with
  built-in priorities (`user-blocking`/`user-visible`/`background`), shipped in
  Chrome 115. It maps closely onto the priority model these strategies expose.
- **`scheduler.yield`**: the native way to yield to the main thread mid-task and
  resume afterwards, letting pending input be processed. It is the modern
  replacement for the older `isInputPending` check; the scheduler's own
  `shouldYieldToHost` yields once the elapsed time exceeds the frame interval.
- **`requestIdleCallback`**: runs work only when the main thread is idle; the
  conceptual basis for the `idle` strategy.
- **`setImmediate`**: preferred over `MessageChannel` in non-browser environments
  (Node.js / old IE) where it is available.
- **`setTimeout`**: the portable fallback used when neither `setImmediate` nor
  `MessageChannel` is available.

`postTask` and `scheduler.yield` are the direction browsers have converged on for
priority-aware, interruptible scheduling, the same problem space these strategies
solve. React's concurrent renderer solves the equivalent problem in its own
framework; the shared idea is a scheduler that can pause long work to keep input
responsive (see [web.dev on the RAIL model](https://web.dev/articles/rail)).

## Import path

```ts
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
```

## Minimal example

```ts
@Component({
  selector: 'item-dropdown',
  template: `<div (mouseenter)="show()">{{ text() }}</div>`,
})
export class DropdownComponent {
  private readonly strategyProvider = inject(RxStrategyProvider);
  readonly text = input.required<string>();

  show() {
    this.strategyProvider
      .schedule(() => {
        // create dropdown — lightweight, must land this frame
      }, { strategy: 'userBlocking' })
      .subscribe();
  }
}
```

## See also

- Reference: [`RxStrategyProvider`](./rx-strategy-provider.md), the service that schedules work against these strategies
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- How-to: [Render heavy UI work without blocking the frame](../../template/how-to/concurrent-rendering.md)

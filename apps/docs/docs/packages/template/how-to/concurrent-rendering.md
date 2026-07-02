---
id: concurrent-rendering
title: "How to render heavy UI work without blocking the frame"
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: "Concurrent rendering"
tags: [template, cdk, guides]
concepts: [E5]
---

# How to render heavy UI work without blocking the frame

**Goal.** Schedule expensive rendering and background work so the browser's UI
thread stays responsive: chunk the work across frames against a real frame
budget, and order competing pieces of work by priority. This is the one thing
Angular's native change detection and control flow cannot do: they can tell you
*what* to render, but not *how long* a re-render is allowed to run before it
should pause and let the user interact ([angular#43168](https://github.com/angular/angular/issues/43168)).

Reach for this when a large list, an expensive component tree, or a burst of
background work makes clicks, scrolls, or animations stutter. If a template
needs a plain toggle or a plain loop, native `@if`/`@for` already cover it; the
concurrent strategies earn their place only when the rendering is heavy enough to
drop frames.

For the mental model behind frame budgets, priorities, and render deadlines, read
[Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
first. For the exact strategy names, priorities, and deadlines, see the
[concurrent strategies reference](../../cdk/reference/concurrent-strategies.md).

## Schedule one-off work with `RxStrategyProvider`

`RxStrategyProvider.schedule()` runs a callback under a chosen priority and
returns an `Observable`; subscribe to run it. Pick the priority from how urgent
the work is to the user (see the [reference](../../cdk/reference/concurrent-strategies.md)
for the full table):

- `immediate`: must appear right now (a tooltip on hover);
- `userBlocking`: must land this frame but is lightweight (a dropdown);
- `normal`: heavy work the user is waiting for (rendering a data list);
- `low`: visible but not urgent (lazy-loading a popup);
- `idle`: background work the user did not initiate (a background sync).

```ts
@Component({
  selector: 'item-image',
  template: `<img [src]="src()" (mouseenter)="showTooltip()" (mouseleave)="hideTooltip()" />`,
})
export class ItemImageComponent {
  private readonly strategyProvider = inject(RxStrategyProvider);

  readonly src = input.required<string>();

  showTooltip() {
    this.strategyProvider
      .schedule(() => {
        // create tooltip — urgent, appears on hover
      }, { strategy: 'immediate' })
      .subscribe();
  }

  hideTooltip() {
    this.strategyProvider
      .schedule(() => {
        // destroy tooltip
      }, { strategy: 'immediate' })
      .subscribe();
  }
}
```

:::warning
Do not schedule large or non-urgent work at `immediate` (or `userBlocking`):
those priorities block rendering to hit their deadline. Heavy, waited-on work
belongs at `normal`; background work at `low`/`idle`.
:::

## Schedule inside a stream with `scheduleWith`

When the work sits inside an RxJS pipeline, `scheduleWith` gives you an operator
you can drop into `.pipe()`, so each emission is processed under the chosen
priority. This is the idiomatic way to push a stream's side effects to the
background:

```ts
@Component({ /* … */ })
export class BackgroundSyncComponent {
  private readonly strategyProvider = inject(RxStrategyProvider);
  private readonly webSocket = inject(WebSocketService);
  private readonly state = inject(StateService);

  constructor() {
    this.state.items$
      .pipe(this.strategyProvider.scheduleWith(
        (items) => this.webSocket.syncItems(items),
        { strategy: 'idle' },
      ))
      .subscribe();
  }
}
```

## Render a large collection non-blockingly with `*rxFor`

The `*rxFor` directive schedules the change detection of each rendered item
through the same strategy system, so a long list renders in frame-budgeted chunks
instead of one blocking synchronous pass. Set the `strategy` input to control the
priority:

```ts
@Component({
  selector: 'items-list',
  template: `
    <div id="items-list">
      <div *rxFor="let item of state.items$; strategy: 'normal'">
        <item-image [src]="item.image" />
        <item-dropdown [text]="item.text" />
      </div>
    </div>
  `,
})
export class ItemsListComponent {
  protected readonly state = inject(StateService);
}
```

`normal` is the default and the right choice for user-facing lists: it has a
generous render deadline, so the list keeps chunking while the user can still
scroll and click. For the other rendering knobs (`renderCallback`, `parent`,
`patchZone`) shared by every reactive directive, see
[How to tune rendering with strategies](./tune-rendering-with-strategies.md).

## Result

Heavy rendering and background work now yield to the main thread on a frame
budget instead of running in one blocking pass. Verify in Chrome DevTools'
Performance panel: the long tasks (the red-cornered blocks over ~50 ms) that
correspond to your rendering should split into shorter tasks with input handling
interleaved between them, and scrolling/clicking should stay responsive while the
work completes.

## See also

- Reference: [concurrent strategies](../../cdk/reference/concurrent-strategies.md): the strategy names, priorities, and render deadlines.
- Reference: [How to tune rendering with strategies](./tune-rendering-with-strategies.md): the `strategy`/`renderCallback`/`parent`/`patchZone` inputs on `*rxFor`, `*rxIf`, `*rxLet`, `*rxVirtualFor`.
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)

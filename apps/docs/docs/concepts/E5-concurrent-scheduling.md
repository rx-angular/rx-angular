---
id: E5-concurrent-scheduling
sidebar_position: 5
title: 'Concurrent scheduling & the frame budget'
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: 'Concurrent scheduling'
tags: [cdk, template, content]
---

# Concurrent scheduling & the frame budget

The browser runs your application on a single UI thread. Everything (script
execution, layout, paint, and the handling of user input) takes turns on that
one thread, one task after another. While a task is running, nothing else can:
a click, a scroll, or a keystroke that arrives mid-task is queued and only
serviced once the thread is free again. When a rendering task runs long enough,
the user feels it as jank: a dropped animation, a stuttering scroll, a button
that responds a beat too late.

**Concurrent scheduling** is RxAngular's answer to that problem, and it is the
one capability in the library with no native Angular equivalent. Angular can tell
you _what_ changed and re-render it; it has no notion of _how long_ that
re-render is allowed to take before it should pause and let the user interact.
Concurrent scheduling adds exactly that notion. It is why RxAngular ships a set
of **render strategies** at all, and why those strategies remain current rather
than a legacy footnote.

## The idea

The mental model rests on one number: the **frame budget**, the time a task may
occupy the main thread before it must yield.

A smooth 60 frames-per-second display refreshes every ~16.6 ms, so in the
strictest reading a task should never hold the thread longer than that. In
practice the browser tooling draws the line higher: Chromium flags any task over
**50 ms** as a "long task," because a little slack is acceptable once you account
for everything else that has to happen around a user's input. This ~50 ms ceiling
comes from the [RAIL performance model](https://web.dev/rail/) (Response,
Animation, Idle, Load), which frames performance from the user's perception
rather than from a raw framerate. The budget is not one fixed millisecond count
so much as "however long the current task can run before the person waiting on it
starts to notice."

Given a budget, the scheduler can do something the framework cannot do on its
own. As it works through a queue of rendering, it keeps track of how much time
the current task has already consumed. The moment the elapsed time crosses the
budget, it **stops, yields to the main thread, and resumes on the next task**.
The browser gets a chance to process pending input and paint a frame in between;
the application stays interactive even while a large amount of rendering is still
in flight. This slicing of one big blocking task into a series of budget-sized
chunks is the whole game. The library calls the underlying pieces _frame
budget_, _scheduling_, _chunking_, and _prioritization_, but they are facets of
this single idea.

Two refinements make it usable rather than merely clever:

- **Priorities.** Not all rendering is equally urgent. Showing a tooltip on
  hover must feel instant; painting the two-hundredth row of a list can wait a
  few frames. Concurrent scheduling exposes a small ladder of named priorities
  so that urgent work jumps ahead of background work in the queue.
- **Render deadlines.** Yielding forever would mean low-priority work might never
  finish. Each priority therefore carries a deadline. If a queue of work has not
  drained within that window, the scheduler stops chunking and flushes the
  remainder in one synchronous block, accepting a possible single frame drop in
  exchange for a guarantee that the work eventually completes.

The named priorities range from the most urgent, which runs almost immediately
and is meant for work the user is actively waiting to see, down to a background
tier with no deadline at all, meant for work that should happen only when the
thread would otherwise be idle. A component reaches for these through the
`RxStrategyProvider`, scheduling a unit of work under a chosen strategy; the
`rxFor` directive and virtual scrolling apply the same strategies to the more
common case of rendering a collection without blocking.

```typescript
import { Component, inject } from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';

@Component({
  selector: 'app-tooltip-host',
  template: `<img [src]="src()" (mouseenter)="showTooltip()" />`,
})
export class TooltipHostComponent {
  private readonly strategy = inject(RxStrategyProvider);

  showTooltip() {
    // Urgent, user-visible work: schedule it at the highest priority
    // so it is not chunked behind lower-priority rendering.
    this.strategy.schedule(() => this.buildTooltip(), { strategy: 'immediate' }).subscribe();
  }

  private buildTooltip() {
    /* ... */
  }
}
```

## Trade-offs / context

Concurrent scheduling buys smoothness at the cost of _throughput_. Slicing work
across many small tasks and yielding between them takes longer, wall-clock, than
running it all at once: you are deliberately trading total completion time for
responsiveness during that time. That trade is worth making when a
render is large and the user is present to interact with it; it is wasted effort
on small, cheap updates that would have fit inside one frame anyway. Reaching for
`immediate` on heavy work, or scheduling trivial work that never risked the
budget, both defeat the point.

One boundary is worth drawing. RxAngular also ships
**zone-based** render strategies (`local`, `native`, `noop`) that
exist to coordinate with Zone.js change detection. Those belong to a different,
legacy story; see
[Zoneless & how Zone.js affected change detection](./E2-zoneless-and-zonejs-change-detection.md)
for why modern Angular no longer needs them. Concurrent scheduling is the
opposite: it is not tied to zones, has no
native replacement, and is the reason to care about render strategies going
forward.

A last note on where this lives. The scheduler is _implemented_ in
`@rx-angular/cdk`, the low-level helper layer. But users almost never meet it
there first; they meet it through the Template package, where `rxFor` and
virtual scrolling expose a `strategy` input and prompt the question "which
priority should this rendering use?" For that reason this concept is documented
from the Template journey, even though its machinery sits in the CDK.

## Referenced by

- Render strategies: the CDK overview of the strategy system.
- [Concurrent strategies](../packages/cdk/reference/concurrent-strategies.md): the reference for the five concurrent priorities.
- [Render heavy UI work without blocking the frame](../packages/template/how-to/concurrent-rendering.md): the task-oriented how-to for scheduled rendering.
- [`RxStrategyProvider`](../packages/cdk/reference/rx-strategy-provider.md): the service for scheduling arbitrary work under a strategy.
- `rxFor` directive: non-blocking collection rendering that consumes these strategies.
- Virtual scrolling: large-list rendering built on the same scheduling model.
- Tutorial **T2**: the guided introduction to rendering large lists without jank.

## See also

- [Understanding change detection in Angular](./E1-change-detection.md): why a
  large re-render blocks the thread in the first place, and where scheduling fits.
- [Zoneless & how Zone.js affected change detection](./E2-zoneless-and-zonejs-change-detection.md):
  the legacy, zone-coordinating render strategies this concept is deliberately
  not about.

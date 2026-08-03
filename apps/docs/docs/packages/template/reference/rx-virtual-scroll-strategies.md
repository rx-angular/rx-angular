---
id: rx-virtual-scroll-strategies
title: 'Virtual scroll strategies'
diataxis_type: reference
package: template
legacy_guard: false
sidebar_label: 'Scroll strategies'
tags: [template, api-reference]
concepts: [E5]
---

# Virtual scroll strategies

A `RxVirtualScrollStrategy` positions the views created by `*rxVirtualFor` inside the
[viewport](./rx-virtual-scroll-viewport.md). All three pre-packaged strategies position
views absolutely and move them with CSS `transform`s, and share a common set of inputs.
Exactly one strategy must be applied, via its attribute selector, to the
`<rx-virtual-scroll-viewport>` element.

> **Why this matters:** see [How RxAngular virtual scrolling works](../../../concepts/E10-how-virtual-scrolling-works.md)
> and [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).

## Import

```ts
import { FixedSizeVirtualScrollStrategy, DynamicSizeVirtualScrollStrategy, AutoSizeVirtualScrollStrategy, RxVirtualScrollStrategy } from '@rx-angular/template/virtual-scrolling';
```

## Shared inputs

Every pre-packaged strategy exposes these inputs.

| Input                        | Type      | Default | Description                                                                                                         |
| ---------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `runwayItems`                | `number`  | `10`    | Number of items rendered upfront in scroll direction.                                                               |
| `runwayItemsOpposite`        | `number`  | `2`     | Number of items rendered upfront in the opposite scroll direction.                                                  |
| `appendOnly`                 | `boolean` | `false` | Keep already-rendered views in the DOM after they scroll out of view. Reacts to changes; can be toggled at runtime. |
| `keepScrolledIndexOnPrepend` | `boolean` | `false` | Maintain the currently scrolled index when new data is prepended. Used for reverse infinite scrollers.              |

## `FixedSizeVirtualScrollStrategy`

Positions views based on a single fixed item size. Comparable to the CDK
`FixedSizeVirtualScrollStrategy`, but with the high-performance layout technique.

- **Selector:** `rx-virtual-scroll-viewport[itemSize]`
- **Class:** `FixedSizeVirtualScrollStrategy<T, U>`

| Input      | Type     | Default | Description                                             |
| ---------- | -------- | ------- | ------------------------------------------------------- |
| `itemSize` | `number` | `50`    | Fixed size (in px) of every item, set via `[itemSize]`. |

```ts
import { Component } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, RxVirtualScrollViewportComponent, RxVirtualFor } from '@rx-angular/template/virtual-scrolling';

@Component({
  imports: [RxVirtualFor, FixedSizeVirtualScrollStrategy, RxVirtualScrollViewportComponent],
  template: `
    <rx-virtual-scroll-viewport [itemSize]="itemSize">
      <div class="item" *rxVirtualFor="let item of items$">{{ item.content }}</div>
    </rx-virtual-scroll-viewport>
  `,
})
export class MyComponent {
  itemSize = 50;
  items$ = inject(DataService).getItems();
}
```

## `DynamicSizeVirtualScrollStrategy`

Calculates each item's size from a user-provided function instead of reading the DOM,
so it has better runtime performance than the autosize strategy when the sizes are
known ahead of time.

- **Selector:** `rx-virtual-scroll-viewport[dynamic]`
- **Class:** `DynamicSizeVirtualScrollStrategy<T, U>`

| Input     | Type                  | Default | Description                                                                 |
| --------- | --------------------- | ------- | --------------------------------------------------------------------------- |
| `dynamic` | `(item: T) => number` | —       | Function returning the size (in px) of a given item, bound via `[dynamic]`. |

```ts
@Component({
  imports: [RxVirtualFor, DynamicSizeVirtualScrollStrategy, RxVirtualScrollViewportComponent],
  template: `
    <rx-virtual-scroll-viewport [dynamic]="dynamicSize">
      <div class="item" *rxVirtualFor="let item of items$">
        {{ item.content }}
        @if (item.description) {
          <div>{{ item.description }}</div>
        }
      </div>
    </rx-virtual-scroll-viewport>
  `,
})
export class MyComponent {
  // items with a description are 120px tall, others 50px
  dynamicSize = (item: Item) => (item.description ? 120 : 50);
  items$ = inject(DataService).getItems();
}
```

## `AutoSizeVirtualScrollStrategy`

Renders and positions items based on their individual measured size, using a
`ResizeObserver` to react to size changes. Comparable to the CDK experimental
autosize strategy, but with better visual stability and a working `scrollToIndex` /
`scrolledIndexChange`.

- **Selector:** `rx-virtual-scroll-viewport[autosize]`
- **Class:** `AutoSizeVirtualScrollStrategy<T, U>`

| Input                  | Type                                                                                         | Default | Description                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------- |
| `tombstoneSize`        | `number`                                                                                     | `50`    | Anticipated size for not-yet-measured views, used to size the runway. |
| `withResizeObserver`   | `boolean`                                                                                    | `true`  | Observe rendered views for size changes and re-position accordingly.  |
| `withSyncScrollbar`    | `boolean`                                                                                    | `false` | Keep the scrollbar synchronized during measurement.                   |
| `resizeObserverConfig` | `{ options?: ResizeObserverOptions; extractSize?: (entry: ResizeObserverEntry) => number; }` | —       | Configuration forwarded to the internal `ResizeObserver`.             |

```ts
@Component({
  imports: [RxVirtualFor, AutoSizeVirtualScrollStrategy, RxVirtualScrollViewportComponent],
  template: `
    <rx-virtual-scroll-viewport autosize>
      <div class="item" *rxVirtualFor="let item of items$">{{ item.content }}</div>
    </rx-virtual-scroll-viewport>
  `,
})
export class MyComponent {
  items$ = inject(DataService).getItems();
}
```

## Extending with a custom strategy

All parts of the package are based on injection tokens. To provide a custom strategy,
create a directive that provides itself as `RxVirtualScrollStrategy` and extends it
(the abstract base already implements some helpers, e.g. `getElement()` and the
`viewRenderCallback` subject used by `*rxVirtualFor`).

`RxVirtualScrollStrategy` requires you to implement three observables and three
methods:

| Member                                  | Description                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `scrolledIndex$: Observable<number>`    | Emits the index of the first item currently visible in the viewport.                                                |
| `renderedRange$: Observable<ListRange>` | Emits the `{ start, end }` slice of the iterable that should currently be rendered to the DOM.                      |
| `contentSize$: Observable<number>`      | Emits the total scrollable size (in px) of the list, used to size the viewport's scrollbar.                         |
| `attach(viewport, viewRepeater)`        | Called when the strategy is connected to a viewport. Wire up your scroll listeners and start computing ranges here. |
| `detach()`                              | Called when the strategy is disconnected (e.g. on `ngOnDestroy`). Tear down subscriptions here.                     |
| `scrollToIndex(index, behavior?)`       | Scroll the viewport so the item at `index` becomes visible.                                                         |

A minimal (simplified) fixed-size implementation looks like this:

```ts
import { Directive } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ListRange, RxVirtualScrollStrategy, RxVirtualScrollViewport, RxVirtualViewRepeater } from '@rx-angular/template/virtual-scrolling';

const ITEM_SIZE = 50;

@Directive({
  selector: 'rx-virtual-scroll-viewport[custom]',
  providers: [{ provide: RxVirtualScrollStrategy, useExisting: CustomScrollStrategy }],
})
export class CustomScrollStrategy extends RxVirtualScrollStrategy {
  private viewport: RxVirtualScrollViewport | null = null;
  private readonly detached$ = new ReplaySubject<void>(1);

  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  readonly scrolledIndex$ = this._scrolledIndex$.pipe(distinctUntilChanged());

  private readonly _renderedRange$ = new ReplaySubject<ListRange>(1);
  readonly renderedRange$ = this._renderedRange$.asObservable();

  private readonly _contentSize$ = new ReplaySubject<number>(1);
  readonly contentSize$ = this._contentSize$.asObservable();

  attach(viewport: RxVirtualScrollViewport, viewRepeater: RxVirtualViewRepeater<any>): void {
    this.viewport = viewport;
    viewRepeater.values$
      .pipe(
        map((values) => (Array.isArray(values) ? values.length : 0)),
        takeUntil(this.detached$),
      )
      .subscribe((length) => this._contentSize$.next(length * ITEM_SIZE));

    viewport.elementScrolled$.pipe(takeUntil(this.detached$)).subscribe(() => {
      const scrollTop = viewport.getScrollTop();
      const start = Math.floor(scrollTop / ITEM_SIZE);
      this._scrolledIndex$.next(start);
      this._renderedRange$.next({ start, end: start + 20 }); // + a fixed runway
    });
  }

  detach(): void {
    this.detached$.next();
    this.viewport = null;
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    this.viewport?.scrollTo(index * ITEM_SIZE, behavior);
  }
}
```

This example leaves out positioning the rendered views (done via `viewRenderCallback`
and CSS `transform`s, see the `_setViewPosition` helper) and runway/overscan handling
for brevity. For a complete, production-ready reference, read the source of the
simplest shipped strategy:
[`FixedSizeVirtualScrollStrategy`](https://github.com/rx-angular/rx-angular/blob/main/libs/template/virtual-scrolling/src/lib/scroll-strategies/fixed-size-virtual-scroll-strategy.ts).

## See also

- Reference: [`RxVirtualFor`](./rx-virtual-for.md)
- Reference: [`RxVirtualScrollViewport`](./rx-virtual-scroll-viewport.md)
- How-to: [Virtual scroll recipes](../how-to/virtual-scroll-recipes.md)
- Explanation: [How RxAngular virtual scrolling works](../../../concepts/E10-how-virtual-scrolling-works.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)

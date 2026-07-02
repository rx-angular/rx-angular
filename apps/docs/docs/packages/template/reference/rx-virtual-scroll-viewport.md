---
id: rx-virtual-scroll-viewport
title: "RxVirtualScrollViewportComponent"
diataxis_type: reference
package: template
legacy_guard: false
sidebar_label: "RxVirtualScrollViewport"
tags: [template, api-reference]
concepts: [E5]
---

# RxVirtualScrollViewportComponent

The viewport container that `*rxVirtualFor` operates inside. It implements the
`RxVirtualScrollViewport` interface, maintains the scroll runway height so the active
[scroll strategy](./rx-virtual-scroll-strategies.md) has room to position items, and
gathers and forwards scroll events to the consumer.

> **Why this matters:** see [How RxAngular virtual scrolling works](../how-virtual-scrolling-works.md).

## Import

```ts
import { RxVirtualScrollViewportComponent } from '@rx-angular/template/virtual-scrolling';
```

## Selector

- `rx-virtual-scroll-viewport`

A scroll strategy is applied through an attribute selector on this same element:
`[itemSize]` (fixed), `[dynamic]` (dynamic), or `[autosize]` (autosize). See
[Virtual scroll strategies](./rx-virtual-scroll-strategies.md).

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `initialScrollIndex` | `number` | `0` | The first view to be visible to the user. The viewport waits for data to arrive and scrolls to the given index immediately. |

> The `runwayItems`, `runwayItemsOpposite`, `appendOnly`, and `keepScrolledIndexOnPrepend`
> inputs are declared on the **scroll-strategy** directives, not on the viewport. See
> [Virtual scroll strategies](./rx-virtual-scroll-strategies.md).

## Outputs

| Output | Type | Description |
| --- | --- | --- |
| `viewRange` | `Observable<ListRange>` where `ListRange = { start: number; end: number }` | The range being rendered by `*rxVirtualFor`, determined by the active `RxVirtualScrollStrategy`. Updates *before* the `renderCallback`, so it is only in sync with the DOM once the next `renderCallback` has emitted. |
| `scrolledIndexChange` | `Observable<number>` | The index of the currently scrolled (topmost visible) item. |

## Related directives

Two attribute directives let you move the scrollable area off the viewport element:

| Directive | Selector | Purpose |
| --- | --- | --- |
| `RxVirtualScrollElementDirective` | `[rxVirtualScrollElement]` | Marks an outer element as the scroll container, so you can place content before and after the viewport. |
| `RxVirtualScrollWindowDirective` | `rx-virtual-scroll-viewport[scrollWindow]` | Uses the browser window as the scroll element (useful on mobile). |

## Minimal example

```ts
import { Component } from '@angular/core';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/virtual-scrolling';

@Component({
  imports: [RxVirtualFor, RxVirtualScrollViewportComponent, FixedSizeVirtualScrollStrategy],
  template: `
    <rx-virtual-scroll-viewport
      [itemSize]="50"
      [initialScrollIndex]="10"
      (viewRange)="range = $event"
      (scrolledIndexChange)="index = $event"
    >
      <div *rxVirtualFor="let item of items$">{{ item.name }}</div>
    </rx-virtual-scroll-viewport>
  `,
})
export class ListComponent {
  items$ = inject(DataService).getItems();
  range?: { start: number; end: number };
  index = 0;
}
```

## See also

- Reference: [`RxVirtualFor`](./rx-virtual-for.md)
- Reference: [Virtual scroll strategies](./rx-virtual-scroll-strategies.md)
- How-to: [Virtual scroll recipes](../how-to/virtual-scroll-recipes.md)
- Explanation: [How RxAngular virtual scrolling works](../how-virtual-scrolling-works.md)

---
id: rx-virtual-for
title: 'RxVirtualFor'
diataxis_type: reference
package: template
legacy_guard: false
sidebar_label: 'RxVirtualFor'
tags: [template, api-reference]
concepts: [E5]
---

# RxVirtualFor

`*rxVirtualFor` is a structural directive that renders only the items currently
visible in a [`RxVirtualScrollViewport`](./rx-virtual-scroll-viewport.md), instead
of rendering the whole iterable. It implements `RxVirtualViewRepeater` and schedules
the change detection of each child template through concurrent
[render strategies](../../../concepts/E5-concurrent-scheduling.md).

> **Why this matters:** see [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
> and [How RxAngular virtual scrolling works](../../../concepts/E10-how-virtual-scrolling-works.md).

## Import

```ts
import { RxVirtualFor } from '@rx-angular/template/virtual-scrolling';
```

## Selector

- `[rxVirtualFor][rxVirtualForOf]`

`RxVirtualFor` is `standalone: true` and provides itself as `RxVirtualViewRepeater`.
It must be placed inside a `<rx-virtual-scroll-viewport>` that has a
[scroll strategy](./rx-virtual-scroll-strategies.md) applied.

## Type parameters

```ts
class RxVirtualFor<T, U extends NgIterable<T> = NgIterable<T>>
```

## Inputs

The microsyntax input `rxVirtualForOf` accepts an `Observable`, a `Signal`, or a
static (unwrapped) value.

| Input               | Microsyntax alias   | Type                                                             | Default                                  | Description                                                                                                                                                                                                                                                                               |
| ------------------- | ------------------- | ---------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rxVirtualForOf`    | `of` / `in`         | `Observable<U> \| Signal<U> \| U \| null \| undefined`           | —                                        | The iterable to render. A `Signal` or plain array is treated as a static value.                                                                                                                                                                                                           |
| `trackBy`           | `trackBy`           | `keyof T \| ((index: number, item: T) => unknown)`               | —                                        | Identity for items. Accepts a property name shorthand (`trackBy: 'id'`) or a `TrackByFunction`.                                                                                                                                                                                           |
| `strategy`          | `strategy`          | `RxStrategyNames<string> \| Observable<RxStrategyNames<string>>` | `'normal'`                               | The render strategy used to schedule change detection. See [tuning rendering with strategies](../how-to/tune-rendering-with-strategies.md).                                                                                                                                               |
| `renderCallback`    | `renderCallback`    | `Subject<U>`                                                     | —                                        | Emits the currently rendered set of items whenever the directive finishes rendering a change set.                                                                                                                                                                                         |
| `templateCacheSize` | `templateCacheSize` | `number`                                                         | `20`                                     | Number of views held in cache for re-use while scrolling. `0` disables caching (views are destroyed and re-created on scroll).                                                                                                                                                            |
| `parent`            | `parent`            | `boolean`                                                        | `false`                                  | When `true`, runs change detection on the host component after rendering so `@ContentChild`/`@ViewChild` queries stay in sync. **Deprecated**: no longer required with signal-based view/content queries. See [handling view and content queries](../legacy/view-and-content-queries.md). |
| `patchZone`         | `patchZone`         | `boolean`                                                        | `true` (from `RxRenderStrategiesConfig`) | When `false`, the directive creates its `EmbeddedView`s outside `NgZone`.                                                                                                                                                                                                                 |

:::note Deprecated input

`parent` (microsyntax `rxVirtualForParent`) is `@deprecated` in the source: "this flag
will be dropped soon, as it is no longer required when using signal based view &
content queries." Its default is `false`.

:::

## Context variables

Each rendered template exposes the following context variables.

### Static context variables (mirrored from `ngFor`)

| Variable    | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| `$implicit` | `T`       | The item, accessed by `let item`. |
| `index`     | `number`  | Current index of the item.        |
| `count`     | `number`  | Count of all items in the list.   |
| `first`     | `boolean` | `true` if the item is first.      |
| `last`      | `boolean` | `true` if the item is last.       |
| `even`      | `boolean` | `true` if `index % 2 === 0`.      |
| `odd`       | `boolean` | The opposite of `even`.           |

### Reactive context variables

| Variable | Type                                     | Description                                                                                                                                   |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `item$`  | `Observable<T>`                          | The same value as `$implicit`, as an `Observable`.                                                                                            |
| `index$` | `Observable<number>`                     | `index` as an `Observable`.                                                                                                                   |
| `count$` | `Observable<number>`                     | `count` as an `Observable`.                                                                                                                   |
| `first$` | `Observable<boolean>`                    | `first` as an `Observable`.                                                                                                                   |
| `last$`  | `Observable<boolean>`                    | `last` as an `Observable`.                                                                                                                    |
| `even$`  | `Observable<boolean>`                    | `even` as an `Observable`.                                                                                                                    |
| `odd$`   | `Observable<boolean>`                    | `odd` as an `Observable`.                                                                                                                     |
| `select` | `(keys: (keyof T)[]) => Observable<any>` | Returns a selection function that plucks the given properties from the current item and emits them as a distinct `Observable` key-value pair. |

## Configuration

Provide `RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS` to pre-configure package-wide defaults for
the virtual-scrolling directives.

```ts
import { RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS } from '@rx-angular/template/virtual-scrolling';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
      useValue: {
        // of type `RxVirtualScrollDefaultOptions`
        runwayItems: 50,
        templateCacheSize: 0, // turn off cache by default
      },
    },
  ],
});
```

### `RxVirtualScrollDefaultOptions`

```ts
interface RxVirtualScrollDefaultOptions {
  /** how many templates can be cached and re-used on rendering — defaults to 20 */
  templateCacheSize?: number;
  /** how many views are rendered upfront in scroll direction — defaults to 10 */
  runwayItems?: number;
  /** how many views are rendered upfront in the opposite scroll direction — defaults to 2 */
  runwayItemsOpposite?: number;
  /** default item size used by the scroll strategies; also the tombstone size for the autosized strategy */
  itemSize?: number;
}
```

### Default values

When no `RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS` are provided, the directives fall back to
these built-in defaults: `templateCacheSize` is `20`, `itemSize` is `50`, `runwayItems`
is `10`, and `runwayItemsOpposite` is `2`. These values are internal to the package and
are not exported as importable symbols; override them through
`RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS` or the corresponding directive inputs.

## Minimal example

```ts
import { Component, Signal } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, RxVirtualScrollViewportComponent, RxVirtualFor } from '@rx-angular/template/virtual-scrolling';

@Component({
  imports: [RxVirtualFor, RxVirtualScrollViewportComponent, FixedSizeVirtualScrollStrategy],
  template: `
    <rx-virtual-scroll-viewport [itemSize]="50">
      <div *rxVirtualFor="let movie of movies()">
        <strong>{{ movie.name }}</strong>
      </div>
    </rx-virtual-scroll-viewport>
  `,
})
export class ListComponent {
  movies: Signal<Movie[]> = inject(MovieService).fetchMovies();
}
```

> `*rxVirtualFor` ships the non-star structural syntax; the `*` is the standard
> Angular structural-directive shorthand and stays valid.

## See also

- Reference: [`RxVirtualScrollViewport`](./rx-virtual-scroll-viewport.md)
- Reference: [Virtual scroll strategies](./rx-virtual-scroll-strategies.md)
- How-to: [Virtual scroll recipes](../how-to/virtual-scroll-recipes.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
- Explanation: [How RxAngular virtual scrolling works](../../../concepts/E10-how-virtual-scrolling-works.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)

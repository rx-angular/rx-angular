---
id: rx-for
title: 'RxFor'
diataxis_type: reference
package: template
legacy_guard: false
sidebar_label: 'RxFor'
sidebar_position: 1
tags: [template, api-reference]
concepts: [E1, E5]
---

# RxFor

`RxFor` renders a list **concurrently**: each item template is a single renderable
unit that is prioritized, frame-budgeted, and scheduled through the CDK render
strategies, so a large or expensive list renders **without blocking** the UI thread.
Rendering is cancelable, and a `renderCallback` reports exactly when a set of changes
has hit the DOM.

Native `@for` is synchronous: it has no equivalent for non-blocking, cancelable,
scheduled list rendering ([angular#43168](https://github.com/angular/angular/issues/43168)).
Reach for `RxFor` when a list is large enough that synchronous rendering janks, when
you need a render hook, or when you want per-directive render scheduling. For small
static lists, native `@for` is the simpler choice.

- Why scheduling matters: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- Why change detection over-renders: [Understanding change detection in Angular](../../../concepts/E1-change-detection.md)

**Import**

```typescript
import { RxFor } from '@rx-angular/template/for';
```

**Selector:** `[rxFor][rxForOf]`

## Usage

`rxFor` accepts an `ObservableInput`, a `Signal`, or a static value. You don't need
to unwrap a signal; pass its reference and `rxFor` reads it for you.

```html title="src/list.component.html"
<div class="movie-list">
  <movie *rxFor="let movie of movies" [movie]="movie" />
</div>
```

```typescript title="src/list.component.ts"
import { Component, inject, Signal } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';

@Component({
  templateUrl: './list.component.html',
  imports: [RxFor],
})
export class ListComponent {
  private readonly movieService = inject(MovieService);
  // an Observable, a Signal, or a static array all work
  movies: Signal<Movie[]> = this.movieService.fetchMovies();
}
```

### `trackBy` shortcut

Pass a `TrackByFunction`, or name a property of the item type as a string shorthand.

```html
<!-- string shorthand -->
<movie *rxFor="let movie of movies$; trackBy: 'id'" [movie]="movie" />

<!-- TrackByFunction -->
<movie *rxFor="let movie of movies$; trackBy: trackMovie" [movie]="movie" />
```

```typescript
trackMovie(index: number, movie: Movie) {
  return movie.id;
}
```

### Context variables

```html
<ul>
  <li
    *rxFor="
      let item of items$;
      trackBy: 'id';
      let count = count;
      let index = index;
      let first = first;
    "
  >
    {{ index }} / {{ count }}: {{ item.name }}
  </li>
</ul>
```

> **Tune how it renders:** the `strategy`, `renderCallback`, `parent`, and
> `patchZone` inputs are documented together in
> [How to tune rendering with strategies](../how-to/tune-rendering-with-strategies.md).
> To keep tests deterministic, see
> [How to test scheduled rendering](../how-to/test-scheduled-rendering.md).

## Inputs

| Input                 | Type                                                                     | Default    | Description                                                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rxForOf`             | `ObservableInput<U> \| Signal<U> \| U` (`U extends NgIterable<T>`)        | —          | The iterable to render. Accepts an `Observable`/`Promise`, a `Signal`, or a static value.                                                                              |
| `trackBy`             | `keyof T \| ((index: number, item: T) => unknown)`                        | —          | Item identity. Provide a `TrackByFunction`, or name a property as a string shorthand.                                                                                  |
| `strategy`            | `Observable<RxStrategyNames<string>> \| RxStrategyNames<string>`          | `normal`   | The render strategy used to schedule change detection. See [tune rendering with strategies](../how-to/tune-rendering-with-strategies.md).                              |
| `renderCallback`      | `Subject<U>`                                                             | —          | A `Subject` that emits the rendered item set whenever `rxFor` finishes creating, updating, or removing templates. Useful for post-render DOM work.                     |
| `patchZone`           | `boolean`                                                                | `true`     | If `false`, `RxFor` operates outside `NgZone`. Inert under zoneless change detection. See [tune rendering with strategies](../how-to/tune-rendering-with-strategies.md). |
| `parent` (deprecated) | `boolean`                                                                | `false`    | If `true`, `RxFor` informs its host component about template changes so `@ViewChild`/`@ContentChild` queries resolve. **Deprecated**: not needed with signal-based view/content queries. |

> **`parent` default is `false`.** It is sourced from the render-strategies config
> (`parent: false`). The flag is deprecated and will be removed; with signal-based
> view and content queries you should leave it `false`. See
> [How to tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
> for when a legacy query still needs `parent: true`.

## Context variables

Available on every item template:

**Static context variables** (mirrored from `NgFor`)

| Variable    | Type      | Description                                          |
| ----------- | --------- | --------------------------------------------------- |
| `$implicit` | `T`       | The item value, accessed by `let val`.              |
| `index`     | `number`  | Current index of the item.                          |
| `count`     | `number`  | Number of items in the list.                        |
| `first`     | `boolean` | `true` if the item is first.                        |
| `last`      | `boolean` | `true` if the item is last.                         |
| `even`      | `boolean` | `true` if `index % 2 === 0`.                        |
| `odd`       | `boolean` | The opposite of `even`.                             |

**Reactive context variables**

| Variable | Type                                                            | Description                                                                                                              |
| -------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `item$`  | `Observable<T>`                                                 | The item value as an `Observable`.                                                                                     |
| `index$` | `Observable<number>`                                            | `index` as an `Observable`.                                                                                            |
| `count$` | `Observable<number>`                                            | `count` as an `Observable`.                                                                                            |
| `first$` | `Observable<boolean>`                                           | `first` as an `Observable`.                                                                                            |
| `last$`  | `Observable<boolean>`                                           | `last` as an `Observable`.                                                                                             |
| `even$`  | `Observable<boolean>`                                           | `even` as an `Observable`.                                                                                             |
| `odd$`   | `Observable<boolean>`                                           | `odd` as an `Observable`.                                                                                              |
| `select` | `(keys: (keyof T)[]) => Observable<any>` | Returns a selection function for a subset of item properties as a distinct `Observable`, used for nested `rxFor`.    |

## Features

**DX**

- Reduces `async`-pipe boilerplate and handles `null`/`undefined` uniformly.
- Works with static values, `Observable`s, and `Signal`s.
- Supports immutable and mutable data via `trackBy`.
- Provides a full set of static and reactive context variables.

**Performance**

- Non-blocking, lazy template creation via render strategies.
- Configurable frame budget (defaults to 60 FPS).
- Triggers change detection at the `EmbeddedView` level.
- Distinct-in-a-row values avoid over-rendering.
- Cancels scheduled work when an item is removed or superseded.
- Nested lists re-render only what changed.

## Reconciliation

By default `rxFor` uses Angular's `IterableDiffer` to compute list operations. You
can opt in to the reconciliation algorithm shipped with the native `@for` control
flow, which diffs move/swap operations with fewer operations and less memory. Under
concurrent mode it works by detaching and attaching views (rather than moving DOM),
so a full shuffle can briefly show views detached before re-attach.

```typescript
import { provideExperimentalRxForReconciliation } from '@rx-angular/template/for';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalRxForReconciliation()],
};
```

To opt out again at some level of the injector tree, use
`provideLegacyRxForReconciliation()`.

## Resources

- Feature demos: [demos app](https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/template/rx-for)
- Real application: [angular-movies](https://github.com/tastejs/angular-movies)
- Design notes: [how we approached `rxFor` (#304)](https://github.com/rx-angular/rx-angular/issues/304)

## See also

- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- Concept: [Understanding change detection in Angular](../../../concepts/E1-change-detection.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
- How-to: [Test scheduled rendering](../how-to/test-scheduled-rendering.md)

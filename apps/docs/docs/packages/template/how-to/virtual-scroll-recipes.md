---
id: virtual-scroll-recipes
title: "How to build virtual scroll lists with rxVirtualFor"
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: "Virtual scroll recipes"
tags: [template, guides]
concepts: [E5]
---

# How to build virtual scroll lists with `rxVirtualFor`

**Goal.** Practical recipes for `@rx-angular/template/virtual-scrolling`: basic setup,
persisting rendered views (`appendOnly`), `trackBy`, custom and window scroll elements,
reverse infinite scroll, and extending the package. For the full API, see the
[`RxVirtualFor`](../reference/rx-virtual-for.md),
[viewport](../reference/rx-virtual-scroll-viewport.md), and
[strategy](../reference/rx-virtual-scroll-strategies.md) references.

## Setup

Three parts must be imported and glued together:

- the **viewport**: `RxVirtualScrollViewportComponent`
- the **view repeater**: `RxVirtualFor`
- a **scroll strategy**: e.g. `FixedSizeVirtualScrollStrategy`

```ts
import {
  FixedSizeVirtualScrollStrategy, // choose any strategy you like
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
} from '@rx-angular/template/virtual-scrolling';

@Component({
  imports: [RxVirtualFor, RxVirtualScrollViewportComponent, FixedSizeVirtualScrollStrategy],
})
export class MyComponent {}
```

## Render a fixed-size list

The `rxVirtualForOf` input accepts an `Observable`, a `Signal`, or a static array.
Size the items in CSS to match the strategy's `itemSize`.

```html
<rx-virtual-scroll-viewport [itemSize]="50">
  <div class="hero" *rxVirtualFor="let hero of heroes$">
    <strong>{{ hero.name }}</strong>
    <div>{{ hero.description }}</div>
  </div>
</rx-virtual-scroll-viewport>
```

```scss
.hero {
  height: 50px; // items must be sized to match itemSize
}
```

```ts
@Component({ /* … */ })
export class AnyComponent {
  heroes$: Observable<Hero[]> = getHeroes();
  // a Signal or a plain array works too:
  heroesSignal: Signal<Hero[]> = getHeroesSignal();
}
```

## Keep rendered views with `appendOnly`

`appendOnly` keeps views in the DOM after they scroll out of view instead of recycling
them. Useful when integrating with `@angular/cdk/drag-drop`. It reacts to changes, so
it can be toggled at runtime.

```html
<rx-virtual-scroll-viewport [itemSize]="50" appendOnly>
  <div class="hero" *rxVirtualFor="let hero of heroes; trackBy: 'id'">
    <strong>{{ hero.name }}</strong>
  </div>
</rx-virtual-scroll-viewport>
```

## Reduce boilerplate with `trackBy`

`trackBy` accepts either a `keyof T` shorthand or a regular
`TrackByFunction` (`(index: number, item: T) => any`).

```html
<rx-virtual-scroll-viewport [itemSize]="50">
  <div class="hero" *rxVirtualFor="let hero of heroes; trackBy: 'id'">
    <strong>{{ hero.name }}</strong>
  </div>
</rx-virtual-scroll-viewport>
```

## Use a custom scroll element

Apply `rxVirtualScrollElement` to an outer element to make it the scroll container, so
you can place content before and after the viewport.

```html
<div rxVirtualScrollElement>
  <div>Any content you like before</div>
  <rx-virtual-scroll-viewport [itemSize]="50">
    <div *rxVirtualFor="let item of items$">{{ item }}</div>
  </rx-virtual-scroll-viewport>
  <div>Any content you like after</div>
</div>
```

The bundled strategies detect when they are fully hidden from the viewport (accounting
for the size of content before and after) and render the minimum of `runwayItems` /
`runwayItemsOpposite`.

## Scroll with the window

Add the `scrollWindow` directive to use the browser window as the scroll element,
especially useful for mobile.

```html
<rx-virtual-scroll-viewport [itemSize]="50" scrollWindow>
  <div *rxVirtualFor="let item of items$">{{ item }}</div>
</rx-virtual-scroll-viewport>
```

## Reverse infinite scroll (`keepScrolledIndexOnPrepend`)

A reversed infinite scroller starts at the bottom and *prepends* data when the user
hits the top (as in a chat window). Set `keepScrolledIndexOnPrepend` so the strategy
keeps the scrolled index stable as new data arrives.

```ts title="reverse-infinite-list.component.ts"
import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import {
  AutoSizeVirtualScrollStrategy,
  ListRange,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';

@Component({
  imports: [RxVirtualScrollViewportComponent, RxVirtualFor, AutoSizeVirtualScrollStrategy],
})
export class ReverseInfiniteListComponent {
  private dataService = inject(MessageService);

  initialScrollIndex = 19;
  listRange: ListRange = { start: 0, end: 0 };
  scrolled$ = new Subject<number>();
  viewsRendered$ = new Subject<Message[]>();

  messages$ = this.scrolled$.pipe(
    filter(() => this.listRange.start === 0), // only fetch at the start
    startWith(0),
    exhaustMap((_, index) => this.dataService.getMessages(index)),
    scan((messages, newMessages) => [...newMessages, ...messages], []),
  );

  trackMessage = (index: number, message: Message) => message.id;
}
```

```html title="reverse-infinite-list.component.html"
<rx-virtual-scroll-viewport
  autosize
  keepScrolledIndexOnPrepend
  [initialScrollIndex]="initialScrollIndex"
  (viewRange)="listRange = $event"
  (scrolledIndexChange)="scrolled$.next($event)"
>
  <div
    *rxVirtualFor="
      let item of messages$;
      trackBy: trackMessage;
      renderCallback: viewsRendered$
    "
  >
    <div>{{ item.message.text }}</div>
    <div>{{ item.sendAt | date }}</div>
  </div>
</rx-virtual-scroll-viewport>
```

## Extend the package with a custom strategy

Because every part of the package is based on injection tokens, you can provide your own
`RxVirtualScrollStrategy`. Create a directive that provides itself as the strategy token
and extends the abstract base.

```ts
import { Directive } from '@angular/core';
import { RxVirtualScrollStrategy } from '@rx-angular/template/virtual-scrolling';

@Directive({
  selector: 'rx-virtual-scroll-viewport[custom]',
  providers: [{ provide: RxVirtualScrollStrategy, useExisting: CustomScrollStrategy }],
})
export class CustomScrollStrategy extends RxVirtualScrollStrategy {}
```

## Result

You have a viewport that renders only the visible slice of a large iterable, scheduled
without blocking the UI thread. Use the `viewRange` and `scrolledIndexChange` outputs to
react to what is on screen.

## See also

- Reference: [`RxVirtualFor`](../reference/rx-virtual-for.md)
- Reference: [`RxVirtualScrollViewport`](../reference/rx-virtual-scroll-viewport.md)
- Reference: [Virtual scroll strategies](../reference/rx-virtual-scroll-strategies.md)
- How-to: [Tune rendering with strategies](./tune-rendering-with-strategies.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)

---
id: tune-rendering-with-strategies
title: 'How to tune rendering with strategies'
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: 'Tune rendering with strategies'
tags: [template, guides]
concepts: [E5]
---

# How to tune rendering with strategies

**Goal.** Control _how_ the reactive `@rx-angular/template` directives (`*rxFor`,
`*rxIf`, `*rxLet`, and `*rxVirtualFor`) schedule their rendering work, so a large
or expensive template updates without blocking the UI thread. Every one of these
directives shares the same four rendering knobs: the `strategy` input, the
`renderCallback` hook, the `parent` flag, and the `patchZone` flag. This recipe
covers all four in one place.

If you only need a plain value binding or a plain toggle, native `@let`, `@if`,
and `@for` already cover that. Reach for these knobs when you want the directives'
**concurrent, frame-budgeted scheduling**, the reason to use them over the native
control flow. For the mental model behind that scheduling, see
[Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).

## Pick a render strategy (`strategy`)

The `strategy` input selects the `RenderStrategy` used to schedule the directive's
change detection. It accepts a `RxStrategyNames` string **or** an
`Observable<RxStrategyNames>`, so you can switch strategies at runtime.

The available strategy names are:

| Kind           | Names                                                | Behavior                                                                                                                                                                                |
| -------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Native**     | `native`, `local`, `noop`                            | `native` schedules via `markForCheck`; `local` renders the local view (via `requestAnimationFrame`); `noop` is an identity pass-through that does no scheduling.                        |
| **Concurrent** | `immediate`, `userBlocking`, `normal`, `low`, `idle` | Frame-budgeted, cancelable scheduling ordered by priority: `immediate` is the most urgent, `idle` the least. See [concurrent strategies](../../cdk/reference/concurrent-strategies.md). |

The default for every template directive is **`normal`** (a concurrent strategy).

```html
<!-- a static strategy -->
<ng-container *rxFor="let item of items$; strategy: 'userBlocking'"> {{ item }} </ng-container>

<!-- a reactive strategy, switched at runtime -->
<ng-container *rxFor="let item of items$; strategy: strategy$"> {{ item }} </ng-container>
```

```ts
@Component({
  /* … */
})
export class AppComponent {
  strategy$ = of('immediate');
}
```

The same `strategy` input works identically on `*rxIf`, `*rxLet`, and
`*rxVirtualFor`:

```html
<ng-container *rxIf="showHero$; strategy: 'userBlocking'">
  <app-hero />
</ng-container>

<ng-container *rxLet="item$; let item; strategy: strategy$"> {{ item }} </ng-container>

<rx-virtual-scroll-viewport [itemSize]="50">
  <div *rxVirtualFor="let item of items$; strategy: strategy$">{{ item }}</div>
</rx-virtual-scroll-viewport>
```

To change the **default** strategy for the whole application, provide a custom
config (see the `parent` section below for the same provider):

```ts
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';

bootstrapApplication(AppComponent, {
  providers: [provideRxRenderStrategies({ primaryStrategy: 'low' })],
});
```

## React to finished renders (`renderCallback`)

The `renderCallback` is a hook into the change-detection system: a `Subject` that
emits whenever the directive finishes rendering a set of changes to the view. Use
it when you depend on the resulting DOM: measuring an element's height after a
list renders, adjusting scroll position, hiding a skeleton, or reporting a timing
metric.

The emitted value is the currently rendered value (for `*rxFor`/`*rxVirtualFor`,
the rendered set of items; for `*rxIf`/`*rxLet`, the value that caused the update).

```ts
@Component({
  selector: 'app-root',
  template: `
    <app-list-item *rxFor="let item of items$; trackBy: trackItem; renderCallback: itemsRendered">
      <div>{{ item.name }}</div>
    </app-list-item>
  `,
})
export class AppComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  items$: Observable<Item[]> = inject(ItemService).getItems();
  trackItem = (idx: number, item: Item) => item.id;

  // emits whenever rxFor finishes rendering changes
  itemsRendered = new Subject<Item[]>();

  constructor() {
    this.itemsRendered.subscribe(() => {
      // items are rendered — the DOM is ready, we can scroll now
      this.elementRef.nativeElement.scrollTo({ top: 0 });
    });
  }
}
```

The same `renderCallback` input is available on `*rxIf`, `*rxLet`, and
`*rxVirtualFor`.

## Keep view/content queries in sync (`parent`)

:::warning Deprecation warning

The `parent` flag is **deprecated** and will be removed in a future version. It is
no longer needed if you use
[signal-based view & content queries](https://angular.dev/guide/signals/queries)
(`viewChild()` / `contentChild()`). If you have already migrated to signal queries,
prefer leaving `parent` at its default of `false`: it reduces change-detection
cycles and improves runtime performance.

:::

Because these directives can render **asynchronously**, a parent component's view
or content queries (`@ViewChild`, `@ViewChildren`, `@ContentChild`,
`@ContentChildren`) may not update when a template is inserted or removed. The
`parent` flag makes the directive additionally trigger change detection on the
parent so those queries stay in sync.

**The default value of `parent` is `false`.** (`*rxVirtualFor` also defaults it to
`false`.) With `parent: false`, a component that relies on a legacy decorator-based
view/content query of the rendered children will not see updates. If you still use
those legacy queries and need them to update under a `local` or concurrent
strategy, set `parent: true` for that binding:

```ts
@Component({
  selector: 'app-list',
  template: ` <div *rxIf="show$; parent: true"></div> `,
})
export class AppListComponent {}
```

You can also flip the default globally through `RxRenderStrategiesConfig`:

```ts
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';

bootstrapApplication(AppComponent, {
  providers: [provideRxRenderStrategies({ parent: false })],
});
```

The recommended modern path is to migrate to signal queries and leave `parent` at
`false`. The legacy-decorator details live on the template package's
_view-and-content-queries_ legacy page.

## Run event listeners outside NgZone (`patchZone`)

:::note Zoneful-only nuance

`patchZone` only affects applications that still run **Zone.js**. Under zoneless
change detection (the default since Angular v21), Zone.js is not in the bundle and
`patchZone` has no effect. See
[Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
for the full picture.

:::

`patchZone` controls whether the directive creates its `EmbeddedViews` inside
`NgZone`. The default value is **`true`**: views are created inside `NgZone`, so
event listeners bound in those templates run inside Angular's zone as usual.

In a zoneful app, high-frequency DOM events (`mousemove`, `drag`, `scroll`) fired
from inside the rendered template can trigger a change-detection cycle on every
event and hurt performance. Setting `patchZone: false` creates the views outside
`NgZone`, so those event listeners run outside the zone and do not schedule change
detection:

```ts
@Component({
  selector: 'app-root',
  template: ` <div *rxFor="let bgColor of bgColor$; patchZone: false" (mousemove)="calcBgColor($event)" [style.background]="bgColor"></div> `,
})
export class AppComponent {
  // because this template has `patchZone: false`, the listener runs outside the zone
  calcBgColor(moveEvent: MouseEvent) {
    // update the background from the mouse position without triggering CD
  }
}
```

The same `patchZone` input is available on `*rxIf`, `*rxLet`, and
`*rxVirtualFor`. You can also set the default via
`provideRxRenderStrategies({ patchZone: false })`. Because this knob is inert
without Zone.js, treat it as a legacy tuning option; for new, zoneless apps you do
not need it.

## Result

Your reactive template directive now renders on the strategy you chose, notifies
you when a render completes, keeps any legacy parent queries in sync when required,
and (in a zoneful app) runs high-frequency listeners outside the zone. Verify by
watching for `renderCallback` emissions and confirming the UI stays responsive
while a large list or expensive template updates.

## See also

- Reference: the per-directive `rxFor`, `rxIf`, `rxLet`, and `rxVirtualFor` pages under `packages/template/reference/` (each documents its full input list, including `strategy`, `renderCallback`, `parent`, and `patchZone`).
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- Concept (legacy context): [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)

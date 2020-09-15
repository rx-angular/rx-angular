# RenderStrategies

The `RenderStrategies` can be seen as the _core_ of the performance optimization layer. They utilize all
[`Concepts`](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/concepts.md) explained above in order to provide a streamlined and focused API to master
angular rendering and `ChangeDetection`.

## Usage

Use the corresponding `RenderStrategy#name` as parameter or Input with the `PushPipe` or `LetDirective`.
By default, they will use the [Local Strategy](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/viewport-prio.md).

```html
<div *rxLet="list$; let list; strategy: 'global'"></div>
<hero-list heroes="list$ | push: 'global'"></hero-list>
```

When you want to handle `ChangeDetection` manually inside a `Component`, `Directive` or `Service`, you can
simply use the built-in `StrategySelection`.

_imperative approach_

```typescript
import { Component, ChangeDetectorRef } from '@angular/core';
import { getStrategies } from '@rx-angular/template';

@Component()
export class PerformanceAwareComponent {
  constructor(private cdRef: ChangeDetectorRef) {
    const strategies = getStrategies({ cdRef });
    // now select your desired strategy:
    const detachStrategy = strategies.detach;
    // schedule a re-render:
    detachStrategy.scheduleCD();
    // render synchronously:
    detachStrategy.renderMethod();
  }
}
```

## Built-in Strategies

![Template - RenderStrategies](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/images/template_rendering-strategies.png)

| Name     | Zone Agnostic | Render Method     | Coalescing         | Scheduling              |
| -------- | ------------- | ----------------- | ------------------ | ----------------------- |
| `local`  | ✔             | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |
| `global` | ✔             | ⮁ `ɵmarkDirty`    | ✔ RootContext      | `requestAnimationFrame` |
| `detach` | ✔             | ⭭ `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |
| `noop`   | ✔             | - `noop`          | ❌                 | ❌                      |
| `native` | ❌            | ⮁ `markForCheck`  | ✔ RootContext      | `requestAnimationFrame` |

### Local Strategy

This strategy is rendering the actual component and
all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges has no coalescing of render calls
like [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) or [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) have, we apply our own coalescing, 'scoped' on
component level.

Coalescing, in this very manner, means *collecting all events* in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render. Then execute re-rendering only *once*.

'Scoped' coalescing, in addition, means *grouping the collected events* by a specific context.
E. g. the *component* from which the re-rendering was initiated.

This context could be the Component instance or a ViewContextRef,
both accessed over the context over `ChangeDetectorRef#context`.

| Name    | Zone Agnostic | Render Method     | Coalescing         | Scheduling              |
| ------- | ------------- | ----------------- | ------------------ | ----------------------- |
| `local` | ✔             | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |

### Global Strategy

This strategy leverages Angular's internal [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) render method.
It acts identical to [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) but works also zone-less.
`markDirty` in comparison to `markForCheck` also calls [`scheduleTick`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1863) which is the reason why it also works in zone-less environments.

| Name     | Zone Agnostic | Render Method  | Coalescing      | Scheduling                                                                                                                                            |
| -------- | ------------- | -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global` | ✔             | ⮁ `ɵmarkDirty` | ✔ `RootContext` | [`animationFrame`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/util/misc_utils.ts#L39) |

### Detach Strategy

In terms of rendering, this strategy behaves the same as the local strategy.
Using this strategy will [`detach`](https://angular.io/api/core/ChangeDetectorRef#detach) the affected view from
Angulars change-detection tree.
In order to render changes properly, it re-attaches the view to the change detection tree before any rendering happens,
and detaches it again after changes got rendered.

Additional information about `detached` views:

* If a view is detached, its input bindings will still receive values
* Also any related code will get executed properly as well as using Angulars internal APIs such as `ViewChild`
* Detached views are not getting checked when their parent components call `detectChanges`
* `HostBindings` like `[class]` `@animation` ... are not getting updated properly, when the parent component does not detect a new change

| Name     | Zone Agnostic | Render Method     | Coalescing         | Scheduling              |
| -------- | ------------- | ----------------- | ------------------ | ----------------------- |
| `detach` | ✔             | ⭭ `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |

### Noop

The no-operation strategy does nothing.
It can be a useful tool for performance improvements as well as debugging
The [`[viewport-prio]`](https://github.com/rx-angular/rx-angular/blob/ef99804c1b07aeb96763cacca6afad7bbdab03b1/libs/template/src/lib/experimental/viewport-prio/viewport-prio.directive.ts) directive use it to limit renderings to only visible components:

| Name   | Zone Agnostic | Render Method | Coalescing | Scheduling |
| ------ | ------------- | ------------- | ---------- | ---------- |
| `noop` | ✔             | - `noop`      | ❌         | ❌         |

### Native

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) is called.
Angular still needs zone.js to trigger the [`ApplicationRef#tick`](https://github.com/angular/angular/blob/7d8dce11c0726cdba999fc59a83295d19e5e92e6/packages/core/src/application_ref.ts#L719) to re-render,
as the internally called function [`markViewDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1837) is only responsible for dirty marking and not rendering.

| Name     | Zone Agnostic | Render Method    | Coalescing    | Scheduling              |
| -------- | ------------- | ---------------- | ------------- | ----------------------- |
| `native` | ❌            | ⮁ `markForCheck` | ✔ RootContext | `requestAnimationFrame` |

## Custom Strategies

_coming soon_

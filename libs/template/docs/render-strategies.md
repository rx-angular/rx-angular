![render-strategy-comparison](https://user-images.githubusercontent.com/10064416/115313426-88996f80-a173-11eb-9a3c-807256800ab9.gif)
## Render Strategies

### Motivation 
Why are they here?
What are they doing?


### Setup 

What to install?

```typescript


``` 

Where to put stuff?

```typescript


``` 

The `RenderStrategies` can be seen as the _core_ of the performance optimization layer. They utilize all
[`Concepts`](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/concepts.md) explained above in order to provide a streamlined and focused API to master
angular rendering and `ChangeDetection`.

### Usage

Use the corresponding `RenderStrategy#name` as parameter or Input with the `PushPipe` or `LetDirective`.
By default, they will use the [Local Strategy](https://github.com/rx-angular/rx-angular/tree/master/libs/template/docs/render-strategies.md#local-strategy).

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
    const localStrategy = strategies.local;
    // schedule a re-render:
    localStrategy.scheduleCD();
    // render synchronously:
    localStrategy.renderMethod();
  }
}
```

### Built-in1 Strategies

![Template - RenderStrategies](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/docs/images/template_rendering-strategies.png)

| Name     | Zone Agnostic | Render Method     | Coalescing         | Scheduling              |
| -------- | ------------- | ----------------- | ------------------ | ----------------------- |
| `local`  | ✔             | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |
| `global` | ✔             | ⮁ `ɵmarkDirty`    | ✔ RootContext      | `requestAnimationFrame` |
| `noop`   | ✔             | - `noop`          | ❌                 | ❌                      |
| `native` | ❌            | ⮁ `markForCheck`  | ✔ RootContext      | `requestAnimationFrame` |

### Local Strategy

This strategy is rendering the actual component and
all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges has no coalescing of render calls
like [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) or [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) have, we apply our own coalescing, 'scoped' on
component level.

Coalescing, in this very manner, means _collecting all events_ in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render. Then execute re-rendering only _once_.

'Scoped' coalescing, in addition, means _grouping the collected events_ by a specific context.
E. g. the _component_ from which the re-rendering was initiated.

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

### Noop

The no-operation strategy does nothing. It can be a useful tool for performance improvements as well as debugging.

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



### Built-in2 Strategies

If your app provides user feedback within less then 16ms (less then 60 frames per second) it feels laggy to the user and leads to bad UX.

Based on the [RAIL model](https://web.dev/rail/), a user experiences motion as laggy if the frame rate is lower then 60 frames per second (~16ms per task).



From perspec UX => app should give feedback => 

if blocked => laggy 


#### Concepts
- Scheduling
 https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel

- Chunking
  - Threshhold => 60 FPS default
  - Render Deadline

- Priority
Input handlers (tap, click etc) often need to schedule a combination of different kinds of work:

kicking off some immediate work as microtasks eg. fetching from local cache
scheduling data fetches over the network
rendering in the current frame eg. to respond to user typing, toggle the like button, start an animation when clicking on a comment list etc.
rendering over the course of next new frames, as fetches complete and data becomes available to prepare and render results.


#### Priority:

|       Name       |   Priority   |    Render Method  |   Scheduling   | Render Deadline     |
| ---------------- | ------------ | ----------------- | -------------- | ------------------- |
| `"noPriority"`   | 0            | 🠗 `detectChanges` | `postMessage`  | ❌                 |
| `"immediate"`    | 2            | 🠗 `detectChanges` | `postMessage`  | 0ms                 |
| `"userBlocking"` | 3            | 🠗 `detectChanges` | `postMessage`  | 250ms               |
| `"normal"`       | 4            | 🠗 `detectChanges` | `postMessage`  | 5000ms              |
| `"low"`          | 5            | 🠗 `detectChanges` | `postMessage`  | 10000ms             |
| `"idle"`         | 6            | 🠗 `detectChanges` | `postMessage`  | `maxSigned31BitInt` |

![render-strategy-comparison](https://user-images.githubusercontent.com/10064416/115313442-8f27e700-a173-11eb-817d-9868180305d5.gif)

### Immediate

Urgent work that must happen immediately. This occurs right after current task and has the highes priority.


|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 0ms             |

**Usecase:**

A good example here would be a tool-tip.

Tooltips should be displayed immediately on mouse over. Any delay will be very noticeable.

```typescript
@Component({
  selector: 'immediate',
  template: `
   <button id="btn"
   (mouseenter)="showTooltip()"
   (mouseleave)="hideTooltip()">
      Button with Tooltip
   </button>
  `
})
export class RenderCallbackComponent {

  constructor(
    private strategyPrivider: StrategyPrivider
  ) {  
  }
  
  showTooltip() {
    this.StrategyProvider.schedule(() => {
      // create tooltip
    }, {strategy: 'immediate'});
  }
  
  hideTooltip() {
    this.StrategyProvider.schedule(() => {
      // destroy tooltip
    }, {strategy: 'immediate'});
  }
  
}
``` 

![]()

> Notice
> Be aware to avoid scheduling large or non-urgent work with immediate priority as it blocks rendering


### User Blocking

Urgent rendering work that must happen in the limited time within the current frame. This is typically work in requestAnimationFrame: i.e. rendering work for ongoing animations and dom manipulation that needs to render right away. Tasks posted at this priority can delay rendering of the current frame, and therefore should finish quickly (otherwise use "default" priority).


|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 250ms           |

**Usecase:**



```typescript
@Component({
  selector: 'userBlocking',
  template: `
   <div id="collapse"
   (mouseenter)="showTooltip()"
   (mouseleave)="hideTooltip()">
      Button with Tooltip
   </div>
  `
})
export class RenderCallbackComponent {

  constructor(
    private strategyPrivider: StrategyPrivider
  ) {  
  }
  
  showTooltip() {
    this.StrategyProvider.schedule(() => {
      // create tooltip
    }, {strategy: 'immediate'});
  }
  
  hideTooltip() {
    this.StrategyProvider.schedule(() => {
      // destroy tooltip
    }, {strategy: 'userBlocking'});
  }
  
}
``` 

![]()

### Normal

2. "default" priority (or render-normal?)
User visible work that is needed to prepare for the next frame (or future frames). Normal work that is important, but can take a while to finish. This is typically rendering that is needed in response to user interaction, but has dependency on network or I/O, and should be rendered over next couple frames - as the needed data becomes available. This work should not delay current frame rendering, but should execute immediately afterwards to pipeline and target the next frame.


Eg. user zooms into a map, fetching of the maps tiles OR atleast post-processing of fetch responses should be posted as "default" priority work to render over subsequent frames. Eg. user clicks a (long) comment list, it can take a while to fetch all the comments from the server; the fetches should be handled as "default" priority (and potentially start a spinner or animation, posted at "render-blocking" priority).

NOTE: while it may make sense to kick off fetches in input-handler, handling fetch responses in microtasks can be problematic, and could block user input & urgent rendering work.


|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 0ms             |

**Usecase:**



```typescript
@Component({
  selector: 'immediate',
  template: `
   <button id="btn"
   (mouseenter)="showTooltip()"
   (mouseleave)="hideTooltip()">
      Button with Tooltip
   </button>
  `
})
export class RenderCallbackComponent {

  constructor(
    private strategyPrivider: StrategyPrivider
  ) {  
  }
  
  showTooltip() {
    this.StrategyProvider.schedule(() => {
      // create tooltip
    }, {strategy: 'immediate'});
  }
  
  hideTooltip() {
    this.StrategyProvider.schedule(() => {
      // destroy tooltip
    }, {strategy: 'immediate'});
  }
  
}
``` 

![]()

> Notice
> This is essentially setTimeout(0) without clamping; see other workarounds used today




### low

Work that is typically not visible to the user or initiated by the user, and is not time critical. Eg. analytics, backups, syncs, indexing, etc.


|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 250ms           |

**Usecase:**



```typescript
@Component({
  selector: 'userBlocking',
  template: `
   <div id="collapse"
   (mouseenter)="showTooltip()"
   (mouseleave)="hideTooltip()">
      Button with Tooltip
   </div>
  `
})
export class RenderCallbackComponent {

  constructor(
    private strategyPrivider: StrategyPrivider
  ) {  
  }
  
  showTooltip() {
    this.StrategyProvider.schedule(() => {
      // create tooltip
    }, {strategy: 'immediate'});
  }
  
  hideTooltip() {
    this.StrategyProvider.schedule(() => {
      // destroy tooltip
    }, {strategy: 'userBlocking'});
  }
  
}
``` 

![]()


### Name

<!-- 
- Descriptoin of the strategies behavior
- Table
  - no `Zone Agnostic` column just mention it
  - Render Method
  - no Coalescing just mention it
  - Scheduling
  - Render deadline (chunked) => ms | false
  - 
- Usecase + Code snippet + Image
- 
-->

| Render Method | Scheduling | Render Deadline |
| ------------- | ---------- | --------------- |
|               |            |                 |


### Custom Strategies

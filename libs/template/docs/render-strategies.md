<!--
TODO:
- Explain config object
- Explain strategy provider
- Explain directives
- One example at the top
-->


## Render Strategies


|       Name       |   Priority   |    Render Method  |       Scheduling         |   Render Deadline   |
| ---------------- | ------------ | ----------------- | ------------------------ | ------------------- |
| `"noop"`         | ❌           | - `noop`          | `requestAnimationFrame`  | N/A                 |
| `"native"`       | ❌           | ⮁ `markForCheck` | `requestAnimationFrame`  | N/A                 |
| `"global"`       | ❌           | ⮁ `ɵmarkDirty`   | `requestAnimationFrame`  | N/A                 |
| `"local"`        | ❌           | 🠗 `detectChanges` | `requestAnimationFrame`  | N/A                 |
|                  |              |                   |                          |                     |
| `"noPriority"`   | 0            | 🠗 `detectChanges` | `postMessage`            | ❌                  |
| `"immediate"`    | 1            | 🠗 `detectChanges` | `postMessage`            | 0ms                 |
| `"userBlocking"` | 2            | 🠗 `detectChanges` | `postMessage`            | 250ms               |
| `"normal"`       | 3            | 🠗 `detectChanges` | `postMessage`            | 5000ms              |
| `"low"`          | 4            | 🠗 `detectChanges` | `postMessage`            | 10000ms             |
| `"idle"`         | 5            | 🠗 `detectChanges` | `postMessage`            | ❌                  |


### Motivation 
Why are they here?
What are they doing?


### Setup 

What to install?

```typescript


``` 

How to configure it?

```typescript
- globally -> config providers
- component -> config providers
- directives -> strategy

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

|       Name       |   Priority   |    Render Method  |       Scheduling         |   Render Deadline   |
| ---------------- | ------------ | ----------------- | ------------------------ | ------------------- |
| `"noop"`         | ❌           | - `noop`          | `requestAnimationFrame`  | N/A                 |
| `"native"`       | ❌           | ⮁ `markForCheck` | `requestAnimationFrame`  | N/A                 |
| `"global"`       | ❌           | ⮁ `ɵmarkDirty`   | `requestAnimationFrame`  | N/A                 |
| `"local"`        | ❌           | 🠗 `detectChanges` | `requestAnimationFrame`  | N/A                 |

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

|       Name       |   Priority   |    Render Method  |   Scheduling   | Render Deadline |
| ---------------- | ------------ | ----------------- | -------------- | --------------- |
| `"noPriority"`   | 0            | 🠗 `detectChanges` | `postMessage`  | ❌              |
| `"immediate"`    | 2            | 🠗 `detectChanges` | `postMessage`  | 0ms             |
| `"userBlocking"` | 3            | 🠗 `detectChanges` | `postMessage`  | 250ms           |
| `"normal"`       | 4            | 🠗 `detectChanges` | `postMessage`  | 5000ms           |
| `"low"`          | 5            | 🠗 `detectChanges` | `postMessage`  | 10000ms          |
| `"idle"`         | 6            | 🠗 `detectChanges` | `postMessage`  | ❌              |

![render-strategy-comparison](https://user-images.githubusercontent.com/10064416/115313442-8f27e700-a173-11eb-817d-9868180305d5.gif)

### Immediate

Urgent work that must happen immediately is initiated and visible by the user. This occurs right after current task and has the highest priority.


|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 0ms             |

**Usecase:**

![immediate-example](https://user-images.githubusercontent.com/15088626/115313764-8b4c9280-a17c-11eb-812e-98354c7090ba.png)

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


> Notice
> Be aware to avoid scheduling large or non-urgent work with immediate priority as it blocks rendering


### User Blocking

Critical work that must be done in the current frame, is initiated and visible by the user. DOM manipulations that should be rendered quickly. Tasks with this priority can delay current frame rendering, so this is the place for lightweight work (otherwise use "normal" priority).


|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 250ms           |

**Usecase:**

![userBlocking-example](https://user-images.githubusercontent.com/15088626/115313646-550f1300-a17c-11eb-8430-87eda6855822.png)

A good example here would be a dropdown menu.

Dropdowns should be displayed right away on user interaction.


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

### Normal


Heavy work visible to the user. For example since it has higher timeout it is more suitable for rendering of data lists.

|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 5000ms          |

<!-- In most cases it is a rendering from user interaction that depends on network and can be delayed by the couple of frames to the point where requested data is available. It should not delay current frame but should target next available frame. -->


**Usecase:**

@TODO: List example 

![rx-angular-cdk-render-strategies__normal_example](https://user-images.githubusercontent.com/10064416/115315848-7837c380-a178-11eb-985e-b639f034fcb4.PNG)


### low

Work that is typically not visible to the user or initiated by the user. For example getting scrollbar position form `localStorage`.

|   Render Method   |   Scheduling   | Render Deadline |
| ----------------- | -------------- | --------------- |
| 🠗 `detectChanges` | `postMessage`  | 10000ms         |

**Usecase:**

![low-example](https://user-images.githubusercontent.com/15088626/115315764-a7523300-a180-11eb-9231-1376bda540a4.png)

@TODO: Get scrollbar position

### Idle

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

Urgent work that should happen in the background and is not initiated but visible by the user. This occurs right after current task and has the lowest priority. For example background sync.

|   Render Method   |   Scheduling   | Render Deadline             |
| ----------------- | -------------- | --------------------------- |
| 🠗 `detectChanges` | `postMessage`  | ❌                          |

![rx-angular-cdk-render-strategies__idle_example](https://user-images.githubusercontent.com/10064416/115316774-49225180-a17a-11eb-9045-3cdd38217b4d.PNG)


### Custom Strategies

# Strategies

Before we go into detail with the provided strategies lets understand angulars vanilla behavior first.

![rx-angular-cdk-render-strategies__strategy-angular](https://user-images.githubusercontent.com/4904455/116009556-ac98fd00-a61a-11eb-9fce-866995582943.gif)


This diagram is rendering the actual component where the change goit introduced and all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

A present triangles shows that `Changedetection#OnPush` is used on the component. 
In the components that are marked as dirty show up with a red triangle. Those get always re-rendered.
Components with a gray triangle are untouched from reevanuation of template or rerendering.
Black triangles show us a component with change detection `onPush` was evanluated and no changes where detected.

![rx-angular-cdk-render-strategies__vanilla-angular-overrendering](https://user-images.githubusercontent.com/10064416/116155426-5bf0d500-a6ea-11eb-9cbc-5274a3bd0578.png)

As we can see in the diagram the yellowish components get re-evaluated (if no re-rendered). This obviously is unneeded work which slows down the performance of Angular.
In many cases this fact leads to heavy refactorings to get the performance flaw out, or even end up in situations where we can't fix the performance issues.

Strategies give us a way to control how Angular's rendering is executed and which render method is used.

## Basic Strategies


|       Name       |   Priority   |    Render Method  |       Scheduling         |   Render Deadline   |
| ---------------- | ------------ | ----------------- | ------------------------ | ------------------- |
| `"native"`       | ❌           | ⮁ `markForCheck` | `requestAnimationFrame`  | N/A                 |
| `"global"`       | ❌           | ⮁ `ɵmarkDirty`   | `requestAnimationFrame`  | N/A                 |
| `"local"`        | ❌           | 🠗 `detectChanges` | `requestAnimationFrame`  | N/A                 |
| `"noop"`         | ❌           | - `noop`          | `requestAnimationFrame`  | N/A                 |

### Native

![rx-angular-cdk-render-strategies__strategy-native](https://user-images.githubusercontent.com/10064416/116009720-78720c00-a61b-11eb-9702-82361d782a46.png)

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) is called.
Angular still needs zone.js to trigger the [`ApplicationRef#tick`](https://github.com/angular/angular/blob/7d8dce11c0726cdba999fc59a83295d19e5e92e6/packages/core/src/application_ref.ts#L719) to re-render,
as the internally called function [`markViewDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1837) is only responsible for dirty marking and not rendering.

| Name     | Zone Agnostic | Render Method    | Coalescing    | Scheduling              |
| -------- | ------------- | ---------------- | ------------- | ----------------------- |
| `native` | ❌            | ⮁ `markForCheck` | ✔ RootContext | `requestAnimationFrame` |


### Global Strategy

This strategy leverages Angular's internal [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) render method.
  It acts identical to [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) but works also 🚫 zone-less.
`markDirty` in comparison to `markForCheck` also calls [`scheduleTick`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1863) which is the reason why it also works in 🚫 zone-less environments.

![rx-angular-cdk-render-strategies__strategy-global](https://user-images.githubusercontent.com/10064416/116009680-59737a00-a61b-11eb-8c97-394b72ddbc95.png)


| Name     | Zone Agnostic | Render Method  | Coalescing      | Scheduling                                                                                                                                            |
| -------- | ------------- | -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global` | ✔             | ⮁ `ɵmarkDirty` | ✔ `RootContext` | [`animationFrame`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/util/misc_utils.ts#L39) |

### Local

This strategy is rendering the actual component and all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

![rx-angular-cdk-render-strategies__strategy-local](https://user-images.githubusercontent.com/10064416/116009674-52e50280-a61b-11eb-9971-07f8117ec399.png)


As detectChanges has no coalescing of render calls
like [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) or [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) have, we apply our own coalescing, 'scoped' oncomponent level.

Coalescing, in this very manner, means _collecting all events_ in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render. Then execute re-rendering only _once_.

'Scoped' coalescing, in addition, means _grouping the collected events_ by a specific context.
E. g. the _component_ from which the re-rendering was initiated.

This context could be the Component instance or a ViewContextRef,
both accessed over the context over `ChangeDetectorRef#context`.

| Name    | Zone Agnostic | Render Method     | Coalescing         | Scheduling              |
| ------- | ------------- | ----------------- | ------------------ | ----------------------- |
| `local` | ✔             | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |

<!-- @TODO Julian - full screen animation of slide fo template vs EV -->

### Noop

The no-operation strategy does nothing. It can be a useful tool for performance improvements as well as debugging.

![rx-angular-cdk-render-strategies__strategy-noop](https://user-images.githubusercontent.com/10064416/116009707-6d1ee080-a61b-11eb-83e8-5df2e8081b7a.png)

| Name   | Zone Agnostic | Render Method | Coalescing | Scheduling |
| ------ | ------------- | ------------- | ---------- | ---------- |
| `noop` | ✔             | - `noop`      | ❌         | ❌        |


## Concurrent Strategies

If your app provides user feedback within less then 16ms (less then 60 frames per second) it feels laggy to the user and leads to bad UX.

Based on the [RAIL model](https://web.dev/rail/), a user experiences motion as laggy if the frame rate is lower then 60 frames per second (~16ms per task).

From perspec UX => app should give feedback => 

if blocked => laggy 


### Concepts
- Scheduling
 https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
- Frame budget
![rx-angular-cdk-render-strategies__frame-budget](https://user-images.githubusercontent.com/10064416/115894224-4f098280-a459-11eb-9abf-9a902d66d380.png)

**Chunking**
![rx-angular-cdk-render-strategies__concurrent-strategies-un-chuked-work](https://user-images.githubusercontent.com/10064416/116010309-7cebf400-a61e-11eb-8715-a6428e5f16a3.png)
![rx-angular-cdk-render-strategies__concurrent-strategies-chuked-work](https://user-images.githubusercontent.com/10064416/116010261-2c749680-a61e-11eb-9e92-3bd032045fdf.png)
![rx-angular-cdk-render-strategies__concurrent-strategies-non-chunked-vs-chuked-work](https://user-images.githubusercontent.com/10064416/116007117-705f9f80-a60e-11eb-879c-87746ba677f6.png)

**Render Deadline**

![rx-angular-cdk-render-strategies__concurrent-strategies-render-deadline](https://user-images.githubusercontent.com/10064416/116008121-42308e80-a613-11eb-90da-c3299bbf8c0a.png)

- Priority
![rx-angular-cdk-render-strategies__concurrent-scheduling](https://user-images.githubusercontent.com/10064416/115897522-cc82c200-a45c-11eb-84de-a6fc02a1bcca.png)


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

![rx-angular-cdk-render-strategies__example](https://user-images.githubusercontent.com/10064416/115321372-f483d400-a183-11eb-810b-2df59f56794f.PNG)

![render-strategy-comparison](https://user-images.githubusercontent.com/10064416/115313442-8f27e700-a173-11eb-817d-9868180305d5.gif)



### noPriority

![rx-angular-cdk-render-strategies__strategy-noPriority](https://user-images.githubusercontent.com/10064416/116009734-84f66480-a61b-11eb-89f4-a57b90573b9b.png)


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


> **⚠ Notice:**
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


> **⚠ Notice:**   
> Be aware to avoid scheduling large or non-urgent work with userBlocking priority as it blocks rendering after 250ms

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


> **⚠ Notice:**   
> This strategy is especially useful for sending request and and preprocessing their responses. As they are not directly visible a low priority is best.

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

> **⚠ Notice:**   
> This strategy is especially useful for logic ment to run in the backgroung. As they are not directly visible a low priority is best. 

### Custom Strategies

```typescript
export type RxRenderWork = <T = unknown>(
  cdRef: ChangeDetectorRef,
  scope?: coalescingObj,
  notification?: RxNotification<T>
) => void;

export type RxRenderBehavior = <T = unknown>(
  work: any,
  scope?: coalescingObj
) => (o: Observable<T>) => Observable<T>;

export interface RxStrategyCredentials<S = string> {
  name: S;
  work: RxRenderWork;
  behavior: RxRenderBehavior;
}

export type RxCustomStrategyCredentials<T extends string> = Record<
  T,
  RxStrategyCredentials
>;
export type RxNativeStrategyNames = 'native' | 'local' | 'global' | 'noop';

export type RxConcurrentStrategyNames =
  | 'noPriority'
  | 'immediate'
  | 'userBlocking'
  | 'normal'
  | 'low'
  | 'idle';

export type RxDefaultStrategyNames =
  | RxNativeStrategyNames
  | RxConcurrentStrategyNames;

export type RxStrategyNames<T> = RxDefaultStrategyNames | T;
export type RxStrategies<T extends string> = RxCustomStrategyCredentials<
  RxStrategyNames<T>
>;

export interface RxAngularConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
}
```

### Future ideas to discuss

- is there a consistent way to do the prioritization out of the code bas it self?
- 

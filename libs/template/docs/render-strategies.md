## Render Strategies
##### Explicit fine-grained control of change detection in Angular

![Template - RenderStrategies](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/docs/images/template_rendering-strategies.png)

### Motivation

Angulars change detection is pull based and implicit. 
This affects not only the performance but also forces us into specific ways of architecting as well as thinking.

Render strategies serve as the core of the new change detection system.
This enables us to build scalable and highly performant applications.
Furthermore they provide new ways of explicitely tying truly push based state management solutions to the change detection for highly responsive UI's.


A strategy exposes the work to perform (e.g. `cdRef#markForCheck`, `cdRef#detectChanges`) as well as the scheduling mechanism to developers for configuration & customization via the interface `RxStrategyCredentials`.

`Directive`s, `Service`s or `Component`s of your application can make use of these strategies as an easy API for the key [concepts](https://github.com/rx-angular/rx-angular/blob/master/libs/template/docs/concepts.md) of rendering performance.

This architecture enables modern features like:
- [x] ⛑ Partial migration to a 🚫 zone-less application
- [x] Fine-grained configuration of change detection
- [x] Coalescing of change detection runs on `Component` or even `EmbeddedView` level
- [x] 💡 Progressive rendering
- [x] 💡 Prioritized rendering
- [x] 💡 Render Callback
- [x] Performance best practices as default

`@rx-angular/cdk` comes preconfigured with two sets of strategies.

**BasicStrategies**

BasicStrategies wrap modern ivy API's like `ɵmarkDirty` and `ɵdetectChanges` as well as a strategy to "noop" change detection.
As fallback for the migration process or comparison testing, Angulars default change detection behaviour is also provided as a strategy.

**ConcurrentStrategies**

The ConcurrentStrategies utilize the latest technologies to enable priority based change detection for non-blocking rendering and smooth user experiences. It combines the most performant scheduling techniques with a highly performant queueing mechanism.
Read more about the internal techniques [here](https://www.npmjs.com/package/scheduler) or [here](https://github.com/WICG/scheduling-apis).

The name **ConcurrentStrategies** implies that concepts of [react concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) are transported into the world of Angular.

ConcurrentStrategies implement not yet released browser features ([Chrome Canary postTask scheduling](https://www.chromestatus.com/feature/6031161734201344)) already today.

Rendering can be executed with the frame budget [long task](https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API) in mind, prioritized at the level of `Component`'s or even `EmbeddedView`'s and provide an excellent tool to improve performance. 

With these sets of strategies and the possibility of switching them at runtime we can create tools that align with performance best pratices (e.g. [RAIL](https://web.dev/rail/)) and implement expert level optimizations. We can control rendering based on view port visibility, measure the DOM _after_ rendering or re-render only parts of a component.

**Render strategies pave the way for truly non-blocking applications, targeted for any device or platform 🚀**

<!--
TODO:
- One good and shiny example here
-->


### Features

The sub-package provides the following features:
- [x] Strategies
- [x] RenderStrategyConfig
- [x] RxStrategyProvider

**Available Strategies:**

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


### Setup 

The render strategies can be used directly from the `cdk` package or indirectly through the `template` package.
To do so install the the cdk package and if needed the packages depending on it.

1. Install `@rx-angular/cdk`
```bash
npm i @rx-angular/cdk
``` 
2. Module Import
```typescript
...
import {LetModule} from '@rx-angular/template';
@Module({
  imports: [
    LetModule
  ],
  declarations: [
    AnyComponent
  ]
})
export class AnyModule {
  value$ = of(42);
}
```

```typescript
- globally -> config providers
- component -> config providers
- directives -> strategy
```

### Usage

Render strategies can be used over the `StrategyProvider` or `Directive` like `push`, `rxLet` or `rxFor`. 

#### Usage in the Component

The second best place to control rendering is the component.

To do so you have to import `StrategyProvider`, use one of the scheduling APIs and name a strategy tou o use. 

```typescript
@Component({
  selector: 'any-component',
  template: `
    {{value}}
  `
})
export class AnyComponent {

  value = 42;
  
  constructor(
    public strategyProvider: RxStrategyProvider,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.strategyProvider.schedule(() => {
      
    })
  }

}
```

> **⚠ Notice:**  
> As the component which introduces the change does not know ehere in the template it sits the whole template needs to be reevaluated. 

#### Usage in the template

The best place and most efficient place to control rendering is the template.
Here we again have 2 ways to do it. Over `Pipe`'s or `Directive`'s. 

In general, all features in `@rx-angular/template` have strategies backed in and are fine-grained configurable.

The second best way of using stragegies in the template is by using the `push` pipe.

```html
<hero-list heroes="list$ | push: 'global'"></hero-list>
```

As pipes don't own a specific part in the template they still trigger a full re-evaluation of the template, including all other template expressions or bindings.

The best and most performant way to use strategies in the template is by structural directives.

To be more specific the `EmbeddedView`.
```html
<div *rxLet="list$; let list; strategy: 'userBlocking'"></div>
```
They own a `EmbeddedView` and RxAngular we realize it and apply the re-evaluation only to the very HTML snippet it is used on.  

![rx-angular-cdk_render-strategies_template-vs-embeddedview](https://user-images.githubusercontent.com/10064416/115992896-4b4c3c00-a5d0-11eb-8959-d8d226452ce4.png)


> **⚠ Notice:**  
> Even if the push pipe lives in the template, the performance is still the same as controling rendering in the component because it reevaluates the whole template. 


## Strategies

Before we go into detail with the provided strategies lets understand angulars vanilla behavior first.

![rx-angular-cdk-render-strategies__strategy-angular](https://user-images.githubusercontent.com/10064416/115839355-daafee80-a41a-11eb-8383-12eb58ed3905.png)

This strategy is rendering the actual component and all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

In the diagrams components that are marked as dirty show up with a red triangle. Those get always re-rendered.
Components with a gray triangle are untouched from reevanuation of template or rerendering.
Black triangles show us a component with change deection `onPush` was evanluated and no changes where detected



|       Name       |   Priority   |    Render Method  |       Scheduling         |   Render Deadline   |
| ---------------- | ------------ | ----------------- | ------------------------ | ------------------- |
| `"noop"`         | ❌           | - `noop`          | `requestAnimationFrame`  | N/A                 |
| `"native"`       | ❌           | ⮁ `markForCheck` | `requestAnimationFrame`  | N/A                 |
| `"global"`       | ❌           | ⮁ `ɵmarkDirty`   | `requestAnimationFrame`  | N/A                 |
| `"local"`        | ❌           | 🠗 `detectChanges` | `requestAnimationFrame`  | N/A                 |

### Local

This strategy is rendering the actual component and all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

![rx-angular-cdk-render-strategies__strategy-local](https://user-images.githubusercontent.com/10064416/115839410-eb606480-a41a-11eb-910e-4a2db16a1ed8.png)


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
  It acts identical to [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) but works also 🚫 zone-less.
`markDirty` in comparison to `markForCheck` also calls [`scheduleTick`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1863) which is the reason why it also works in 🚫 zone-less environments.

![rx-angular-cdk-render-strategies__strategy-global](https://user-images.githubusercontent.com/10064416/115839499-00d58e80-a41b-11eb-982b-359c1d1fd4c9.png)


| Name     | Zone Agnostic | Render Method  | Coalescing      | Scheduling                                                                                                                                            |
| -------- | ------------- | -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global` | ✔             | ⮁ `ɵmarkDirty` | ✔ `RootContext` | [`animationFrame`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/util/misc_utils.ts#L39) |

### Noop

The no-operation strategy does nothing. It can be a useful tool for performance improvements as well as debugging.

![rx-angular-cdk-render-strategies__strategy-noop](https://user-images.githubusercontent.com/10064416/115839587-15b22200-a41b-11eb-8208-e93bdfae4bb6.png)

| Name   | Zone Agnostic | Render Method | Coalescing | Scheduling |
| ------ | ------------- | ------------- | ---------- | ---------- |
| `noop` | ✔             | - `noop`      | ❌         | ❌        |

### Native

![rx-angular-cdk-render-strategies__strategy-native](https://user-images.githubusercontent.com/10064416/115839651-25ca0180-a41b-11eb-818f-2fb7909fb929.png)

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) is called.
Angular still needs zone.js to trigger the [`ApplicationRef#tick`](https://github.com/angular/angular/blob/7d8dce11c0726cdba999fc59a83295d19e5e92e6/packages/core/src/application_ref.ts#L719) to re-render,
as the internally called function [`markViewDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1837) is only responsible for dirty marking and not rendering.

| Name     | Zone Agnostic | Render Method    | Coalescing    | Scheduling              |
| -------- | ------------- | ---------------- | ------------- | ----------------------- |
| `native` | ❌            | ⮁ `markForCheck` | ✔ RootContext | `requestAnimationFrame` |



### Concurrent Strategies

If your app provides user feedback within less then 16ms (less then 60 frames per second) it feels laggy to the user and leads to bad UX.

Based on the [RAIL model](https://web.dev/rail/), a user experiences motion as laggy if the frame rate is lower then 60 frames per second (~16ms per task).

From perspec UX => app should give feedback => 

if blocked => laggy 


#### Concepts
- Scheduling
 https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
- Frame budget
![rx-angular-cdk-render-strategies__frame-budget](https://user-images.githubusercontent.com/10064416/115894224-4f098280-a459-11eb-9abf-9a902d66d380.png)


- Chunking
  - Threshhold => 60 FPS default
  - Render Deadline

![rx-angular-cdk-render-strategies__chunked-rendering](https://user-images.githubusercontent.com/10064416/115894730-e2db4e80-a459-11eb-914c-e6a376012a49.png)

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

![rx-angular-cdk-render-strategies__strategy-noPriority](https://user-images.githubusercontent.com/10064416/115839785-4d20ce80-a41b-11eb-9cdc-26048b27a16c.png)


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


> ⚠ Notice:  
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


> ⚠ Notice:  
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

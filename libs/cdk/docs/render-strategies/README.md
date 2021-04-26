# Render Strategies
##### Explicit fine-grained control of change detection in Angular

![Template - RenderStrategies](https://raw.githubusercontent.com/rx-angular/rx-angular/master/libs/template/docs/images/template_rendering-strategies.png)

## Motivation

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

![rx-angular-cdk-render-strategies__concurrent-scheduling](https://user-images.githubusercontent.com/10064416/116157757-d1aa7000-a6ed-11eb-8875-6ad6a09edbcf.png)

**Render strategies pave the way for truly non-blocking applications, targeted for any device or platform 🚀**

<!--
TODO:
- One good and shiny example here
-->


## Features

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


## Setup 

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

## Usage

Render strategies can be used over the `StrategyProvider` or `Directive` like `push`, `rxLet` or `rxFor`. 

### Usage in the Component

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

### Usage in the template

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

![rx-angular-cdk_render-strategies_template-vs-embeddedview](https://user-images.githubusercontent.com/10064416/115993215-25c03200-a5d2-11eb-8919-14e5859aeef2.png)


> **⚠ Notice:**  
> Even if the push pipe lives in the template, the performance is still the same as controling rendering in the component because it reevaluates the whole template. 


### Usage in a service

The scheduling logic of the strategies is not only useful to schedule rendering but work in general.
A good example usecase is HTTP requests and response processing. As this logic is not directly reflected in the UI the user will not realize if it is done a little bit later.
In this case we can use a low priority.

Again, `StrategyProvider` needs to get imported, and the scheduling APIs needs to be used. 

```typescript
@Injectable({
  profidedIn: 'root'
})
export class AnyService {

  constructor(
    public strategyProvider: RxStrategyProvider
  ) {
  }
  
  getData() {
    this.strategyProvider.schedule(() => {
      
    })
  }

}
```

> **⚠ Notice:**  
> As the component which introduces the change does not know ehere in the template it sits the whole template needs to be reevaluated. 

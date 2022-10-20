## Render strategies

> Explicit fine-grained control of change detection in Angular

![RenderStrategies - Overview](https://user-images.githubusercontent.com/10064416/116306287-2b21a600-a7a5-11eb-997b-5c2e847821a2.png)

## Motivation

Angulars change detection is pull-based and implicit.
This affects not only the performance but also forces us into specific ways of architecting and thinking.

Render strategies serve as the core of the new change detection system.
This enables us to build scalable and highly performant applications.
Furthermore, they provide new ways of explicitly tying truly push-based state management solutions to the change detection for highly responsive UI's.

A strategy exposes the work to perform (e.g. `cdRef#markForCheck`, `cdRef#detectChanges`) as well as the scheduling mechanism to developers for configuration & customization via the interface `RxStrategyCredentials`.

`Directive`s, `Service`s or `Component`s of your application can make use of these strategies as an easy API for the key [concepts](../../template/concepts/concepts.md) of rendering performance.

This architecture enables modern features like:

- [x] ⛑ Partial migration to a 🚫 zone-less application
- [x] Fine-grained configuration of change detection
- [x] Coalescing of change detection runs on `Component` or even `EmbeddedView` level
- [x] Progressive rendering
- [x] Prioritized rendering
- [x] Render Callback
- [x] Performance best practices as default

`@rx-angular/cdk` comes preconfigured with two sets of strategies.

**BasicStrategies**

[BasicStrategies](strategies/basic-strategies.md) wrap modern ivy APIs like `ɵmarkDirty` and `ɵdetectChanges` as well as a strategy to "noop" change detection.
As a fallback for the migration process or comparison testing, Angulars default change detection behaviour is also provided as a strategy.

This set aims to get the first option for zone-less rendering (`ɵmarkDirty`), more control on the top-down process, and improve performance drastically by only rendering components that received updates.

![rx-angular-cdk-render-strategies__reduced-render-work](https://user-images.githubusercontent.com/10064416/116158910-9ad55980-a6ef-11eb-8ad2-62532a3e6b6e.png)

**ConcurrentStrategies**

The [ConcurrentStrategies](strategies/concurrent-strategies.md) utilize the latest technologies to enable priority-based change detection for non-blocking rendering and smooth user experiences. It combines the most performant scheduling techniques with a highly performant queueing mechanism.
Read more about the internal techniques [here](https://www.npmjs.com/package/scheduler) or [here](https://github.com/WICG/scheduling-apis).

The name **ConcurrentStrategies** implies that concepts of [react concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) are transported into the world of Angular.

ConcurrentStrategies implement not yet released browser features ([Chrome Canary postTask scheduling](https://www.chromestatus.com/feature/6031161734201344)) already today.

Rendering can be executed with the frame budget and [long task](https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API) in mind, prioritized at the level of `Component`'s or even `EmbeddedView`'s and provide an excellent tool to improve performance.

With these sets of strategies and the possibility of switching them at runtime we can create tools that align with performance best practices (e.g. [RAIL](https://web.dev/rail/)) and implement expert level optimizations. We can control rendering based on viewport visibility, measure the DOM _after_ rendering or re-render only parts of a component.

![concurrent scheduling - abstract diagram](https://user-images.githubusercontent.com/10064416/145224962-04147632-f634-4025-a097-8135cdf9f3cc.png)

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

**[Available Strategies:](render-strategies/strategies)**

| Name             | Priority | Render Method     | Scheduling              | Render Deadline |
| ---------------- | -------- | ----------------- | ----------------------- | --------------- |
| `"noop"`         | ❌       | - `noop`          | ❌                      | N/A             |
| `"native"`       | ❌       | ⮁ `markForCheck`  | `requestAnimationFrame` | N/A             |
| `"global"`       | ❌       | ⮁ `ɵmarkDirty`    | `requestAnimationFrame` | N/A             |
| `"local"`        | ❌       | 🠗 `detectChanges` | `requestAnimationFrame` | N/A             |
|                  |          |                   |                         |                 |
| `"immediate"`    | 1        | 🠗 `detectChanges` | `postMessage`           | 0ms             |
| `"userBlocking"` | 2        | 🠗 `detectChanges` | `postMessage`           | 250ms           |
| `"normal"`       | 3        | 🠗 `detectChanges` | `postMessage`           | 5000ms          |
| `"low"`          | 4        | 🠗 `detectChanges` | `postMessage`           | 10000ms         |
| `"idle"`         | 5        | 🠗 `detectChanges` | `postMessage`           | ❌              |

**Zone notification configuration with patchZone property**

By default any event executed with strategy will be notifying `zone.js`. Using `patchZone` property you can run events completely outside of `zone.js` (`patchZone: false`) or in provided `NgZone` (`patchZone: this.ngZone`).

## Setup

The render strategies can be used directly from the `cdk` package or indirectly through the `template` package.
To do so, install the `cdk` package and, if needed, the packages depending on it.

1. Install `@rx-angular/cdk`

```bash
npm i @rx-angular/cdk
// or
yarn add @rx-angular/cdk
```

## Configuration

By default, RxAngular render strategies are preconfigured in a way they are still way more performant than native Angular but focusing on being as non-breaking as possible.
In the majority of cases, you can just drop in the new features, and everything works as before.

You can then partially enable more performance features of RxAngular.

Configurations are done with Angular best practies and based on `InjectionToken`'s.

> As all configurtion are controlled by `RxStrategyProvider`, an Angular service, we can apply
> all knowledge of Angular DI on global and local level including all life cycles.

We can configure on the following levels:

- globally
- feature module
- component

### Default configuration

By default the following configurations are set:

- primaryStrategy: `normal`
- patchZone: `true`

### Global

1. Module Import

```typescript
...
import {RxRenderStrategiesConfig, RX_RENDER_STRATEGIES_CONFIG} from '@rx-angular/cdk/render-strategies';

const CUSTOM_RX_ANGULAR_CONFIG: RxRenderStrategiesConfig<string> = {
  primaryStrategy: 'global',
  patchZone: false
}

@Module({
  providers: [
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: CUSTOM_RX_ANGULAR_CONFIG
    }
  ]
})
export class AnyModule {

}
```

### Feature Module

```typescript
...
import {RxRenderStrategiesConfig, RX_RENDER_STRATEGIES_CONFIG} from '@rx-angular/cdk/render-strategies';

const FEATURE_RX_ANGULAR_CONFIG: RxRenderStrategiesConfig<string> = {
  primaryStrategy: 'global',
  patchZone: false
}

@Module({
  providers: [
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: FEATURE_RX_ANGULAR_CONFIG
    }
  ]
})
export class AnyFeatureModule {

}
```

### Component

```typescript
...
import {RxRenderStrategiesConfig, RX_RENDER_STRATEGIES_CONFIG} from '@rx-angular/cdk/render-strategies';

const COMPONENT_RX_ANGULAR_CONFIG: RxRenderStrategiesConfig<string> = {
  primaryStrategy: 'global',
  patchZone: false
}

@Component({
  selector: 'any-component',
  providers: [
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: COMPONENT_RX_ANGULAR_CONFIG
    }
  ]
})
export class AnyComponent {

}
```

## Usage

Render strategies can be used with the `StrategyProvider` or `Directive` like `push`, `rxLet` or `rxFor`.

### Usage in the component

The second best place to control rendering is the component.
Whenever you have places in your application that uses `ChangeDetectorRef#markForCheck`, `ChangeDetectorRef#markForCheck` or `ApplicationRef#tick` to trigger change detection,
you can refactor that part with strategies.

Some of the cases where you might have to use custom change detection are:

- projected content
- changes not triggered by user interaction
- integration of third-party libraries
- detached components

To replace that logic you have to import `RxStrategyProvider` and use the `scheduleCD` API.
You can configure a strategy by name. Otherwise, the default one is used.
This API takes the components `ChangeDetectorRef` and uses one of the registered strategies to render the change.
You can also configure the used strategy per call.

In this case, we span an overlay with the `immediate` strategy to get the best UX.
The reason for the strategy choice is primarily because user interaction needs to give feedback instantly to align with the user's expectations.

```typescript
@Component({
  selector: 'any-component',
  template: ` ... `,
})
export class AnyComponent {
  constructor(
    public strategyProvider: RxStrategyProvider,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  openDialog() {
    this.strategyProvider.scheduleCD(this.changeDetectorRef, {
      strategy: 'immediate',
    });
  }
}
```

> **⚠ Notice:**
> As the component which introduces the change does not know where in the template the change got introduced, the whole template needs to be re-evaluated.

### Usage in the template

The best place and most efficient place to control rendering is the template.
Here we again have 2 ways to do it. Over `Pipe`'s or `Directive`'s.

In general, all features in `@rx-angular/template/*` have strategies backed in and are fine-grained configurable.

The second best way of using strategies in the template is by using the `push` pipe.

```html
<hero-list heroes="list$ | push: 'global'"></hero-list>
```

As pipes don't own a specific part in the template they still trigger a full re-evaluation of the template, including all other template expressions or bindings.

The best and most performant way to use strategies in the template is by structural directives.

To be more specific the `EmbeddedView`.

```html
<div *rxLet="list$; let list; strategy: 'userBlocking'"></div>
```

They own an `EmbeddedView`, and RxAngular realized it and applied the re-evaluation only to the very HTML snippet it is used on.

![rx-angular-cdk_render-strategies_template-vs-embeddedview](https://user-images.githubusercontent.com/10064416/116314957-1c8cbc00-a7b0-11eb-91e8-cb6f5de038db.png)

> **⚠ Notice:**
> Use rxLet over push.
> Even if the push pipe lives in the template, the performance is still the same as controlling rendering in the component because it re-evaluates the whole template.

### Usage in a service

The scheduling logic of the strategies is not only valuable for schedule rendering but work in general.
A good example is HTTP requests and response processing. As this logic is not directly reflected in the UI, the user will not realize if it is done a little bit later.
In this case, we can use a low priority.

Again, `RxStrategyProvider` needs to get imported, and the scheduling APIs needs to be used.

```typescript
@Injectable({
  profidedIn: 'root',
})
export class AnyService {
  constructor(
    public strategyProvider: RxStrategyProvider,
    private apiService: ApiService
  ) {}

  getData() {
    this.strategyProvider
      .schedule(() => this.apiService.sendRequest(), { strategy: 'low' })
      .subscribe();
  }
}
```

> **⚠ Notice:**
> The component that introduces the change does not know where in the template it sits. The whole template needs to be re-evaluated.

## Testing

@TODO

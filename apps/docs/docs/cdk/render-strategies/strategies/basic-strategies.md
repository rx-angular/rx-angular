# Basic strategies

## Concepts

### Render work

To apply changes to a component template we need to re-evaluate the template. Internally this is done in the specific strategy.
This process will execute whenever a component's template is re-evaluated through `async`, `push`, `ChangedDetectorRef.detectChanges` or a structural directive template is re-evaluated through `EmbeddedView.detectChanges`.

It can be pretty time consuming and directly depends on the following factors:

- HTML size (only for init and destroy and bundle-size)
- JS size (only for init and destroy and bundle-size)
- number of event bindings (only for init and destroy)
- number of template bindings/expressions
- number and size of child-components
- number of directives (especially ngFor and nested structures)

Some of the problems related to work of Angular are:

**Out of bound change detection:**
If we perform this re-evaluation without any visual change for the user (over-rendering) we introduce noticeable performance degradations.

The out of bound change detection can be caused through:

- Zone pollution
- Missing ChangeDetectionStrategy.OnPush
- Component template projection
- Pull-based rendering processes

**Out of bound template evaluation:**
If we perform a re-evaluation of a single property in the template any other expression/binding also gets re-evaluated.
Again over-rendering introduces noticeable performance degradations.

The out of bound template evaluation can be caused through:

- Pull-based rendering processes
- any reactive change through `async`
- any call to `cdRef.detectChanges`

**Work performed for out of viewport content:**
If we perform a re-evaluation or even re-rendering of the DOM of elements outside of the viewport we perform useless work for the user.
This will pollute the main thread and reduced time for more important content to get rendered.

The re-evaluation or browser re-rendering can be caused by:

- Bad style changes
- Big LCP (Largest Contentful Paint) elements
- Large amount of content

### Local vs global CD

![ChangeDetection](https://user-images.githubusercontent.com/10064416/143149592-9a55eafc-3b44-412c-a146-acb777a2e777.png)

The change detection system that is currently implemented in Angular is pull-based, but way more important, as a side effect it also runs CD globally.
It performs a re-rendering where at optimum every single component on the path from the root to the actual UI update needs to get re-evaluated.
A lot of performed work is useless.

Technically the methods to run change detection are `markForCheck` / `markViewDirty`, `ɵmarkDirty` and `tick`.

If we want to avoid this process we can run change detection locally and re-render only the very component and potentially its children.

Technically the methods we can use for it are `detectChanges` or `ɵdetectChanges`

![Render Strategies-global-vs-local](https://user-images.githubusercontent.com/10064416/143150010-fa01316a-acd9-4906-ab81-25a29336cf57.png)

### Pull vs push based

![Render Strategies-request-subscribe](https://user-images.githubusercontent.com/10064416/143153116-782bec55-0353-4254-8fe5-5a16691ac320.png)
Consuming value changes can be done by **constantly** watching the source for changes and **pull** them,
or subscribe to the changes like a DOM event binding **once** and get the changes **pushed**.

In a simple setup the pull might be a quick solution and you just `.get()` the value, but a push based architecture always scales better.

Compare it with HTTP calls vs WebSockets.

If we apply this concepts to our change detection mechanics we can directly apply changes where they are need and skip nearly all the unnecessary work.

In combination with Observables, and EmbeddedViews change detection can be speed up dramatically by this architecture.

![Render Strategies-pull-vs-push](https://user-images.githubusercontent.com/10064416/143150014-e83347e4-188c-447d-8d61-2fc3014f5abb.png)

### Strategies

| Name       | Priority | Render Method     | Scheduling              | Render Deadline |
| ---------- | -------- | ----------------- | ----------------------- | --------------- |
| `"native"` | ❌       | ⮁ `markForCheck`  | `requestAnimationFrame` | N/A             |
| `"local"`  | ❌       | 🠗 `detectChanges` | `requestAnimationFrame` | N/A             |
| `"noop"`   | ❌       | - `noop`          | `requestAnimationFrame` | N/A             |

#### Native

![rx-angular-cdk-render-strategies__strategy-native](https://user-images.githubusercontent.com/10064416/116009720-78720c00-a61b-11eb-9702-82361d782a46.png)

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) is called.
Angular still needs zone.js to trigger the [`ApplicationRef#tick`](https://github.com/angular/angular/blob/7d8dce11c0726cdba999fc59a83295d19e5e92e6/packages/core/src/application_ref.ts#L719) to re-render,
as the internally called function [`markViewDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1837) is only responsible for dirty marking and not rendering.

| Name     | Zone Agnostic | Render Method    | Coalescing     | Scheduling              |
| -------- | ------------- | ---------------- | -------------- | ----------------------- |
| `native` | ❌            | ⮁ `markForCheck` | ✔ RootContext | `requestAnimationFrame` |

#### Local

This strategy is rendering the actual component and all its children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

![rx-angular-cdk-render-strategies__strategy-local](https://user-images.githubusercontent.com/10064416/116009674-52e50280-a61b-11eb-9971-07f8117ec399.png)

As detectChanges has no coalescing of render calls
like [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) or [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) have, we apply our own coalescing, 'scoped' on component level.

Coalescing, in this very manner, means _collecting all events_ in the same
[EventLoop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) tick, that would cause a re-render. Then execute re-rendering only _once_.

'Scoped' coalescing, in addition, means _grouping the collected events_ by a specific context.
E. g. the _component_ from which the re-rendering was initiated.

This context could be the Component instance or a `ViewContextRef`,
both accessed over the context over `ChangeDetectorRef#context`.

| Name    | Zone Agnostic | Render Method     | Coalescing          | Scheduling              |
| ------- | ------------- | ----------------- | ------------------- | ----------------------- |
| `local` | ✔            | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame` |

The best place to use the local strategy is a structural directive like `*rxLet`. Those will have a independent template from the component and perform changes only there.

![render-strategies - basic-strategies - local - directive_michael-hladky](https://user-images.githubusercontent.com/10064416/145226924-d5b46406-10b6-4e4b-ae46-ae0347309261.png)

This has a pretty nice performance boost and is causing only minimal change detection work.

#### Noop

The no-operation strategy does nothing. It can be a valuable tool for performance improvements as well as debugging.

![rx-angular-cdk-render-strategies__strategy-noop](https://user-images.githubusercontent.com/10064416/116009707-6d1ee080-a61b-11eb-83e8-5df2e8081b7a.png)

| Name   | Zone Agnostic | Render Method | Coalescing | Scheduling |
| ------ | ------------- | ------------- | ---------- | ---------- |
| `noop` | ✔            | - `noop`      | ❌         | ❌         |

## Usage

### Component / Service

```ts
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';

@Component()
class Component {
  constructor(private strategyProvider: RxStrategyProvider) {
    strategyProvider.schedule(() => {}, { strategyName: 'local' });
  }
}
```

### Template

```ts
import { RxLet } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';
import { RxPush } from '@rx-angular/template/push';

@Module({
  imports: [RxLet, RxFor, RxPush],
})
class Module {}
```

```html
<h1 *rxLet="title$; strategy:'local'">{{title}}</h1>
<a *rxFor="let item of items$; strategy:'native'">{{item}}</a>
<p>{{title$ | push : 'local'}}</p>
```

# @rx-angular/template

[![rx-angular](https://circleci.com/gh/BioPhoton/rx-angular.svg?style=shield)](https://circleci.com/gh/BioPhoton/rx-angular)
[![npm version](https://badge.fury.io/js/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/@rx-angular/template)

## Reactive Template Rendering for Angular

@rx-angular/template is a comprehensive toolset for fully reactive rendering in Angular.
It leverages the latest Browser APIs to maximize the rendering performance of your angular application.
The functionalities are provided by
structural directives, pipes, RxJS operators or imperative functions for managing rendering.

![template logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/template/images/template_logo.png)

## Description

**@rx-angular/template** is nothing less than a revolution in `ChangeDetection` for angular applications.
Developers are provided with tools for high-performance rendering, which are operated by a broad and intuitive API.

The package focuses on template rendering and the coordination of `ChangeDetection` cycles. Changes get scoped,
coalesced and scheduled using the latest browser APIs.
Rendering behavior is fully customizable by using built in or providing custom [`RenderStrategies`](#RenderStrategies).
In addition to the use of the scheduling APIs in the browser, local rendering of components is the
foundation for future helpers such as viewport prioritization.

@rx-angular/template is all about performance optimizing your rendering. The default configuration
should already improve the rendering performance of your application by a decent amount. If you plan to
improve your rendering performance to the maximum possible, there are several techniques that need to be known
and considered.

Allthough we give our best to provide the most simple developer experience possible, some things
need to known if you want to master the rendering of your angular application.

Terms that need to be understood:

- Coalescing
- Scoped Coalescing
- Scheduling
- usage of directives, pipes and operators
- the rendering strategies

## Install

`npm install --save @rx-angular/template`  
or  
`yarn add @rx-angular/template`

## Current Situation

The current way of binding _reactive_ sources to a view in angular looks like that:

```html
{{ heroData$ | async }}
<ng-container *ngIf="heroData$ | async as data">{{data | json}}</ng-container>
<hero-list-component [value]="heroData$ | async"></hero-list-component>
```

The problem is, `async` pipe flags the component and all its **ancestors** as dirty.
It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
components from top to bottom.

This more often than not causes a huge amount of unnecessary re-renderings of components which didn't
had any changes whatsoever / in the first place.

While this approach is pretty convenient to use,
since the rendering gets brute forced on any change, making REALLY sure anything gets re-rendered.
Heavy dynamic and interactive UIs suffer pretty bad from `zone.js ChangeDetection`.
This can lean to very bad performance or even unusable applications.
Furthermore, it turns out the `async` pipe does not work in zone-less environments as well as many third party
software aswell.

The comprehensive toolset of `@rx-angular/template` solves most of those issues with or without `zone.js`.

## Included Features

- Directives
  - RxLet (\*rxLet)
  - Viewport Priority (viewport-prio)
  - Unpatch Event Bindings from `zones.js / NgZone` (unpatch)
- Pipes
  - Push (push)
- Render Strategies
- Helpers
  - RxJS Operators
  - Static Functions

## Concepts

### Coalescing

Coalescing, in this very manner, means _collecting all events_ in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick,
that would cause a re-rendering and execute **re-rendering only once**.

![Coalescing](../template/images/coalescing.png)

### Scoped Coalescing

Scoped Coalescing, in addition, means **grouping the collected events** by a specific context.
E.g. the **component** from which the re-rendering was initiated.

### Scheduling

Coalescing provides us a way to gather multiple re-renderings to a single point of execution. Scheduling in this
case means searching for the very **optimized** point in time when to really _execute rendering_.

![Scheduling Options](../template/images/scheduling-options.png)

## Directives

### LetDirective

The `*rxLet` directive serves a convenient way of binding observables to a view context. Furthermore it helps
you structure view related models into view context scopes (dom elements scope).
Under the hood it leverages a `RenderStrategy` which in turn takes care of optimizing the `ChangeDetection`
of your component.

The rendering behavior can be configured per LetDirective instance by using the strategy `@Input()`.
You find more information about [`RenderStrategies`](#RenderStrategies) in the sections below.

Other Features:

- lazy rendering
- binding is always present (`*ngIf="truthy$"`) ???
- it takes away multiple usages of the `async` or `push` pipe
- a unified/structured way of handling null, undefined or error
- distinct same values in a row, skips not needed re-renderings

The current way of binding an observable in angular applications to the view looks like that:

```html
<ng-container *ngIf="heroData$ | async as data">
  <hero-search [term]="data.searchTerm"> </hero-search>
  <hero-list-component [heroes]="data.heroes"> </hero-list-component>
</ng-container>
```

`*ngIf` is also interfering with rendering. In case of any falsy
value (e.g. `0`), the component would get detached from the dom.

View binding with `*rxLet`:

```html
<ng-container *rxLet="heroData$; let data">
  <hero-search [term]="data.searchTerm"> </hero-search>
  <hero-list-component [heroes]="data.heroes"> </hero-list-component>
</ng-container>
```

Structure your view into multiple lazy loading components:

```html
<hero-search *rxLet="searchData$; let s" [term]="s.term"> </hero-search>
<hero-list-component *rxLet="listData$; let l" [heroes]="l.heroes">
</hero-list-component>
```

Using different render strategies:

```html
<hero-search *rxLet="searchData$; let s; strategy: 'global'" [term]="s.term">
</hero-search>
<hero-list-component *rxLet="listData$; let l" [heroes]="l.heroes">
</hero-list-component>
```

The `*rxLet` Directive will render it's template and manage `ChangeDetection` after it got an initial value.
So if the incoming `Observable` emits it's values lazy (e.g. data coming from `Http`), your template will be
rendered lazy aswell. This can very positively impact the initial render performance of your application.

In addition to that it provides us information of the observable context.
We can track:

- next value
- error value
- base state

```html
<ng-container *rxLet="heroData$; let data; let e = $error, let c = $complete">
  <hero-list-component *ngIf="!e && !c" [heroes]="data.heroes">
  </hero-list-component>
  <ng-container *ngIf="e">
    There is an error: {{e}}
  </ng-container>
  <ng-container *ngIf="c">
    Observable completed: {{c}}
  </ng-container>
</ng-container>
```

## PushPipe

The `push` pipe serves as a drop-in replacement for angulars built-in `async` pipe.
Just like the `*rxLet` Directive, it leverages a `RenderStrategy` under the hood which
in turn takes care of optimizing the `ChangeDetection` of your component.

The rendering behavior can be configured per PushPipe instance using the strategy parameter.
You find more information about [`RenderStrategies`](#RenderStrategies) in the sections below.

Usage in the template

```html
<hero-search [term]="searchTerm$ | push"> </hero-search>
<hero-list-component [heroes]="heroes$ | push"> </hero-list-component>
```

Using different strategies

```html
<hero-search [term]="searchTerm$ | push: 'global'"> </hero-search>
<hero-list-component [heroes]="heroes$ | push: 'global'"> </hero-list-component>
```

Other Features:

- lazy rendering (see [LetDirective](#LetDirective))
- Take observables or promises, retrieve their values and render the value to the template
- a unified/structured way of handling null, undefined or error
- distinct same values in a row, skips not needed re-renderings

## RenderStrategies

The `RenderStrategies` can be seen as the _core_ of the performance optimization layer. They utilize all
[`Concepts`](#Concepts) explained above in order to provide a streamlined and focused API to master
angular rendering and `ChangeDetection`.

### Usage

Use the corresponding `RenderStrategy#name` as parameter or Input with the `PushPipe` or `LetDirective`.
When you want to handle `ChangeDetection` manually inside a `Component`, `Directive` or `Service`, you can
simply use the built-in `StrategySelection`.

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

### Built-in Strategies

![Template - RenderStrategies](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/template/images/template_rendering-strategies.png)

#### Native Strategy

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value `ChangeDetectorRef#markForCheck` is called.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| -------- | ------------- | ------------------ | --------------- |
| `native` | ❌/❌         | mFC / mFC          | ❌              |

#### Noop

Noop Strategy

This strategy does nothing. It serves for debugging purposes or as fine-grained performance optimization tool.
Use it with caution, since it stops `ChangeDetection` completely.

| Name   | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| ------ | ------------- | ------------------ | --------------- |
| `noop` | ❌/❌         | no rendering       | ❌              |

#### Global Strategy

This strategy is rendering the application root and
all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing |
| -------- | ------------- | ------------------ | ---------- |
| `global` | ❌/✔️         | mFC / ɵMD          | ❌         |

#### Local Strategy

This strategy is rendering the actual component and
all it's **children** that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges is synchronous and has no built-in coalescing of rendering
like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` have, we have to apply our own coalescing.
It is also _scoped_ on component level. (see [Concepts](#Concepts) for more information)

| Name    | ZoneLess VE/I | Render Method VE/I | Coalescing/Schedule    |
| ------- | ------------- | ------------------ | ---------------------- |
| `local` | ✔️/✔️         | dC / dC            | micro + animationFrame |

#### Detach Strategy

The Detach Strategy share its behavior with the **Local Strategy** . It can be seen as
the **Local Strategys** more aggressive brother. Instead of just rendering scheduled changes,
it will also `detach` (`ChangeDetectorRef#detach`) this very `ChangeDetectorRef` from the detection cycle.
Use this strategy on your own risk. It provides absolute _maximum_ performance, since your `Component` is
effectively resilient against re-renderings coming from any other source than this strategy. But it will come with
some downsights as you will see when using it :). Have fun!!

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing             |
| -------- | ------------- | ------------------ | ---------------------- |
| `detach` | ✔️/✔️         | dC / ɵDC           | micro + animationFrame |

### Custom Strategies

ON ROADMAP, WILL COME SOON

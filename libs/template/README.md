# @rx-angular/template

[![rx-angular](https://circleci.com/gh/BioPhoton/rx-angular.svg?style=shield)](https://circleci.com/gh/BioPhoton/rx-angular)
[![npm version](https://badge.fury.io/js/%40rx-angular%2Ftemplate.svg)](https://www.npmjs.com/@rx-angular/template)

#### Reactive Template Rendering for Angular

@rx-angular/template is a toolset for reactive rendering in Angular.
It provides structural directives, pipes as well as RxJS operators for rendering.

![template logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/template/images/template_logo.png)

## Description

This package is all about rendering. There are 2 things that need to be understood:

- usage of directives, pipes and operators
- understanding the rendering strategies

---

## Install

`npm install --save @rx-angular/template`

## Setup

## Included Features

- Directives
  - RxLet (\*rxLet)
  - Viewport Priority (viewport-prio)
  - Unpatch Event Bindings (unpatch)
- Pipes
  - Push (push)
- Render Strategies
- Helpers
  - RxJS Operators
  - Static Functions

## Concepts

### Coalescing

#### Scoped Coalescing

### Scheduling

## Directive - LetDirective

The `*rxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
It also helps with several internal processing under the hood.

The current way of binding an observable to the view looks like that:

```html
<ng-containerng *If="observableNumber$ as n">
<app-number [number]="n">
</app-number>
<app-number-special [number]="n">
</app-number-special>
</ng-container>
```

The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden

Included Features:

- binding is always present. (`*ngIf="truthy$"`)
- it takes away the multiple usages of the `async` or `push` pipe
- a unified/structured way of handling null and undefined
- triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
  `ChangeDetectorRef.markForCheck`)
- triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
  `ɵdetectChanges`)
- distinct same values in a row (distinctUntilChanged operator),

@usageNotes

The `*rxLet` directive take over several things and makes it more convenient and save to work with streams in the
template
`<ng-containerrxLet="observableNumber$ as c"></ng-container>`

```html
<ng-containerrxLet="observableNumber$ as n">
<app-number [number]="n">
</app-number>
</ng-container>

<ng-containerrxLet="observableNumber$; let n">
<app-number [number]="n">
</app-number>
</ng-container>
```

In addition to that it provides us information from the whole observable context.
We can track the observables:

- next value
- error value
- complete base-state

```html
<ng-containerrxLet="observableNumber$; let n; let e = $error, let c = $complete">
<app-number [number]="n" *ngIf="!e && !c">
</app-number>
<ng-containerng *If="e">
There is an error: {{e}}
</ng-container>
<ng-containerng *If="c">
Observable completed: {{c}}
</ng-container>
</ng-container>
```

## Pipe - PushPipe

The `push` pipe serves as a drop-in replacement for the `async` pipe.
It contains intelligent handling of change detection to enable us
running in zone-full as well as zone-less mode without any changes to the code.

The current way of binding an observable to the view looks like that:

```html
{{observable$ | async}}
<ng-containerng *If="observable$ | async as o">{{o}}</ng-container>
<component [value]="observable$ | async"></component>
```

The problem is `async` pipe just marks the component and all its ancestors as dirty.
It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
components.

Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.

`push` pipe solves that problem.

Included Features:

- Take observables or promises, retrieve their values and render the value to the template
- Handling null and undefined values in a clean unified/structured way
- Triggers change-detection differently if `zone.js` is present or not (`detectChanges` or `markForCheck`)
- Distinct same values in a row to increase performance
- Coalescing of change detection calls to boost performance

`push` pipe solves that problem. It can be used like shown here:

```html
{{observable$ | push}}
<ng-containerng *If="observable$ | push as o">{{o}}</ng-container>
<component [value]="observable$ | push"></component>
```

## Rendering Strategies

![Template - Rendering Strategies](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/template/images/template_rendering-strategies.png)

### Native Strategy

This strategy mirrors Angular's built-in `async` pipe.
This means for every emitted value `ChangeDetectorRef#markForCheck` is called.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| -------- | ------------- | ------------------ | --------------- |
| `native` | ❌/❌         | mFC / mFC          | ❌              |

### Noop

Noop Strategy

This strategy is does nothing. It serves for debugging only

| Name   | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| ------ | ------------- | ------------------ | --------------- |
| `noop` | ❌/❌         | no rendering       | ❌              |

### Global Strategy

This strategy is rendering the application root and
all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing |
| -------- | ------------- | ------------------ | ---------- |
| `global` | ❌/✔️         | mFC / ɵMD          | ❌         |

### Local Strategy

This strategy is rendering the actual component and
all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges has no coalescing of render calls
like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
component level.

Coalescing, in this very manner,
means*collecting all events\*\* in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
execute*re-rendering only once\*\*.

'Scoped' coalescing, in addition, means*grouping the collected events by\*\* a specific context.
E. g. the*component\*\* from which the re-rendering was initiated.

| Name    | ZoneLess VE/I | Render Method | Coalescing/Schedule |
| ------- | ------------- | ------------- | ------------------- |
| `local` | ✔️/✔️         | dC / dC       | micro + X           |

### Detach Detach

This strategy is rendering the actual component and
all it's children that are on a path
that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.

As detectChanges has no coalescing of render calls
like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
component level.

Coalescing, in this very manner,
means*collecting all events\*\* in the same
[EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
execute*re-rendering only once\*\*.

'Scoped' coalescing, in addition, means*grouping the collected events by\*\* a specific context.
E. g. the*component\*\* from which the re-rendering was initiated.

| Name     | ZoneLess VE/I | Render Method VE/I | Coalescing VE/I |
| -------- | ------------- | ------------------ | --------------- |
| `detach` | ✔️/✔️         | dC / ɵDC           | ✔️ + C/ LV      |

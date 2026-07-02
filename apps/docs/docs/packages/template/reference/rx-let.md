---
id: rx-let
title: 'RxLet'
sidebar_label: 'RxLet'
diataxis_type: reference
package: template
legacy_guard: false
tags: [template, api-reference]
concepts: [E4, E5]
---

# RxLet

`RxLet` (`*rxLet`) binds an `Observable`, `Signal`, or plain value to the template and
exposes a built-in **suspense / error / complete reactive context** alongside
**per-directive render scheduling**. It does more than the native `@let`, which only
names a value: `rxLet` tracks the *state* of an asynchronous source (still loading, failed,
completed) and renders it through a cancelable, frame-budgeted scheduler.

> **Why this matters:** see [The reactive context](../../../concepts/E4-reactive-context.md)
> for the suspense/error/complete model, and
> [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
> for how per-directive scheduling works.

**Import**

```typescript
import { RxLet } from '@rx-angular/template/let';
```

## Usage

Add `RxLet` to a standalone component's `imports` and bind a reactive source with the
native structural-directive `let` syntax.

```typescript title="src/counter.component.ts"
import { Component, signal } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';

@Component({
  selector: 'app-counter',
  imports: [RxLet],
  template: `
    <ng-container *rxLet="number; let n">
      <app-number [number]="n" />
      <app-number-special [number]="n" />
    </ng-container>
  `,
})
export class CounterComponent {
  number = signal(0);
}
```

The same binding works with an `Observable`:

```typescript
import { BehaviorSubject } from 'rxjs';

export class CounterComponent {
  number$ = new BehaviorSubject(0);
  // template: <ng-container *rxLet="number$; let n"> … </ng-container>
}
```

`*rxLet` always binds the value, including falsy values (`0`, `''`, `false`, `null`,
`undefined`). This differs from `@if (number$ | async; as n)`, which hides the content on a
falsy value, a common source of edge-case bugs. Use `@let` or `@if (… | async)` for a
plain value; reach for `*rxLet` when you also want the reactive context or render
scheduling below.

By default `*rxLet` is optimized for performance: it renders through the `normal` render
strategy (non-blocking, frame-budgeted) and creates templates lazily. See
[tuning rendering with strategies](../how-to/tune-rendering-with-strategies.md) to change it.

## Inputs

**Value**

| Input   | Type                                                         | Description                                                     |
| ------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| `rxLet` | `ObservableInput<U> \| Subscribable<U> \| Signal<U> \| U \| null \| undefined` | The Observable, Signal, or value to bind to the template context. |

**Contextual state**

| Input             | Type                             | Description                                                            |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `error`           | `TemplateRef<RxLetViewContext>`  | Defines the template for the error state.                              |
| `complete`        | `TemplateRef<RxLetViewContext>`  | Defines the template for the complete state.                           |
| `suspense`        | `TemplateRef<RxLetViewContext>`  | Defines the template for the suspense state.                           |
| `nextTrigger`     | `Observable<unknown>`            | Trigger to show the `next` template.                                   |
| `errorTrigger`    | `Observable<unknown>`            | Trigger to show the `error` template.                                  |
| `completeTrigger` | `Observable<unknown>`            | Trigger to show the `complete` template.                               |
| `suspenseTrigger` | `Observable<unknown>`            | Trigger to show the `suspense` template.                               |
| `contextTrigger`  | `Observable<RxNotificationKind>` | Trigger to show any template, based on the given `RxNotificationKind`. |

**Rendering**

| Input                 | Type                                                          | Description                                                                                                                                                             |
| --------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `patchZone`           | `boolean`                                                     | _default: `true`_ if set to `false`, `RxLet` operates outside `NgZone` (zoneful apps only). See [tuning rendering with strategies](../how-to/tune-rendering-with-strategies.md). |
| `parent` (deprecated) | `boolean`                                                     | _default: `false`_ if `true`, `RxLet` informs its host component about template changes so legacy `@ViewChild`/`@ContentChild` decorator queries update. Deprecated: not needed with [signal-based view queries](https://angular.dev/guide/signals/queries). |
| `strategy`            | `Observable<RxStrategyNames \| string> \| RxStrategyNames \| string` | _default: `normal`_ the render strategy used to detect changes. See [tuning rendering with strategies](../how-to/tune-rendering-with-strategies.md). |
| `renderCallback`      | `NextObserver<U>`                                             | Notifies when `RxLet` created, updated, or removed its template; useful when you need to know rendering is done.                                                       |

## Context

`RxLet` exposes the [reactive context state](../../../concepts/E4-reactive-context.md) in
the template two ways: **context variables** and **context templates**.

The full reactive context (suspense, error, complete) is only derived from `Observable`
sources. For a `Signal` source, only suspense and error are derived.

### Context variables

Each template exposes these context variables:

- `$implicit`: `T`, the default value, accessed by `let n`
- `error`: `boolean \| Error`
- `complete`: `boolean`
- `suspense`: `boolean`

```html
<ng-container *rxLet="number$; let n; let s = suspense; let e = error; let c = complete">
  {{ s && 'No value arrived so far' }}
  <app-number [number]="n" />
  There is an error: {{ e ? e.message : 'No Error' }}
  Observable is completed: {{ c ? 'Yes' : 'No' }}
</ng-container>
```

### Context templates

Template anchors render the contextual state per state:

```html
<ng-container
  *rxLet="
    number$; let n;
    error: error;
    complete: complete;
    suspense: suspense;
  "
>
  <app-number [number]="n" />
</ng-container>

<ng-template #suspense>SUSPENSE</ng-template>
<ng-template #error>ERROR</ng-template>
<ng-template #complete>COMPLETE</ng-template>
```

## Triggers

Trigger inputs let you switch the displayed template from asynchronous code (a `Promise` or
`Observable`), ideal for a searchable list with a loading spinner. When a trigger fires it
applies the new context state, updates the local variables, and switches to the registered
template if one exists.

### `nextTrigger`

Switch back from any template to the value display.

```typescript
@Component({
  selector: 'app-root',
  imports: [RxLet],
  template: `
    <button (click)="nextTrigger$.next()">show value</button>
    <ng-container *rxLet="num$; let n; complete: complete; nextTrigger: nextTrigger$">
      {{ n }}
    </ng-container>
    <ng-template #complete>✔</ng-template>
  `,
})
export class AppComponent {
  nextTrigger$ = new Subject();
  num$ = timer(2000);
}
```

### `errorTrigger`

Show the `error` template.

```typescript
@Component({
  selector: 'app-root',
  imports: [RxLet],
  template: `
    <ng-container *rxLet="num$; let n; error: error; errorTrigger: errorTrigger$">
      {{ n }}
    </ng-container>
    <ng-template #error>❌</ng-template>
  `,
})
export class AppComponent {
  private state = inject(GlobalState);
  num$ = this.state.num$;
  errorTrigger$ = this.state.error$;
}
```

### `completeTrigger`

Show the `complete` template.

```typescript
@Component({
  selector: 'app-root',
  imports: [RxLet],
  template: `
    <ng-container *rxLet="num$; let n; complete: complete; completeTrigger: completeTrigger$">
      {{ n }}
    </ng-container>
    <ng-template #complete>✔</ng-template>
  `,
})
export class AppComponent {
  private state = inject(GlobalState);
  num$ = this.state.num$;
  completeTrigger$ = this.state.success$;
}
```

### `suspenseTrigger`

Show the `suspense` template.

```typescript
@Component({
  selector: 'app-root',
  imports: [RxLet],
  template: `
    <input (input)="search($event.target.value)" />
    <ng-container *rxLet="num$; let n; suspense: suspense; suspenseTrigger: suspenseTrigger$">
      {{ n }}
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  private state = inject(GlobalState);
  num$ = this.state.num$;
  suspenseTrigger$ = new Subject();

  search(str: string) {
    this.state.search(str);
    this.suspenseTrigger$.next();
  }
}
```

### `contextTrigger`

Set any context in one input. It combines `suspenseTrigger`, `completeTrigger`, and
`errorTrigger`, driven by an `RxNotificationKind`.

```typescript
@Component({
  selector: 'app-root',
  imports: [RxLet],
  template: `
    <input (input)="search($event.target.value)" />
    <ng-container *rxLet="num$; let n; suspense: suspense; contextTrigger: contextTrigger$">
      {{ n }}
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  private state = inject(GlobalState);
  num$ = this.state.num$;
  contextTrigger$ = new Subject();

  search(str: string) {
    this.state.search(str);
    this.contextTrigger$.next(RxNotificationKind.Suspense);
  }
}
```

## Features

- Context variables (`error`, `complete`, `suspense`)
- Context templates (`error`, `complete`, `suspense`)
- Context triggers
- Reduces boilerplate compared to multiple `async` pipes
- A unified, structured way to handle `null` and `undefined`
- Works with static values: `*rxLet="42; let n"`
- Value binding is always present, with no falsy-value hiding
- Lazy template creation (via render strategies)
- Change detection on the `EmbeddedView` level
- Distinct consecutive equal values are skipped (over-render guard)
- Concurrent, frame-budgeted rendering (see [concurrent scheduling](../../../concepts/E5-concurrent-scheduling.md))

## See also

- Concept: [The reactive context](../../../concepts/E4-reactive-context.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
- How-to: [Test scheduled rendering](../how-to/test-scheduled-rendering.md)
- Example application: [angular-movies](https://github.com/tastejs/angular-movies)

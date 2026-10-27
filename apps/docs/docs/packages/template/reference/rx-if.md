---
id: rx-if
title: 'RxIf'
diataxis_type: reference
package: template
legacy_guard: false
sidebar_label: 'RxIf'
sidebar_position: 3
tags: [template, api-reference]
concepts: [E4]
---

# RxIf

`RxIf` is a reactive suspense / error / complete template state machine driven from an `Observable` (or `Signal`, or static value). Bind an async condition directly and render loading, error, and complete UI from the source's notifications: no manual `@if` boilerplate, no extra `async` pipes to wire the states together.

For a plain boolean toggle, prefer native `@if`: it is synchronous and needs no import. Reach for `RxIf` when you want the full [reactive context](../../../concepts/E4-reactive-context.md) (suspense / error / complete) of an async source expressed declaratively, together with per-directive [render scheduling](../how-to/tune-rendering-with-strategies.md).

## Import

```ts
import { RxIf } from '@rx-angular/template/if';

@Component({
  standalone: true,
  imports: [RxIf],
  template: `...`,
})
export class AnyComponent {}
```

## Inputs

**Value**

| Input  | Type                                                         | Description                                                            |
| ------ | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `rxIf` | `boolean` or `ObservableInput<boolean>` or `Signal<boolean>` | The observable, signal, or value bound to the context of the template. |

**Contextual state**

| Input             | Type                             | Description                                                            |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `error`           | `TemplateRef<RxIfViewContext>`   | Template for the error state.                                          |
| `complete`        | `TemplateRef<RxIfViewContext>`   | Template for the complete state.                                       |
| `suspense`        | `TemplateRef<RxIfViewContext>`   | Template for the suspense state.                                       |
| `nextTrigger`     | `Observable<unknown>`            | Trigger to show the `next` template.                                   |
| `errorTrigger`    | `Observable<unknown>`            | Trigger to show the `error` template.                                  |
| `completeTrigger` | `Observable<unknown>`            | Trigger to show the `complete` template.                               |
| `suspenseTrigger` | `Observable<unknown>`            | Trigger to show the `suspense` template.                               |
| `contextTrigger`  | `Observable<RxNotificationKind>` | Trigger to show any template, based on the given `RxNotificationKind`. |

**Rendering**

| Input                 | Type                                               | Description                                                                                                                                                                                                                       |
| --------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `then`                | `TemplateRef<RxIfViewContext>`                     | Template for when the bound condition is true.                                                                                                                                                                                    |
| `else`                | `TemplateRef<RxIfViewContext>`                     | Template for when the bound condition is false.                                                                                                                                                                                   |
| `patchZone`           | `boolean`                                          | _default: `true`_ if `false`, `RxIf` operates outside `NgZone`. Zoneful-only concern; see [How to tune rendering with strategies](../how-to/tune-rendering-with-strategies.md).                                                   |
| `parent` (deprecated) | `boolean`                                          | _default: `false`_ if `true`, `RxIf` informs its host component about template changes so `@ViewChild` / `@ContentChild` queries update. Deprecated: not needed with [signal queries](https://angular.dev/guide/signals/queries). |
| `strategy`            | `Observable<RxStrategyNames>` or `RxStrategyNames` | _default: `normal`_ the `RxStrategyRenderStrategy` used to detect changes. See [How to tune rendering with strategies](../how-to/tune-rendering-with-strategies.md).                                                              |
| `renderCallback`      | `NextObserver<boolean>`                            | Emits the latest value causing the view to update, giving the exact timing when `RxIf` created or removed its template.                                                                                                           |

## Features

**DX**

- Context variables (`error`, `complete`, `suspense`).
- Context templates (`error`, `complete`, `suspense`).
- Context triggers to switch context manually.
- Reduces boilerplate (removes multiple `async` pipes).
- Works with static values (`*rxIf="true"`).

**Performance**

- Value binding is always present.
- Lazy template creation, driven by render strategies.
- Change detection scheduled at the `EmbeddedView` level.
- Distinct-until-changed on repeated values.

## Usage

`RxIf` ships as a structural directive; use its `*rxIf` microsyntax.

```html title="src/some.component.html"
<app-item *rxIf="show">
  <app-item-child />
</app-item>
```

```typescript title="src/some.component.ts"
import { RxIf } from '@rx-angular/template/if';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [RxIf],
  templateUrl: './some.component.html',
})
export class SomeComponent {
  show = signal(true);
}
```

The bound value may be a `Signal`, an `Observable`, or a static value:

```html
<!-- Observable -->
<app-item *rxIf="show$"><app-item-child /></app-item>

<!-- Signal -->
<app-item *rxIf="showSignal()"><app-item-child /></app-item>

<!-- static -->
<app-item *rxIf="true"><app-item-child /></app-item>
```

:::note
The full reactive context (suspense, error, complete) can only be derived from `Observable` sources. A `Signal` derives suspense and error only. Static values have no reactive context.
:::

## Context

`RxIf` exposes the [reactive context](../../../concepts/E4-reactive-context.md) of its source in two ways: **context variables** and **context templates**.

### Context variables

Available on both the `then` and `else` templates, based on the last valid value:

- `$implicit`: `T`, the default variable accessed via `let val`
- `error`: `boolean | Error`
- `complete`: `boolean`
- `suspense`: `boolean`

```html
<ng-container *rxIf="customer$; let customer; let s = suspense; let e = error; let c = complete">
  @if (s) { <loader /> } @if (e) { <error /> } @if (c) { <complete /> }
  <app-customer [customer]="customer" />
</ng-container>
```

With an `else` template:

```html
<ng-container *rxIf="show$; else: nope; let s = suspense; let e = error; let c = complete">
  @if (s) { <loader /> } @if (e) { <error /> } @if (c) { <complete /> }
  <app-item />
</ng-container>
<ng-template #nope let-s="suspense" let-e="error" let-c="complete">
  @if (s) { <loader /> } @if (e) { <error /> } @if (c) { <complete /> }
  <nope />
</ng-template>
```

**Context variables with then/else templates on initial rendering**

| value                                                                               | reactive context | template (both defined) | template (only then) |
| ----------------------------------------------------------------------------------- | ---------------- | ----------------------- | -------------------- |
| `undefined`                                                                         | suspense         | _no render_             | _no render_          |
| truthy primitive value (`number`, `string`, `boolean`, ..)                          | next             | then                    | then                 |
| falsy primitive value (`number`, `string`, `boolean`, ..)                           | next             | else                    | _no render_          |
| `Observable` emitting `undefined`                                                   | suspense         | else                    | _no render_          |
| `Observable` or `Promise` not yet emitted a value (e.g `Subject`)                   | suspense         | _no render_             | _no render_          |
| `Observable` emitting truthy                                                        | next             | then                    | then                 |
| `Observable` emitting falsy value !== `undefined`                                   | next             | else                    | _no render_          |
| `Observable` completing after truthy value (e.g `of(true)`)                         | complete         | then                    | then                 |
| `Observable` completing after falsy (incl. `undefined`) value (e.g `of(undefined)`) | complete         | else                    | _no render_          |
| `Promise` emitting truthy value                                                     | complete         | then                    | then                 |
| `Promise` emitting falsy (incl. `undefined`) value                                  | complete         | else                    | _no render_          |
| `Observable` throwing an error after truthy value                                   | error            | then                    | then                 |
| `Observable` throwing an error after falsy value (incl. `undefined`)                | error            | else                    | _no render_          |

### Context templates

Template anchors render the reactive context declaratively:

```html
<ng-container *rxIf="show$; error: error; complete: complete; suspense: suspense">
  <app-item />
</ng-container>

<ng-template #suspense><loader /></ng-template>
<ng-template #error><error /></ng-template>
<ng-template #complete><completed /></ng-template>
```

**Context templates with then/else templates on initial rendering**

| value                                                                               | reactive context | template (both defined) | template (only then) |
| ----------------------------------------------------------------------------------- | ---------------- | ----------------------- | -------------------- |
| `undefined`                                                                         | suspense         | suspense                | suspense             |
| truthy primitive value (`number`, `string`, `boolean`, ..)                          | next             | then                    | then                 |
| falsy primitive value (`number`, `string`, `boolean`, ..)                           | next             | else                    | _no render_          |
| `Observable` emitting `undefined`                                                   | suspense         | suspense                | suspense             |
| `Observable` or `Promise` not yet emitted a value (e.g `Subject`)                   | suspense         | suspense                | suspense             |
| `Observable` emitting truthy                                                        | next             | then                    | then                 |
| `Observable` emitting falsy value !== `undefined`                                   | next             | else                    | _no render_          |
| `Observable` completing after truthy value (e.g `of(true)`)                         | complete         | complete                | complete             |
| `Observable` completing after falsy (incl. `undefined`) value (e.g `of(undefined)`) | complete         | complete                | complete             |
| `Promise` emitting truthy value                                                     | complete         | complete                | complete             |
| `Promise` emitting falsy (incl. `undefined`) value                                  | complete         | complete                | complete             |
| `Observable` throwing an error after truthy value                                   | error            | error                   | error                |
| `Observable` throwing an error after falsy value (incl. `undefined`)                | error            | error                   | error                |

## Triggers

Besides deriving the reactive context from the source, `RxIf` can switch context manually. Each trigger applies its context state and updates the context variables (or switches to the registered template).

| Trigger           | Type                             | Effect                                                                                     |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| `nextTrigger`     | `Observable<unknown>`            | Switch back from any template to the actual value (`next`).                                |
| `errorTrigger`    | `Observable<unknown>`            | Switch to the `error` template.                                                            |
| `completeTrigger` | `Observable<unknown>`            | Switch to the `complete` template.                                                         |
| `suspenseTrigger` | `Observable<unknown>`            | Switch to the `suspense` template.                                                         |
| `contextTrigger`  | `Observable<RxNotificationKind>` | Set any context; combines `suspenseTrigger`, `completeTrigger`, and `errorTrigger` in one. |

```typescript
@Component({
  standalone: true,
  imports: [RxIf],
  template: `
    <button (click)="nextTrigger$.next()">show value</button>
    <ng-container *rxIf="show$; complete: complete; nextTrigger: nextTrigger$">
      <item />
    </ng-container>
    <ng-template #complete>✔</ng-template>
  `,
})
export class AppComponent {
  private readonly state = inject(GlobalState);
  nextTrigger$ = new Subject<void>();
  show$ = this.state.show$;
}
```

Using `contextTrigger` to set an arbitrary context:

```typescript
@Component({
  standalone: true,
  imports: [RxIf],
  template: `
    <input (input)="search($event.target.value)" />
    <ng-container *rxIf="show$; suspense: suspense; contextTrigger: contextTrigger$">
      <item />
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  private readonly state = inject(GlobalState);
  show$ = this.state.show$;
  contextTrigger$ = new Subject<RxNotificationKind>();

  search(str: string) {
    this.state.search(str);
    this.contextTrigger$.next(RxNotificationKind.Suspense);
  }
}
```

## See also

- Concept: [The reactive context](../../../concepts/E4-reactive-context.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
- How-to: [Test scheduled rendering](../how-to/test-scheduled-rendering.md)

**Example applications:** a demo is available on [GitHub](https://github.com/tastejs/angular-movies).

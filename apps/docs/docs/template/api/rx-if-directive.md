---
sidebar_label: 'RxIf'
sidebar_position: 3
title: 'RxIf'
---

## Motivation

In order to switch a template based on an observable condition, developers are forced to use
`*ngIf` in addition to the `async` pipe in the template. This leads to a variety of different
issues, to name a few:

- it will only update the template when `NgZone` is also aware of the value change
- it leads to over rendering because it can only run global change detection
- it leads to too many subscriptions in the template
- it is cumbersome to work with values in the template

Read more about [rendering issues with native angular change detection](../performance-issues/rendering-issues-in-angular.md).

The `RxIf` directive serves as a drop-in replacement for the `NgIf` directive, but with additional features.
`RxIf` allows you to bind observables directly without having the need of using the `async`
pipe in addition.

This enables `rxIf` to completely operate on its own without having to interact with `NgZone`
or triggering global change detection.

**Example usage**

```html
<!-- some.component.html -->
<app-item *rxIf="show$"><app-item></app-item></app-item>
```

```ts
// some.component.ts
@Component({
  /**/
})
export class SomeComponent {
  show$ = new BehaviorSubject<boolean>(true);
}
```

## Concepts

- [Local variables](../concepts/local-variables.md)
- [Local template](../concepts/local-templates.md)
- [Reactive context](../concepts/reactive-context.md)
- [Render strategies](../../cdk/render-strategies)

## Features

**DX Features**

- context variables (error, complete, suspense)
- context templates (error, complete, suspense)
- context trigger
- reduces boilerplate (multiple `async` pipe's)
- works also with static variables `*rxIf="true"`

**Performance Features**

- value binding is always present ('`*ngIf` hack' bugs and edge cases)
- lazy template creation (done by render strategies)
- triggers change-detection on `EmbeddedView` level
- distinct same values in a row (over-rendering)

### Inputs

**Value**

| Input  | Type                                 | description                                                       |
| ------ | ------------------------------------ | ----------------------------------------------------------------- |
| `rxIf` | `boolean \ ObservableInput<boolean>` | The Observable or value to be bound to the context of a template. |

**Contextual state**

| Input             | Type                             | description                                                            |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `error`           | `TemplateRef<RxIfViewContext>`   | defines the template for the error state                               |
| `complete`        | `TemplateRef<RxIfViewContext>`   | defines the template for the complete state                            |
| `suspense`        | `TemplateRef<RxIfViewContext>`   | defines the template for the suspense state                            |
| `nextTrigger`     | `Observable<unknown>`            | trigger to show `next` template                                        |
| `errorTrigger`    | `Observable<unknown>`            | trigger to show `error` template                                       |
| `completeTrigger` | `Observable<unknown>`            | trigger to show `complete` template                                    |
| `suspenseTrigger` | `Observable<unknown>`            | trigger to show `suspense` template                                    |
| `contextTrigger`  | `Observable<RxNotificationKind>` | trigger to show any templates, based on the given `RxNotificationKind` |

**Rendering**

| Input            | Type                                                            | description                                                                                                                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `then`           | `TemplateRef<RxIfViewContext>`                                  | defines the template for when the bound condition is true                                                                                                                                                                                                                                       |
| `else`           | `TemplateRef<RxIfViewContext>`                                  | defines the template for when the bound condition is false                                                                                                                                                                                                                                      |
| `patchZone`      | `boolean`                                                       | _default: `true`_ if set to `false`, the `RxIf` will operate out of `NgZone`. See [NgZone optimizations](../performance-issues/ngzone-optimizations.md)                                                                                                                                         |
| `parent`         | `boolean`                                                       | _default: `true`_ if set to `false`, the `RxIf` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. [Handling view and content queries](../performance-issues/handling-view-and-content-queries.md) |
| `strategy`       | `Observable<RxStrategyNames<string>> \ RxStrategyNames<string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes.                                                                                                                                                                                                            |
| `renderCallback` | `Subject<boolean>`                                              | giving the developer the exact timing when the `LetDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                                                                                                                      |

### Outputs

n/a

## Setup

The `IfModule` can be imported as following:

Module based setup:

```ts
import { IfModule } from '@rx-angular/template/if';

@NgModule({
  imports: [IfModule],
  // ...
})
export class AnyModule {}
```

Standalone component setup:

```ts
import { IfModule } from '@rx-angular/template/if';

@Component({
  standalone: true,
  imports: [IfModule],
  template: `...`,
})
export class AnyComponent {}
```

## Basic Usage

> **⚠ Notice:**
> By default `*rxLet` is optimized for performance out of the box.
>
> This includes:
>
> - The default render strategy is [`normal`](../../cdk/render-strategies/strategies/concurrent-strategies).
>   This ensures non-blocking rendering but can cause other side-effects. See [strategy configuration](../../cdk/render-strategies#Default-configuration) if you want to change it.
> - Creates templates lazy and manages multiple template instances

### Binding an Observable

The `*rxIf` directive makes it easy to work with reactive data streams in the template.

```html
<!-- some.component.html -->
<app-item *rxIf="show$"><app-item></app-item></app-item>
```

```ts
// some.component.ts
@Component({
  /**/
})
export class SomeComponent {
  show$ = new BehaviorSubject<boolean>(true);
}
```

### Using the reactive context

![Contextual-State--template-vs-variable](https://user-images.githubusercontent.com/10064416/192660150-643c4d37-5326-4ba2-ad84-e079890b3f2f.png)

A nice feature of the `*rxIf` directive is, it provides 2 ways to access the [reactive context state](../concepts/reactive-context.md) in the template:

- context variables
- context templates

### Context Variables

> (!) Context variables are accessible on both, the `then` and `else` template, based on the last valid value

The following context variables are available for each template:

- error: `boolean` | `Error`
- complete: `boolean`
- suspense: `boolean`

You can use them like this:

**Context Variables on then template**

```html
<ng-container *rxIf="show$; let s = suspense; let e = error, let c = complete">
  <loader *ngIf="s"></loader>
  <error *ngIf="e"></error>
  <complete *ngIf="c"></complete>

  <app-item></app-item>
</ng-container>
```

**Context Variables on else template**

```html
<ng-container
  *rxIf="show$; else: nope; let s = suspense; let e = error, let c = complete"
>
  <loader *ngIf="s"></loader>
  <error *ngIf="e"></error>
  <complete *ngIf="c"></complete>
  <app-item></app-item>
</ng-container>
<ng-template #nope let-s="suspense" let-e="error" let-c="complete">
  <loader *ngIf="s"></loader>
  <error *ngIf="e"></error>
  <complete *ngIf="c"></complete>

  <nope></nope>
</ng-template>
```

**Context Variables with then/else templates on initial rendering**

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

### Context Templates

You can also use template anchors to display the [reactive context](../concepts/reactive-context.md) in the template:

```html
<ng-container
  *rxIf="
    show$;
    error: error;
    complete: complete;
    suspense: suspense;
  "
>
  <app-item></app-item>
</ng-container>

<ng-template #suspense><loader></loader></ng-template>
<ng-template #error><error></error></ng-template>
<ng-template #complete><completed></completed></ng-template>
```

This helps in some cases to organize the template and introduces a way to make it dynamic or even lazy.

**Context Templates with then/else templates on initial rendering**

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

### Context Trigger

![context-templates](https://user-images.githubusercontent.com/4904455/195452228-b2c1c6ac-5046-4cd3-a857-564cf039dd02.gif)

Besides deriving the `reactive context` from the source observable, `RxIf` also offers an API to switch the context manually.

If applied the trigger will apply the new context state, and the directive will update the local variables, or switch to the template if one is registered.

#### Showing the `next` template

We can use the `nextTrg` input to switch back from any template to display the actual value.
e.g. from the complete template back to the value display

```typescript
@Component({
  selector: 'any-component',
  template: `
    <button (click)="nextTrigger$.next()">show value</button>
    <ng-container *rxIf="show; complete: complete; nextTrg: nextTrigger$">
      <item></item>
    </ng-container>
    <ng-template #complete>✔</ng-template>
  `,
})
export class AppComponent {
  nextTrigger$ = new Subject();
  show$ = this.state.show$;
}
```

#### Showing the `error` template

We can use the `errorTrg` input to switch back from any template to display the actual value.
e.g. from the complete template back to the value display

```typescript
@Component({
  selector: 'any-component',
  template: `
    <ng-container *rxIf="show$; let n; error: error; errorTrg: errorTrigger$">
      <item></item>
    </ng-container>
    <ng-template #error>❌</ng-template>
  `,
})
export class AppComponent {
  num$ = this.state.show$;
  errorTrigger$ = this.state.error$;
}
```

#### Showing the `complete` template

We can use the `completeTrg` input to switch back from any template to display the actual value.
e.g. from the complete template back to the value display

```typescript
@Component({
  selector: 'any-component',
  template: `
    <ng-container
      *rxIf="show$; complete: complete; completeTrg: completeTrigger$"
    >
      <item></item>
    </ng-container>
    <ng-template #complete>✔</ng-template>
  `,
})
export class AppComponent {
  num$ = this.state.show$;
  completeTrigger$ = this.state.success$;
}
```

#### Showing the `suspense` template

We can use the `suspenseTrg` input to switch back from any template to display the actual value.
e.g. from the complete template back to the value display

```typescript
@Component({
  selector: 'any-component',
  template: `
    <input (input)="search($event.target.value)" />
    <ng-container
      *rxIf="show$; suspense: suspense; suspenseTrg: suspenseTrigger$"
    >
      <list></list>
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  show$ = this.state.items$.pipe(map((items) => items.length > 0));
  suspenseTrigger$ = new Subject();

  constructor(private state: globalState) {}

  search(str: string) {
    this.state.search(str);
    this.suspenseTrigger$.next();
  }
}
```

#### Using the `contextTrg`

We can use the `contextTrg` input to set any context. It combines the functionality of `suspenseTrg`, `completeTrg` and `errorTrg`
in a convenient way.

```typescript
@Component({
  selector: 'any-component',
  template: `
    <input (input)="search($event.target.value)" />
    <ng-container *rxIf="show$; suspense: suspense; contextTrg: contextTrg$">
      <item></item>
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  show$ = this.state.show$;
  contextTrg$ = new Subject();

  search(str: string) {
    this.state.search(str);
    this.contextTrg$.next(RxNotificationKind.Suspense);
  }
}
```

## Advanced Usage

### Use render strategies (`strategy`)

You can change the used `RenderStrategy` by using the `strategy` input of the `*rxFor`. It accepts
an `Observable<RxStrategyNames>` or [`RxStrategyNames`](https://github.com/rx-angular/rx-angular/blob/b0630f69017cc1871d093e976006066d5f2005b9/libs/cdk/render-strategies/src/lib/model.ts#L52).

The default value for strategy is [`normal`](../../cdk/render-strategies/strategies/concurrent-strategies).

```html
<ng-container *rxIf="showHero$; strategy: 'userBlocking'">
  <app-hero></app-hero>
</ng-container>

<ng-container *rxIf="showHero$; strategy: strategy$">
  <app-hero></app-hero>
</ng-container>
```

```ts
@Component()
export class AppComponent {
  strategy$ = of('immediate');
}
```

Learn more about the general concept of [`RenderStrategies`](../../cdk/render-strategies) especially the section [usage-in-the-template](../../cdk/render-strategies#usage-in-the-template) if you need more clarity.

#### Local strategies and view/content queries (`parent`)

Structural directives maintain `EmbeddedViews` within a components' template.
Depending on the bound value as well as the configured `RxRenderStrategy`, updates processed by the
`@rx-angular/template` directives can be asynchronous.

Whenever a template gets inserted into, or removed from, its parent component, the directive has to inform the parent in order to
update any view- or contentquery (`@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren`).

This is required if your components state is dependent on its view or content children:

- `@ViewChild`
- `@ViewChildren`
- `@ContentChild`
- `@ContentChildren`

The following example will not work with a local strategy because `@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren` will not update.

To get it running with strategies like `local` or `concurrent` strategies we need to set `parent` to `true`. This is given by default.
Set the value to `false` and it will stop working.

```ts
@Component({
  selector: 'app-list-component',
  template: ` <div *rxIf="show$; parent: false"></div> `,
})
export class AppListComponent {}
```

[//]: # 'TODO => Flame chart comparison and numbers'

### Use a renderCallback to run post render processes (`renderCallback`)

A notification channel of `*rxIf` that the fires whenever a change was rendered to the view.

This enables developers to perform actions when rendering has been done.
The `renderCallback` is useful in situations where you
rely on specific DOM properties like the dimensions of an item after it got rendered.

The `renderCallback` emits the latest value causing the view to update.

```typescript
@Component({
  selector: 'app-root',
  template: `
    <app-component>
      <app-item *rxIf="show$; renderCallback: rendered"> </app-item>
    </app-component>
  `,
})
export class AppComponent {
  show$ = state.select('showItem');
  // this emits whenever rxIf finished rendering changes
  rendered = new Subject<boolean>();

  constructor(elementRef: ElementRef<HTMLElement>) {
    rendered.subscribe(() => {
      // item is rendered, we can access its dom now
    });
  }
}
```

### Working with event listeners (`patchZone`)

Event listeners normally trigger zone.
Especially high frequency events can cause performance issues.

For more details read about [NgZone optimizations](../performance-issues/ngzone-optimizations)

```ts
@Component({
  selector: 'any-component',
  template: `
    <div *rxIf="enabled$; patchZone: false" (drag)="itemDrag($event)"></div>
  `,
})
export class AppComponent {
  enabled$ = state.select('enabled');
  // As the part of the template where this function is used as event listener callback
  // has `patchZone` false the all event listeners run ouside zone.
  itemDrag(event: DragEvent) {}
}
```

## Testing

For testing we suggest to switch the CD strategy to `native`.
This helps to exclude all side effects from special render strategies.

### Basic Setup

```typescript
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { LetDirective } from '@rx-angular/template/let';

@Component({
  template: ` <ng-container *rxIf="show$"> visible </ng-container> `,
})
class TestComponent {
  show$: Observable<boolean> = of(true);
}

const setupTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [],
    providers: [
      {
        // don't forget to configure the primary strategy to 'native'
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'native',
        },
      },
    ],
  });

  fixtureComponent = TestBed.createComponent(TestComponent);
  component = fixtureComponent.componentInstance;
  componentNativeElement = component.nativeElement;
};
```

### Set default strategy

> do not forget to set the primary strategy to `native` in test environments

In test environments it is recommended to configure rx-angular to use the [`native` strategy](../../cdk/render-strategies/strategies/basic-strategies#native),
as it will run change detection synchronously.
Using the [`concurrent strategies`](../../cdk/render-strategies/strategies/concurrent-strategies) is possible, but
requires more effort when writing the tests, as updates will be processed asynchronously.

```ts
TestBed.configureTestingModule({
  declarations: [],
  providers: [
    {
      // don't forget to configure the primary strategy to 'native'
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: {
        primaryStrategy: 'native',
      },
    },
  ],
});
```

Here is an example using the `concurrent` strategies in a test environment: [`rxIf strategy spec`](https://github.com/rx-angular/rx-angular/blob/main/libs/template/if/src/lib/tests/if.directive.strategy.spec.ts)

## Resources

**Example applications:**
A demo application is available on [GitHub](https://github.com/tastejs/angular-movies).

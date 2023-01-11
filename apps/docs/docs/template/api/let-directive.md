---
sidebar_label: 'RxLet'
sidebar_position: 1
title: 'RxLet'
---

## Motivation

In Angular there is one way to handle asynchronous values or streams in the template, the `async` pipe.
Even though the async pipe evaluates such values in the template, it is insufficient in many ways.
To name a few:

- it will only update the template when `NgZone` is also aware of the value change
- it leads to over rendering because it can only run global change detection
- it leads to too many subscriptions in the template
- it is cumbersome to work with values in the template

**Access async values in the template: `*ngIf hack`**

The ngIf hack looks like this:

```html
<ng-container *ngIf="observableNumber$ | async as n">
  <app-number [number]="n"></app-number>
  <app-number-special [number]="n"></app-number-special>
</ng-container>
```

The problem is that `*ngIf` interferes with rendering and in case of falsy values (`0`, `''`, `false`, `null`, `undefined`) the component
would be hidden. This issue is a big problem and leads to many production bugs as its edge cases are often overlooked.

**Downsides of the "`ngIf`-hack"**

- Performance issues from the subscriptions in pipe's
- Over rendering
- Boilerplate in the template
- Typings are hard to handle due to `null` and `undefined`
- Inefficient change detection (Evaluation of the whole template)
- New but same values (1 => 1) still trigger change detection
- Edge cases cause unexpected bugs
- No contextual information given

**Conclusion - Structural directives**

In contrast to global change detection, structural directives allow fine-grained control of change detection on a per directive basis.
The `LetDirective` comes with its own way to handle change detection in templates in a very efficient way.
However, the change detection behavior is configurable on a per directive or global basis.
This makes it possible to implement your own strategies, and also provides a migration path from large existing apps running with Angulars default change detection.

This package helps to reduce code used to create composable action streams.
It mostly is used in combination with state management libs to handle user interaction and backend communication.

```html
<ng-container *rxLet="observableNumber$; let n"> ... </ng-container>
```

## Concepts

- [Local variables](../concepts/local-variables.md)
- [Local template](../concepts/local-templates.md)
- [Reactive context](../concepts/reactive-context.md)
- [Render strategies](https://www.rx-angular.io/docs/cdk/render-strategies)

## Features

**DX Features**

- context variables (error, complete, suspense)
- context templates (error, complete, suspense)
- context trigger
- reduces boilerplate (multiple `async` pipe's)
- a unified/structured way of handling `null` and `undefined`
- works also with static variables `*rxLet="42; let n"`

**Performance Features**

- value binding is always present. ('`*ngIf` hack' bugs and edge cases)
- lazy template creation (done by render strategies)
- triggers change-detection on `EmbeddedView` level
- distinct same values in a row (over-rendering)

### Inputs

**Value**

| Input   | Type            | description                                                       |
| ------- | --------------- | ----------------------------------------------------------------- |
| `rxLet` | `Observable<T>` | The Observable or value to be bound to the context of a template. |

**Contextual state**

| Input             | Type                             | description                                                            |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `error`           | `TemplateRef<RxLetViewContext>`  | defines the template for the error state                               |
| `complete`        | `TemplateRef<RxLetViewContext>`  | defines the template for the complete state                            |
| `suspense`        | `TemplateRef<RxLetViewContext>`  | defines the template for the suspense state                            |
| `nextTrigger`     | `Observable<unknown>`            | trigger to show `next` template                                        |
| `errorTrigger`    | `Observable<unknown>`            | trigger to show `error` template                                       |
| `completeTrigger` | `Observable<unknown>`            | trigger to show `complete` template                                    |
| `suspenseTrigger` | `Observable<unknown>`            | trigger to show `suspense` template                                    |
| `contextTrigger`  | `Observable<RxNotificationKind>` | trigger to show any templates, based on the given `RxNotificationKind` |

**Rendering**

| Input            | Type                                                               | description                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `patchZone`      | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` will operate out of `NgZone`. See [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/performance-issues/ngzone-optimizations.md)                                                                                                                                         |
| `parent`         | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. [Handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/performance-issues/handling-view-and-content-queries.md) |
| `strategy`       | `Observable<RxStrategyNames \ string> \ RxStrategyNames \ string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes.                                                                                                                                                                                                                                                                                                    |
| `renderCallback` | `Subject<U>`                                                       | giving the developer the exact timing when the `LetDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                                                                                                                                                                                                              |

### Outputs

n/a

## Setup

The `LetModule` can be imported as following:

Module based setup:

```ts
import { LetModule } from '@rx-angular/template/let';

@NgModule({
  imports: [LetModule],
  // ...
})
export class AnyModule {}
```

Standalone component setup:

```ts
import { LetModule } from '@rx-angular/template/let';

@Component({
  standalone: true,
  imports: [LetModule],
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

### Binding an Observable to a local variable in the template

The `*rxLet` directive makes it easy to work with reactive data streams in the template.
This can be achieved by using Angular's native 'let' syntax `*rxLet="observableNumber$; let n"`.

```html
<ng-container *rxLet="observableNumber$; let n">
  <app-number [number]="n"></app-number>
  <app-number-special [number]="n"></app-number-special>
</ng-container>
```

### Using the reactive context

![Contextual-State--template-vs-variable](https://user-images.githubusercontent.com/10064416/192660150-643c4d37-5326-4ba2-ad84-e079890b3f2f.png)

A nice feature of the `*rxLet` directive is, it provides 2 ways to access the [reactive context state](../concepts/reactive-context.md) in the template:

- context variables
- context templates

### Context Variables

The following context variables are available for each template:

- $implicit: `T` // the default variable accessed by `let val`
- error: `undefined` | `Error`
- complete: `undefined` |`boolean`
- suspense: `undefined` |`true`

You can use the as like this:

```html
<ng-container
  *rxLet="observableNumber$; let n; let s = suspense; let e = error, let c = complete"
>
  {{ s && 'No value arrived so far' }}

  <app-number [number]="n"></app-number>

  There is an error: {{ e ? e.message : 'No Error' }} Observable is completed:
  {{c ? 'Yes' : 'No'}}
</ng-container>
```

### Context Templates

You can also use template anchors to display the [contextual state](../concepts/reactive-context.md) in the template:

```html
<ng-container
  *rxLet="
    observableNumber$; let n;
    error: error;
    complete: complete;
    suspense: suspense;
  "
>
  <app-number [number]="n"></app-number>
</ng-container>

<ng-template #suspense>SUSPENSE</ng-template>
<ng-template #error>ERROR</ng-template>
<ng-template #complete>COMPLETE</ng-template>
```

This helps in some cases to organize the template and introduces a way to make it dynamic or even lazy.

### Context Trigger

![context-templates](https://user-images.githubusercontent.com/4904455/195452228-b2c1c6ac-5046-4cd3-a857-564cf039dd02.gif)

You can also use asynchronous code like a `Promise` or an `Observable` to switch between templates.
This is perfect for e.g. a searchable list with loading spinner.

If applied the trigger will apply the new context state, and the directive will update the local variables, as well as switch to the template if one is registered.

#### Showing the `next` template

We can use the `nextTrg` input to switch back from any template to display the actual value.
e.g. from the complete template back to the value display

```typescript
@Component({
  selector: 'any-component',
  template: `
    <button (click)="nextTrigger$.next()">show value</button>
    <ng-container
      *rxLet="num$; let n; complete: complete; nextTrg: nextTrigger$"
    >
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

This helps in some cases to organize the template and introduces a way to make it dynamic or even lazy.

#### Showing the `error` template

We can use the `errorTrg` input to switch back from any template to display the actual value.
e.g. from the complete template back to the value display

```typescript
@Component({
  selector: 'any-component',
  template: `
    <ng-container *rxLet="num$; let n; error: error; errorTrg: errorTrigger$">
      {{ n }}
    </ng-container>
    <ng-template #error>❌</ng-template>
  `,
})
export class AppComponent {
  num$ = this.state.num$;
  errorTrigger$ = this.state.error$;

  constructor(private state: globalState) {}
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
      *rxLet="num$; let n; complete: complete; completeTrg: completeTrigger$"
    >
      {{ n }}
    </ng-container>
    <ng-template #complete>✔</ng-template>
  `,
})
export class AppComponent {
  num$ = this.state.num$;
  completeTrigger$ = this.state.success$;

  constructor(private state: globalState) {}
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
      *rxLet="
        num$;
        let n;
        let n;
        suspense: suspense;
        suspenseTrg: suspenseTrigger$
      "
    >
      {{ n }}
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  num$ = this.state.num$;
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
    <ng-container
      *rxLet="num$; let n; suspense: suspense; contextTrg: contextTrg$"
    >
      {{ n }}
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
  `,
})
export class AppComponent {
  num$ = this.state.num$;
  contextTrg$ = new Subject();

  constructor(private state: globalState) {}

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
<ng-container *rxLet="item$; let item; strategy: strategy">
  {{ item }}
</ng-container>

<ng-container *rxFor="item$; let item; strategy: strategy$">
  {{ item }}
</ng-container>
```

```ts
@Component()
export class AppComponent {
  strategy = 'low';
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
  template: ` <div *rxLet="state$; let state; parent: false"></div> `,
})
export class AppListComponent {}
```

[//]: # 'TODO => Flame chart comparison and numbers'

### Use a renderCallback to run post render processes (`renderCallback`)

A notification channel of `*rxLet` that the fires when rendering is done.

This enables developers to perform actions based on rendering timings e.g. checking the DOM for the final height or send the LCP time to a tracking server.

It is also possible to use the renderCallback in order to determine if a view should be visible or not.
This way developers can hide a display as long as it has not finished rendering and e.g show a loading spinner.

The result of the `renderCallback` will contain the currently rendered value of in DOM.

```typescript
 @Component({
   selector: 'app-root',
   template: `
   <ng-container *rxLet="num$; let n; renderCallback: valueRendered;">
      {{ n }}
   </ng-container>
   `
 })
 export class AppComponent {
   num$: Observable<number> = of();

   // fires when rxLet finished rendering changes
   valueRendered = new Subject<Item[]>();

  ...

  init() {
    // initializes the process
    this.rxEffects.register(this.valueRendered, () => saveLCPTime());
  }

 }
```

### Working with event listeners (`patchZone`)

Event listeners normally trigger zone. Especially high frequently events cause performance issues.
By using we can run all event listener inside `rxLet` outside zone.

For more details read about [NgZone optimizations](../performance-issues/ngzone-optimizations)

```ts
@Component({
  selector: 'any-component>',
  template: `
    <div
      *rxLet="bgColor$; let bgColor; patchZone: false"
      (mousemove)="calcBgColor($event)"
      [style.background]="bgColor"
    ></div>
  `,
})
export class AppComponent {
  // As the part of the template where this function is used as event listener callback
  // has `patchZone` false the all event listeners run ouside zone.
  calcBgColor(moveEvent: MouseEvent) {
    // do something with the background in combination with the mouse position
  }
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
  template: `
    <ng-container *rxLet="value$; let value">
      {{ value }}
    </ng-container>
  `,
})
class TestComponent {
  value$: Observable<number> = of(42);
}

const setupTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirective, LetDirectiveTestComponent],
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
  declarations: [LetDirective, LetDirectiveTestComponent],
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

Here is an example using the `concurrent` strategies in a test environment: [`rxLet strategy spec`](https://github.com/rx-angular/rx-angular/blob/main/libs/template/let/src/lib/tests/let.directive.strategy.spec.ts)

### Instantiation

```typescript
//...
class TestComponent {
  value$: Observable<number> = of(42);
}

describe('LetDirective', () => {
  beforeEach(setupLetDirectiveTestComponent);

  it('should be instantiable', () => {
    expect(fixtureComponent).toBeDefined();
    expect(testComponent).toBeDefined();
    expect(componentNativeElement).toBeDefined();
    expect(componentNativeElement.innerHTML).toBe('42');
  });
});
```

## Resources

**Example applications:**
A demo application is available on [GitHub](https://github.com/tastejs/angular-movies).

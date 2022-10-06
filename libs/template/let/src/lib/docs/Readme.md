
# Motivation

In Angular there is one way to handle asynchronous values or streams in the template, the `async` pipe.
Even though the async pipe evaluates such values the template, it is insufficient in many ways.
To name a few:
* it will only update the template when `NgZone` is also aware of the value change
* it leads to over rendering because it can only run global change detection
* it leads to too many subscriptions in the template
* it is cumbersome to work with values in the template

## Access values in the template: `*ngIf hack`

The ngIf hack looks like this:

```html
<ng-container *ngIf="observableNumber$ | async as n">
  <app-number [number]="n"></app-number>
  <app-number-special [number]="n"></app-number-special>
</ng-container>
```

The problem is that `*ngIf` interferes with rendering and in case of falsy values (`0`, ``, `false`, `null`, `undefined`) the component
would be hidden. This issue is a big problem and leads to many production bugs as its edge cases are often overlooked.

## Too many subscriptions

A common scenario is to use multiple async pipes to subscribe to either multiple, or the same observable
throughout different parts of a components template.

```html
<div class="item" *ngFor="let item of items$ | async"></div>
<div class="loader" *ngIf="(items$ | async).length > 0"></div>
```

Besides being not readable, it is also very inefficient. Unshared observables will most likely and each `async` 
will definitely run the same code multiple times.

## NgZone

Another thing to consider is, the `AsyncPipe` relies on zone.js to be present and aware of the value change bound to the async pipe. 
It doesn't really trigger change detection by itself. Instead, it marks the component and its parents as dirty, waiting for the Zone to trigger change detection.
This is especially bad for leaf components, as the async pipe will mark the whole component tree as dirty before being able to update the desired template.
Also in case you want to create a zone-less application, the `AsyncPipe` won't work as desired. 

## Summary and other downsides

- Boilerplate in the template
- Typings are hard to handle due to `null` and `undefined`
- Inefficient change detection (Evaluation of the whole template)
- New but same values (1 => 1) still trigger change detection
- Edge cases cause unexpected bugs
- No contextual information given

## Conclusion - Structural directives

In contrast to global change detection, structural directives allow fine-grained control of change detection on a per directive basis.
The `LetDirective` comes with its own way to handle change detection in templates in a very efficient way.
However, the change detection behavior is configurable on a per directive or global basis.
This makes it possible to implement your own strategies, and also provides a migration path from large existing apps running with Angulars default change detection.

This package helps to reduce code used to create composable action streams. 
It mostly is used in combination with state management libs to handle user interaction and backend communication.

```
<ng-container *rxLet="observableNumber$; let n">
 ...
</ng-container>
```

# Concepts

- [Local variables](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/concepts/local-variables.md) 
- [Local template]()
- [Reactive context](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/concepts/reactive-context.md)
- [Contextual state in the template](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/concepts/contextual-state-in-the-template.md)
- [Handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/concepts/handling-view-and-content-queries.md)
- [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/concepts/ngzone-optimizations.md)
- [Render strategies](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md) especially the section [usage-in-the-template](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md#usage-in-the-template)

# Features

**DX Features**

- context variables (error, complete, suspense)
- context templates (error, complete, suspense)
- Template trigger
- reduces boilerplate (multiple `async` pipe's
- a unified/structured way of handling `null` and `undefined`
- works also with static variables `*rxLet="42; let n"`

**Inputs**

| Input            | Type                                                               | description                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `error`          | `TemplateRef<RxLetViewContext>`                                    | defines the template for the error state                                                                                                                                                                |
| `complete`       | `TemplateRef<RxLetViewContext>`                                    | defines the template for the complete state                                                                                                                                                             |
| `suspense`       | `TemplateRef<RxLetViewContext>`                                    | defines the template for the suspense state                                                                                                                                                             |
| `nextTrg`        | `Observable<unknown>`                                              | trigger to show `next` template                                                                                                                                                                         |
| `errorTrg`       | `Observable<unknown>`                                              | trigger to show `error` template                                                                                                                                                                        |
| `completeTrg`    | `Observable<unknown>`                                              | trigger to show `complete` template                                                                                                                                                                     |
| `suspenseTrg`    | `Observable<unknown>`                                              | trigger to show `suspense` template                                                                                                                                                                     |
| `templateTrg`    | `Observable<RxNotificationKind>`                                   | trigger to show any templates, based on the given `RxNotificationKind`                                                                                                                                  |
| `patchZone`      | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` will operate out of `NgZone`                                                                                                                    |
| `parent`         | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. |
| `renderCallback` | `Subject<U>`                                                       | giving the developer the exact timing when the `LetDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                              |
| `strategy`       | `Observable<RxStrategyNames \ string> \ RxStrategyNames \ string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes                                                                                                                     |


**Outputs**

n/a

**Performance Features**

- value binding is always present. ('`*ngIf` hack' bugs and edge cases)
- lazy template creation (done by render strategies) 
- triggers change-detection on `EmbeddedView` level
- distinct same values in a row (over-rendering)
- view memoization

# Setup

The `LetModule` can be imported as following:

Module based setup:
```
import { LetModule } from "@rx-angular/template/let";

@NgModule({
  imports: [ LetModule ],
  // ...
})
export class AnyModule {}
```

Standalone component setup:
```
import { LetModule } from "@rx-angular/template/let";

@NgComponent({
    standalone: true,
    imports: [ LetModule ],
    template: `...`
})
export class AnyComponent {}
```

# Basic Usage

> **⚠ Notice:**  
> By default `*rxLet` is optimized for performance out of the box.
> 
> This includes:
> - The default render strategy is [`normal`](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md).  
>   This ensures non-blocking rendering but can cause other side-effects. See [strategy configuration](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md#Default-configuration) if you want to change it. 
> - Creates templates lazy and manages multiple template instances

## Binding an Observable to a local variable in the template

The `*rxLet` directive makes it easy to work with reactive data streams in the template.
This can be achieved by using Angular's native 'let' syntax `*rxLet="observableNumber$; let n"`.

```html
<ng-container *rxLet="observableNumber$; let n">
  <app-number [number]="n"></app-number>
  <app-number-special [number]="n"></app-number-special>
</ng-container>
```

## Using the reactive context

![Contextual-State--template-vs-variable](https://user-images.githubusercontent.com/10064416/192660150-643c4d37-5326-4ba2-ad84-e079890b3f2f.png)

A nice feature of the `*rxLet` directive is, it provides 2 ways to access the [reactive context state]() in the tempalte:
- local variables
- templates

### Context Variables
 
The following context variables are available for each template:
 
 - $implicit: `T` // the default variable accessed by `let val`
 - error: `undefined` | `Error`
 - complete: `undefined` |`boolean`
 - suspense: `undefined` |`true` 
 
 You can use the as like this:
 
```html
<ng-container *rxLet="observableNumber$; let n; let s = suspense; let e = error, let c = complete">
    {{ s && 'No value arrived so far' }}    

    <app-number [number]="n"></app-number>

    There is an error: {{ e ? e.message : 'No Error' }}
  
    Observable is completed: {{c ? 'Yes' : 'No'}}
</ng-container>
```

### Context Templates

You can also use template anchors to display the [contextual state]() in the template:

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

This helps in some cases to organize the template and introduces a way to make the dynamic or even lazy.

### Context Trigger

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
     *rxLet="
       num$; let n;
       let n;
       complete: complete
       nextTrg: nextTrigger$
    ">
      {{n}}
    </ng-container>
    <ng-template #complete>✔</ng-template>
   `
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
    <ng-container
     *rxLet="
       num$; let n;
       let n;
       error: error
       errorTrg: errorTrigger$
    ">
      {{n}}
    </ng-container>
    <ng-template #error>❌</ng-template>
   `
 })
 export class AppComponent {
  num$ = this.state.num$;
  errorTrigger$ = this.state.error$;
  
  constructor(private state: globalState) {

  }

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
     *rxLet="
       num$; let n;
       let n;
       complete: complete
       completeTrg: completeTrigger$
    ">
      {{n}}
    </ng-container>
    <ng-template #complete>✔</ng-template>
   `
 })
 export class AppComponent {
  num$ = this.state.num$;
  completeTrigger$ = this.state.success$;
  
  constructor(private state: globalState) {

  }

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
       num$; let n;
       let n;
       suspense: suspense
       suspenseTrg: suspenseTrigger$
    ">
      {{n}}
    </ng-container>
    <ng-template #suspense>loading...</ng-template>
   `
 })
 export class AppComponent {
    num$ = this.state.num$;
    suspenseTrigger$ = new Subject();
    
    constructor(private state: globalState) {
    
    }

    search(str: string) {
      this.state.search(str);
      this.suspenseTrigger$.next();
    }

}
```

# Advanced Usage

 ## Use render strategies (`strategy`)
 
 Let' see how we can work with strategies in the template.
 If you are not familiar with this concept, you can read more details on [render strategies](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md) especially the section [usage-in-the-template](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md#usage-in-the-template) if you need more clarity. 

`*rxLet` accepts static values e.g. `number`   
 
```html
 <ng-container *rxLet="num; let n;
    strategy:'native'
    ">
     {{ n }}    
 </ng-container>
 ```

as well as `Observable<number>`, `Promise<number>` or any other 'subscribale'.

```html
 <ng-container *rxLet="num$; let n;
    strategy:'native'
    ">
     {{ n }}    
 </ng-container>
 ```

This is especially interesting as we can enrich rendering with e.g. awareness of the viewport and make it even more lazy see [viewport-priority]().

## Use a renderCallback to run post render processes (`renderCallback`)

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

# Testing

## Basic Setup

```typescript
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { LetDirective } from '../let.directive';

@Component({
  template: `
    <ng-container *rxLet="value$; let value;">
      {{value}}
    </ng-container>
  `,
})
class TestComponent {
  value$: Observable<number> = of(42);
}

const setupTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirective, LetDirectiveTestComponent],
    providers: [ TemplateRef, ViewContainerRef ],
    teardown: { destroyAfterEach: true }
  });

  fixtureComponent = TestBed.createComponent(TestComponent);
  component = fixtureComponent.componentInstance;
  componentNativeElement = component.nativeElement;
};

```
           
## Instantiation
           
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



# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/tastejs/angular-movies).

# Motivation

In Angular there are no out of the box ways to handle asyncronouse values in the template.
Even though the async pipe is a way to evaluate and update the template if a change arrives it is insufficient in many ways.
Many developers tend to use the so called "*ngIf hack" to bind async values to a context variable in the template.

## Problems with `async` and `*ngIf`

The ngIf hack looks like this:
```html
<ng-container *ngIf="observableNumber$ | async as n">
  <app-number [number]="n"></app-number>
  <app-number-special [number]="n"></app-number-special>
</ng-container>
```

The problem is that `*ngIf` interferes with rendering and in case of falsy values (`0`, ``, `false`, `null`, `undefined`) the component
would be hidden. This issue is a big problem and leads to many production bugs as it's edge cases are often overlooked.

Another thing to consider is, the `AsyncPipe` relies on zone.js to be present - it doesn't really trigger change detection by itself.
It marks the component and its children as dirty waiting for the Zone to trigger change detection. So, in case you want to create a zone-less application, the `AsyncPipe` won't work as desired. 

**Downsides: **
- Boilerplate in the template
- Typings are hard to handle due to `null` and `undefined`
- Inefficient change detection (Evaluation of the whole template)
- New but same values (1 => 1) still trigger change detection
- Edge cases cause unexpected bugs
- No contextual information given

The `LetDirective` comes with it's own way to handle change detection in a very efficient way.
In addition, the directive is configurable in a way where you can change the way change detection is done.
This can bring not only great new features in, but also provides a migration path from large existing apps running with Angular's default change detection.

## Solution - Structural directives

This package helps to reduce code used to create composable action streams. 
It mostly is used in combination with state management libs to handle user interaction and backend communication.

```
<ng-container *rxLet="observableNumber$; let n">
 ...
</ng-container>
```

# Concepts

## Reactive context

![Reactive-Context](https://user-images.githubusercontent.com/10064416/192658822-67b51256-1c4a-49c7-8c48-6040b666d8a6.png)

As asynchronous values to have special states.
Those states are always hard to handle and produce brittle code, especially in the tenplate.

In short, we can handle the following states in the template:
- suspense state
- error occurrence
- complete occurrence

Read detailed information about the [reactive state]([reactive context](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/reactive-context.md) in our docs. 

## Contextual state in the template

![Contextual-State](https://user-images.githubusercontent.com/10064416/192659019-279925c4-bb85-44df-a6e3-7d160fdb1874.png)

Contextual template state is [reactive context]() accessible in the template. This can help to handle loading spinner, error and success messages. 

## Local variables
   
Angular provides a way to bind values to the template. 
For example this can be done on 2 ways, the 'as syntax' `num$ | async as num` and the 'let syntax' `*rxLet="num$; let num"`.

Both ways can reduce the usage of pipes the `async` pipe (or any other pipe).
 
**With `async` pipe**

```html
<ng-container>
    {{ n | async }} {{ n | async}} {{ n | async}}    
</ng-container>
```

**With `*rxLet` directive**

```html
<ng-container *rxLet="num$; let n;">
    {{ n }} {{ n }} {{ n }}    
</ng-container>
```

With directive's we can now provide custom values to the consumer.
 Angular does this in e.g. the `*ngFor` directive with local variables like `even` or `odd`.  

``` 
<ng-container *ngFor="let item in list; let e = even">
    even: {{ e }}    
<ng-container/>
```

## Template Slots

@TODO

# Features

**DX Features**

Local Variables
- error, complete, suspense
- reduces boilerplate (multiple `async` pipe's
- a unified/structured way of handling `null` and `undefined`
- works also with static variables `*rxLet="42; let n"`

Inputs
- @TODO

Outputs
- @TODO

**Performance Features**

- value binding is always present. ('`*ngIf` hack' bugs and edge cases)
- lazy template creation (done by render strategies) 
- triggers change-detection on `EmbeddedView` level
- distinct same values in a row (over-rendering)

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
> - The default render strategy is [`normal`](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md). This ensures non-blocking rendering. See [strategy configuration](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md#Default-configuration) if you want to change it. 
> - Runs the `EmbeddedView` creation outside of `NgZone`. See [how to opt-in to `NgZone`](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md) if you want to change it.
> - Creates templates lazy and manages multiple template instances
> 

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

## Using the reactive context over local variables
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

### Templates

You can also use template anchors to display the [contextual state]() in the template:

```html
<ng-container
 rxLet="
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

## Fix projected view rendering (`parent`)

Imagine the following situation:

```ts
@Component({
  selector: 'app-list-component',
  template: `
    <ng-content select="app-list-item"></ng-content>
  `
})
export class AppListComponent {
 @ContentChildren(AppListItemComponent) appListItems: QueryList<AppListItemComponent>
}
```

`AppListComponent` has a `contentOutlet` where it expects `AppListItemComponents` to be inserted into. 
In this case `AppListComponent`s state is dependent on its `ContentChildren`.
This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views, otherwise it will not update.

This is a known issue which has never been solved for structural directives.
Especially in combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)

`RxLet` solves this issue for you by providing a simple input parameter `parent: boolean`.
If set to `true`, it will automatically detect every other `Component` where its `EmbeddedView`s were inserted into. 
Those components will get change detected as well in order to update their state accordingly.

The usage of `AppListComponent` looks like this:

```html
<app-list-component>
  <app-list-item
    *rxLet="
      num$; let n;
      parent: true;
    "
  >
    <div>{{ n }}</div>
  </app-list-item>
</app-list-component>
```
   
### Handle un-patched event template bindings (`NgZone`)

By default `*rxLet` will create it's `EmbeddedView` outside of `NgZone` which drastically speeds up the
performance.
There are scenarios where you want to opt-in to `NgZone` though. If views are created out of `NgZone`, all
`EventListeners` attached to them run out `NgZone` as well.

Take a look at the following example:

```ts
@Component({
  selector: 'app-root',
  template: `
    <!-- clickedHeroName won't get updated due to `NgZone` not noticing the click -->
    {{ clickedHeroName }}
    <!-- click runs out of `NgZone` -->
    <button *rxLet="heroes$; let hero" 
    (click)="heroClicked(hero)">
      {{ hero.name }}
    </button>
  `
})
export class AppComponent {
  clickedHeroName = '';

  heroClicked(hero: Hero) {
    // this will run out of `NgZone` and thus not update the DOM
    this.clickedHeroName = hero.name;
  }
}
```

There are several ways to get around this issue.
`*rxLet` can be configured to create views inside of `NgZone` with the `patchZone` flag:

```html
<!-- click now gets detected by `NgZone` -->
<button *rxLet="heroes$; let hero; patchZone: true"
    (click)="heroClicked(hero)">
    {{ hero.name }}
</button>
```

However, `patchZone: true` can in some cases have a negative impact on the performance of the `*rxLet` Directive.
Since the creation of the `EmbeddedViews` will most likely happen in batches, every batch will result in one
`NgZone` cycle resulting in a possible re-rendering of many other `Components`.

Another approach would be to manually detect changes coming from `unpatched` EventListeners or wrapping them in
`NgZone`.

```ts
export class AppComponent {
  clickedHeroName = '';

  constructor(
    private cdRef: ChangeDetectorRef, // option1
    private ngZone: NgZone // option 2
  ) {}

  heroClicked(hero: Hero) {
    // this will run out of `NgZone` and thus not update the DOM
    this.clickedHeroName = hero.name;
    this.cdRef.markForCheck(); // option 1

    // option 2
    this.ngZone.run(() => this.clickedHeroName = hero.name);
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

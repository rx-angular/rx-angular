# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/tastejs/angular-movies).

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

## Contextual template state
![Contextual-State](https://user-images.githubusercontent.com/10064416/192659019-279925c4-bb85-44df-a6e3-7d160fdb1874.png)
Contextual template state is [reactive context]() as specification. This could also be visualized in component templates

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
# Features

**DX Features**

Local Variables
- error, complete, suspense
- reduces boilerplate (multiple `async` pipe's
- a unified/structured way of handling `null` and `undefined`

Inputs
- 

Outputs
- 

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

## Binding an Observable to a local variable in the template

The `*rxLet` directive makes it easy to work with reactive data streams in the template.
This can be achieved by using Angular's native 'let' syntax `*rxLet="observableNumber$; let n"`.

```html
<ng-container *rxLet="observableNumber$; let n">
  <app-number [number]="n"></app-number>
  <app-number-special [number]="n"></app-number-special>
</ng-container>
```

## Using the reactive context over local variables
![Contextual-State--template-vs-variable](https://user-images.githubusercontent.com/10064416/192660150-643c4d37-5326-4ba2-ad84-e079890b3f2f.png)
A nice feature of the `*rxLet` directive is, it provides a set of [local variables]() to access the [reactive context state]() in the tempalte. 

* ### Context Variables
 
  The following context variables are available for each template:
 
 - $implicit: `T` // the default variable accessed by `let val`
 - error: `undefined` | `Error`
 - complete: `undefined` |`boolean`
 - suspense: `undefined` |`true` 
 
 You can use the as likek this:
 
```html
<ng-container *rxLet="observableNumber$; let n; let s = suspense; let e = error, let c = complete">
    {{ s && 'No value arrived so far' }}    

    <app-number [number]="n"></app-number>

    There is an error: {{ e ? e.message : 'No Error' }}
  
    Observable is completed: {{c ? 'Yes' : 'No'}}
</ng-container>
```

## Using the reactive context over custom templates

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

## RenderCallback

 A notification channel of `*rxFor` that the fires when rendering is done.
 
 This enables developers to perform actions based on rendering timings e.g. checking the DOM for the final height or sending a the LCP time to the server.
 
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

## Render Projected Views (`parent`)

Imagine the following situation:

```ts
@Component({
  selector: 'app-list-component',
  template: `
    <ng-content select="app-list-item"></ng-content>
  `
})
export class AppListComponent {
 @ContentChildren(AppListItemComponent) appListItems: QueryList<AppListItemComponent>:
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
      let num of num$;
      parent: true;
    "
  >
    <div>{{ num }}</div>
  </app-list-item>
</app-list-component>
```
   

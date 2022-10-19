# PushPipe

The `push` pipe serves as a drop-in replacement for the `async` pipe.

The current way of binding an observable to the view looks like that:

```html
{{ observable$ | async }}
<ng-container *ngIf="observable$ | async as o">{{ o }}</ng-container>
<component [value]="observable$ | async"></component>
```

## Problems with `async` pipe

`async` pipe just marks the component and all its ancestors as dirty.
It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
components and does not work in zone-less mode.

## Solution

`push` pipe solves that problem. It contains intelligent handling of change detection by leveraging a [RenderStrategy](https://github.com/rx-angular/rx-angular/tree/main/libs/cdk/render-strategies/README.md) under the hood, which in turn, takes care of optimizing the `ChangeDetection` of your component. The `push` pipe can be used in zone-full as well as zone-less mode without any changes to the code.

_Example_

```html
<hero-search [term]="searchTerm$ | push"> </hero-search>
<hero-list-component [heroes]="heroes$ | push"> </hero-list-component>
```

The rendering behavior can be configured per PushPipe instance using the strategy parameter.

_Example_

```html
<hero-search [term]="searchTerm$ | push: 'global'"> </hero-search>
<hero-list-component [heroes]="heroes$ | push: 'global'"> </hero-list-component>
```


## Summary and other downsides

- Boilerplate in the template
- Typings are hard to handle due to `null` and `undefined`
- Inefficient change detection (Evaluation of the whole template)
- New but same values (1 => 1) still trigger change detection
- Edge cases cause unexpected bugs
- No contextual information given


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

- drop in replacement for the `async` pipe
- Take observables or promises, retrieve their values and render the value to the template
- Handling null and undefined values in a clean unified/structured way

**Params**

| Parameter        | Type                                                               | description                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@TODO`     | `@TODO`                                    | @TODO                                                                                                                                                                |

**Performance Features**
- Distinct same values in a row to increase performance
- Coalescing of change detection calls to boost performance
- Lazy rendering
- Chunked rendering

# Setup

The `PushModule` can be imported as following:

Module based setup:
```
import { PushModule } from "@rx-angular/template/push";

@NgModule({
  imports: [ PushModule ],
  // ...
})
export class AnyModule {}
```

Standalone component setup:
```
import { PushModule } from "@rx-angular/template/push";

@NgComponent({
    standalone: true,
    imports: [ PushModule ],
    template: `...`
})
export class AnyComponent {}
```

# Basic Usage

> **⚠ Notice:**  
> By default `push |` is optimized for performance out of the box.
> 
> This includes:
> - The default render strategy is [`normal`](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md).  
>   This ensures non-blocking rendering but can cause other side-effects. See [strategy configuration](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md#Default-configuration) if you want to change it. 
> - Evaluates templates lazy and manages multiple template instances

## Binding an Observable to a local variable in the template

# Advanced Usage

 ## Use render strategies (`strategy`)
 
 Let's see how we can work with strategies in the template.
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

 A notification channel of `*rxLet` that fires when rendering is done.
 
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
@TODO
           
## Instantiation
@TODO

# Resources

**Articles:**  

- https://indepth.dev/posts/1313/angulars-push-pipe-part-1
- https://indepth.dev/posts/1333/angulars-push-pipe-part-2

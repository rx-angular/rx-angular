# Motivation

Rendering large sets of data is and has always been a performance bottleneck, especially for business
applications.

The most common way to render lists in angular is by using the `*ngFor` structural directive. `*ngFor` is able
to take an arbitrary list of data and repeat a defined template per item of the list. However, it can
only do it synchronously. 
In other words, the larger the set of data or the heavier the template to repeat, the more `blocking`
the user experience of your application will be.

The `*rxFor` structural directive provides a convenient and performant way for rendering
templates out of a list of items.

Input values can be provided either as `Observable`, `Promise` or static values.

Compared to the `NgFor`, `RxFor` treats each child template as single renderable unit.
The change detection of the child templates get prioritized, scheduled and executed by
leveraging `RenderStrategies` under the hood.
This technique enables non-blocking rendering of lists and can be referred to as `concurrent mode`.

As each rendering each template will be processed as individual task, rendering can be
cancelled.

Furthermore, `RxFor` provides hooks to react to rendered items in form of a `renderCallback: Subject`.

Together with the `RxRenderStrategies`, this makes the rendering behavior extremely versatile
and transparent for the developer.
Each instance of `RxFor` can be configured to render with different settings.


## Downsides

- Bootstrapping of `ngFor`is slow 
- Change detection and render work processed in a UI blocking way
- Laziness of DOM is not given (slow emplate creation)
- Nested structures are very slow, especially with updates
- Destruction is more computation heavy than adding bootstrapping

# Concepts

- [Local variables](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/concepts/local-variables.md)
- [Handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues/handling-view-and-content-queries.md)
- [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues/ngzone-optimizations.md)
- [Render strategies](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md) especially the section [usage-in-the-template](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md#usage-in-the-template)

# Features

**DX Features**

- reduces boilerplate (multiple `async` pipe's)
- a unified/structured way of handling `null` and `undefined`
- works also with static variables `*rxFor="let i of []"`
- Immutable as well as mutable data structures (`trackBy`)
- Provide a comprehensive set of context variables

**Performance Features**

- lazy template creation (done by render strategies) 
- non-blocking rendering of lists
- configurable frame budget (defaults to 60 FPS)
- triggers change-detection on `EmbeddedView` level
- distinct same values in a row (over-rendering)
- `ListManager`: special logic for differ mechanism to avoid over-rendering; abstracts away low level logic
- cancel any scheduled work if a remove was triggered for a `trackById`
- cancel any update if a new update was triggered for the same `trackById`
- nested lists will items fine grained and re-render only what is needed 

## Inputs

**Rendering**  

| Input            | Type                                                               | description                                                                                                                                                                                                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackBy`        | `keyof T` or `(index: number, item: T) => any`                     | Identifier function for items. `rxFor` provides a shorthand where you can name the property directly.                                                                                                                                                                                                                                                                                   |
| `patchZone`      | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` will operate out of `NgZone`. See [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/performance-issues/ngzone-optimizations.md)                                                                                                                                         |
| `parent`         | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. [Handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/performance-issues/handling-view-and-content-queries.md) |
| `strategy`       | `Observable<RxStrategyNames \ string> \ RxStrategyNames \ string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes.                                                                                                                                                                                                                                                                                                    |
| `renderCallback` | `Subject<U>`                                                       | giving the developer the exact timing when the `LetDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                                                                                                                                                                                                              |

## Outputs

- n/a

## Context Variables

The following context variables are available for each template:

**Static Context Variables (mirrored from `ngFor`)**

| Variable Name | Type            | description                                          |
|---------------|-----------------|------------------------------------------------------|
| `$implicit`   | `T`             | the default variable accessed by `let val`           |
| `index`       | `number`        | current index of the item                            |
| `count`       | `number`        | count of all items in the list                       |
| `first`       | `boolean`       | true if the item is the first in the list            |
| `last`        | `boolean`       | true if the item is the last in the list             |
| `even`        | `boolean`       | true if the item has on even index (index % 2 === 0) |
| `odd`         | `boolean`       | the opposite of even                                 |

**Reactive Context Variables**

| Variable Name | Type                                                           | description                                                                                                                                                                                                       |
|---------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `item$`       | `Observable<T>`                                                | the same value as $implicit, but as `Observable`                                                                                                                                                                  |
| `index$`      | `Observable<number>`                                           | index as `Observable`                                                                                                                                                                                             |
| `count$`      | `Observable<number>`                                           | count as `Observable`                                                                                                                                                                                             |
| `first$`      | `Observable<boolean>`                                          | first as `Observable`                                                                                                                                                                                             |
| `last$`       | `Observable<boolean>`                                          | last as `Observable`                                                                                                                                                                                              |
| `even$`       | `Observable<boolean>`                                          | even as `Observable`                                                                                                                                                                                              |
| `odd$`        | `Observable<boolean>`                                          | odd as `Observable`                                                                                                                                                                                               |
| `select`      | `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>` | returns a selection function which accepts an array of properties to pluck out of every list item. The function returns the selected properties of the current list item as distinct `Observable` key-value-pair. |

# Setup

The `ForModule` can be imported as following:

Module based setup:
```
import { ForModule } from "@rx-angular/template/for";

@NgModule({
  imports: [ ForModule ],
  // ...
})
export class AnyModule {}
```

Standalone component setup:
```
import { ForModule } from "@rx-angular/template/for";

@NgComponent({
    standalone: true,
    imports: [ ForModule ],
    template: `...`
})
export class AnyComponent {}
```

# Basic Usage

> **⚠ Notice:**  
> By default `*rxFor` is optimized for performance out of the box.
> 
> This includes:
> - The default render strategy is [`normal`](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md).  
>   This ensures non-blocking rendering but can cause other side-effects. See [strategy configuration](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-stractgies/src/docs/README.md#Default-configuration) if you want to change it. 
> - Creates templates lazy and manages multiple template instances
> 
> As a list can take larger to render items can appear in batches if concurrent strategies are used. 
> This brings several benefits. e.g. stop rendering in between and navigate away.
> 

## Simple example using `*rxFor` with `Observable` values

```ts
@NgComponent({
    template: `
    <ul>
      <li *rxFor="let item of items$; trackBy: trackItem">{{ item }}</li>
    </ul>
    `
})
export class AnyComponent {
  items$: Observable<Items[]> = getItems();
    
  trackItem(, item) {
    return item.id
  }
}
```

## Simple example using `*rxFor` with simple static values

> **🔥 Perf Tip:**  
> As `rxFor` accepts also static values it can serve as a drop in replacement with an easy find and replace refactoring. 
> 

```typescript
@NgComponent({
    template: `
    <ul>
      <li *rxFor="let item of items; trackBy: trackItem">{{ item }}</li>
    </ul>
    `
})
export class AnyComponent {
  items: Items[] = getItems();
  
  trackItem(, item) {
      return item.id
  }
}
```

## Save code with the `trackBy` shortcut 

> **💡 DX Tip:**  
> As `rxFor` accepts also static values it can serve as a drop in replacement with an easy find and replace refacturing. 
> 
```typescript
@NgComponent({
    template: `
    <ul>
      <li *rxFor="let item of items; trackBy: 'id'">{{ item }}</li>
    </ul>
    `
})
export class AnyComponent {}
```

### Using the static context variables

```html
<ul>
  <li
    *rxFor="
      let item of observableItems$; trackBy: 'id';
      let count = count;
      let index = index;
      let first = first;
      let last = last;
      let even = even;
      let odd = odd;
    "
  >
    <div>{{ count }}</div>
    <div>{{ index }}</div>
    <div>{{ item }}</div>
    <div>{{ first }}</div>
    <div>{{ last }}</div>
    <div>{{ even }}</div>
    <div>{{ odd }}</div>
  </li>
</ul>
```

### Using the reactive context variables

```html
<ul>
  <li
    *rxFor="
      let item of observableItems$; trackBy: 'id';
      let count$ = count$;
      let index$ = index$;
      let first$ = first$;
      let last$ = last$;
      let even$ = even$;
      let odd$ = odd$;
    "
  >
    <div *rxLet="count$; let c">{{ c }}</div>
    ...
  </li>
</ul>
```

# Advanced Usage

### Nested `rxFor` and the `select` variable

This example showcases the `select` view-context function used for deeply nested lists.

```html
<ul>
 <li *rxFor="let hero of heroes$; trackBy: trackItem; let select = select;">
   <div>
     <strong>{{ hero.name }}</strong></br>
     Defeated enemies:
   </div>
    <span *rxFor="let enemy of select(['defeatedEnemies']); trackBy: trackEnemy;">
      {{ enemy.name }}
    </span>
 </li>
</ul>
```

This will significantly improve the performance.

[//]: # (TODO => Flame chart comparison and numbers)

### Local strategies and view and content children (`parent`)

Imagine the following situation:

```ts
@Component({
  selector: 'app-list-component',
  template: ` <ng-content select="app-list-item"></ng-content> `,
})
export class AppListComponent {
  @ContentChildren(AppListItemComponent)
  appListItems: QueryList<AppListItemComponent>;
}
```

`AppListComponent` has a `contentOutlet` where it expects `AppListItemComponents` to be inserted into. In this case `AppListComponent`s state is dependent on its `ContentChildren`.
This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views.
This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)
`RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`. If value is set to `true` (default is `true`), `*rxFor` will run change detection for it's defining `Component`.
This will also update its own view and content queries as well as those of its child components.

The usage of `AppListComponent` looks like this:

```html
<app-list-component>
  <app-list-item
    *rxFor="
      let item of observableItems$;
      parent: true;
    "
  >
    <div>{{ item }}</div>
  </app-list-item>
</app-list-component>
```

Read more about this at [handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues/handling-view-and-content-queries.md)

### Working with event listeners (`patchZone`)

Event listeners normally trigger zone. Especially high frequently events cause performance issues.
By using we can run all event listener inside `rxFor` outside zone. 

For more details read about [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues/ngzone-optimizations.md)

```ts
@Component({
  selector: 'any-component>',
  template: `
    <div *rxFor="let bgColor in bgColor$; patchZone: false" 
    (mousemove)="calcBgColor($event)" [style.background]="bgColor">
    </div>
  `
})
export class AppComponent {
  // As the part of the template where this function is used as event listener callback
  // has `patchZone` false the all event listeners run ouside zone.
  calcBgColor(moveEvent: MouseEvent) {
   // do something with the background in combination with the mouse position
  }
}
```

# Testing

## Handling the scheduling issue

By default `*rxFor` uses the `normal` concurrent strategy which runs change detection asynchronously.
This behavior can lead to unexpected results in test environments.
We recommend to test your templates using the `native` strategy to avoid this problem.

This can be configured as a `StaticProvider`.

**Setting the default strategy**

```ts
export const RX_ANGULAR_TEST_PROVIDER: StaticProvider = {
  provide: RX_RENDER_STRATEGIES_CONFIG,
  useValue: {
    primaryStrategy: 'native',
  },
};
```

**Overriding a strategy**

There will be cases where you have assigned a custom strategy and the `primaryStrategy` setting won't do anything
for you.

In order to still use the `native` strategy in your test environment, you can simply override the custom strategy
with the native one.

```ts
export const RX_ANGULAR_TEST_PROVIDER: StaticProvider = {
  provide: RX_RENDER_STRATEGIES_CONFIG,
  useValue: {
    primaryStrategy: 'native',
    customStrategies: {
      'userBlocking': {
        ...RX_NATIVE_STRATEGIES.native,
        name: 'userBlocking'
      }
    }
  },
};
```

If you have done your desired configuration, declare it in the providers entry of the `TestModule`.

```ts
TestBed.configureTestingModule({
  ...
  providers: [RX_ANGULAR_TEST_PROVIDER],
}).compileComponents();
```

This way, `*rxFor` will use the same rendering strategy used by the Angulars built-in `async` pipe.

# Resources

**Demos:**  
A showcase for [blocking UI as a stackblitz demo](https://stackblitz.com/edit/rx-angular-cdk-demos-c52q34)
Feature demos in our [demos app](https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/template/rx-for)

**Example applications:**  
A real live application using `rxFor` is available on [GitHub](https://github.com/tastejs/angular-movies).

**Design docs, Researches, Case Studies**
This issue documents [how we approached `rxFor`](https://github.com/rx-angular/rx-angular/issues/304)

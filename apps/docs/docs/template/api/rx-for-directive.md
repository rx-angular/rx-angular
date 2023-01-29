---
sidebar_label: 'RxFor'
sidebar_position: 2
title: 'RxFor'
---

## Motivation

The most common way to render lists in angular is by using the `*ngFor` structural directive. `*ngFor` is able
to take an arbitrary list of data and repeat a defined template per item of the list. However, it can
only do it synchronously.

Compared to the `NgFor`, `RxFor` treats each child template as single renderable unit.
The change detection of the child templates get prioritized, scheduled and executed by
leveraging `RenderStrategies` under the hood.
This technique enables non-blocking rendering of lists and can be referred to as `concurrent mode`.

Read more about this in the [strategies section](#rxfor-with-concurrent-strategies).

Furthermore, `RxFor` provides hooks to react to rendered items in form of a `renderCallback: Subject`.

Together with the `RxRenderStrategies`, this makes the rendering behavior extremely versatile
and transparent for the developer.
Each instance of `RxFor` can be configured to render with different settings.

**Downsides**

- Bootstrapping of `ngFor`is slow
- Change detection and render work processed in a UI blocking way
- Laziness of DOM is not given (slow emplate creation)
- Nested structures are very slow, especially with updates
- Destruction is more computation heavy than adding bootstrapping

## Concepts

- [Local variables](../concepts/local-variables.md)
- [Handling view and content queries](../performance-issues/handling-view-and-content-queries.md)
- [NgZone optimizations](../performance-issues/ngzone-optimizations.md)
- [Render strategies](../../cdk/render-strategies/render-strategies.mdx) especially the section [usage-in-the-template](../../cdk/render-strategies#usage-in-the-template)

## Features

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

### Inputs

**Rendering**

| Input            | Type                                                               | description                                                                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trackBy`        | `keyof T` or `(index: number, item: T) => any`                     | Identifier function for items. `rxFor` provides a shorthand where you can name the property directly.                                                                                                                                                                                                   |
| `patchZone`      | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` will operate out of `NgZone`. See [NgZone optimizations](../performance-issues/ngzone-optimizations.md)                                                                                                                                         |
| `parent`         | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. [Handling view and content queries](../performance-issues/handling-view-and-content-queries.md) |
| `strategy`       | `Observable<RxStrategyNames \ string> \ RxStrategyNames \ string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes.                                                                                                                                                                                                                    |
| `renderCallback` | `Subject<U>`                                                       | giving the developer the exact timing when the `LetDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                                                                                                                              |

### Outputs

- n/a

### Context Variables

The following context variables are available for each template:

**Static Context Variables (mirrored from `ngFor`)**

| Variable Name | Type      | description                                          |
| ------------- | --------- | ---------------------------------------------------- |
| `$implicit`   | `T`       | the default variable accessed by `let val`           |
| `index`       | `number`  | current index of the item                            |
| `count`       | `number`  | count of all items in the list                       |
| `first`       | `boolean` | true if the item is the first in the list            |
| `last`        | `boolean` | true if the item is the last in the list             |
| `even`        | `boolean` | true if the item has on even index (index % 2 === 0) |
| `odd`         | `boolean` | the opposite of even                                 |

**Reactive Context Variables**

| Variable Name | Type                                                           | description                                                                                                                                                                                                       |
| ------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item$`       | `Observable<T>`                                                | the same value as $implicit, but as `Observable`                                                                                                                                                                  |
| `index$`      | `Observable<number>`                                           | index as `Observable`                                                                                                                                                                                             |
| `count$`      | `Observable<number>`                                           | count as `Observable`                                                                                                                                                                                             |
| `first$`      | `Observable<boolean>`                                          | first as `Observable`                                                                                                                                                                                             |
| `last$`       | `Observable<boolean>`                                          | last as `Observable`                                                                                                                                                                                              |
| `even$`       | `Observable<boolean>`                                          | even as `Observable`                                                                                                                                                                                              |
| `odd$`        | `Observable<boolean>`                                          | odd as `Observable`                                                                                                                                                                                               |
| `select`      | `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>` | returns a selection function which accepts an array of properties to pluck out of every list item. The function returns the selected properties of the current list item as distinct `Observable` key-value-pair. |

## Setup

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

## Basic Usage

> **⚠ Notice:**
> By default `*rxFor` is optimized for performance out of the box.
>
> This includes:
>
> - The default render strategy is [`normal`](../../cdk/render-strategies/strategies/concurrent-strategies.md).
>   This ensures non-blocking rendering but can cause other side-effects. See [strategy configuration](../../cdk/render-strategies#Default-configuration) if you want to change it.
> - Creates templates lazy and manages multiple template instances
>
> As a list can take larger to render items can appear in batches if concurrent strategies are used.
> This brings several benefits. e.g. stop rendering in between and navigate away.

### Simple example using `*rxFor` with `Observable` values

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

### Simple example using `*rxFor` with simple static values

> **🔥 Perf Tip:**
> As `rxFor` accepts also static values it can serve as a drop in replacement with an easy find and replace refactoring.

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

### Save code with the `trackBy` shortcut

> **💡 DX Tip:**
> As `rxFor` accepts also static values it can serve as a drop in replacement with an easy find and replace refacturing.

```typescript
@NgComponent({
  template: `
    <ul>
      <li *rxFor="let item of items; trackBy: 'id'">{{ item }}</li>
    </ul>
    `,
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

## Advanced Usage

### Use render strategies (`strategy`)

You can change the used `RenderStrategy` by using the `strategy` input of the `*rxFor`. It accepts
an `Observable<RxStrategyNames>` or [`RxStrategyNames`](https://github.com/rx-angular/rx-angular/blob/b0630f69017cc1871d093e976006066d5f2005b9/libs/cdk/render-strategies/src/lib/model.ts#L52).

The default value for strategy is [`normal`](../../cdk/render-strategies/strategies/concurrent-strategies.md).

```html
<ng-container *rxFor="let item of items; strategy: strategy">
  {{ item }}
</ng-container>

<ng-container *rxFor="let item of items; strategy: strategy$">
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

When local rendering strategies are used, we need to treat view and content queries in a
special way.
To make `*rxFor` in such situations, a certain mechanism is implemented to
execute change detection on the parent (`parent`).

This is required if your components state is dependent on its view or content children:

- `@ViewChild`
- `@ViewChildren`
- `@ContentChild`
- `@ContentChildren`

Imagine the following situation:

```ts
@Component({
  selector: 'app-list-component',
  template: ` <ng-content select="app-list-item"></ng-content>`,
})
export class AppListComponent {
  @ContentChildren(AppListItemComponent)
  appListItems: QueryList<AppListItemComponent>;
}
```

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

Read more about this at [handling view and content queries](../performance-issues/handling-view-and-content-queries.md)

#### RxFor with concurrent strategies

The `*rxFor` directive is configured to use the `normal` [concurrent strategy](../../cdk/render-strategies/strategies/concurrent-strategies.md)
by default.

Rendering large sets of data is and has always been a performance bottleneck, especially for business
applications.

![common problem](https://user-images.githubusercontent.com/4904455/197066807-aecdadf2-16bf-48a6-b68a-514ebdcdffe0.png)

The most common way to render lists in angular is by using the `*ngFor` structural directive. `*ngFor` is able
to take an arbitrary list of data and repeat a defined template per item of the list. However, it can
only do it synchronously.
In other words, the larger the set of data or the heavier the template to repeat, the more `blocking`
the user experience of your application will be.

![blocking ng-for](https://user-images.githubusercontent.com/4904455/197066870-06bcf36b-9eda-4d9e-9582-102f2830d24e.png)

The `*rxFor` structural directive provides a convenient and performant way for rendering
templates out of a list of items.

Input values can be provided either as `Observable`, `Promise` or static values.

Compared to the `NgFor`, `RxFor` treats each child template as single renderable unit.
The change detection of the child templates get prioritized, scheduled and executed by
leveraging `RenderStrategies` under the hood.
This technique enables non-blocking rendering of lists and can be referred to as `concurrent mode`.

![rxFor improvement](https://user-images.githubusercontent.com/4904455/197066981-2fe2d688-1767-4985-a504-3645a65d9039.png)
![rxFor usage](https://user-images.githubusercontent.com/4904455/197067044-ad1cc431-0d5d-4cab-b5e0-d74decad7dda.png)

As rendering of each template will be processed as individual task, rendering can be
cancelled.

### Use the `renderCallback`

The `renderCallback` can be seen as `hook` into the change detection system.
It's essentially a `Subject` which emits whenever \*rxFor finished rendering a set changes to the view.
This enables developers to perform actions when a list has finished rendering.
The `renderCallback` is useful in situations where you rely on specific DOM properties like the `height` a
table after all items got rendered, or to adjust scroll-positions.
It is also possible to use the `renderCallback` in order to determine if a view should be visible or not. This
way developers can hide a list as long as it has not finished rendering.

The result of the `renderCallback` will contain the currently rendered set of items in the iterable.

```ts
@Component({
  selector: 'app-root',
  template: `
    <app-list-component>
      <app-list-item
        *rxFor="
          let item of items$;
          trackBy: trackItem;
          renderCallback: itemsRendered
        "
      >
        <div>{{ item.name }}</div>
      </app-list-item>
    </app-list-component>
  `,
})
export class AppComponent {
  items$: Observable<Item[]> = itemService.getItems();
  trackItem = (idx, item) => item.id;
  // this emits whenever rxFor finished rendering changes
  itemsRendered = new Subject<Item[]>();

  constructor(elementRef: ElementRef<HTMLElement>) {
    itemsRendered.subscribe(() => {
      // items are rendered, we can now scroll
      elementRef.scrollTo({ bottom: 0 });
    });
  }
}
```

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

[//]: # 'TODO => Flame chart comparison and numbers'

### Working with event listeners (`patchZone`)

A flag to control whether *rxFor templates are created within `NgZone` or not.
The default value is `true, `*rxFor`will create it's`EmbeddedViews`inside`NgZone`.

Event listeners normally trigger zone. Especially high frequently events cause performance issues.

For more details read about [NgZone optimizations](../performance-issues/ngzone-optimizations.md)

```ts
@Component({
  selector: 'any-component>',
  template: `
    <div
      *rxFor="let bgColor; in: bgColor$; patchZone: false"
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

### Handling the scheduling issue

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
      userBlocking: {
        ...RX_NATIVE_STRATEGIES.native,
        name: 'userBlocking',
      },
    },
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

## Resources

**Demos:**
A showcase for [blocking UI as a stackblitz demo](https://stackblitz.com/edit/rx-angular-cdk-demos-c52q34)
Feature demos in our [demos app](https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/template/rx-for)

**Example applications:**
A real live application using `rxFor` is available on [GitHub](https://github.com/tastejs/angular-movies).

**Design docs, Researches, Case Studies**
This issue documents [how we approached `rxFor`](https://github.com/rx-angular/rx-angular/issues/304)

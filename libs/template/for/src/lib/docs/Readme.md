# Motivation

The `*rxFor` structural directive provides a convenient and performant way for rendering
templates out of a list of items.

Input values can be provided either as `Observable`, `Promise` or static values.

Compared to the `NgFor`, `RxFor` treats each child template as single renderable unit. Rendering cycles of child templates get prioritized, scheduled and executed by `RenderStrategies`. This technique enables non-blocking rendering of lists and can be referred to as `concurrent mode`.

Each template getting processed as individual task does also mean, rendering can be cancelled and rendered items will be rendered in chunks.

Furthermore, `RxFor` provides access to the rendering cycle and informs about any event happening in form of a `renderCallback`.

However, the rendering behavior is fully configurable and transparent for the developer. Each instance of `RxFor` can be configured to render with different settings.


## Downsides

TBD

## Conclusion

TBD

# Concepts

- [Local variables](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/concepts/local-variables.md)
- [Handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues/handling-view-and-content-queries.md)
- [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/performance-issues/ngzone-optimizations.md)
- [Render strategies](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md) especially the section [usage-in-the-template](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/README.md#usage-in-the-template)


# Concepts

- [Local variables](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/concepts/local-variables.md) 
- [Local template](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/concepts/local-templates.md)
- [Reactive context](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/concepts/reactive-context.md)
- [Contextual state in the template](https://github.com/rx-angular/rx-angular/blob/main/libs/template/docs/concepts/contextual-state-in-the-template.md)
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
- triggers change-detection on `EmbeddedView` level
- distinct same values in a row (over-rendering)
- `ListManager`: special logic for differ mechanism to avoid over-rendering; abstracts away low level logic
- cancel any scheduled work if a remove was triggered for a `trackById`
- cancel any update if a new update was triggered for the same `trackById`
- nested lists will items fine grained and re-render only what is needed 

## Inputs

**Default functionality**

| Input            | Type                                                               | description                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackBy`        | `keyof T` or `(index: number, item: T) => any`                     | Identifier function for items. `rxFor` provides a shorthand where you can name the property directly.                                                                                                                    |

**Rendering**  

| Input            | Type                                                               | description                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `patchZone`      | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` will operate out of `NgZone`. See [NgZone optimizations](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/performance-issues/ngzone-optimizations.md)                                                                                                                    |
| `parent`         | `boolean`                                                          | _default: `true`_ if set to `false`, the `LetDirective` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. [Handling view and content queries](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/performance-issues/handling-view-and-content-queries.md) |
| `strategy`       | `Observable<RxStrategyNames \ string> \ RxStrategyNames \ string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes.                                                                                                                     |
| `renderCallback` | `Subject<U>`                                                       | giving the developer the exact timing when the `LetDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                            |

## Outputs

- n/a

## Context Variables

The following context variables are available for each template:

| Variable Name    | Type                                                               | description                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$implicit`      | `T`                                                          | the default variable accessed by `let val`                                                                                                                    |
| `item$`      | `Observable<T>`                                                          | the same value as $implicit, but as `Observable`                                                                                                                    |
| `index`      | `number`                                                          | current index of the item                                                                                                                    |
| `count`      | `number`                                                          | count of all items in the list                                                                                                                    |
| `first`      | `boolean`                                                          | true if the item is the first in the list                                                                                                                    |
| `last`      | `boolean`                                                          | true if the item is the last in the list                                                                                                                    |
| `even`      | `boolean`                                                          | true if the item has on even index (index % 2 === 0)                                                                                                                    |
| `odd`      | `boolean`                                                          | the opposite of even                                                                                                                    |
| `index$`      | `Observable<number>`                                                          | index as `Observable`                                                                                                                    |
| `count$`      | `Observable<number>`                                                          | count as `Observable`                                                                                                                    |
| `first$`      | `Observable<boolean>`                                                          | first as `Observable`                                                                                                                    |
| `last$`      | `Observable<boolean>`                                                          | last as `Observable`                                                                                                                    |
| `even$`      | `Observable<boolean>`                                                          | even as `Observable`                                                                                                                    |
| `odd$`      | `Observable<boolean>`                                                          | odd as `Observable`                                                                                                                    |
| `select`      | `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>`               | returns a selection function which accepts an array of properties to pluck out of every list item. The function returns the selected properties of the current list item as distinct `Observable` key-value-pair. |

# Setup

The `ForModule` can be imported as following:

Module based setup:
```
import { ForModule } from "@rx-angular/template/let";

@NgModule({
  imports: [ ForModule ],
  // ...
})
export class AnyModule {}
```

Standalone component setup:
```
import { ForModule } from "@rx-angular/template/let";

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

## Simple example using `*rxFor` with `Observable` values

```html
<ul>
  <li *rxFor="let item of observableItems$; trackBy: trackItem">{{ item }}</li>
</ul>
```

## Simple example using `*rxFor` with simple static values

```html
<ul>
  <li *rxFor="let item of items; trackBy: trackItem">{{ item }}</li>
</ul>
```

### Using the context variables

```html
<ul>
  <li
    *rxFor="
      let item of observableItems$;
      let count = count;
      let index = index;
      let first = first;
      let last = last;
      let even = even;
      let odd = odd;
      trackBy: trackItem;
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

### Projected Views (`parent`)

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
This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views. This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428) `RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`. If value is set to `true` (default is `true`), `*rxFor` will automatically detect every other `Component` where its `EmbeddedView`s were inserted into. Those components will get change detected as well in order to force update their state accordingly.

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

# Testing

For testing we suggest to switch the CD strategy to `native`. 
This helps to exclude all side effects from special render strategies.

# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/tastejs/angular-movies).

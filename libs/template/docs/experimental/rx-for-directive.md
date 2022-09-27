## RxFor Directive

The `*rxFor` structural directive provides a convenient and performant way for rendering
templates out of a list of items.

Input values can be provided either as `Observable`, `Promise` or static values.

Compared to the `NgForOf`, `RxFor` treats each child template as single renderable unit. Rendering cycles of child templates get prioritized, scheduled and executed by `RenderStrategies`. This technique enables non-blocking rendering of lists and can be referred to as `concurrent mode`.

Each template getting processed as individual task does also mean, rendering can be cancelled and rendered items will be rendered in chunks.

Furthermore, `RxFor` provides access to the rendering cycle and informs about any event happening in form of a `renderCallback`.

However, the rendering behavior is fully configurable and transparent for the developer. Each instance of `RxFor` can be configured to render with different settings.


### Features of `*rxFor`

Included features for `*rxFor`:

- Push based architecture
- Immutable as well as mutable data structures (`trackBy`)
- Provide a comprehensive set of context variables for each view
- Provide a way to fix `ChangeDetection` issues in `Projected Views` scenarios
- Notify about when rendering of child templates is finished (`renderCallback`)
- Reactive as well as imperative values in the template (`ngFor` drop-in replacement)
- `ListManager`: special logic for differ mechanism to avoid over-rendering; abstracts away low level logic
- render every `EmbeddedView` on its own while applying the configured `RxStrategyCredentials#behavior`
- cancel any scheduled work if a remove was triggered for a `trackById`
- cancel any update if a new update was triggered for the same `trackById`

### Simple example using `*rxFor` with `Observable` values

```html
<ul>
  <li *rxFor="let item of observableItems$; trackBy: trackItem">{{ item }}</li>
</ul>
```

### Simple example using `*rxFor` with simple static values

```html
<ul>
  <li *rxFor="let item of items; trackBy: trackItem">{{ item }}</li>
</ul>
```

### Context Variables

The following context variables are available for each template:

- $implicit: `T` the default variable accessed by `let val`
- item$: `Observable<T>` the same value as $implicit, but as `Observable`
- index: `number` current index of the item
- count: `number` count of all items in the list
- first: `boolean` true if the item is the first in the list
- last: `boolean` true if the item is the last in the list
- even: `boolean` true if the item has on even index (index % 2 === 0)
- odd: `boolean` the opposite of even
- index$: `Observable<number>` index as `Observable`
- count$: `Observable<number>` count as `Observable`
- first$: `Observable<boolean>` first as `Observable`
- last$: `Observable<boolean>` last as `Observable`
- even$: `Observable<boolean>` even as `Observable`
- odd$: `Observable<boolean>` odd as `Observable`
- select: `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>` returns a selection function which accepts an array of properties to pluck out of every list item. The function returns the selected properties of the current list item as distinct `Observable` key-value-pair. See the example below:

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

### Input properties

- trackBy: `(index: number, item: T) => any`
- trackBy: `keyof T`
- strategy: `string`
- strategy: `Observable<string>`
- parent: `boolean`;
- renderCallback: `Subject<T[]>`

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

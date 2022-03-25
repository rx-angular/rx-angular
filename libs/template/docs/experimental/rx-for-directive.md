## RxFor Directive

The `*rxFor` structural directive provides a convenient and performant way for rendering
templates out of a list of items.

Input values can be provided either as `Observable`, `Promise` or `static` values. Just as the `*ngFor` directive, the `*rxFor` is placed on an element, which becomes the parent of the cloned templates.

The `RxFor` implements `EmbeddedView Rendering`. Compared to the `NgForOf`, `RxFor` treats each child template as single renderable entity. For each change in the provided list of items it will apply and detect changes to only affected views.

Under the hood, it leverages the power of the `StrategyCredential`s which in turn take care of scheduling and prioritizing the change detection for each child template (aka item in the list). This way the rendering behavior of each instance of `RxFor` can be configured individually.

`RxStrategyCredentials` and `EmbeddedView Rendering` together build the basis for the `concurrent mode`. Based on the configured strategy every template will get processed in an individual task, which enables chunked and cancellable rendering of the list.

As further improvement compared to the basic `*ngFor` implementation, `*rxFor` is able to take care of `ChangeDetection` in situations which include `projected views` (aka `@ContentChild` or `@ViewChild`).

### Features of `*rxFor`

Included features for `*rxFor`:

- Push based architecture
- Immutable as well as mutable data structures (`trackBy`)
- Provide a comprehensive set of context variables for each view
- Provide a way to fix `ChangeDetection` issues in `Projected Views` scenarios
- automatically runs out of `NgZone`, provide an easy way to opt-in (`patchZone`)
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
This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views. This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428) `RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`. If set to `true`, `*rxFor` will automatically detect every other `Component` where its `EmbeddedView`s were inserted into. Those components will get change detected as well in order to force update their state accordingly.

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

### `NgZone` patch

By default `*rxFor` will create it's `EmbeddedViews` outside of `NgZone` which drastically speeds up the performance. There are scenarios where you want to opt-in to `NgZone` though. If views are created out of `NgZone`, all `EventListeners` attached to them run out `NgZone` as well.

Take a look at the following example:

```ts
@Component({
  selector: 'app-root',
  template: `
    <!-- clickedHeroName won't get updated due to `NgZone` not noticing the click -->
    {{ clickedHeroName }}
    <ng-container *rxFor="let hero of heroes$; trackBy: trackHero">
      <!-- click runs out of `NgZone` -->
      <button (click)="heroClicked(hero)">{{ hero.name }}</button>
    </ng-container>
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

There are several ways to get around this issue. `*rxFor` can be configured to create views inside of `NgZone` with the `patchZone` flag:

```html
<ng-container *rxFor="let hero of heroes$; trackBy: trackHero; patchZone: true">
  <!-- click now gets detected by `NgZone` -->
  <button (click)="heroClicked(hero)">{{ hero.name }}</button>
</ng-container>
```

However, `patchZone: true` can in some cases have a negative impact on the performance of the `*rxFor` Directive. Since the creation of the `EmbeddedViews` will most likely happen in batches, every batch will result in one `NgZone` cycle resulting in a possible re-rendering of many other `Components`.

Another approach would be to manually detect changes coming from `unpatched` EventListeners or wrapping them in `NgZone`.

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
    this.ngZone.run(() => (this.clickedHeroName = hero.name));
  }
}
```

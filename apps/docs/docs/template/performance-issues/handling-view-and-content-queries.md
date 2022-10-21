# Handling view and content queries (`parent`)

## ViewChild example (rxLet)

`rxLet` is a structural directive, maintaining `EmbeddedViews` inside of a components template.
Depending on the bound value as well as the configured `RxRenderStrategy`, updates processed by `rxLet` can
be delayed.

Whenever `rxLet` inserts or removes a template from its parent component, it has to inform it in order to
update any view- or contentquery (`@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren`).

Take a look at the following example:

```ts
@Component({
  selector: 'app-list-component',
  template: `
    <div
      #myDiv
      *rxLet="state$; let state">
    </div>
    <button (click)="append()">append</button>
  `
})
export class AppListComponent {
 @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

 append() { this.myDiv.nativeElement.appendChild('span') }
}
```

`AppListComponent` has a `@ViewChild` viewquery where it queries for an `ElementRef<HTMLElement>` with an `rxLet` applied to it.
In this case `AppListComponent`s state is dependent on its `ViewChild`, it needs to get informed
about updates of its child views, otherwise its `append()` method will fail.

This is a known issue which has never been solved for structural directives.
Especially in combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)

`rxLet` tries to automatically solve this issue for you by calling `detectChanges` on its parents `ChangeDetectorRef` whenever
a view was inserted or removed from its template.

However, this is a potential performance bottleneck, as in most cases the parent component doesn't need to get updated.
There are two ways to opt-out from parent notifications.

## ContentChild example (rxFor)

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

`AppListComponent` has a `contentOutlet` where it expects `AppListItemComponents` to be inserted into.
In this case `AppListComponent`s state is dependent on its `ContentChildren`.
This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views.
This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in combination with `CD OnPush`
see here: (https://github.com/angular/angular/pull/35428)
`RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`.
If value is set to `true` (default is `true`), `*rxFor` will run change detection for it's defining `Component`.
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

## `parent` Input

All structural directives (`*rxLet`, `*rxFor`, etc.) can be configured to omit the parent notifications with the `parent` flag.

Take a look at the following example:

```ts
@Component({
  selector: 'app-list-component',
  template: `
    <div
      *rxLet="state$; let state; parent: false">
    </div>
  `
})
export class AppListComponent {}
```

## RX_RENDER_STRATEGIES_CONFIG

You can also set the `parent` config globally by providing a `RX_RENDER_STRATEGIES_CONFIG`.
See more about configuration under [render strategies](../../cdk/render-strategies) especially the section [usage-in-the-template](../../cdk/render-strategies#usage-in-the-template)

```ts
@NgModule({
  providers: [{
    provide: RX_RENDER_STRATEGIES_CONFIG,
    useValue: {
      parent: false // this applies to all letDirectives
    }
  }]
})
```

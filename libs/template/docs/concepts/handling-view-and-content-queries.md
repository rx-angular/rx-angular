# Handling view and content queries (`parent`)

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

## `parent` Input

`*rxLet` can be configured to omit the parent notifications with the `parent` flag.

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

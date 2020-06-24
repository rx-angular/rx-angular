# LetDirective

The `*rxLet` directive serves a convenient way of binding observables to a view context. Furthermore, it helps
you structure view related models into view context scopes (dom elements scope).
Under the hood, it leverages a `RenderStrategy` which in turn takes care of optimizing the `ChangeDetection`
of your component.

The rendering behavior can be configured per LetDirective instance by using the strategy `@Input()`.
You find more information about [`RenderStrategies`](https://github.com/BioPhoton/rx-angular/tree/master/libs/template/docs/render-strategies.md) in the sections below.

Other Features:

- lazy rendering
- binding is always present (`*ngIf="truthy$"`) ???
- it takes away multiple usages of the `async` or `push` pipe
- a unified/structured way of handling null, undefined or error
- distinct same values in a row skip not needed re-renderings

The current way of binding an observable in angular applications to the view looks like that:

```html
<ng-container *ngIf="heroData$ | async as data">
  <hero-search [term]="data.searchTerm"> </hero-search>
  <hero-list-component [heroes]="data.heroes"> </hero-list-component>
</ng-container>
```

`*ngIf` is also interfering with rendering. In case of any false
value (e.g. `0`), the component would get detached from the dom.

View binding with `*rxLet`:

```html
<ng-container *rxLet="heroData$; let data">
  <hero-search [term]="data.searchTerm"> </hero-search>
  <hero-list-component [heroes]="data.heroes"> </hero-list-component>
</ng-container>
```

Structure your view into multiple lazy loading components:

```html
<hero-search *rxLet="searchData$; let s" [term]="s.term"> </hero-search>
<hero-list-component *rxLet="listData$; let l" [heroes]="l.heroes">
</hero-list-component>
```

Using different render strategies:

```html
<hero-search *rxLet="searchData$; let s; strategy: 'global'" [term]="s.term">
</hero-search>
<hero-list-component *rxLet="listData$; let l" [heroes]="l.heroes">
</hero-list-component>
```

The `*rxLet` Directive will render its template and manage `ChangeDetection` after it got an initial value.
So if the incoming `Observable` emits it's value lazy (e.g. data coming from `Http`), your template will be
rendered lazy as well. This can very positively impact the initial render performance of your application.

In addition to that, it provides us information on the observable context.
We can track:

- next value
- error value
- base state

```html
<ng-container *rxLet="heroData$; let data; let e = $error, let c = $complete">
  <hero-list-component *ngIf="!e && !c" [heroes]="data.heroes">
  </hero-list-component>
  <ng-container *ngIf="e">
    There is an error: {{e}}
  </ng-container>
  <ng-container *ngIf="c">
    Observable completed: {{c}}
  </ng-container>
</ng-container>
```

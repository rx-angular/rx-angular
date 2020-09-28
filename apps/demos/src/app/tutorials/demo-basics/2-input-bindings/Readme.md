# Handle Input Bindings

---

## Setup `@Input` bindings

As parts of our state get passed as input bindings we need to insert these changes into the components' state.
The problem with setting values in an imperative way is that it's not composable.
That's why in this case we have to hook into the imperative callback of the `refreshInterval` component input binding.

We run a partial update to our state by providing an object containing the new state slice `{refreshInterval: number}`.
This can be done by using a reduce function `(oldState) => ({refreshInterval: oldState.refreshInterval + 2})` or just the slice itself `{refreshInterval: 2}`.
As no previous state is needed to calculate the new value we provide the slice itself for the partial update.

Notice `{refreshInterval}` is the short form of `{refreshInterval: refreshInterval}`.

```typescript
 @Input()
set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
        this.set({refreshInterval});
        this.resetRefreshInterval();
    }
}
```

We also have to adopt the related method `resetRefreshTick` where `_refreshInterval`is used.
As `refreshInterval` already is part of the components' state,
we can easily select the value with `this.get('refreshInterval')` and use the `interval` operator to create the new interval.

```typescript
resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
    this.intervalSubscription = interval(this.get('refreshInterval'))
      .pipe(tap((_) => this.listService.refetchList()))
      .subscribe();
}
```

If we edit the parents input box we should see the changes in the components logged state in the template.

## Bind the state to the view

In this example we will use a very simple method and directly bind the complete component state to the view.
Further performance improvements can be done later.

To bind the state we can use a simple trick with the structural directive `*ngIf`, the `as` syntax and the `async` pipe.

```html
<ng-container *ngIf="model$ | async as vm"> </ng-container>
```

`vm` is a short form for view model.

The implementation in our expand-panel looks like this:

```html
<mat-expansion-panel *ngIf="model$ | async as vm"> </mat-expansion-panel>
```

now we can replace the `_refreshInterval` in the template with `vm.refreshInterval`.

```html
<span>
  (storeList$ | async)?.length }} Repositories Updated every: {{
  vm.refreshInterval }} ms
</span>
```

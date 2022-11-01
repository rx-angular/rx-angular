---
sidebar_label: Input Bindings
title: Handling Input Bindings
# Renamed from apps/demos/src/app/features/tutorials/basics/2-input-bindings/Readme.md
---

# Handling Input Bindings

In this section, we will remove `this._refreshInterval` that defines how frequently our product list should be refreshed and save its data inside the component's state (see [input-bindings.start.component.ts] [input-bindings.start.component.ts].)

---

## Set up `@Input` bindings

Since parts of our state are passed as input bindings, we need to insert these changes into the component's state. It requires setting values imperatively.
The problem with this approach is that it's not composable.
That's why in this case we will have to hook into the imperative callback of the `refreshInterval` component's input binding.

Thus, we have to perform a partial update to our state by providing an object containing the new state slice `{refreshInterval: number}`.
This can be done by using either a reduce function `(oldState) => ({refreshInterval: oldState.refreshInterval + 2})` or the state slice itself `{refreshInterval: 2}`.
As no previous state is needed to calculate the new value, we will opt for the latter and provide the slice itself to partially update our state.

Please note that `{refreshInterval}` is a short form of `{refreshInterval: refreshInterval}`.

```diff
@Input()
set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
+       this.set({refreshInterval});
-       this._refreshInterval = refreshInterval;
        this.resetRefreshInterval();
    }
}
```

After removing the `_refreshInterval`, we also have to adopt the related method `resetRefreshTick` where `_refreshInterval` is used.
As `refreshInterval` is already part of the component's state,
we can easily access the value with `this.get('refreshInterval')`, using the `interval` operator to create a new interval.

```diff
resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
+    this.intervalSubscription = interval(this.get('refreshInterval'))
-    this.intervalSubscription = interval(this._refreshInterval)
       .pipe(tap((_) => this.listService.refetchList()))
       .subscribe();
}
```

If we edit the input field, we should see the changes in the component's logged state in the template.

## Bind the state to the view

In this example, we will use a very simple method and directly bind the complete state of our component to the view.
Further performance improvements can be introduced later on.

To bind the state, we can use a simple trick with the structural directive `*ngIf`, the `as` syntax, and the `async` pipe.

```html
<ng-container *ngIf="model$ | async as vm"> </ng-container>
```

Please note that `vm` is an abbreviation for view model.

The implementation in our expansion panel will look as follows:

```html
<mat-expansion-panel *ngIf="model$ | async as vm"> </mat-expansion-panel>
```

Now we can replace the `_refreshInterval` component in the template with `vm.refreshInterval`.

```html
<span>
  (storeList$ | async)?.length }} Repositories Updated every: {{
  vm.refreshInterval }} ms
</span>
```

[input-bindings.start.component.ts]: https://github.com/rx-angular/rx-angular/blob/main/apps/demos/src/app/features/tutorials/basics/2-input-bindings/input-bindings.start.component.ts
[input-bindings.solution.component.ts]: https://github.com/rx-angular/rx-angular/blob/main/apps/demos/src/app/features/tutorials/basics/2-input-bindings/input-bindings.solution.component.ts

# Global State

---


## Connect Global state to the `list` slice.

In components, we often need to transform global state into local state. Most often you also need to map the global object into a new shape that fits the view. That state gets provided as `Observable`
In the current implementation we use ta method called `parseListItems` to achieve that.

We already used the `connect` method to connect child component state.
Now lets use another overload of it to connect the global state.

The used overload takes the property as first value to determine the
target slice on which we want to connect the global state to. In our case is the `list` slice.

```typescript
// ...
constructor(private listService: ListService) {
  // ...
  this.connect(
    'list',
    this.listService.list$.pipe(map(this.parseListItems))
  );
}
```

Now we can delete the `storeList$` property in our class and refactore the template to this:

```html
...
<mat-panel-description>
  <span
    >{{ vm.list.length }} Repositories Updated every: {{ vm.refreshInterval }}
    ms
  </span>
</mat-panel-description>
...

<div *ngIf="vm.list?.length; else noList">
  <mat-list>
    <mat-list-item *ngFor="let item of list">
      {{ item.name }}
    </mat-list-item>
  </mat-list>
</div>
```

With this step we refactored the state management from an imperative to a reactive implementation.

The benefits here are we have our state centralized, reactive and can also include
imperative parts of the components like input bindings to the state.

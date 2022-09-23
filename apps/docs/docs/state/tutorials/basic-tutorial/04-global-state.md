---
sidebar_label: Global State
title: Global State
# Renamed from apps/demos/src/app/features/tutorials/basics/4-global-state/Readme.md
---

# Global State

In this chapter, we will create the global state and attach it to our component (see [global-state.start.component.ts] [global-state.start.component.ts]) to enable reactive state management there.

---

## Connect the global state to the `list` slice

In components, we often need to transform global state into local state. Most often, you also need to map the global object into a new shape that would match the view. This state is provided as an `Observable` here.
In the current implementation, we use a method called `parseListItems` to achieve that.

We already used the `connect` method to [connect our child component's state] [3-output-bindings].
Now let's use another overload to connect the global state to the component.

With this overload, the first value is assigned to the property to determine the
target slice that we want to connect the global state to. In our case, this is the `list` slice.

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

Now that the slice is connected, we can delete the `storeList$` property in our class and refactor the template into the following:

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
    <mat-list-item *ngFor="let item of list"> {{ item.name }} </mat-list-item>
  </mat-list>
</div>
```

With this step, we're refactoring our state management from an imperative to a reactive implementation.

The benefits we can gain here are that we have our state centralized and reactive but, at the same time, can also include
imperative parts of our components, like input bindings, into the state.

[global-state.start.component.ts]: https://github.com/rx-angular/rx-angular/blob/main/apps/demos/src/app/features/tutorials/basics/4-global-state/global-state.start.component.ts
[3-output-bindings]: https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/3-output-bindings

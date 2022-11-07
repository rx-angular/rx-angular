---
sidebar_label: Output Bindings
title: Handling Output Bindings
# Renamed from apps/demos/src/app/features/tutorials/basics/3-output-bindings/Readme.md
---

# Handling Output Bindings

This section contains an [imperative code base][output-bindings.start.component.ts] for you to refer to and a quick tutorial on how to set up and use output bindings reactively.

---

## React to state changes from child components

In this example, we will be using an expansion panel to display a list.
For the purpose of this tutorial, we identify the panel's open and close states as part of the component's state.
We will also have to forward the changes to the component's `listExpandedChange` output binding.

As it is essential to connect Observables to the state, there is a service method that deals with this specific issue.

This method is called `connect`, and it can assign values from an Observable to the component's state in 3 different ways.

One way of using it is passing an Observable of type `Partial<ComponentState>` to the `connect` method directly.

When choosing this way of connecting an Observable to the component's state, we will also need a subject called `listExpandedChanges` whose job is to ensure stable user interaction with the open/closed state.
This way, whenever we click on the expansion panel, the subject generates a new state using the `next` method.

We can generally use `connect` with multiple different overloads. In our case, however, the best use case scenario would look like this:

```typescript
constructor() {
  // ...
  this.connect('listExpanded', this.listExpandedChanges);
}
```

Optionally, we can also provide it as `Partial`.
Thus, we will need to transform the `boolean` value to fit `Partial<ComponentState>`.
We can use the `map` operator here to achieve this transformation and pass the projection function `listExpanded => ({ listExpanded})`.

```typescript
import { map } from `rxjs`;
// ...
constructor() {
  // ...
  this.connect(this.listExpandedChanges.pipe(map(listExpanded => ({ listExpanded}))));
}
```

This overload is especially useful when updating multiple properties at the same time.

Now let's refactor the state binding to the expand-panel.

```html
<mat-expansion-panel
  *ngIf="model$ | async as vm"
  (expandedChange)="listExpandedChanges.next($event)"
  [expanded]="vm.listExpanded"
></mat-expansion-panel>
```

If we open and close the expansion panel, we should see the change reflected in the state.

## Set up output bindings

Next, we will replace the logic for the output binding of the component.

Since the open/closed state is already reflected in the component's state, we can derive changes directly from it.

As we are only interested in changing the slice `listExpanded`, we can use the `distinctUntilKeyChanged` operator
to get those changes.

Let's refactor it into the following and delete the `listExpanded` property in the class and template.

```typescript
  import { map, distinctUntilKeyChanged } from `rxjs`;
  // ...
  @Output()
  listExpandedChange = this.$.pipe(distinctUntilKeyChanged('listExpanded'), map(s => s.listExpanded));
```

We are using `$` here to 'signal' that the state has been changed. Signals, in comparison to stateful streams, don't replay the last value on subscription.
This is especially useful as a way to avoid loops.

[output-bindings.start.component.ts]: https://github.com/rx-angular/rx-angular/blob/main/apps/demos/src/app/features/tutorials/basics/3-output-bindings/output-bindings.start.component.ts

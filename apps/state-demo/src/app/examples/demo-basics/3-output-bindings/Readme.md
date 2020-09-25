# Handle Output Bindings

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

## React to state changes from child components

In this example we use an expand-panel to display the list.
We identify its' open and close state as part of the components' state.  
We also have to forward the changes to the components `listExpandedChange` output binding.

As connecting Observables to the state is a very essential part, there is a method on the service, that deals with this specific case.

The method gets called `connect` and is able to assign values from an Observable in 3 different ways to the component state.

One way of using it is passing an Observable of type `Partial<ComponentState>` to the `connect` method directly.

We already have a subject for the user interaction with the open/closed state called `listExpandedChanges`.
It next the new state whenever we click the expand-panel.

What we need to do now is to transform the `boolean` value to fit `Partial<ComponentState>`.
Here we can use the `map` operator to achieve the transformation and pass following projection function `listExpanded => ({ listExpanded})`

```typescript
import { map } from `rxjs`;
// ...
constructor() {
  // ...
  this.connect(this.listExpandedChanges.pipe(map(listExpanded => ({ listExpanded}))));
}
```

Now lets refactor the state binding to the expand-panel.

```html
<mat-expansion-panel
  *ngIf="model$ | async as vm"
  (expandedChange)="listExpandedChanges.next($event)"
  [expanded]="vm.listExpanded"
></mat-expansion-panel>
```

If we open and close the expand-panel we should see the change reflected in the state.

## Setup Output bindings

Next lets replace the logic for the output binding of the component.

As the open/closed state is already reflected in the components' state, we can directly derive changes from them.

As we are only interested in changes of the slice `listExpanded` we can use the `distinctUntilKeyChanged` operator
to get the changes.

Lets refactor to following and delete the `listExpanded` property in the class and template.

```typescript
  @Output()
  listExpandedChange = this.$.pipe(distinctUntilKeyChanged('listExpanded'));
```

Here we used `$` which it a 'signal' of the state changes. Signals in comparison to stateful streams don't replay the last value on subscription.
This is especially handy is the above situation to avoid loops.

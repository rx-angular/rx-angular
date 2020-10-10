# Handle Output Bindings

---

## React to state changes from child components

In this example we use an expand-panel to display the list.
We identify its' open and close state as part of the components' state.  
We also have to forward the changes to the components `listExpandedChange` output binding.

As connecting Observables to the state is a very essential part, there is a method on the service, that deals with this specific case.

The method gets called `connect` and is able to assign values from an Observable in 3 different ways to the component state.

One way of using it is passing an Observable of type `Partial<ComponentState>` to the `connect` method directly.

We already have a subject for the user interaction with the open/closed state called `listExpandedChanges`.
It next the new state whenever we click the expand-panel.


We can use connect with multiple overloads. Here the best usage would look like this:
```typescript
constructor() {
  // ...
  this.connect('listExpanded', this.listExpandedChanges);
}
```

Optionally, we could also provide it as `Partial`.
Here we need to transform the `boolean` value to fit `Partial<ComponentState>`.
Here we can use the `map` operator to achieve the transformation and pass following projection function `listExpanded => ({ listExpanded})`

```typescript
import { map } from `rxjs`;
// ...
constructor() {
  // ...
  this.connect(this.listExpandedChanges.pipe(map(listExpanded => ({ listExpanded}))));
}
```

This overload is especially useful when updating multiple properties at the same time.

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
  import { map, distinctUntilKeyChanged } from `rxjs`;
  // ...
  @Output()
  listExpandedChange = this.$.pipe(distinctUntilKeyChanged('listExpanded'), map(s => s.listExpanded));
```

Here we used `$` which it a 'signal' of the state changes. Signals in comparison to stateful streams don't replay the last value on subscription.
This is especially handy is the above situation to avoid loops.

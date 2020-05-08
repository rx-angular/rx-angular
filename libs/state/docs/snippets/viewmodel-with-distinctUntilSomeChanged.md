Here is an example for using the [`distinctUntilSomeChanged`](../state/src/lib/core/operators/distinctUntilSomeChanged.ts) operator
as tool to manage distinct state slices.

Imagine the following setup. The state of your component is defined by this interface:

```typescript
interface ComponentState {
  title: string;
  created: string;
  list: string[];
}
```

You want to render the following template.

```html
<ng-container *ngIf="viewModel$ | asyc as vm">
  <h1>
    {{vm.title}}
    <small><b>total: {{vm.total}}</b></small>
  </h1>
  <ul>
    <li *ngFor="let item of vm.items">{{ item }}</li>
  </ul>
  <ng-container></ng-container
></ng-container>
```

As your view requires additional and/or derived information from your component state, we need to transform the
`ComponentState` state into another shape (`ComponentViewModel`):

```typescript
interface ComponentViewModel {
  title: string;
  list: string[];
  total: number;
}
```

As changes of your viewmodel ultimately result in component renderings. We have to make sure that it's emissions
are distinct.

_Example w/o `distinctUntilSomeChanged`_:

We could achieve this by using the `combineLatest` operator in combination (no pun intended) with the
`select` method.

```typescript
@Component()
export class ViewModelComponent extends RxState<ComponentState> {
  readonly viewModel$: Observable<ComponentViewModel> = combineLatest([
    this.select('list').pipe(map(list => ({ list, total: list.length }))),
    this.select('title')
  ]).pipe(
    map(([{ list, total }, title]) => ({ list, total, title })),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  constructor() {
    super();
  }
}
```

_Example w `distinctUntilSomeChanged`_:

For this kind of scenario the `distinctUntilSomeChanged` operator was created. Utilizing the `distinctUntilSomeChanged`
operator inside of the `select` method not only saves you some lines of code and provides more readability.
It also reduces the amount of computations needed for the viewmodel. Which is a shared and distinct `Observable`.

```typescript
@Component()
export class ViewModelComponent extends RxState<ComponentState> {
  readonly viewModel$: Observable<ComponentViewModel> = this.select(
    distinctUntilSomeChanged(['title', 'list']),
    map(({ title, list }) => ({ title, list, total: list.length }))
  );
  constructor() {
    super();
  }
}
```

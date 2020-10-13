# Selecting the ViewModel

Here are some useful strategies to properly handle `ViewModels` with `@rx-angular/state`. In this examples we will use standalone [`selectSlice`](https://github.com/rx-angular/rx-angular/blob/master/libs/state/docs/api/operators/select-slice.md) operator.

Imagine the following setup:

```typescript
interface Item {
  id: string;
  name: string;
}

interface ComponentState {
  title: string;
  created: string;
  list: Item[];
  visibleItemIds: string[];
}

interface ComponentViewModel {
  title: string;
  created: string;
  visibleItems: Item[];
  total: number;
}
```

You want to render the following template.

```html
<ng-container *ngIf="viewModel$ | async as vm">
  <h1>
    {{vm.title}}
    <small>{{vm.created | date}} -<b>total: {{vm.total}}</b></small>
  </h1>
  <ul>
    <li *ngFor="let item of vm.visibleItems">{{ item.name }}</li>
  </ul>
  ></ng-container
>
```

As your view requires additional and/or derived information from your component state, we need to transform the
`ComponentState` state into another shape (`ComponentViewModel`)
Changes of your `viewModel$` ultimately result in component renderings, so we have to make sure that it's emissions
are distinct.

## Using selectSlice:

For this scenario we created the `selectSlice` operator.
It returns an Observable that emits a distinct subset of the received object.

Utilizing it inside of the `RxState#select` method enables you to pluck a _distinct_ `ViewModel` directly out of your state.

```typescript
@Component()
export class ViewModelComponent extends RxState<ComponentState> {
  readonly viewModel$: Observable<ComponentViewModel> = this.select(
    selectSlice(['title', 'list', 'created', 'visibleItemIds']),
    map(({ title, list, created, visibleItemIds }) => ({
      title,
      created,
      total: list.length,
      visibleItems: list.filter((item) =>
        visibleItemIds.some((itemId) => itemId === item.id)
      ),
    }))
  );
  constructor() {
    super();
  }
}
```

## Multiple Observables and selectSlice:

There are situations where you want to divide your `ViewModel` into different parts.

Imagine the following view:
This way you may achieve more control over what to render when, e.g. lazy rendering.

```html
<ng-container *ngIf="viewModel.main$ | async as vm">
  <h1>
    {{vm.title}}
    <small>
      {{vm.created | date}}
    </small>
  </h1>
</ng-container>
<ng-container *ngIf="viewModel.list$ | async as vm">
  <div><b>total: {{vm.total}}</b></div>
  <ul>
    <li *ngFor="let item of vm.visibleItems">{{ item.name }}</li>
  </ul>
</ng-container>
```

```typescript
interface ComponentViewModel {
  main$: Observable<{ title: string; created: Date }>;
  list$: Observable<{ total: number; visibleItems: Item[] }>;
}

@Component()
export class ViewModelComponent extends RxState<ComponentState> {
  readonly viewModel: ComponentViewModel = {
    main$: this.state.select(selectSlice(['title', 'created'])),
    list$: this.state.select(
      selectSlice(['list', 'visibleItemIds']),
      map(({ list, visibleItemIds }) => ({
        total: list.length,
        visibleItems: list.filter((item) =>
          visibleItemIds.some((itemId) => itemId === item.id)
        ),
      }))
    ),
  };
  constructor() {
    super();
  }
}
```

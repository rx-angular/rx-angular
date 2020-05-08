Here is an example for using the [`distinctUntilSomeChanged`](../state/src/lib/core/operators/distinctUntilSomeChanged.ts) operator
as tool to manage view distinct state slices.

Example:

```typescript

interface Item {
  id: string;
  name: string;
}

interface ComponentState {
   title: string,
   created: string,
   list: Item[],
   visibleItemIds: string[]
}

interface ComponentViewModel {
   title: string,
   created: string,
   visibleItems: Item[],
   total: number
}

@Component()
export class ViewmodelComponent extends RxState<ComponentState> {
    private readonly directSlices$: Observable<{title: string, created: string}> =  this.select(
      distinctUntilSomeChanged(['title', 'created']),
      map(({title, created}) => ({title, created}))
    );

    private readonly customSlices$: Observable<{visibleItems: Item[], total: number}> = this.select(
       distinctUntilSomeChanged(['visibleItemIds', 'list']),
       map(({list, visibleItemIds}) => ({
         total: list.length,
         visibleItems: list.filter(item => visibleItemIds.some(visibleItemId => visibleItemId === item.id)
      }))
    );

    readonly viewModel$: Observable<ComponentViewModel > = combineLatest([directSlices$,customSlices$])
    .pipe(
      map(([directSlices, customSlices]) => ({...directSlices, ...customSlices}))
    );

    constructor() {
        super();
    }

}

```

In the template used as

```html
<ng-container *ngIf="ViewModel$ | asyc as vm">
  <h1>
    {{vm.title}}
    <small> {{vm.created | date}} - <b>total: {{vm.total}}</b> </small>
  </h1>
  <ul>
    <li *ngFor="let item of vm.visibleItems"></li>
  </ul>
  <ng-container></ng-container
></ng-container>
```

# Concepts and best practices

**Component Shell and Folder**

- `@Input` bindings are setter
- `@Output` bindings are state derivations
- State is injected over the constructor
- State is displayed over a pipe in the template
- UI interaction is implemented over `Subjects`
- use `*ngrxLet` over `*ngIf`
  Bad:

```html
<ng-container *ngIf="obj$ | async as obj">
  {{obj}}
</ng-container>
```

Good:

```html
<ng-container *ngrxLet="obj$; let obj">
  {{obj}}
</ng-container>
```

## Logic

- Pure functions as much as possible

**Micro Architecture:**

- Display-only and container components
- No HTTP requests in Container or Display components directly (firing the request in the componene it self)

## Component Implementation Approach

- 1. Define the view
     In best case start with an interface that lists all UI interaction.
     Included things:
  - Event bindings e.g. `(click)`, `(blur)` etc
  - Output bindings of child components e.g. `(inputChanges)`
  - The component state is normalized (model vs view model)
    This is the _core state_ that is needed to calculate the views _display state_.
    In most cases the _displayed state_ is equal to the _core state_.
    In some cases it differs. e.g. _core state_ is a list of items stored in an array.
    _display state_ is the list and the number of total and selected items.
    In this case we don't store the state for total and selected count, but derive it over a map function.
    Also sorting/hiding parts or the items is a good example.
    Example view interface:

```typescript

interface MyState {
    items: string[];
    listExpanded: boolean;
    sortKey: string;
    isAsc: boolean;
}

interface MyView {
  btnSubmitClick$: Subject<Event>();
  expandedChange$: boolean;
  vm$: Observable<MyState>; // ViewModel
}
```

### Setup view interactions
  ```typescript
@Component({
  selector: 'app-stateful-component',
  template: `<div> {{ vm$ | async | json }}</div>`,
  changeDetection: Changedetection.OnPush,
  providers: [RxState]
})
  export class StatefulComponent implements MyView {
  
    readonly vm$ = this.state.select();
    
    readonly click$ = new Subject<MouseEvent>();
    readonly expanded$ = this.click$.pipe(); // map it
    readonly vm$: Observable<MyState> = this.state.select();
    
    @Input('items') set items(items: string[]) {
        this.state.set({ items });
    }
    
    constructor(private state: RxState<MyState>) {}
  }
  ```
  - Hook up `@Input` bindings
  ```typescript
  @Input()
  set task(task: Task) {
    this.state.setState({task})
  }
  ```
  - Hook up UI state

```typescript
vm$ = this.state.select();
```

```html
<ng-container *ngrxLet="obj$; let obj">
  {{obj}}
</ng-container>
```

- Hook up UI interaction

```html
<button (click)="btnReset$.next($event)">Reset</button>
```

- Hook up `@Output` bindings

  ```typescript
  @Output()
  taskChanges = this.state.select(s => s.task);
  ```

Observables and projection functions are named in a way they give us information about the returned data struckture.

Think in Source => transfor => state/effect

Bad:

```typescript
getSearchResults() => this.inputChange$.pipe(
   switchMap((q) => fetchData(q))
)
```

```typescript

this.inputChange$.pipe(
this.toSearchResult
)

toSearchResults(o) => o.pipe(
 map((data) => {
   switchMap((q) => fetchData(q))
 })
)
```

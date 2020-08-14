# Concepts and best practices

## Component Shell and Folder

- `@Input` bindings are setter
- `@Output` bindings are state derivations
- State is injected over the constructor
- State is displayed over a pipe in the template
- UI interaction is implemented over `Subjects`
- use `*rxLet` over `*ngIf`

Bad:

```html
<ng-container *ngIf="obj$ | async as obj">
  {{obj}}
</ng-container>
```

Good:

```html
<ng-container *rxLet="obj$; let obj">
  {{obj}}
</ng-container>
```

## Component Implementation Approach

### Defining the Interface

In a first step you want to setup the state interface. A property which should change the view of your component should find it's place into the interface.
View bindings and triggers which in turn mutate your state should be `Subjects`.
In the best case you keep your state _normalized_.
_Derived state_ should be handled seperately.

**Example view interface**:

```typescript

interface MyState {
    items: string[];
    listExpanded: boolean;
    sortKey: string;
    isAsc: boolean;
}

interface MyView {
  click$: Subject<MouseEvent>();
  expanded$: boolean;
  vm$: Observable<MyState>; // ViewModel
}
```

### Setup view interactions

```typescript
@Component({
  selector: 'app-stateful-component',
  template: ` <div>{{ vm$ | async | json }}</div> `,
  changeDetection: Changedetection.OnPush,
  providers: [RxState],
})
export class StatefulComponent implements MyView {
  readonly vm$: Observable<MyState> = this.state.select();
  readonly click$ = new Subject<MouseEvent>();
  readonly expanded$ = this.click$.pipe(); // map it

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
<ng-container *rxLet="obj$; let obj">
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
  taskChanges = this.state.$.pipe(distinctUntilKeyChanged('prop'));
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

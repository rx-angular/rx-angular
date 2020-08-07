# Connect global state

**Connect state slices from third party services (e.g. `@ngrx/store`) or trigger them from side-effects**

Many people have problems combining observables with the component state in a clean way.
Here is a usecase where the `@ngrx/store` gets connected to the local state:

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ (state$ | async).count }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(
    private state: RxState<{ count: number }>,
    private store: Store<AppState>
  ) {
    state.connect('count', store.select('count'));
  }
}
```

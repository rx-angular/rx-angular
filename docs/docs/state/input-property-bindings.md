# Input Property Bindings

**Combining `Input` bindings passing single values with RxState**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ title$ | async }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  readonly title$ = this.select('title');

  @Input() set title(title: string) {
    this.state.setState({ title });
  }

  constructor(private state: RxState<{ title: string }>) {}
}
```

**Combining `Input` bindings passing Observables with RxState**

**You can 1 change detection per emission** and improve performance of your app
by providing `Observables` directly as `Input`.
This way the ChangeDetection for the `Input` binding will only fire once for the first assignment.

---

```typescript
const initialState: ComponentState = {
  title: 'MyComponent',
  showButton: false,
  count: 0
};

@Component({
  selector: 'app-stateful',
  template: `
    <div>{{ (state$ | async).count }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  @Input() set config(count$: Observable<ComponentStateInput>) {
    this.state.connect('count', count$);
  }
  constructor(private state: RxState<{ count: number }>) {}
}
```

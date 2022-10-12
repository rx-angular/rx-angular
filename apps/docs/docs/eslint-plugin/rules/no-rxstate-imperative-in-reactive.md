# no-rxstate-imperative-in-reactive

> Warns against mixing imperative RxState methods in reactive methods.

## Rationale

Inconsistent mixing of reactive and imperative usage should be avoided in RxState. Using an imperative method (`state#set` or `state#get`) in the context of a reactive method (`state#hold` or `state#connect`) is a confusing mixing of paradigms, when there is usually a better solution available. E.g. calling `state#set` in `state#hold` may be replaced with the more declarative `state#connect`.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
@Component({
  template: '...',
})
class NotOkComponent implements OnInit {
  constructor(
    private service: SomeService,
    private state: RxState<{ something: any; somethingElse: any }>
  ) {}

  ngOnInit(): void {
    this.state.connect(
      'something',
      this.service.something$.pipe(
        map((something) => ({
          ...something,
          ...this.state.get('somethingElse'),
        }))
      )
    );
  }
}
```

```ts
@Component({
  template: '...',
})
class NotOkComponent {
  constructor(private service: SomeService, private state: RxState<MyState>) {
    state.hold(this.service.getData(), (data) => {
      state.set({ data });
    });
  }
}
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
@Component({
  template: '...',
})
class OkComponent {
  constructor(state: RxState<never>, service: SomeService) {
    state.hold(service.onRefresh$, () => {
      window.location.href = '/';
    });
  }
}
```

```ts
@Component({
  template: '...',
})
class OkComponent {
  constructor(private state: RxState<MyState>, service: SomeService) {
    this.state.connect('data', service.getData());
  }

  handleClick() {
    this.state.set({ clicked: true });
  }
}
```

</details>

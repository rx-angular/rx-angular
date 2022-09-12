# no-rxstate-imperative-in-reactive

> Warns against using RxState subscription methods outside constructor.

## Rationale

Using RxState methods which manage subscriptions (`state#hold` or `state#connect`) anywhere other than constructor is usually indicative of a non-reactive approach.

## Configuration

You may supply an array of method names where `hold` and `connect` should also be allowed in addition to constructors (e.g. Angular lifecycle methods):

```json
"rules": {
  "@rx-angular/no-rxstate-subscriptions-outside-constructor": [
    "error",
    { "allowedMethods": ["ngOnInit"] }
  ]
}
```

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
@Component({
  template: '<button (click)="handleClick()">...</button> ...',
})
class NotOkComponent {
  constructor(private service: SomeService, private state: RxState<MyState>) {}

  handleClick() {
    this.state.connect('something', this.service.doSomething());
  }
}
```

```ts
@Component({
  template: '<button (click)="handleClick()">...</button> ...',
})
class NotOkComponent {
  constructor(private service: SomeService, private state: RxState<MyState>) {}

  handleClick() {
    this.state.hold(this.service.doSomething());
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

### Custom configuration

Example of correct code when setting custom option `{ "allowedMethods": ["ngOnInit"] }`:

```ts
@Component({
  template: '...',
})
class OkComponent {
  @Input() noDataFetching = false;

  constructor(private state: RxState<MyState>, private service: SomeService) {}

  ngOnInit() {
    if (!this.noDataFetching) {
      this.state.connect('data', service.getData());
    }
  }
}
```

</details>

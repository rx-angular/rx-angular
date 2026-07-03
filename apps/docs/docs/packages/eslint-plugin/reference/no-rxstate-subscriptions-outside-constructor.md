---
id: no-rxstate-subscriptions-outside-constructor
title: 'no-rxstate-subscriptions-outside-constructor'
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
tags: [eslint-plugin, api-reference]
---

# no-rxstate-subscriptions-outside-constructor

## What it flags

RxState subscription methods (`state.connect` or `state.hold`) called outside the constructor or state-init callback. Subscribing from a click handler or lifecycle hook is usually a sign of a non-reactive approach; set the subscription up once where the component is initialized.

With functional `rxState()`, the setup callback passed to `rxState()` is the state-init equivalent of the constructor; `connect` calls belong there.

## Options

`allowedMethods` (`string[]`): additional method names in which `connect`/`hold` are allowed, on top of the constructor (e.g. an Angular lifecycle hook).

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/no-rxstate-subscriptions-outside-constructor': ['error', { allowedMethods: ['ngOnInit'] }],
    },
  },
];
```

```json
// .eslintrc (legacy)
"rules": {
  "@rx-angular/no-rxstate-subscriptions-outside-constructor": [
    "error",
    { "allowedMethods": ["ngOnInit"] }
  ]
}
```

## ❌ Incorrect

```ts
@Component({
  template: '<button (click)="handleClick()">...</button> ...',
})
class NotOkComponent {
  constructor(
    private service: SomeService,
    private state: RxState<MyState>,
  ) {}

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
  constructor(
    private service: SomeService,
    private state: RxState<MyState>,
  ) {}

  handleClick() {
    this.state.hold(this.service.doSomething());
  }
}
```

## ✅ Correct

```ts
@Component({
  template: '...',
})
class OkComponent {
  private readonly service = inject(SomeService);
  private readonly state = rxState<MyState>(({ connect }) => {
    connect('data', this.service.getData());
  });

  handleClick() {
    this.state.set({ clicked: true });
  }
}
```

Custom configuration, correct when `{ "allowedMethods": ["ngOnInit"] }` allows `connect` in `ngOnInit`:

```ts
@Component({
  template: '...',
})
class OkComponent {
  noDataFetching = input(false);

  constructor(
    private state: RxState<MyState>,
    private service: SomeService,
  ) {}

  ngOnInit() {
    if (!this.noDataFetching()) {
      this.state.connect('data', this.service.getData());
    }
  }
}
```

## Why

The RxState-discipline rationale (set subscriptions up once at initialization) belongs to the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept.

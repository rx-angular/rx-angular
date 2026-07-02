---
id: no-rxstate-imperative-in-reactive
title: "no-rxstate-imperative-in-reactive"
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
tags: [eslint-plugin, api-reference]
---

# no-rxstate-imperative-in-reactive

## What it flags

An imperative RxState method (`state.get` or `state.set`) called inside a reactive one (`state.connect` or `state.hold`). Mixing the two paradigms is usually a sign a more declarative form exists; e.g. a `set` inside `hold` can often become a `connect`.

## Options

This rule has no options.

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/no-rxstate-imperative-in-reactive': 'error',
    },
  },
];
```

```json
// .eslintrc (legacy)
"rules": {
  "@rx-angular/no-rxstate-imperative-in-reactive": "error"
}
```

## ❌ Incorrect

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

:::note Destructured functional API is not detected
The rule matches only the member-expression forms `this.state.method()` and `state.method()`. It does **not** currently detect destructured functional-API calls — e.g. `connect(...)` and `get(...)` obtained from `rxState(({ connect, get }) => …)` — because those are bare identifier calls with no `state` callee object. Flagging that pattern would require extending the selector to track the destructured identifiers.
:::

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

## Why

The RxState-discipline rationale (keep reactive and imperative RxState usage separate) belongs to the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept.

# Frequently asked questions

## What's the difference between injecting and extending the `RxState` service?

## How can I run partial updates?

`RxState` has partial updates built in. Every change sent to the state over `set` or `connect` is treated as partial update.

```typescript
import { RxState } from `rx-angular/state`;
interface ComponentState {
  title: string;
  list: string[];
  loading: boolean;
}

class AnyComponent extends RxState<ComponentState> {
  updateTitle() {
    this.set({ title: 'Hello!' });
  }

  resetList() {
    this.connect(this.globalState$.list$({ list: [], loading: false }));
  }
}
```

## How to refactor a reactive component?

## Why should I use `Observables` for button clicks instead of callbacks??

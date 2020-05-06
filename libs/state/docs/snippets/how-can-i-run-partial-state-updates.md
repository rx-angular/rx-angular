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

Internally the state update looks like this:

```typescript
newState$.pipe(
    scan((oldState, newPartialState) => ({...oldState, ...newPartialState})
)
```

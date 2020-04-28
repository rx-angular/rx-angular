## Is there another way than extending form the state service?

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
    this.connect(of({ list: [], loading: false }));
  }
}
```

## How to refactor a reactive component?

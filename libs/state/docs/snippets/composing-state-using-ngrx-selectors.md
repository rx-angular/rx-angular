_Author: [@Phhansen](https://github.com/Phhansen)_

# Reusing ngrx selectors to compose state

Here is an example of using [NgRx selectors](https://ngrx.io/guide/store/selectors) alongside `@rx-angular/state` to compose reusable state selectors.

Imagine the following `ComponentState` setup:

```typescript
interface Item {
  id: string;
  name: string;
}

interface ComponentState {
  items: { [id: string]: Item };
  visibleIds: string[];
}
```

Now we want to derive a list of visible items based on all `items` and the array of `visibleIds`. We can do so by using the `createSelector()` function from NgRx.

```typescript
const selectItems = (state: ComponentState) => state.items;

const selectVisibleIds = (state: ComponentState) => state.visibleIds;

const selectVisibleItems = createSelector(
  selectVisibleIds,
  selectItems,
  (visibleIds, items) => visibleIds.map((id) => items[id])
);
```

Using this in our component will look like this:

```typescript
import { select } from '@ngrx/store';

@Component()
export class ItemListComponent extends RxState<ComponentState> {
  readonly visibleItems$ = this.state.select(select(selectVisibleItems));

  constructor() {
    super();
  }
}
```

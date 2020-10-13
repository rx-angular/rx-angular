_Author: [@Phhansen](https://github.com/Phhansen)_

# Manage entities using `@ngrx/entity`

When working with collections or arrays in our state, we tend to write a lot of repeated code when we want to add, update or delete items from these collections.

In NgRx they have created a helper library called [@ngrx/entity adapter](https://ngrx.io/guide/entity/adapter). The adapter provides a simple API to manipulate and query these collections, hiding a lot of the repetetive code needed.

Lets say we have a collection of type `Item` as part of our component state;

```typescript
interface Item {
  id: string;
  name: string;
}

interface ComponentState {
  items: Item[];
  loading: boolean;
}
```

Now if we want to add one item to our array _(in an immutable way)_, we replace the `items` array in the state with a new reference.

```typescript
@Component({
  selector: 'my-component',
})
export class MyComponent extends RxState<ComponentState> {
  readonly addItem$ = new Subject<string>();

  constructor() {
    super();

    this.connect(this.addItem$, (oldState, itemName) => {
      const newItem = {
        id: uuid(), // unique hash generation fn()
        name: itemName,
      };

      return {
        ...oldState,
        items: [...oldState.items, newItem],
      };
    });
  }
}
```

Now if we want to update one item, we have query the `items` array to first get a hold of the item, then construct a new array again.

What about deleting an item? You get the picture. **It´s a lot of code**, and it will grow even more if we have several types of collections in our state.

## Using `@ngrx/entity`

Now let us see how our code will look when using `@ngrx/entity`.

```typescript
interface Item {
  id: string;
  name: string;
}

interface ComponentState extends EntityState<Item> {
  loading: boolean;
}

const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: (item: Item) => item.id,
});
```

The entity adapter needs a `selectId` function which is used to query items by `id` within the collection.

Now lets see how the component has changed.

```typescript
@Component({
  selector: 'my-component',
})
export class MyComponent extends RxState<ComponentState> {
  readonly addItem$ = new Subject<string>();

  constructor() {
    super();

    this.connect(this.addItem$, (oldState, itemName) =>
      adapter.addOne({ id: uuid(), name: itemName() }, oldState)
    );
  }
}
```

The `addOne()` function is just one of many functions that help us manipulate the collection.

Delete an item? `removeOne(item.id, oldState)`.

Check out the [full list of adapter collection methods](https://ngrx.io/guide/entity/adapter#adapter-collection-methods)

## Selecting state with `@ngrx/entity`

The entity adapter comes with a small set of default selectors we can use right out of the box.

```typescript
import { select } from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

@Component({
  selector: 'my-component',
})
export class MyComponent extends RxState<ComponentState> {
  readonly items$ = this.select(select(selectAll));

  constructor() {
    super();
  }
}
```

## setProp

Accepts an object of type T, key of type K extends keyof T, and value of type T[K].
Sets the property and returns a newly updated shallow copy of an object while not mutating the original one.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const renamedCat = setProp(cat, 'name', 'Bella');

// renamedCat will be:
// {id: 1, type: 'cat', name: 'Bella'};
```

_Example_

```typescript
// Usage with RxState

export class ProfileComponent {
  readonly changeName$ = new Subject<string>();

  constructor(private state: RxState<ComponentState>) {
    // Reactive implementation
    state.connect(this.changeName$, (state, name) => {
      return setProp(state, 'name', name);
    });
  }

  // Imperative implementation
  changeName(name: string): void {
    this.state.set(setProp(this.get(), 'name', name));
  }
}
```

### Edge cases

```typescript
setProp(nonObject, 'prop' as any, 42) > { prop: 42 };
setProp(null as any, 'prop', 42) > { prop: 42 };
setProp(null as any, null as any, 42) > null;
setProp([state], 'concat', () => []) > { concat: () => [] };
setProp(state, 'nonExisting' as any, 42) > { ...state, nonExisting: 42 };
setProp(state, null as any, 42) > state;
```

### Signature

```typescript
function setProp<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T;
```

### Parameters

#### object

###### typeof: T

#### key

###### typeof: K

#### value

###### typeof: T[K]

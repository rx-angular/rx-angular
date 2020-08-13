## deleteProp

Accepts an object of type T and key of type K extends keyof T.
Removes property from an object and returns a shallow copy of the updated object without specified property.
If property not found returns copy of the original object.
Not mutating original object.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const anonymusCat = deleteProp(cat, 'name');

// anonymusCat will be:
// {id: 1, type: 'cat'};
```

_Example_

```typescript
// Usage with RxState

export class ProfileComponent {
  readonly removeName$ = new Subject();

  constructor(private state: RxState<ComponentState>) {
    // Reactive implementation
    state.connect(this.removeName$, (state) => {
      return deleteProp(state, 'name');
    });
  }

  // Imperative implementation
  removeName(): void {
    this.state.set(remove(this.get(), 'name'));
  }
}
```

### Edge cases

```typescript
deleteProp(state, null as any) > state;
deleteProp(null as any, null as any) > null;
deleteProp(undefined as any, undefined as any) > undefined;
deleteProp(nonObject, 'prop') > nonObject;
```

### Signature

```typescript
function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K>;
```

### Parameters

#### object

###### typeof: T

#### key

###### typeof: K

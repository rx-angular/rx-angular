## patch

Merges an object of type T with updates of type Partial<T>.
Returns a new object where updates override original values while not mutating the original one.

_Example_

```typescript
interface Creature {
  id: number;
  type: string;
  name: string;
}

const cat = { id: 1, type: 'cat' };

const catWithname = patch(cat, { name: 'Fluffy' });

// catWithname will be:
// {id: 1, type: 'cat', name: 'Fluffy'};
```

_Example_

```typescript
// Usage with RxState

export class ProfileComponent {
  readonly changeName$ = new Subject<string>();

  constructor(private state: RxState<ComponentState>) {
    // Reactive implementation
    state.connect(this.changeName$, (state, name) => {
      return patch(state, { name });
    });
  }

  // Imperative implementation
  changeName(name: string): void {
    this.state.set(patch(this.get(), { name }));
  }
}
```

### Edge cases

```typescript
patch({}, state) > state;
patch(null as any, state) > state;
patch(state, null as any) > state;
patch(null as any, null as any) > null;
patch(undefined as any, undefined as any) > undefined;
patch(state, nonObject) > state;
patch(nonObject, state) > state;
patch(nonObject, nonObjectUpdate) > nonObject;
```

### Signature

```typescript
function patch<T extends object>(object: T, upd: Partial<T>): T;
```

### Parameters

#### object

###### typeof: T

#### upd

###### typeof: Partial&#60;T&#62;

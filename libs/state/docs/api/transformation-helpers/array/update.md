## update

Updates one or multiple items in an array T[].
For comparison you can provide key, array of keys or a custom comparison function that should return true if items match.
If no comparison is provided, an equality check is used by default.
Returns a shallow copy of the array T[] and updated items, does not mutate the original array.

_Example_

```typescript
// Update with comparison function

const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const newCat = { id: 1, type: 'lion' };

const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example_

```typescript
// Update with key

const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const newCat = { id: 1, type: 'lion' };

const updatedCreatures = update(creatures, newCat, 'id');

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example_

```typescript
// Update with array of keys

const creatures = [
  { id: 1, type: 'cat', name: 'Bella' },
  { id: 2, type: 'dog', name: 'Sparky' },
];

const newCat = { id: 1, type: 'lion', name: 'Bella' };

const updatedCreatures = update(creatures, newCat, ['id', 'name']);

// updatedCreatures will be:
// [{id: 1, type: 'lion', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
```

_Example_

```typescript
// Usage with RxState

export class ListComponent {
  readonly updateCreature$ = new Subject<Creature>();

  constructor(private state: RxState<ComponentState>) {
    // Reactive implementation
    state.connect(
      'creatures',
      this.updateCreature$,
      ({ creatures }, creatureToUpdate) => {
        return update(creatures, creatureToUpdate, (a, b) => a.id === b.id);
      }
    );
  }

  // Imperative implementation
  updateCreature(creatureToUpdate: Creature): void {
    this.state.set({
      creatures: update(
        this.state.get().creatures,
        creatureToUpdate,
        (a, b) => a.id === b.id
      ),
    });
  }
}
```

### Edge cases

```typescript
update(null as any, items) > items;
update(items, null as any) > items;
update(null as any, null as any) > null;
update(undefined as any, undefined as any) > undefined;
update(nonArray as any, items) > items;
```

### Signature

```typescript
function update<T extends object>(
  source: T[],
  updates: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[];
```

### Parameters

#### source

###### typeof: T[]

#### updates

###### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

###### typeof: ComparableData&#60;T&#62;

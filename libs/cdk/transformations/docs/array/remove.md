## remove

Removes one or multiple items from an array T[].
For comparison you can provide key, array of keys or a custom comparison function that should return true if items match.
If no comparison data is provided, an equality check is used by default.
Returns a shallow copy of the updated array T[], and does not mutate the original one.

_Example_

```typescript
// Removing value without comparison data

const items = [1, 2, 3, 4, 5];

const updatedItems = remove(items, [1, 2, 3]);

// updatedItems will be: [4,5];
```

_Example_

```typescript
// Removing values with comparison function

const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const nonExistingCreatures = [
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const realCreatures = remove(
  creatures,
  nonExistingCreatures,
  (a, b) => a.id === b.id
);

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example_

```typescript
// Removing values with key

const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const nonExistingCreatures = [
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const realCreatures = remove(creatures, nonExistingCreatures, 'id');

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example_

```typescript
// Removing values with array of keys

const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const nonExistingCreatures = [
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const realCreatures = remove(creatures, nonExistingCreatures, ['id', 'type']);

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example_

```typescript
// Usage with RxState

export class ListComponent {
  readonly removeCreature$ = new Subject<Creature>();

  constructor(private state: RxState<ComponentState>) {
    // Reactive implementation
    state.connect(
      'creatures',
      this.removeCreature$,
      ({ creatures }, creatureToRemove) => {
        return remove(creatures, creatureToRemove, (a, b) => a.id === b.id);
      }
    );
  }

  // Imperative implementation
  removeCreature(creatureToRemove: Creature): void {
    this.state.set({
      creatures: remove(
        this.state.get().creatures,
        creatureToRemove,
        (a, b) => a.id === b.id
      ),
    });
  }
}
```

### Edge cases

```typescript
remove(null as any, items) > null;
remove(items, null as any) > items;
remove(null as any, null as any) > null;
remove(undefined as any, undefined as any) > undefined;
remove(nonArray as any, items) > nonArray;
```

### Signature

```typescript
function remove<T>(
  source: T[],
  scrap: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[];
```

### Parameters

#### source

###### typeof: T[]

#### scrap

###### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

###### typeof: ComparableData&#60;T&#62;

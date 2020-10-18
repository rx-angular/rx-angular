## dictionaryToArray

Converts a dictionary of type {[key: string]: T} to array T[].

_Example_

```typescript
const creaturesDictionary = {
  '1': { id: 1, type: 'cat' },
  '2': { id: 2, type: 'dog' },
  '3': { id: 3, type: 'parrot' },
};

const creaturesArray = dictionaryToArray(creaturesDictionary);

// creaturesArray will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
```

_Example_

```typescript
// Usage with RxState

export class ListComponent {
  readonly removeName$ = new Subject();

  constructor(private state: RxState<ComponentState>, private api: ApiService) {
    // Reactive implementation
    state.connect(
      'creatures',
      this.api.creaturesDictionary$,
      (_, creatures) => {
        return dictionaryToArray(creatures);
      }
    );
  }

  // Imperative implementation
  removeName(): void {
    this.api.creaturesDictionary$
      .pipe
      // subscription handling logic
      ()
      .subscribe((dictionary) =>
        this.set({ creatures: dictionaryToArray(dictionary) })
      );
  }
}
```

### Edge cases

```typescript
dictionaryToArray({}) > [];
dictionaryToArray(null as any) > null;
dictionaryToArray(undefined as any) > undefined;
dictionaryToArray(nonObject) > [];
dictionaryToArray([1, 2, 3] as any) > [];
```

### Signature

```typescript
function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[];
```

### Parameters

#### dictionary

###### typeof: { [key: string]: T }

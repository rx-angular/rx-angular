## CompareFn

The function which is used by `KeyCompareMap` to determine if changes are distinct or not.
Should return true if values are equal.

### Signature

```typescript
type CompareFn<T> = (oldVal: T, newVal: T) => boolean;
```

## KeyCompareMap

The `KeyCompareMap` is used to configure custom comparison for defined keys.

_Example_

```typescript
const keyCompareMap = {
  myKey: (o, n) => customCompare(o, n)
};
const o$ = of({
  myKey: 5,
  myOtherKey: 'bar'
}).pipe(distinctUntilSomeChanged(['myKey', 'myOtherKey'], keyCompareMap));

//or

const o$ = of({
  myKey: 5,
  myOtherKey: 'bar'
}).pipe(selectSlice(['myKey', 'myOtherKey'], keyCompareMap));
```

### Signature

```typescript
type KeyCompareMap<T extends object> = {
  [K in keyof Partial<T>]: CompareFn<T[K]>;
};
```

## OnlyKeysOfSpecificType

Allows to pass only keys which value is of specific type.

_Example_

```typescript
interface Creature {
  id: number;
  type: string;
  name: string;
}

const cat = { id: 1, type: 'cat', name: 'Fluffy' };

function updateCreature<T>(
  creature: T,
  key: OnlyKeysOfSpecificType<T, string>,
  value: string
) {
  // update logic
}

// Valid key
updateCreature(cat, 'name', 'Luna');

// Invalid key
updateCreature(cat, 'id', 3);
```

### Signature

```typescript
type OnlyKeysOfSpecificType<T, S> = {
  [Key in keyof T]: S extends T[Key] ? Key : never;
}[keyof T];
```

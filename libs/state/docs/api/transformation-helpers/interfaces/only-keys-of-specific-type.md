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

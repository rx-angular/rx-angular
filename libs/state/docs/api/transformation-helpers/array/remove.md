# remove

Removes one or multiple items from array T[].
You can provide a custom comparison function that should return true if items match.
If no comparison is provided, an equality check is used by default.
Returns new updated array T[].
Not mutating original array.

_Example_

```TypeScript
// Removing value without comparison function

const items = [1,2,3,4,5];

const updatedItems = remove(items, [1,2,3]);

// updatedItems will be: [4,5];
```

_Example_

```TypeScript
// Removing value without comparison function

const items = [1,2,3,4,5];

const updatedItems = insert(items, [1,2,3]);

// updatedItems will be: [4,5];
```

_Example_

```TypeScript
// Removing values with comparison function

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];

const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];

const realCreatures = remove(creatures, nonExistingCreatures, (a, b) => a.id === b.id);

// realCreatures will be: [{id: 1, type: 'cat'}];
```

## Signature

```TypeScript
function remove<T, I extends T>(array: T[], itemsOrItem: I[] | I, compare?: CompareFn<T>): T[]
```

## Parameters

### array

##### typeof: T[]

### itemsOrItem

##### typeof: I[] | I

### compare

##### typeof: CompareFn&#60;T&#62;

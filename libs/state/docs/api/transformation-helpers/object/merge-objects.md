# mergeObjects

Merges object of type T with updates of type Partial T.
Returns new object where updated overrides original values.
Not mutating original object.

_Example_

```TypeScript

const cat = {id: 1, type: 'cat', name: 'Leo'};

const catWithname = mergeObjects(cat, {name: 'Fluffy'});

// catWithname will be:
// {id: 1, type: 'cat', name: 'Fluffy'};
```

## Signature

```TypeScript
function mergeObjects<T extends object>(object: T, upd: Partial<T>): T
```

## Parameters

### object

##### typeof: T

### upd

##### typeof: Partial&#60;T&#62;

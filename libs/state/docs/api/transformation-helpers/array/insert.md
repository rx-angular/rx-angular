

# insert

Inserts one or multiple items to an array T[].Returns a shallow copy of the updated array T[], and does not mutate the original one.

*Example*

```TypeScript
// Inserting single valueconst creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];const updatedCreatures = insert(items, {id: 3, type: 'parrot'});// updatedCreatures will be://  [{id: 1, type: 'cat'}, {id: 2, type: 'dog}, {id: 3, type: 'parrot}];
```


*Example*

```TypeScript
// Inserting multiple valuesconst creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];const updatedCreatures = insert(items, [{id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}]);// updatedCreatures will be:// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}];
```


## Signature

```TypeScript
function insert<T, I extends T>(array: T[], itemsOrItem: I[] | I): T[]
```
## Parameters

### array
 ##### typeof: T[]

### itemsOrItem
 ##### typeof: I[] | I


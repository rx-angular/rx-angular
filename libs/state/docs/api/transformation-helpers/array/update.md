

# update

Updates one or multiple items in an array T[].You can provide a custom comparison function that should return true if items match.If no comparison is provided, an equality check is used by default.Returns a shallow copy of the updated array T[], and does not mutate the original one.

*Example*

```TypeScript
const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];const newCat = {id: 1, type: 'lion'};const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);// updatedCreatures will be:// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```


## Signature

```TypeScript
function update<T extends object>(array: T[], itemsOrItem: T[] | T, compare?: CompareFn<T>): T[]
```
## Parameters

### array
 ##### typeof: T[]

### itemsOrItem
 ##### typeof: T[] | T

### compare
 ##### typeof: CompareFn&#60;T&#62;


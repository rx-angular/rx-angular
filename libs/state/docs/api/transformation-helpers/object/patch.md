

# patch

Merges an object of type T with updates of type Partial<T>.Returns a new object where updates override original values while not mutating the original one.

*Example*

```TypeScript
interface Creature { id: number, type: string, name: string}const cat = {id: 1, type: 'cat'};const catWithname = patch(cat, {name: 'Fluffy'});// catWithname will be:// {id: 1, type: 'cat', name: 'Fluffy'};
```


## Signature

```TypeScript
function patch<T extends object>(object: T, upd: Partial<T>): T
```
## Parameters

### object
 ##### typeof: T

### upd
 ##### typeof: Partial&#60;T&#62;


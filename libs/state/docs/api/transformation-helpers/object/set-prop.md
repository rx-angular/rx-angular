

# setProp

Accepts an object of type T, key of type K extends keyof T, and value of type T[K].Sets the property and returns a newly updated shallow copy of an object while not mutating the original one

*Example*

```TypeScript
const cat = {id: 1, type: 'cat', name: 'Fluffy'};const renamedCat = setProp(cat, 'name', 'Bella');// renamedCat will be:// {id: 1, type: 'cat', name: 'Bella'};
```


## Signature

```TypeScript
function setProp<T extends object, K extends keyof T>(object: T, key: K, value: T[K]): T
```
## Parameters

### object
 ##### typeof: T

### key
 ##### typeof: K

### value
 ##### typeof: T[K]


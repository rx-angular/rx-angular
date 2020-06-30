

# deleteProp

Accepts an object of type T and key of type K extends keyof T.Removes property from an object and returns an updated shallow copy updated object without specified property.If property not found returns copy of the original object.Not mutating original object.

*Example*

```TypeScript
const cat = {id: 1, type: 'cat', name: 'Fluffy'};const anonymusCat = deleteProp(cat, 'name');// anonymusCat will be:// {id: 1, type: 'cat'};
```


## Signature

```TypeScript
function deleteProp<T extends object, K extends keyof T>(object: T, key: K): Omit<T, K>
```
## Parameters

### object
 ##### typeof: T

### key
 ##### typeof: K


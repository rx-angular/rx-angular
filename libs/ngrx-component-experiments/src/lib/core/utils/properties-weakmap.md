# Properties WeakMap

## Problem

We want to maintain values for a certain object but we can't mutate the object propertys.

```typescript
const someObject1: object = {
  foo: 'bar',
  isCoalescing: 'default version'
};
```

Lets say we want to add a property `isCoalescing` to any given object.

```typescript
export interface Properties {
  isCoalescing: boolean;
}
```

If we would just add the objects properties we could conflict with already existing properties.

```typescript
console.log('someObject1 before:', someObject1);
// { foo: 'bar', isCoalescing: 'default version' }

(someObject1 as Properties).isCoalescing = true;
console.log('someObject1 after:', someObject1);
// { foo: "bar", isCoalescing: true }
```

One way to avoid that could be using Symbols.

### Symbols

```typescript
const someObject2: object = {
  foo: 'bar',
  isCoalescing: 'symbol version'
};
```

A symbol is a unique identifier and looks like that:

```typescript
const propertyNameIsCoalescing = Symbol('propertyNameIsCoalescing');
```

We can use this symbol to apply values under a save property name.

```typescript
console.log('someObject2 before:', someObject2);
// { foo: "bar", isCoalescing: "symbol version" }
console.log(
  'someObject2[propertyNameIsCoalescing]',
  someObject2[propertyNameIsCoalescing]
);
// undefined

someObject2[propertyNameIsCoalescing] = true;

console.log('someObject2 after:', someObject2);
// { foo: "bar", isCoalescing: "symbol version", Symbol(propertyNameIsCoalescing): true }
console.log(
  'someObject2[propertyNameIsCoalescing]',
  someObject2[propertyNameIsCoalescing]
);
// true
```

Unfortunately, still mutate the object with this approach.
Further more if we would apply other references to the property `someObject2` may never get garbage collected.

A better solution would be to use a WeakMap.

### WeakMaps

```typescript
const someObject3: object = {
  foo: 'bar',
  isCoalescing: 'weakMap version'
};

const getDefaults = (ctx: object): Properties => ({ isCoalescing: false });
const propsMap = createPropertieWeakMap<object, Properties>(getDefaults);
```

The const `propsMap` can now be used to maintain properties per instance without mutation them or having any references.

```typescript
console.log('someObject3 before:', someObject3);
// {foo: "bar", isCoalescing: "waerMap version"}
console.log('props before:', propertMap.getProperties(someObject3));
// {isCoalescing: "weakMap version"}

propsMap.setProperties(someObject3, { isCoalescing: true });
console.log('someObject3 after:', someObject3);
// {foo: "bar", isCoalescing: "weakMap version"}
console.log('props after:', propsMap.getProperties(someObject3));
// {isCoalescing: "true"}
```

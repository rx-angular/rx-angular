# Overview

Transformation helpers provides a set of tools that simplifies the management of data structures in an immutable way.

Currently transformation helpers support the management of objects and arrays.

You can use the transformation helpers without RxState but expect the behavior to be opinionated since in the first place this package is designed to optimize state management with RxState.

---

# Array

## insert

Inserts one or multiple items to an array T[].
Returns a shallow copy of the updated array T[], and does not mutate the original one.

_Example_

```TypeScript
// Inserting single value

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];

const updatedCreatures = insert(creatures, {id: 3, type: 'parrot'});

// updatedCreatures will be:
//  [{id: 1, type: 'cat'}, {id: 2, type: 'dog}, {id: 3, type: 'parrot}];
```

_Example_

```TypeScript
// Inserting multiple values

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];

const updatedCreatures = insert(creatures, [{id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}]);

// updatedCreatures will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}];
```

_Example_

```TypeScript
// Usage with RxState

export class ListComponent {

   readonly insertCreature$ = new Subject<void>();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       'creatures',
       this.insertCreature$,
       ({ creatures }) => {
           const creatureToAdd = {id: generateId(), name: 'newCreature', type: 'dinosaur' };
           return insert(creatures, creatureToAdd)
       }
     );
   }

   // Imperative implementation
   insertCeature(): void {
       const creatureToAdd = {id: generateId(), name: 'newCreature', type: 'dinosaur' };
       this.state.set({ creatures: insert(this.state.get().creatures, creatureToAdd)});
   }
}
```

### Edge cases

```typescript
insert(null as any, items) > items;
insert(items, null as any) > items;
insert(null as any, null as any) > null;
insert(undefined as any, undefined as any) > undefined;
insert(nonArray as any, items) > items;
```

### Signature

```TypeScript
function insert<T>(source: T[], updates: T | T[]): T[]
```

### Parameters

#### array

##### typeof: T[]

#### itemsOrItem

##### typeof: T | T[]

---

## remove

Removes one or multiple items from an array T[].
For comparison you can provide key, array of keys or a custom comparison function that should return true if items match.
If no comparison data is provided, an equality check is used by default.
Returns a shallow copy of the updated array T[], and does not mutate the original one.

_Example_

```TypeScript
// Removing value without comparison data

const items = [1,2,3,4,5];

const updatedItems = remove(items, [1,2,3]);

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

_Example_

```TypeScript
// Removing values with key

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];

const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];

const realCreatures = remove(creatures, nonExistingCreatures, 'id');

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example_

```TypeScript
// Removing values with array of keys

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];

const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];

const realCreatures = remove(creatures, nonExistingCreatures, ['id', 'type']);

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example_

```TypeScript
// Usage with RxState

export class ListComponent {

   readonly removeCreature$ = new Subject<Creature>();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       'creatures',
       this.removeCreature$,
       ({ creatures }, creatureToRemove) => {
           return remove(creatures, creatureToRemove, (a, b) => a.id === b.id);
       }
     );
   }

   // Imperative implementation
   removeCreature(creatureToRemove: Creature): void {
       this.state.set({ creatures: remove(this.state.get().creatures, creatureToRemove, (a, b) => a.id === b.id)});
   }
}
```

### Edge cases

```typescript
remove(null as any, items) > null;
remove(items, null as any) > items;
remove(null as any, null as any) > null;
remove(undefined as any, undefined as any) > undefined;
remove(nonArray as any, items) > nonArray;
```

### Signature

```TypeScript
function remove<T>(source: T[], scrap: Partial<T>[] | Partial<T>, compare?: ComparableData<T>): T[]
```

### Parameters

#### source

##### typeof: T[]

#### scrap

##### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

##### typeof: ComparableData&#60;T&#62;

---

## toDictionary

Converts an array of objects to a dictionary {[key: string]: T}.
Accepts array T[] and key of type string, number or symbol as inputs.

_Example_

```TypeScript
const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];

const creaturesDictionary = toDictionary(creatures, 'id');

// creaturesDictionary will be:
// {
//  1: {id: 1, type: 'cat'},
//  2: {id: 2, type: 'dog'},
//  3: {id: 3, type: 'parrot'}
// };
```

_Example_

```TypeScript
// Usage with RxState

export class ListComponent {

   readonly convertToDictionary$ = new Subject();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       'creaturesDictionary',
       this.convertToDictionary$,
       ({ creatures }) => {
           return toDictionary(creatures, 'id');
       }
     );
   }

   // Imperative implementation
   convertToDictionary(): void {
       this.state.set({ creaturesDictionary: toDictionary(this.state.get().creatures, 'id'});
   }
}
```

### Edge cases

```typescript
toDictionary([] as any, 'nonExistingKey') > {};
toDictionary(items, 'nonExistingKey') > {};
toDictionary(items, 'nonPrimitiveKey' as any) > {};
toDictionary(items, null as any) > {};
toDictionary(nonObject as any, '') > nonObject;
toDictionary(null as any, '') > null;
toDictionary(undefined as any, '') > undefined;
```

### Signature

```TypeScript
function toDictionary<T extends object>(source: T[], key: | OnlyKeysOfSpecificType<T, number>
    | OnlyKeysOfSpecificType<T, string>
    | OnlyKeysOfSpecificType<T, symbol>): { [key: string]: T }
```

### Parameters

#### source

##### typeof: T[]

#### key

##### typeof: | OnlyKeysOfSpecificType&#60;T, number&#62;

     | OnlyKeysOfSpecificType&#60;T, string&#62;
     | OnlyKeysOfSpecificType&#60;T, symbol&#62;

---

## update

Updates one or multiple items in an array T[].
For comparison you can provide key, array of keys or a custom comparison function that should return true if items match.
If no comparison is provided, an equality check is used by default.
Returns a shallow copy of the array T[] and updated items, does not mutate the original array.

_Example_

```TypeScript
// Update with comparison function

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];

const newCat = {id: 1, type: 'lion'};

const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example_

```TypeScript
// Update with key

const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];

const newCat = {id: 1, type: 'lion'};

const updatedCreatures = update(creatures, newCat, 'id');

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example_

```TypeScript
// Update with array of keys

const creatures = [{id: 1, type: 'cat', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];

const newCat = {id: 1, type: 'lion', name: 'Bella'};

const updatedCreatures = update(creatures, newCat, ['id', 'name']);

// updatedCreatures will be:
// [{id: 1, type: 'lion', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
```

_Example_

```TypeScript
// Usage with RxState

export class ListComponent {

   readonly updateCreature$ = new Subject<Creature>();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       'creatures',
       this.updateCreature$,
       ({ creatures }, creatureToUpdate) => {
           return update(creatures, creatureToRemove, (a, b) => a.id === b.id);
       }
     );
   }

   // Imperative implementation
   updateCreature(creatureToUpdate: Creature): void {
       this.state.set({ creatures: update(this.state.get().creatures, creatureToUpdate, (a, b) => a.id === b.id)});
   }
}
```

### Edge cases

```typescript
update(null as any, items) > items;
update(items, null as any) > items;
update(null as any, null as any) > null;
update(undefined as any, undefined as any) > undefined;
update(nonArray as any, items) > items;
```

### Signature

```TypeScript
function update<T extends object>(source: T[], updates: Partial<T>[] | Partial<T>, compare?: ComparableData<T>): T[]
```

### Parameters

#### source

##### typeof: T[]

#### updates

##### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

##### typeof: ComparableData&#60;T&#62;

---

# Object

## deleteProp

Accepts an object of type T and key of type K extends keyof T.
Removes property from an object and returns a shallow copy of the updated object without specified property.
If property not found returns copy of the original object.
Not mutating original object.

_Example_

```TypeScript
const cat = {id: 1, type: 'cat', name: 'Fluffy'};

const anonymusCat = deleteProp(cat, 'name');

// anonymusCat will be:
// {id: 1, type: 'cat'};
```

_Example_

```TypeScript
// Usage with RxState

export class ProfileComponent {

   readonly removeName$ = new Subject();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       this.removeName$,
       (state) => {
           return deleteProp(state, 'name');
       }
     );
   }

   // Imperative implementation
   removeName(): void {
       this.state.set(remove(this.get(), 'name'));
   }
}
```

### Signature

```TypeScript
function deleteProp<T extends object, K extends keyof T>(object: T, key: K): Omit<T, K>
```

### Parameters

#### object

##### typeof: T

#### key

##### typeof: K

---

## dictionaryToArray

Converts a dictionary of type {[key: string]: T} to array T[].

_Example_

```TypeScript
const creaturesDictionary = {
  '1': {id: 1, type: 'cat'},
  '2': {id: 2, type: 'dog'},
  '3': {id: 3, type: 'parrot'}
};

const creaturesArray = dictionaryToArray(creaturesDictionary);

// creaturesArray will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
```

_Example_

```TypeScript
// Usage with RxState

export class ListComponent {
   readonly removeName$ = new Subject();

   constructor(
     private state: RxState<ComponentState>,
     private api: ApiService
   ) {
     // Reactive implementation
     state.connect(
       'creatures',
       this.api.creaturesDictionary$,
       (_, creatures) => {
           return dictionaryToArray(creatures);
       }
     );
   }

   // Imperative implementation
   removeName(): void {
     this.api.creaturesDictionary$.pipe(
       // subscription handling logic
     ).subscribe(
       dictionary => this.set({creatures: dictionaryToArray(dictionary)})
     );
   }
}
```

### Signature

```TypeScript
function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[]
```

### Parameters

#### dictionary

##### typeof: { [key: string]: T }

## patch

Merges an object of type T with updates of type Partial<T>.
Returns a new object where updates override original values while not mutating the original one.

_Example_

```TypeScript
interface Creature {
 id: number,
 type: string,
 name: string
}

const cat = {id: 1, type: 'cat'};

const catWithname = patch(cat, {name: 'Fluffy'});

// catWithname will be:
// {id: 1, type: 'cat', name: 'Fluffy'};
```

_Example_

```TypeScript
// Usage with RxState

export class ProfileComponent {

   readonly changeName$ = new Subject<string>();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       this.changeName$,
       (state, name) => {
           return patch(state, { name });
       }
     );
   }

   // Imperative implementation
   changeName(name: string): void {
       this.state.set(patch(this.get(), { name }));
   }
}
```

### Signature

```TypeScript
function patch<T extends object>(object: T, upd: Partial<T>): T
```

### Parameters

#### object

##### typeof: T

#### upd

##### typeof: Partial&#60;T&#62;

---

## setProp

Accepts an object of type T, key of type K extends keyof T, and value of type T[K].
Sets the property and returns a newly updated shallow copy of an object while not mutating the original one.

_Example_

```TypeScript
const cat = {id: 1, type: 'cat', name: 'Fluffy'};

const renamedCat = setProp(cat, 'name', 'Bella');

// renamedCat will be:
// {id: 1, type: 'cat', name: 'Bella'};
```

_Example_

```TypeScript
// Usage with RxState

export class ProfileComponent {

   readonly changeName$ = new Subject<string>();

   constructor(private state: RxState<ComponentState>) {
     // Reactive implementation
     state.connect(
       this.changeName$,
       (state, name) => {
           return setProp(state, 'name', name);
       }
     );
   }

   // Imperative implementation
   changeName(name: string): void {
       this.state.set(setProp(this.get(), 'name', name));
   }
}
```

### Signature

```TypeScript
function setProp<T extends object, K extends keyof T>(object: T, key: K, value: T[K]): T
```

### Parameters

#### object

##### typeof: T

#### key

##### typeof: K

#### value

##### typeof: T[K]

---

## toggle

Toggles a boolean property in the object.
Accepts object of type T and key value of which is boolean.
Toggles the property and returns a shallow copy of an object, while not mutating the original one.

_Example_

```TypeScript
const state = {items: [1,2,3], loading: true};

const updatedState = toggle(state, 'loading');

// updatedState will be:
// {items: [1,2,3], loading: false};
```

_Example_

```TypeScript
// Usage with RxState

export class ListComponent {
   readonly loadingChange$ = new Subject();

   constructor(
     private state: RxState<ComponentState>
   ) {
     // Reactive implementation
     state.connect(
       this.api.loadingChange$,
       (state, _) => {
           return toggle(state, 'isLoading');
       }
     );
   }

   // Imperative implementation
   toggleLoading(): void {
     this.set(toggle(state, 'isLoading'));
   }
}
```

### Signature

```TypeScript
function toggle<T extends object>(object: T, key: OnlyKeysOfSpecificType<T, boolean>): T
```

### Parameters

#### object

##### typeof: T

#### key

##### typeof: OnlyKeysOfSpecificType&#60;T, boolean&#62;

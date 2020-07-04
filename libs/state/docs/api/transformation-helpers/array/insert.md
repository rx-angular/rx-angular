# insert

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

   readonly creatures$: Observable<Creature[]> = this.state.select('creatures');
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

## Signature

```TypeScript
function insert<T>(source: T[], updates: T | T[]): T[]
```

## Parameters

### array

##### typeof: T[]

### itemsOrItem

##### typeof: T | T[]

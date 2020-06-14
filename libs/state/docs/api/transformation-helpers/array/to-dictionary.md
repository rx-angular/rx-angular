# toDictionary

Corverts array of objects to dictionary {[key: string]: T}.
Accepts array T[] and key of type string, number or symbol as inputs.
Returns dictionary {[key: string]: T};

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

## Signature

```TypeScript
function toDictionary<T extends object>(array: T[], key: | OnlyKeysOfSpecificType<T, number>
    | OnlyKeysOfSpecificType<T, string>
    | OnlyKeysOfSpecificType<T, symbol>): { [key: string]: T }
```

## Parameters

### array

##### typeof: T[]

### key

##### typeof: OnlyKeysOfSpecificType&#60;T, number&#62; | OnlyKeysOfSpecificType&#60;T, string&#62; | OnlyKeysOfSpecificType&#60;T, symbol&#62;

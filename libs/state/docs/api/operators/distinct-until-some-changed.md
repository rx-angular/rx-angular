## distinctUntilSomeChanged

Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
the previous item. Comparison will be done for each set key in the `keys` array.

You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
explicitly different

The name `distinctUntilSomeChanged` was picked since it internally iterates over the `keys` and utilizes the
[some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
compute if values are distinct or not.

_Example_

```typescript
import { of } from 'rxjs';
import { distinctUntilSomeChanged } from 'rx-angular/state';

interface Person {
  age: number;
  name: string;
}

of(
  { age: 4, name: 'Hans' },
  { age: 7, name: 'Sophie' },
  { age: 5, name: 'Han Solo' },
  { age: 5, name: 'HanSophie' }
)
  .pipe(distinctUntilSomeChanged(['age', 'name']))
  .subscribe((x) => console.log(x));

// displays:
// { age: 4, name: 'Hans'}
// { age: 7, name: 'Sophie'}
// { age: 5, name: 'Han Solo'}
// { age: 5, name: 'HanSophie'}
```

_Example_

```typescript
// An example with `KeyCompareMap`
import { of } from 'rxjs';
import { distinctUntilSomeChanged } from 'rxjs/operators';

interface Person {
  age: number;
  name: string;
}
const customComparison: KeyCompareMap<Person> = {
  name: (oldName, newName) =>
    oldName.substring(0, 2) === newName.substring(0, 2),
};

of(
  { age: 4, name: 'Hans' },
  { age: 7, name: 'Sophie' },
  { age: 5, name: 'Han Solo' },
  { age: 5, name: 'HanSophie' }
)
  .pipe(distinctUntilSomeChanged(['age', 'name'], customComparison))
  .subscribe((x) => console.log(x));

// displays:
// { age: 4, name: 'Hans' }
// { age: 7, name: 'Sophie' }
// { age: 5, name: 'Han Solo' }
```

### Signature

```typescript
function distinctUntilSomeChanged<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<T>
): MonoTypeOperatorFunction<T>;
```

### Parameters

#### keys

##### typeof: K[]

#### keyCompareMap

##### typeof: KeyCompareMap&#60;T&#62;

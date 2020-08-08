# Overview

This set of operators can be used in combination with the RxState service or outside of it. The main goal is to optimize data transfer between components, services, and templates.

---

# distinctUntilSomeChanged

Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
the previous item. Comparison will be done for each set key in the `keys` array.

You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
explicitly different

The name `distinctUntilSomeChanged` was picked since it internally iterates over the `keys` and utilizes the
[some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
compute if values are distinct or not.

_Example_

```TypeScript
import { of } from 'rxjs';
import { distinctUntilSomeChanged } from 'rx-angular/state';

interface Person {
   age: number;
   name: string;
}

of(
  { age: 4, name: 'Hans'},
  { age: 7, name: 'Sophie'},
  { age: 5, name: 'Han Solo'},
  { age: 5, name: 'HanSophie'},
).pipe(
  distinctUntilSomeChanged(['age', 'name']),
)
.subscribe(x => console.log(x));

// displays:
// { age: 4, name: 'Hans'}
// { age: 7, name: 'Sophie'}
// { age: 5, name: 'Han Solo'}
// { age: 5, name: 'HanSophie'}
```

_Example_

```TypeScript
// An example with `KeyCompareMap`
import { of } from 'rxjs';
import { distinctUntilSomeChanged } from 'rxjs/operators';

interface Person {
    age: number;
    name: string;
 }
const customComparison: KeyCompareMap<Person> = {
  name: (oldName, newName) => oldName.substring(0, 2) === newName.substring(0, 2)
};

of(
    { age: 4, name: 'Hans'},
    { age: 7, name: 'Sophie'},
    { age: 5, name: 'Han Solo'},
    { age: 5, name: 'HanSophie'},
  ).pipe(
    distinctUntilSomeChanged(['age', 'name'], customComparison),
  )
  .subscribe(x => console.log(x));

// displays:
// { age: 4, name: 'Hans' }
// { age: 7, name: 'Sophie' }
// { age: 5, name: 'Han Solo' }
```

### Signature

```TypeScript
function distinctUntilSomeChanged<T extends object, K extends keyof T>(keys: K[], keyCompareMap?: KeyCompareMap<T>): MonoTypeOperatorFunction<T>
```

### Parameters

#### keys

##### typeof: K[]

### keyCompareMap

##### typeof: KeyCompareMap&#60;T&#62;


---
# select

returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```TypeScript
const profilePicture$ = state.pipe(
  select(
   pluck('profilePicture'),
   switchMap(profilePicture => mapImageAsync(profilePicture))
  )
);
```

### Signature

```TypeScript
function select<T, A>(op: OperatorFunction<T, A>): OperatorFunction<T, A>
```

### Parameters

#### op

##### typeof: OperatorFunction&#60;T, A&#62;

---

# selectSlice

Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
filtered to only emit _defined_ values as well as checked for distinct emissions.
Comparison will be done for each set key in the `keys` array.

You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
explicitly different

_Example_

```TypeScript
// An example with a custom comparison applied to each key
import { of } from 'rxjs';
import { selectSlice } from 'rx-angular/state';


const state$: Observable<MyState> = of(
 { title: 'myTitle', panelOpen: true},
 { title: 'myTitle2', panelOpen: true},
 { title: 'newTitle', panelOpen: true},
 { title: 'newTitle', panelOpen: false}
)
.pipe(
    selectSlice(['title', 'panelOpen']),
  )
  .subscribe(x => console.log(x));

// displays:
//  { title: 'myTitle', panelOpen: true },
//  { title: 'myTitle2', panelOpen: true },
//  { title: 'newTitle', panelOpen: true },
//  { title: 'newTitle', panelOpen: false }
```

_Example_

```TypeScript
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { selectSlice } from 'rx-angular/state';

interface MyState {
   title: string;
   items: string[];
   panelOpen: boolean;
}
// Select items and title.
// apply custom compare logic for the items array
const customComparison: KeyCompareMap<MyState> = {
  items: (oldItems, newItems) => compareItems(oldItems, newItems)
};
const state$: Observable<MyState> = of(
{ title: 'myTitle', items: ['foo', 'bar'], panelOpen: true },
{ title: 'myTitle', items: ['foo', 'bar'], panelOpen: false },
{ title: 'nextTitle', items: ['foo', 'baR'], panelOpen: true },
{ title: 'nextTitle', items: ['fooRz', 'boo'], panelOpen: false },
);
const slice$ = state$.pipe(selectSlice(['title', 'items']), tap(console.log)).subscribe();

// displays:
// { title: 'myTitle', items: ['foo', 'bar'] }
// { title: 'nextTitle', items: ['foo', 'baR'] }
// { title: 'nextTitle', items: ['fooRz', 'boo'] }
```

### Signature

```TypeScript
function selectSlice<T extends object, K extends keyof T>(keys: K[], keyCompareMap?: KeyCompareMap<{ [P in K]: T[P] }>): OperatorFunction<T, PickSlice<T, K> | null>
```

### Parameters

#### keys

##### typeof: K[]

### keyCompareMap

##### typeof: KeyCompareMap&#60;{ [P in K]: T[P] }&#62;
---
# stateful

As the name `stateful` implies this operator is useful when you process an Observable which maintains state.

Maintaining state as an `Observable` source comes with a handful of repetitive as well as use case specific tasks.

It acts like the Observables `pipe` method.
It accepts RxJS operators and composes them like `Observable#pipe` and the standalone `pipe` method.

Furthermore, it takes care of the above mentioned repetitive tasks as listed below.

You will always (aka repetitive) want to ensure that:

- only distinct state changes are emitted
- only defined values are emitted (filter out undefined, which ensures lazy state)
- share and replay custom operations for multiple subscribers (saves performance)

You will sometimes (aka situational) need:

- a subset of the state (derivations)
- compose the state with other Observables or change the Observables behaviour

_Example_

```TypeScript
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stateful } from 'rx-angular/state';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(
  stateful(
    map(state => state.list.length),
    filter(length => length > 3)
  )
);
```

### Signature

```TypeScript
function stateful<T>(): MonoTypeOperatorFunction<T>
```

As it acts like the Observables `pipe` method, it accepts one or many RxJS operators as params.

_Example_

```TypeScript
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stateful } from 'rx-angular/state';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(
  stateful(
    map(state => state.list.length),
    filter(length => length > 3)
  )
);
```

### Signature

```TypeScript
function stateful<T, R>(optionalDerive: OperatorFunction<T, R>[]): OperatorFunction<T, T | R>
```

### Parameters

#### optionalDerive

##### typeof: OperatorFunction&#60;T, R&#62;[]

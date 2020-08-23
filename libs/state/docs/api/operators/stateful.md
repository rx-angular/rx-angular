## stateful

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

```typescript
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stateful } from 'rx-angular/state';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(
  stateful(
    map((state) => state.list.length),
    filter((length) => length > 3)
  )
);
```

### Signature

```typescript
function stateful<T>(): MonoTypeOperatorFunction<T>;
```

### Signature

```typescript
function stateful<T, R>(
  optionalDerive: OperatorFunction<T, R>[]
): OperatorFunction<T, T | R>;
```

### Parameters

#### optionalDerive

##### typeof: OperatorFunction&#60;T, R&#62;[]

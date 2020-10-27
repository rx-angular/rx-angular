# Deriving simple state

As the name `stateful` implies this operator is useful when you process an Observable which maintains state.

Maintaining state as an `Observable` source comes with a handful of repetitive as well as situational tasks.

You will always (aka repetitive) want to ensure that:

- only distinct state changes are emitted
- only defined values are emitted (filter out undefined, which ensures lazy state)
- share and replay custom operations for multiple subscribers (saves performance)

You will sometimes (aka situational) need:

- a subset of the state (derivations)
- compose the state with other Observables or change the Observables behaviour

If we take a simple state derivation and select the number of items in a list the above looks like this:

```typescript
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, filter, shareReplay } from 'rxjs/operators';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(
  // distinct same base-state objects (e.g. a emission of default switch cases, incorrect mutable handling of data) @TODO evaluate benefits vs. overhead
  distinctUntilChanged(),
  // CUSTOM LOGIC HERE
  map((state) => state.list.length),
  // Filter out undefined to have lazy state and the ability to delete state slices over time
  filter((v) => v !== undefined),
  // Distinct same values derived from the state
  distinctUntilChanged(),
  // Reuse custom operations result for multiple subscribers and reemit the last calculated value.
  shareReplay({ bufferSize: 1, refCount: true })
);
```

Using the `stateful` operator gives you the advantage to insert custom logic to derive state without having to think about sharing or replaying. It will also apply `distinctUntilChanged` by default. But you can provide custom logic for distinct values aswell.

```typescript
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stateful } from '@rx-angular/state';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(stateful(map((state) => state.list.length)));
```

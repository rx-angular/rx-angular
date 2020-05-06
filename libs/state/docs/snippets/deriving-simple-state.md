# Deriving simple state

As the name implies this operator is useful when you process an Observable which maintains state.

If an Observable maintain state there are repetitive and custom things.

The following things need to get ensured always:

- emit only distinct values (state changes)
- filter out undefined values (lazy state)
- share and replay the applied operations for multiple subscribers (display the state derivation)

The following things are always custom:

- get a subset of state derivation
- compose in other Observables or change the Observables behaviour

If we take a simple state derivation and select the number of items in a list the above looks like this:

```typescript
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, filter, shareReplay } from 'rxjs/operators';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(
  // distinct same base-state objects (e.g. a emission of default switch cases, incorrect mutable handling of data) @TODO evaluate benefits vs. overhead
  distinctUntilChanged(),
  // CUSTOM LOGIC HERE
  map(state => state.list.length),
  // Filter out undefined to have lazy state and the ability to delete state slices over time
  filter(v => v !== undefined),
  // Distinct same values derived from the state
  distinctUntilChanged(),
  // Reuse custom operations result for multiple subscribers and reemit the last calculated value.
  shareReplay({ bufferSize: 1, refCount: true })
);
```

By using the `stateful` operator we have the ability
to place custom logic into the above process, and the repetitive operators get abstracted away.

```typescript
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stateful } from '@rx-angular/state';

const state$: Observable<{ name: string; items: string[] }>;
const derivation$ = state$.pipe(stateful(map(state => state.list.length)));
```

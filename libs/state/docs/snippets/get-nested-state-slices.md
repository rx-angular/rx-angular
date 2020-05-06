# Get nested state slices

One of the fundamental reactive state derivations is getting a value of a state slice.
In some cases this slice could also be deeply nested inside our reactive state.

In RxJS there is an operator called [`pluck`](https://rxjs-dev.firebaseapp.com/api/operators/pluck) which "plucks" out values from an emitted object.
Also, the [`map`](https://rxjs-dev.firebaseapp.com/api/operators/map) operator could serve for such a task:

```typescript
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

const state$: Observable<{ person: { name: string } }>;
const derivation1$ = state$.pipe(map(state => state?.person?.name));
const derivation2$ = state$.pipe(pluck('person', 'name'));
```

In both cases we have repetitive work to do.
For this situation we can use the [`stateful`]()operator from `@rx-angular/state`.

```typescript
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { stateful } from '@rx-angular/state';

const state$: Observable<{ person: { name: string } }>;
const derivation3$ = state$.pipe(stateful(pluck('person', 'name')));
```

But we could even got shorter and use the [`select`]() operator.
This is a combination of stateful with a separate overload for pluck.

It can be used as this:

```typescript
import { Observable } from 'rxjs';
import { select } from '@rx-angular/state';

const state$: Observable<{ person: { name: string } }>;
const derivation4$ = state$.pipe(select('person', 'name'));
```

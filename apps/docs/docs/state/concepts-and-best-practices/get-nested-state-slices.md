# Get nested state slices

One very common tasks when deriving state is selecting a single value out of the whole state.
If you are familiar with RxJS, you will know about the [`pluck` operator](https://rxjs-dev.firebaseapp.com/api/operators/pluck) which "plucks" out values from an object.
Also, the [`map`](https://rxjs-dev.firebaseapp.com/api/operators/map) operator could be used for this.

As shown in [deriving simple state](deriving-simple-state.md) we use `stateful` operator from `@rx-angular/state` to get basic observable handling right out of the box.

```typescript
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { stateful } from '@rx-angular/state';

const state$: Observable<{ person: { name: string } }>;
const derivation3$ = state$.pipe(stateful(pluck('person', 'name')));
```

We could even save more code by using the [`select`](../api/rxjs-operators/select) operator which essentially is a combination of `stateful` and `pluck`.

```typescript
import { Observable } from 'rxjs';
import { select } from '@rx-angular/state';

const state$: Observable<{ person: { name: string } }>;
const derivation4$ = state$.pipe(select('person', 'name'));
```

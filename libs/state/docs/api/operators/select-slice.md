## selectSlice

Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
filtered to only emit _defined_ values as well as checked for distinct emissions.
Comparison will be done for each set key in the `keys` array.

You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
explicitly different

_Example_

```typescript
// An example with a custom comparison applied to each key
import { of } from 'rxjs';
import { selectSlice } from 'rx-angular/state';

const state$: Observable<MyState> = of(
  { title: 'myTitle', panelOpen: true },
  { title: 'myTitle2', panelOpen: true },
  { title: 'newTitle', panelOpen: true },
  { title: 'newTitle', panelOpen: false }
)
  .pipe(selectSlice(['title', 'panelOpen']))
  .subscribe((x) => console.log(x));

// displays:
//  { title: 'myTitle', panelOpen: true },
//  { title: 'myTitle2', panelOpen: true },
//  { title: 'newTitle', panelOpen: true },
//  { title: 'newTitle', panelOpen: false }
```

_Example_

```typescript
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
  items: (oldItems, newItems) => compareItems(oldItems, newItems),
};
const state$: Observable<MyState> = of(
  { title: 'myTitle', items: ['foo', 'bar'], panelOpen: true },
  { title: 'myTitle', items: ['foo', 'bar'], panelOpen: false },
  { title: 'nextTitle', items: ['foo', 'baR'], panelOpen: true },
  { title: 'nextTitle', items: ['fooRz', 'boo'], panelOpen: false }
);
const slice$ = state$
  .pipe(selectSlice(['title', 'items']), tap(console.log))
  .subscribe();

// displays:
// { title: 'myTitle', items: ['foo', 'bar'] }
// { title: 'nextTitle', items: ['foo', 'baR'] }
// { title: 'nextTitle', items: ['fooRz', 'boo'] }
```

### Signature

```typescript
function selectSlice<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<{ [P in K]: T[P] }>
): OperatorFunction<T, PickSlice<T, K> | null>;
```

### Parameters

#### keys

##### typeof: K[]

#### keyCompareMap

##### typeof: KeyCompareMap&#60;{ [P in K]: T[P] }&#62;

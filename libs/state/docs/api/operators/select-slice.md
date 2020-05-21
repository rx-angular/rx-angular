# selectSlice

Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
filtered to only emit _defined_ values as well as checked for distinct emissions.

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
const state$: Observable<MyState> = of({
  title: 'myTitle',
  items: ['foo', 'bar'],
  panelOpen: true
});
const slice$ = state$.pipe(selectSlice('items', 'panelOpen')).pipe(tap(console.log)).subscribe();

// displays:
// { items: ['foo', 'bar'], panelOpen: true }
```

## Signature

```TypeScript
function selectSlice<T extends object>(keys: (keyof T)[]): OperatorFunction<T, Partial<T>>
```

## Parameters

### keys

##### typeof: (keyof T)[]

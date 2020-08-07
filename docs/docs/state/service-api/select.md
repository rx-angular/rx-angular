# select

### Signature

```TypeScript
select(): Observable<T>
```

returns the state as cached and distinct `Observable<T>`. This way you don't have to think about **late
subscribers**,
**multiple subscribers** or **multiple emissions** of the same value

_Example_

```TypeScript
const state$ = state.select();
state$.subscribe(state => doStuff(state));
```

### Signature

```TypeScript
select(op: OperatorFunction<T, A>): Observable<A>
```

returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```TypeScript
const profilePicture$ = state.select(
 pluck('profilePicture'),
 switchMap(profilePicture => mapImageAsync(profilePicture))
);
```

### Signature

```TypeScript
select(k1: K1): Observable<T[K1]>
```

Access a single property of the state by providing keys.
Returns a single property of the state as cached and distinct `Observable<T[K1]>`.

_Example_

```TypeScript
// Access a single property

const bar$ = state.select('bar');

// Access a nested property

const foo$ = state.select('bar', 'foo');
```

## select

returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```typescript
const profilePicture$ = state.pipe(
  select(
    pluck('profilePicture'),
    switchMap((profilePicture) => mapImageAsync(profilePicture))
  )
);
```

### Signature

```typescript
function select<T, A>(op: OperatorFunction<T, A>): OperatorFunction<T, A>;
```

### Parameters

#### op

##### typeof: OperatorFunction&#60;T, A&#62;

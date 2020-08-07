# hold

### Signature

```TypeScript
  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void): void
```

Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
`sideEffectFunction`.
Subscription handling is done automatically.

_Example_

```TypeScript
// Directly pass an observable side-effect
const localStorageEffect$ = changes$.pipe(
 tap(changes => storeChanges(changes))
);
state.hold(localStorageEffect$);

// Pass an additional `sideEffectFunction`

const localStorageEffectFn = changes => storeChanges(changes);
state.hold(changes$, localStorageEffectFn);
```

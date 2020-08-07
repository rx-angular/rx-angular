# Service Signature

```TypeScript
class RxState<T extends object> implements OnDestroy, Subscribable<T> {
  readonly readonly $: Observable<T> = this.accumulator.signal$;
  setAccumulator(accumulatorFn: AccumulationFn) => ;
  get() => T;
  get(k1: K1) => Partial<T>;
  set(stateOrProjectState: Partial<T> | ProjectStateFn<T>) => void;
  set(key: K, projectSlice: ProjectValueFn<T, K>) => void;
  connect(inputOrSlice$: Observable<Partial<T> | V>, projectFn?: ProjectStateReducer<T, V>) => void;
  connect(key: K, slice$: Observable<T[K]>) => void;
  connect(key: K, input$: Observable<V>, projectSliceFn: ProjectValueReducer<T, K, V>) => void;
  select() => Observable<T>;
  select(op: OperatorFunction<T, A>) => Observable<A>;
  select(k1: K1) => Observable<T[K1]>;
  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void) => void;
}
```

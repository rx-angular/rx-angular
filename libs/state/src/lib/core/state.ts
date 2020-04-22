import {
  Observable,
  OperatorFunction,
  Subscribable,
  Subscription,
  Unsubscribable
} from 'rxjs';
import { filter, map, pluck, tap } from 'rxjs/operators';
import { createAccumulationObservable } from './accumulation-observable';
import { createSideEffectObservable } from './side-effect-observable';
import { stateful } from './operators';
import {
  isObservableGuard,
  isOperateFnArrayGuard,
  isStringArrayGuard,
  pipeFromArray,
  WrongSelectParamsError
} from './utils';
import { isKeyOf } from './utils/typing';

type ProjectStateFn<T> = (oldState: T) => Partial<T>;
type ProjectValueFn<T, K extends keyof T> = (oldState: T) => T[K];
type ProjectStateReducer<T, K extends keyof T> = (
  oldState: T,
  value: any
) => Partial<T>;
type ProjectValueReducer<T, K extends keyof T> = (
  oldState: T,
  value: any
) => T[K];

/**
 * @example
 * const ls = new State<{test: string, bar: number}>();
 */
export class RxJsState<T extends object> implements Subscribable<any> {
  private accumulationObservable = createAccumulationObservable<T>();
  private effectObservable = createSideEffectObservable();

  readonly $ = this.accumulationObservable.state$;

  constructor() {}

  get(): T {
    return this.accumulationObservable.state;
  }

  /**
   * @example
   * const ls = new State<{test: string, bar: number}>();
   * ls.setState({test: 'tau'});
   * ls.setState({bar: 7});
   * ls.setState('test', 'tau');
   */
  set(stateOrProjectState: Partial<T> | ProjectStateFn<T>): void;
  set<K extends keyof T, O>(key: K, projectSlice: ProjectValueFn<T, K>): void;
  set<K extends keyof T>(
    keyOrStateOrProjectState: Partial<T> | ProjectStateFn<T> | K,
    stateOrSliceProjectFn?: ProjectValueFn<T, K>
  ): void {
    if (
      typeof keyOrStateOrProjectState === 'object' &&
      stateOrSliceProjectFn === undefined
    ) {
      this.accumulationObservable.nextSlice(keyOrStateOrProjectState);
      return;
    }

    if (
      typeof keyOrStateOrProjectState === 'function' &&
      stateOrSliceProjectFn === undefined
    ) {
      this.accumulationObservable.nextSlice(
        keyOrStateOrProjectState(this.accumulationObservable.state)
      );
      return;
    }

    if (
      isKeyOf<T>(keyOrStateOrProjectState) &&
      typeof stateOrSliceProjectFn === 'function'
    ) {
      const state: Partial<T> = {};
      state[keyOrStateOrProjectState] = stateOrSliceProjectFn(
        this.accumulationObservable.state
      );
      this.accumulationObservable.nextSlice(state);
      return;
    }

    throw new Error('wrong param');
  }

  /**
   * @example
   * const ls = new State<{test: string, bar: number}>();
   * ls.connect(of({foo: 'bar'}));
   * ls.connect(of({foo: 'bar'}), (oldState) => ({foo: oldState.foo + '?'}));
   * ls.connect('foo', of('bar!'));
   * ls.connect('foo', of('!'), (oldState, change) => ({foo: oldState.foo + change}));
   */
  connect<K extends keyof T>(
    slice$: Observable<any | Partial<T>>,
    projectFn?: ProjectStateReducer<T, K>
  ): void;
  connect<K extends keyof T>(key: K, slice$: Observable<T[K]>): void;
  connect<K extends keyof T>(
    key: K,
    slice$: Observable<any>,
    projectSliceFn: ProjectValueReducer<T, K>
  ): void;
  connect<K extends keyof T>(
    keyOrSlice$: K | Observable<any>,
    projectOrSlices$?: ProjectStateReducer<T, K> | Observable<T[K] | any>,
    projectValueFn?: ProjectValueReducer<T, K>
  ): void {
    if (
      isObservableGuard<any>(keyOrSlice$) &&
      projectOrSlices$ === undefined &&
      projectValueFn === undefined
    ) {
      const slice$ = keyOrSlice$.pipe(filter(slice => slice !== undefined));
      this.accumulationObservable.nextSliceObservable(slice$);
      return;
    }

    if (
      isObservableGuard<any>(keyOrSlice$) &&
      typeof projectOrSlices$ === 'function' &&
      !isObservableGuard<T[K]>(projectOrSlices$) &&
      projectValueFn === undefined
    ) {
      const project = projectOrSlices$;
      const slice$ = keyOrSlice$.pipe(
        filter(slice => slice !== undefined),
        map(v => project(this.get(), v))
      );
      this.accumulationObservable.nextSliceObservable(slice$);
      return;
    }

    if (
      isKeyOf<T>(keyOrSlice$) &&
      isObservableGuard<T[K]>(projectOrSlices$) &&
      projectValueFn === undefined
    ) {
      const key = keyOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        filter(slice => slice !== undefined),
        map(value => ({ ...{}, [key]: value }))
      );
      this.accumulationObservable.nextSliceObservable(slice$);
      return;
    }

    if (
      isKeyOf<T>(keyOrSlice$) &&
      isObservableGuard<any>(projectOrSlices$) &&
      typeof projectValueFn === 'function'
    ) {
      const key = keyOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        filter(slice => slice !== undefined),
        map(value => ({ ...{}, [key]: projectValueFn(this.get(), value) }))
      );
      this.accumulationObservable.nextSliceObservable(slice$);
      return;
    }

    throw new Error('wrong params passed to connect');
  }

  /**
   * @example
   * const ls = new State<{test: string, foo: {baz: 42}, bar: number}>();
   * ls.select();
   * ls.select('test');
   * ls.select('foo', 'baz');
   * ls.select(mapTo(7));
   * ls.select(map(s => s.test), startWith('unknown test value'));
   * ls.select(pipe(map(s => s.test), startWith('unknown test value')));
   */
  select(): Observable<T>;
  // ========================
  select<A = T>(op: OperatorFunction<T, A>): Observable<A>;
  select<A = T, B = A>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): Observable<B>;
  select<A = T, B = A, C = B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>;
  select<A = T, B = A, C = B, D = C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): Observable<D>;
  select<A = T, B = A, C = B, D = C, E = D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): Observable<E>;
  // ================================
  select<K1 extends keyof T>(k1: K1): Observable<T[K1]>;
  select<K1 extends keyof T, K2 extends keyof T[K1]>(
    k1: K1,
    k2: K2
  ): Observable<T[K1][K2]>;
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2]
  >(k1: K1, k2: K2, k3: K3): Observable<T[K1][K2][K3]>;
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(k1: K1, k2: K2, k3: K3, k4: K4): Observable<T[K1][K2][K3][K4]>;
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Observable<T[K1][K2][K3][K4][K5]>;
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5]
  >(
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
    k5: K5,
    k6: K6
  ): Observable<T[K1][K2][K3][K4][K5][K6]>;
  // ===========================
  select<R>(
    ...opOrMapFn: OperatorFunction<T, R>[] | string[]
  ): Observable<T | R> {
    if (!opOrMapFn || opOrMapFn.length === 0) {
      return this.$.pipe(stateful());
    } else if (isStringArrayGuard(opOrMapFn)) {
      return this.$.pipe(stateful(pluck(...opOrMapFn)));
    } else if (isOperateFnArrayGuard(opOrMapFn)) {
      return this.$.pipe(stateful(pipeFromArray(opOrMapFn)));
    }
    throw new WrongSelectParamsError();
  }

  hold<S>(
    obsOrObsWithSideEffect: Observable<S>,
    sideEffectFn?: (arg: S) => void
  ): void {
    if (sideEffectFn) {
      this.effectObservable.nextEffectObservable(
        obsOrObsWithSideEffect.pipe(tap(sideEffectFn))
      );
      return;
    }
    this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
  }

  subscribe(): Unsubscribable {
    const subscription = new Subscription();
    subscription.add(this.accumulationObservable.subscribe());
    subscription.add(this.effectObservable.subscribe());
    return subscription;
  }
}

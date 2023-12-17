import {
  computed,
  inject,
  Injectable,
  Injector,
  isSignal,
  OnDestroy,
  Signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  AccumulationFn,
  createAccumulationObservable,
  createSideEffectObservable,
  isKeyOf,
  KeyCompareMap,
  PickSlice,
  safePluck,
  select,
} from '@rx-angular/state/selections';
import {
  EMPTY,
  isObservable,
  Observable,
  OperatorFunction,
  Subscribable,
  Subscription,
  Unsubscribable,
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { createSignalStateProxy, SignalStateProxy } from './signal-state-proxy';

export type ProjectStateFn<TYPE> = (oldState: TYPE) => Partial<TYPE>;
export type ProjectValueFn<TYPE, KEY extends keyof TYPE> = (
  oldState: TYPE
) => TYPE[KEY];

export type ProjectStateReducer<TYPE, VALUE> = (
  oldState: TYPE,
  value: VALUE
) => Partial<TYPE>;

export type ProjectValueReducer<TYPE, KEY extends keyof TYPE, VALUE> = (
  oldState: TYPE,
  value: VALUE
) => TYPE[KEY];

/**
 * @description
 * RxState is a light-weight reactive state management service for managing local state in angular.
 *
 * @example
 * Component({
 *   selector: 'app-stateful',
 *   template: `<div>{{ state$ | async | json }}</div>`,
 *   providers: [RxState]
 * })
 * export class StatefulComponent {
 *   readonly state$ = this.state.select();
 *
 *   constructor(private state: RxState<{ foo: string }>) {}
 * }
 *
 * @docsCategory RxState
 * @docsPage RxState
 */
@Injectable()
export class RxState<TYPE extends object>
  implements OnDestroy, Subscribable<TYPE>
{
  private subscription = new Subscription();

  private accumulator = createAccumulationObservable<TYPE>();
  private effectObservable = createSideEffectObservable();

  private readonly injector = inject(Injector);

  private signalStoreProxy: SignalStateProxy<TYPE>;

  /**
   * @description
   * The unmodified state exposed as `Observable<TYPE>`. It is not shared, distinct or gets replayed.
   * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
   */
  readonly $: Observable<TYPE> = this.accumulator.signal$;

  /**
   * @internal
   */
  constructor() {
    this.subscription.add(this.subscribe());
  }

  /**
   * @internal
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * @description
   *
   * Allows to customize state accumulation function.
   * This can be helpful to implement deep updates and tackle other immutability problems in a custom way.
   * @example
   *
   * ```typescript
   * const myAccumulator = (state: MyState, slice: Partial<MyState>) => deepCopy(state, slice);
   *
   * this.state.setAccumulator(myAccumulator);
   * ```
   */
  setAccumulator(accumulatorFn: AccumulationFn): void {
    this.accumulator.nextAccumulator(accumulatorFn);
  }

  /**
   * @description
   * Read from the state in imperative manner. Returns the state object in its current state.
   *
   * @example
   * const { disabled } = state.get();
   * if (!disabled) {
   *   doStuff();
   * }
   *
   * @return TYPE
   */
  get(): TYPE;

  /**
   * @description
   * Read from the state in imperative manner by providing keys as parameters.
   * Returns the part of state object.
   *
   * @example
   * // Access a single property
   *
   * const bar = state.get('bar');
   *
   * // Access a nested property
   *
   * const foo = state.get('bar', 'foo');
   *
   * @return TYPE | TYPE[KEY_1] | TYPE[KEY_1][KEY_2]
   */

  get<KEY_1 extends keyof TYPE>(k1: KEY_1): TYPE[KEY_1];
  /** @internal **/
  get<KEY_1 extends keyof TYPE, KEY_2 extends keyof TYPE[KEY_1]>(
    k1: KEY_1,
    k2: KEY_2
  ): TYPE[KEY_1][KEY_2];
  /** @internal **/
  get<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2]
  >(k1: KEY_1, k2: KEY_2, k3: KEY_3): TYPE[KEY_1][KEY_2][KEY_3];
  /** @internal **/
  get<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3]
  >(
    k1: KEY_1,
    k2: KEY_2,
    k3: KEY_3,
    k4: KEY_4
  ): TYPE[KEY_1][KEY_2][KEY_3][KEY_4];
  /** @internal **/
  get<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3],
    KEY_5 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4]
  >(
    k1: KEY_1,
    k2: KEY_2,
    k3: KEY_3,
    k4: KEY_4,
    k5: KEY_5
  ): TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5];
  /** @internal **/
  get<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3],
    KEY_5 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4],
    KEY_6 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5]
  >(
    k1: KEY_1,
    k2: KEY_2,
    k3: KEY_3,
    k4: KEY_4,
    k5: KEY_5,
    k6: KEY_6
  ): TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5][KEY_6];
  /** @internal **/
  get<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3],
    KEY_5 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4],
    KEY_6 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5]
  >(
    ...keys:
      | [KEY_1]
      | [KEY_1, KEY_2]
      | [KEY_1, KEY_2, KEY_3]
      | [KEY_1, KEY_2, KEY_3, KEY_4]
      | [KEY_1, KEY_2, KEY_3, KEY_4, KEY_5]
      | [KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6]
  ):
    | TYPE
    | TYPE[KEY_1]
    | TYPE[KEY_1][KEY_2]
    | TYPE[KEY_1][KEY_2][KEY_3]
    | TYPE[KEY_1][KEY_2][KEY_3][KEY_4]
    | TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5]
    | TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5][KEY_6] {
    const hasStateAnyKeys = Object.keys(this.accumulator.state).length > 0;
    if (!!keys && keys.length) {
      return safePluck(this.accumulator.state, keys);
    } else {
      return hasStateAnyKeys
        ? this.accumulator.state
        : (undefined as unknown as TYPE);
    }
  }

  /**
   * @description
   * Manipulate one or many properties of the state by providing a `Partial<TYPE>` state or a `ProjectionFunction<TYPE>`.
   *
   * @example
   * // Update one or many properties of the state by providing a `Partial<TYPE>`
   *
   * const partialState = {
   *   foo: 'bar',
   *   bar: 5
   * };
   * state.set(partialState);
   *
   * // Update one or many properties of the state by providing a `ProjectionFunction<TYPE>`
   *
   * const reduceFn = oldState => ({
   *   bar: oldState.bar + 5
   * });
   * state.set(reduceFn);
   *
   * @param {Partial<TYPE>|ProjectStateFn<TYPE>} stateOrProjectState
   * @return void
   */
  set(stateOrProjectState: Partial<TYPE> | ProjectStateFn<TYPE>): void;

  /**
   * @description
   * Manipulate a single property of the state by the property name and a `ProjectionFunction<TYPE>`.
   *
   * @example
   * const reduceFn = oldState => oldState.bar + 5;
   * state.set('bar', reduceFn);
   *
   * @param {KEY} key
   * @param {ProjectValueFn<TYPE, KEY>} projectSlice
   * @return void
   */
  set<KEY extends keyof TYPE, OBJECT>(
    key: KEY,
    projectSlice: ProjectValueFn<TYPE, KEY>
  ): void;
  /**
   * @internal
   */
  set<KEY extends keyof TYPE>(
    keyOrStateOrProjectState: Partial<TYPE> | ProjectStateFn<TYPE> | KEY,
    stateOrSliceProjectFn?: ProjectValueFn<TYPE, KEY>
  ): void {
    if (
      typeof keyOrStateOrProjectState === 'object' &&
      stateOrSliceProjectFn === undefined
    ) {
      this.accumulator.nextSlice(keyOrStateOrProjectState);
      return;
    }

    if (
      typeof keyOrStateOrProjectState === 'function' &&
      stateOrSliceProjectFn === undefined
    ) {
      this.accumulator.nextSlice(
        keyOrStateOrProjectState(this.accumulator.state)
      );
      return;
    }

    if (
      isKeyOf<TYPE>(keyOrStateOrProjectState) &&
      typeof stateOrSliceProjectFn === 'function'
    ) {
      const state: Partial<TYPE> = {};
      state[keyOrStateOrProjectState] = stateOrSliceProjectFn(
        this.accumulator.state
      );
      this.accumulator.nextSlice(state);
      return;
    }

    throw new Error('wrong params passed to set');
  }

  /**
   * @description
   * Connect an `Observable<Partial<TYPE>>` to the state `TYPE`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const sliceToAdd$ = interval(250).pipe(mapTo({
   *   bar: 5,
   *   foo: 'foo'
   * });
   * state.connect(sliceToAdd$);
   * // every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$
   *
   * // Additionally you can provide a `projectionFunction` to access the current state object and do custom mappings.
   *
   * const sliceToAdd$ = interval(250).pipe(mapTo({
   *   bar: 5,
   *   foo: 'foo'
   * });
   * state.connect(sliceToAdd$, (state, slice) => state.bar += slice.bar);
   * // every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$. Bar will increase by
   * // 5 due to the projectionFunction
   */
  connect(inputOrSlice$: Observable<Partial<TYPE>>): void;
  /**
   * @description
   * Connect a `Signal<Partial<TYPE>>` to the state `TYPE`.
   * Any change emitted by the source will get merged into the state.
   */
  connect(signal: Signal<Partial<TYPE>>): void;

  /**
   * @description
   * Connect an `Observable<VALUE>` to the state `TYPE`.
   * Any change emitted by the source will get forwarded to to project function and merged into the state.
   * Subscription handling is done automatically.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   *
   * @example
   * const sliceToAdd$ = interval(250);
   * state.connect(sliceToAdd$, (type, value) => ({bar: value}));
   * // every 250ms the property bar get updated due to the emission of sliceToAdd$
   *
   */
  connect<VALUE>(
    inputOrSlice$: Observable<VALUE>,
    projectFn: ProjectStateReducer<TYPE, VALUE>
  ): void;
  /**
   * @description
   * Connect a `Signal<VALUE>` to the state `TYPE`.
   * Any change emitted by the source will get forwarded to the project function and merged into the state.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   */
  connect<VALUE>(
    signal: Signal<VALUE>,
    projectFn: ProjectStateReducer<TYPE, VALUE>
  ): void;
  /**
   *
   * @description
   * Connect an `Observable<TYPE[KEY]>` source to a specific property `KEY` in the state `TYPE`. Any emitted change will update
   * this
   * specific property in the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$);
   * // every 250ms the property timer will get updated
   */
  connect<KEY extends keyof TYPE>(
    key: KEY,
    slice$: Observable<TYPE[KEY]>
  ): void;
  /**
   *
   * @description
   * Connect a `Signal<TYPE[KEY]>` source to a specific property `KEY` in the state `TYPE`. Any emitted change will update
   * this specific property in the state.
   */
  connect<KEY extends keyof TYPE>(key: KEY, signal: Signal<TYPE[KEY]>): void;
  /**
   *
   * @description
   * Connect an `Observable<VALUE>` source to a specific property in the state. Additionally you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
   * // every 250ms the property timer will get updated
   */
  connect<KEY extends keyof TYPE, VALUE>(
    key: KEY,
    input$: Observable<VALUE>,
    projectSliceFn: ProjectValueReducer<TYPE, KEY, VALUE>
  ): void;
  /**
   *
   * @description
   * Connect a `Signal<VALUE>` source to a specific property in the state. Additionally, you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   */
  connect<KEY extends keyof TYPE, VALUE>(
    key: KEY,
    signal: Signal<VALUE>,
    projectSliceFn: ProjectValueReducer<TYPE, KEY, VALUE>
  ): void;
  /**
   * @internal
   */
  connect<KEY extends keyof TYPE, VALUE extends Partial<TYPE>>(
    keyOrInputOrSlice$:
      | KEY
      | Observable<Partial<TYPE> | VALUE>
      | Signal<Partial<TYPE> | VALUE>,
    projectOrSlices$?:
      | ProjectStateReducer<TYPE, VALUE>
      | Observable<TYPE[KEY] | VALUE>
      | Signal<TYPE[KEY] | VALUE>,
    projectValueFn?: ProjectValueReducer<TYPE, KEY, VALUE>
  ): void {
    /**
     * From top to bottom the overloads are handled.
     */
    if (
      isObservable(keyOrInputOrSlice$) &&
      !projectOrSlices$ &&
      !projectValueFn
    ) {
      this.accumulator.nextSliceObservable(keyOrInputOrSlice$);
      return;
    }

    if (isSignal(keyOrInputOrSlice$) && !projectOrSlices$ && !projectValueFn) {
      this.accumulator.nextSliceObservable(
        toObservable(keyOrInputOrSlice$, { injector: this.injector })
      );
      return;
    }

    if (
      isObservable(keyOrInputOrSlice$) &&
      projectOrSlices$ &&
      typeof projectOrSlices$ === 'function' &&
      !projectValueFn
    ) {
      const projectionStateFn = projectOrSlices$;
      const slice$ = keyOrInputOrSlice$.pipe(
        map((v) => projectionStateFn(this.accumulator.state, v as VALUE))
      );
      this.accumulator.nextSliceObservable(slice$ as Observable<VALUE>);
      return;
    }

    if (
      isSignal(keyOrInputOrSlice$) &&
      projectOrSlices$ &&
      typeof projectOrSlices$ === 'function' &&
      !projectValueFn
    ) {
      const projectionStateFn = projectOrSlices$;
      const slice$ = toObservable(keyOrInputOrSlice$, {
        injector: this.injector,
      }).pipe(
        map((v) => projectionStateFn(this.accumulator.state, v as VALUE))
      );
      this.accumulator.nextSliceObservable(slice$ as Observable<VALUE>);
      return;
    }

    if (
      isKeyOf<TYPE>(keyOrInputOrSlice$) &&
      isObservable(projectOrSlices$) &&
      !projectValueFn
    ) {
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({ ...{}, [keyOrInputOrSlice$]: value }))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    if (
      isKeyOf<TYPE>(keyOrInputOrSlice$) &&
      isSignal(projectOrSlices$) &&
      !projectValueFn
    ) {
      const slice$ = toObservable(projectOrSlices$, {
        injector: this.injector,
      }).pipe(map((value) => ({ ...{}, [keyOrInputOrSlice$]: value })));
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    if (
      projectValueFn &&
      typeof projectValueFn === 'function' &&
      isKeyOf<TYPE>(keyOrInputOrSlice$) &&
      isObservable(projectOrSlices$)
    ) {
      const key: KEY = keyOrInputOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({
          ...{},
          [key]: projectValueFn(this.get(), value as VALUE),
        }))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    if (
      projectValueFn &&
      typeof projectValueFn === 'function' &&
      isKeyOf(keyOrInputOrSlice$) &&
      isSignal(projectOrSlices$)
    ) {
      const key: KEY = keyOrInputOrSlice$;
      const slice$ = toObservable(projectOrSlices$, {
        injector: this.injector,
      }).pipe(
        map((value) => ({
          ...{},
          [key]: projectValueFn(this.get(), value as VALUE),
        }))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    throw new Error('wrong params passed to connect');
  }

  /**
   * @description
   * Returns the state as cached and distinct `Observable<TYPE>`. This way you don't have to think about **late
   * subscribers**,
   * **multiple subscribers** or **multiple emissions** of the same value
   *
   * @example
   * const state$ = state.select();
   * state$.subscribe(state => doStuff(state));
   *
   * @returns Observable<TYPE>
   */
  select(): Observable<TYPE>;

  /**
   * @description
   * Returns the state as cached and distinct `Observable<TYPE_A>`. Accepts arbitrary
   * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive
   *   composition.
   *
   * @example
   * const profilePicture$ = state.select(
   *  map((state) => state.profilePicture),
   *  switchMap(profilePicture => mapImageAsync(profilePicture))
   * );
   * @param op { OperatorFunction<TYPE, TYPE_A> }
   * @returns Observable<TYPE_A>
   */
  select<TYPE_A = TYPE>(op: OperatorFunction<TYPE, TYPE_A>): Observable<TYPE_A>;
  /**
   * @internal
   */
  select<TYPE_A = TYPE, TYPE_B = TYPE_A>(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>
  ): Observable<TYPE_B>;
  /**
   * @internal
   */
  select<TYPE_A = TYPE, TYPE_B = TYPE_A, TYPE_C = TYPE_B>(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>,
    op3: OperatorFunction<TYPE_B, TYPE_C>
  ): Observable<TYPE_C>;
  /**
   * @internal
   */
  select<TYPE_A = TYPE, TYPE_B = TYPE_A, TYPE_C = TYPE_B, TYPE_D = TYPE_C>(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>,
    op3: OperatorFunction<TYPE_B, TYPE_C>,
    op4: OperatorFunction<TYPE_C, TYPE_D>
  ): Observable<TYPE_D>;
  /**
   * @internal
   */
  select<
    TYPE_A = TYPE,
    TYPE_B = TYPE_A,
    TYPE_C = TYPE_B,
    TYPE_D = TYPE_C,
    TYPE_E = TYPE_D
  >(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>,
    op3: OperatorFunction<TYPE_B, TYPE_C>,
    op4: OperatorFunction<TYPE_C, TYPE_D>,
    op5: OperatorFunction<TYPE_D, TYPE_E>
  ): Observable<TYPE_E>;
  /**
   * @description
   * Transform a slice of the state by providing keys and map function.
   * Returns result of applying function to state slice as cached and distinct `Observable<VALUE>`.
   *
   * @example
   * // Project state slice
   * const text$ = state.select(
   *   ['query', 'results'],
   *   ({ query, results }) => `${results.length} results found for "${query}"`
   * );
   *
   * @return Observable<VALUE>
   */
  select<KEY extends keyof TYPE, VALUE>(
    keys: KEY[],
    fn: (slice: PickSlice<TYPE, KEY>) => VALUE,
    keyCompareMap?: KeyCompareMap<Pick<TYPE, KEY>>
  ): Observable<VALUE>;
  /**
   * @description
   * Transform a single property of the state by providing a key and map function.
   * Returns result of applying function to state property as cached and distinct `Observable<V>`.
   *
   * @example
   * // Project state based on single property
   * const foo$ = state.select('bar', bar => `bar equals ${bar}`);
   *
   * @return Observable<V>
   */
  select<KEY extends keyof TYPE, VALUE>(
    k: KEY,
    fn: (val: TYPE[KEY]) => VALUE
  ): Observable<VALUE>;
  /**
   * @description
   * Access a single property of the state by providing keys.
   * Returns a single property of the state as cached and distinct `Observable<TYPE[KEY_1]>`.
   *
   * @example
   * // Access a single property
   *
   * const bar$ = state.select('bar');
   *
   * // Access a nested property
   *
   * const foo$ = state.select('bar', 'foo');
   *
   * @return Observable<TYPE[KEY_1]>
   */
  select<KEY_1 extends keyof TYPE>(k1: KEY_1): Observable<TYPE[KEY_1]>;
  /**
   * @internal
   */
  select<KEY_1 extends keyof TYPE, KEY_2 extends keyof TYPE[KEY_1]>(
    k1: KEY_1,
    k2: KEY_2
  ): Observable<TYPE[KEY_1][KEY_2]>;
  /**
   * @internal
   */
  select<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2]
  >(k1: KEY_1, k2: KEY_2, k3: KEY_3): Observable<TYPE[KEY_1][KEY_2][KEY_3]>;
  /**
   * @internal
   */
  select<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3]
  >(
    k1: KEY_1,
    k2: KEY_2,
    k3: KEY_3,
    k4: KEY_4
  ): Observable<TYPE[KEY_1][KEY_2][KEY_3][KEY_4]>;
  /**
   * @internal
   */
  select<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3],
    KEY_5 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4]
  >(
    k1: KEY_1,
    k2: KEY_2,
    k3: KEY_3,
    k4: KEY_4,
    k5: KEY_5
  ): Observable<TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5]>;
  /**
   * @internal
   */
  select<
    KEY_1 extends keyof TYPE,
    KEY_2 extends keyof TYPE[KEY_1],
    KEY_3 extends keyof TYPE[KEY_1][KEY_2],
    KEY_4 extends keyof TYPE[KEY_1][KEY_2][KEY_3],
    KEY_5 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4],
    KEY_6 extends keyof TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5]
  >(
    k1: KEY_1,
    k2: KEY_2,
    k3: KEY_3,
    k4: KEY_4,
    k5: KEY_5,
    k6: KEY_6
  ): Observable<TYPE[KEY_1][KEY_2][KEY_3][KEY_4][KEY_5][KEY_6]>;
  /**
   * @internal
   */
  select<RETURN>(
    ...args:
      | OperatorFunction<TYPE, unknown>[]
      | string[]
      | [k: string, fn: (val: unknown) => unknown]
      | [
          keys: string[],
          fn: (slice: unknown) => unknown,
          keyCompareMap?: KeyCompareMap<TYPE>
        ]
  ): Observable<TYPE | RETURN> {
    return this.accumulator.state$.pipe(
      select(...(args as Parameters<typeof select>))
    );
  }

  /**
   * @description
   * Returns a signal of the given key. It's first value is determined by the
   * current keys value in RxState. Whenever the key gets updated, the signal
   * will also be updated accordingly.
   */
  signal<KEY extends keyof TYPE>(k: KEY): Signal<TYPE[KEY]> {
    return this.signalStoreProxy[k];
  }

  /**
   * @description
   * Lets you create a computed signal based off multiple keys stored in RxState.
   */
  computed<COMPUTED_TYPE>(
    fn: (slice: SignalStateProxy<TYPE>) => COMPUTED_TYPE
  ): Signal<COMPUTED_TYPE> {
    return computed(() => {
      return fn(this.signalStoreProxy);
    });
  }

  /**
   * @description
   * Lets you create a computed signal derived from state and rxjs operators.
   *
   * @throws If the initial value is not provided and the signal is not sync.
   * Use startWith() to provide an initial value.
   *
   // * @param op1 { OperatorFunction<TYPE, A> }
   // * @returns Observable<A>
   */
  computedFrom<TYPE_A = TYPE>(
    op1: OperatorFunction<TYPE, TYPE_A>
  ): Signal<TYPE_A>;
  /** @internal */
  computedFrom<TYPE_A = TYPE, TYPE_B = TYPE_A>(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>
  ): Signal<TYPE_B>;
  /** @internal */
  computedFrom<TYPE_A = TYPE, TYPE_B = TYPE_A, TYPE_C = TYPE_B>(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>,
    op3: OperatorFunction<TYPE_B, TYPE_C>
  ): Signal<TYPE_C>;
  /** @internal */
  computedFrom<
    TYPE_A = TYPE,
    TYPE_B = TYPE_A,
    TYPE_C = TYPE_B,
    TYPE_D = TYPE_C
  >(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>,
    op3: OperatorFunction<TYPE_B, TYPE_C>,
    op4: OperatorFunction<TYPE_C, TYPE_D>
  ): Signal<TYPE_D>;
  /** @internal */
  computedFrom<
    TYPE_A = TYPE,
    TYPE_B = TYPE_A,
    TYPE_C = TYPE_B,
    TYPE_D = TYPE_C,
    TYPE_E = TYPE_D
  >(
    op1: OperatorFunction<TYPE, TYPE_A>,
    op2: OperatorFunction<TYPE_A, TYPE_B>,
    op3: OperatorFunction<TYPE_B, TYPE_C>,
    op4: OperatorFunction<TYPE_C, TYPE_D>,
    op5: OperatorFunction<TYPE_D, TYPE_E>
  ): Signal<TYPE_E>;
  /** @internal */
  computedFrom<RETURN>(
    ...ops: OperatorFunction<TYPE, unknown>[]
  ): Signal<RETURN> {
    return toSignal<RETURN>(
      this.select(...(ops as Parameters<typeof select>)),
      {
        injector: this.injector,
        requireSync: true,
      }
    );
  }

  /**
   * @description
   * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
   * `sideEffectFunction`.
   * Subscription handling is done automatically.
   *
   * @example
   * // Directly pass an observable side-effect
   * const localStorageEffect$ = changes$.pipe(
   *  tap(changes => storeChanges(changes))
   * );
   * state.hold(localStorageEffect$);
   *
   * // Pass an additional `sideEffectFunction`
   *
   * const localStorageEffectFn = changes => storeChanges(changes);
   * state.hold(changes$, localStorageEffectFn);
   *
   * @param {Observable<SIDE_EFFECT>} obsOrObsWithSideEffect
   * @param {function} [sideEffectFn]
   */
  hold<SIDE_EFFECT>(
    obsOrObsWithSideEffect: Observable<SIDE_EFFECT>,
    sideEffectFn?: (arg: SIDE_EFFECT) => void
  ): void {
    const sideEffect = obsOrObsWithSideEffect.pipe(catchError((e) => EMPTY));
    if (typeof sideEffectFn === 'function') {
      this.effectObservable.nextEffectObservable(
        sideEffect.pipe(tap(sideEffectFn))
      );
      return;
    }
    this.effectObservable.nextEffectObservable(sideEffect);
  }

  /**
   * @internal
   */
  subscribe(): Unsubscribable {
    const subscription = new Subscription();
    subscription.add(this.accumulator.subscribe());
    subscription.add(this.effectObservable.subscribe());
    this.signalStoreProxy = createSignalStateProxy<TYPE>(
      this.$,
      this.get.bind(this)
    );
    return subscription;
  }
}

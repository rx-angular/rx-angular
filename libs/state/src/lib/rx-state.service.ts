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

export type ProjectStateFn<TType> = (oldState: TType) => Partial<TType>;

export type ProjectValueFn<TType, TKey extends keyof TType> = (
  oldState: TType
) => TType[TKey];

export type ProjectStateReducer<TType, TValue> = (
  oldState: TType,
  value: TValue
) => Partial<TType>;

export type ProjectValueReducer<TType, TKey extends keyof TType, TValue> = (
  oldState: TType,
  value: TValue
) => TType[TKey];

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
export class RxState<TType extends object>
  implements OnDestroy, Subscribable<TType>
{
  private subscription = new Subscription();

  private accumulator = createAccumulationObservable<TType>();
  private effectObservable = createSideEffectObservable();

  private readonly injector = inject(Injector);

  private signalStoreProxy: SignalStateProxy<TType>;

  /**
   * @description
   * The unmodified state exposed as `Observable<TType>`. It is not shared, distinct or gets replayed.
   * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
   */
  readonly $: Observable<TType> = this.accumulator.signal$;

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
   *
   * @param {AccumulationFn} accumulatorFn
   * @return void
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
   * @return TType
   */
  get(): TType;

  /**
   * @description
   * Read from the state in imperative manner by providing keys as parameters.
   * Returns the part of state object.
   *
   * @example
   * // Access a single property
   * const bar = state.get('bar');
   *
   * // Access a nested property
   * const foo = state.get('bar', 'foo');
   *
   * @param {TKeyOne} keyOne
   * @return TType[TKeyOne]
   */
  get<TKeyOne extends keyof TType>(keyOne: TKeyOne): TType[TKeyOne];

  /** @internal **/
  get<TKeyOne extends keyof TType, TKeyTwo extends keyof TType[TKeyOne]>(
    keyOne: TKeyOne,
    keyTwo: TKeyTwo
  ): TType[TKeyOne][TKeyTwo];

  /** @internal **/
  get<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo]
  >(
    keyOne: TKeyOne,
    keyTwo: TKeyTwo,
    keyThree: TKeyThree
  ): TType[TKeyOne][TKeyTwo][TKeyThree];

  /** @internal **/
  get<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree]
  >(
    keyOne: TKeyOne,
    keyTwo: TKeyTwo,
    keyThree: TKeyThree,
    keyFour: TKeyFour
  ): TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour];

  /** @internal **/
  get<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree],
    TKeyFive extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour]
  >(
    keyOne: TKeyOne,
    keyTwo: TKeyTwo,
    keyThree: TKeyThree,
    keyFour: TKeyFour,
    keyFive: TKeyFive
  ): TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive];

  /** @internal **/
  get<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree],
    TKeyFive extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour],
    TKeySix extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive]
  >(
    keyOne: TKeyOne,
    keyTwo: TKeyTwo,
    keyThree: TKeyThree,
    keyFour: TKeyFour,
    keyFive: TKeyFive,
    keySix: TKeySix
  ): TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive][TKeySix];

  /** @internal **/
  get<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree],
    TKeyFive extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour],
    TKeySix extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive]
  >(
    ...keys:
      | [TKeyOne]
      | [TKeyOne, TKeyTwo]
      | [TKeyOne, TKeyTwo, TKeyThree]
      | [TKeyOne, TKeyTwo, TKeyThree, TKeyFour]
      | [TKeyOne, TKeyTwo, TKeyThree, TKeyFour, TKeyFive]
      | [TKeyOne, TKeyTwo, TKeyThree, TKeyFour, TKeyFive, TKeySix]
  ):
    | TType
    | TType[TKeyOne]
    | TType[TKeyOne][TKeyTwo]
    | TType[TKeyOne][TKeyTwo][TKeyThree]
    | TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour]
    | TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive]
    | TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive][TKeySix] {
    const hasStateAnyKeys = Object.keys(this.accumulator.state).length > 0;
    if (!!keys && keys.length) {
      return safePluck(this.accumulator.state, keys);
    } else {
      return hasStateAnyKeys
        ? this.accumulator.state
        : (undefined as unknown as TType);
    }
  }

  /**
   * @description
   * Manipulate one or many properties of the state by providing
   * a `Partial<TType>`state or a `ProjectionFunction<TType>`.
   *
   * @example
   * // Update one or many properties of the state by providing a `Partial<TType>`
   *
   * const partialState = {
   *   foo: 'bar',
   *   bar: 5
   * };
   * state.set(partialState);
   *
   * // Update one or many properties of the state by providing a `ProjectionFunction<TType>`
   *
   * const reduceFn = oldState => ({
   *   bar: oldState.bar + 5
   * });
   * state.set(reduceFn);
   *
   * @param {Partial<TType>|ProjectStateFn<Ttype>} stateOrProjectState
   * @return void
   */
  set(stateOrProjectState: Partial<TType> | ProjectStateFn<TType>): void;

  /**
   * @description
   * Manipulate a single property of the state by the property name and a `ProjectionFunction<TType>`.
   *
   * @example
   * const reduceFn = oldState => oldState.bar + 5;
   * state.set('bar', reduceFn);
   *
   * @param {TKey} key
   * @param {ProjectValueFn<TType, TKey>} projectSlice
   * @return void
   */
  set<TKey extends keyof TType, TObject>(
    key: TKey,
    projectSlice: ProjectValueFn<TType, TKey>
  ): void;
  /**
   * @internal
   */
  set<TKey extends keyof TType>(
    keyOrStateOrProjectState: Partial<TType> | ProjectStateFn<TType> | TKey,
    stateOrSliceProjectFn?: ProjectValueFn<TType, TKey>
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
      isKeyOf<TType>(keyOrStateOrProjectState) &&
      typeof stateOrSliceProjectFn === 'function'
    ) {
      const state: Partial<TType> = {};
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
   * Connect an `Observable<Partial<TType>>` to the state `TType`.
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
   *
   *  @param {Observable<Partial<TType>>} inputOrSlice$
   *  @return void
   */
  connect(inputOrSlice$: Observable<Partial<TType>>): void;

  /**
   * @description
   * Connect a `Signal<Partial<TType>>` to the state `TType`.
   * Any change emitted by the source will get merged into the state.
   *
   *  @param {Signal<Partial<TType>>} signal
   *  @return void
   */
  connect(signal: Signal<Partial<TType>>): void;

  /**
   * @description
   * Connect an `Observable<TValue>` to the state `TType`.
   * Any change emitted by the source will get forwarded to project function and merged into the state.
   * Subscription handling is done automatically.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   *
   * @example
   * const sliceToAdd$ = interval(250);
   * state.connect(sliceToAdd$, (type, value) => ({bar: value}));
   * // every 250ms the property bar get updated due to the emission of sliceToAdd$
   * @param {Observable<TValue>} inputOrSlice$
   * @param {ProjectStateReducer<TType, TValue>} projectFn
   * @return void
   */
  connect<TValue>(
    inputOrSlice$: Observable<TValue>,
    projectFn: ProjectStateReducer<TType, TValue>
  ): void;

  /**
   * @description
   * Connect a `Signal<TValue>` to the state `TType`.
   * Any change emitted by the source will get forwarded to the project function and merged into the state.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   * @param {Signal<TValue>} signal
   * @param {ProjectStateReducer<TType, TValue>} projectFn
   * @return void
   */
  connect<TValue>(
    signal: Signal<TValue>,
    projectFn: ProjectStateReducer<TType, TValue>
  ): void;

  /**
   *
   * @description
   * Connect an `Observable<TType[TKey]>` source to a specific property `TKey` in the state `TType`.
   * Any emitted change will update this specific property in the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$);
   * // every 250ms the property timer will get updated
   * @param {Tkey} key
   * @param {Observable<TType[TKey]>} slice$
   *
   * @return void
   */
  connect<TKey extends keyof TType>(
    key: TKey,
    slice$: Observable<TType[TKey]>
  ): void;

  /**
   *
   * @description
   * Connect a `Signal<TType[TKey]>` source to a specific property `TKey` in the state `TType`.
   * Any emitted change will update this specific property in the state.
   * @param {Tkey} key
   * @param {Signal<TType[TKey]>} signal
   *
   * @return void
   */
  connect<TKey extends keyof TType>(
    key: TKey,
    signal: Signal<TType[TKey]>
  ): void;

  /**
   * @description
   * Connect an `Observable<TValue>` source to a specific property in the state. Additionally, you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
   * // every 250ms the property timer will get updated
   * @param {Tkey} key
   * @param {Observable<TValue>} input$
   * @param {ProjectValueReducer<TType, TKey, TValue>} projectSliceFn
   *
   * @return void
   */
  connect<TKey extends keyof TType, TValue>(
    key: TKey,
    input$: Observable<TValue>,
    projectSliceFn: ProjectValueReducer<TType, TKey, TValue>
  ): void;

  /**
   *
   * @description
   * Connect a `Signal<TValue>` source to a specific property in the state. Additionally, you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   * @param {Tkey} key
   * @param {Signal<TValue>} signal
   * @param {ProjectValueReducer<TType, TKey, TValue>} projectSliceFn
   *
   * @return void
   */
  connect<TKey extends keyof TType, TValue>(
    key: TKey,
    signal: Signal<TValue>,
    projectSliceFn: ProjectValueReducer<TType, TKey, TValue>
  ): void;

  /**
   * @internal
   */
  connect<TKey extends keyof TType, TValue extends Partial<TType>>(
    keyOrInputOrSlice$:
      | TKey
      | Observable<Partial<TType> | TValue>
      | Signal<Partial<TType> | TValue>,
    projectOrSlices$?:
      | ProjectStateReducer<TType, TValue>
      | Observable<TType[TKey] | TValue>
      | Signal<TType[TKey] | TValue>,
    projectValueFn?: ProjectValueReducer<TType, TKey, TValue>
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
        map((v) => projectionStateFn(this.accumulator.state, v as TValue))
      );
      this.accumulator.nextSliceObservable(slice$ as Observable<TValue>);
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
        map((v) => projectionStateFn(this.accumulator.state, v as TValue))
      );
      this.accumulator.nextSliceObservable(slice$ as Observable<TValue>);
      return;
    }

    if (
      isKeyOf<TType>(keyOrInputOrSlice$) &&
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
      isKeyOf<TType>(keyOrInputOrSlice$) &&
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
      isKeyOf<TType>(keyOrInputOrSlice$) &&
      isObservable(projectOrSlices$)
    ) {
      const key: TKey = keyOrInputOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({
          ...{},
          [key]: projectValueFn(this.get(), value as TValue),
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
      const key: TKey = keyOrInputOrSlice$;
      const slice$ = toObservable(projectOrSlices$, {
        injector: this.injector,
      }).pipe(
        map((value) => ({
          ...{},
          [key]: projectValueFn(this.get(), value as TValue),
        }))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    throw new Error('wrong params passed to connect');
  }

  /**
   * @description
   * Returns the state as cached and distinct `Observable<TType>`.
   * This way you don't have to think about
   * **late subscribers**, **multiple subscribers** or **multiple emissions** of the same value
   *
   * @example
   * const state$ = state.select();
   * state$.subscribe(state => doStuff(state));
   *
   * @returns Observable<TType>
   */
  select(): Observable<TType>;

  /**
   * @description
   * Returns the state as cached and distinct `Observable<TTypeA>`. Accepts arbitrary
   * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators)
   * to enrich the selection with reactive composition.
   *
   * @example
   * const profilePicture$ = state.select(
   *  map((state) => state.profilePicture),
   *  switchMap(profilePicture => mapImageAsync(profilePicture))
   * );
   * @param op { OperatorFunction<TType, TTypeA> }
   * @returns Observable<TTypeA>
   */
  select<TTypeA = TType>(
    op: OperatorFunction<TType, TTypeA>
  ): Observable<TTypeA>;

  /**
   * @internal
   */
  select<TTypeA = TType, TTypeB = TTypeA>(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>
  ): Observable<TTypeB>;

  /**
   * @internal
   */
  select<TTypeA = TType, TTypeB = TTypeA, TTypeC = TTypeB>(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>,
    op3: OperatorFunction<TTypeB, TTypeC>
  ): Observable<TTypeC>;

  /**
   * @internal
   */
  select<TTypeA = TType, TTypeB = TTypeA, TTypeC = TTypeB, TTypeD = TTypeC>(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>,
    op3: OperatorFunction<TTypeB, TTypeC>,
    op4: OperatorFunction<TTypeC, TTypeD>
  ): Observable<TTypeD>;

  /**
   * @internal
   */
  select<
    TTypeA = TType,
    TTypeB = TTypeA,
    TTypeC = TTypeB,
    TTypeD = TTypeC,
    TTypeE = TTypeD
  >(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>,
    op3: OperatorFunction<TTypeB, TTypeC>,
    op4: OperatorFunction<TTypeC, TTypeD>,
    op5: OperatorFunction<TTypeD, TTypeE>
  ): Observable<TTypeE>;

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
   * @param {TKey[]} keys
   * @param {(slice: PickSlice<TType, TKey>) => TValue} fn
   * @param {KeyCompareMap<Pick<TType, TKey>>} keyCompareMap
   *
   * @return Observable<VALUE>
   */
  select<TKey extends keyof TType, TValue>(
    keys: TKey[],
    fn: (slice: PickSlice<TType, TKey>) => TValue,
    keyCompareMap?: KeyCompareMap<Pick<TType, TKey>>
  ): Observable<TValue>;

  /**
   * @description
   * Transform a single property of the state by providing a key and map function.
   * Returns result of applying function to state property as cached and distinct `Observable<V>`.
   *
   * @example
   * // Project state based on single property
   * const foo$ = state.select('bar', bar => `bar equals ${bar}`);
   *
   * @param {TKey} key
   * @param {(val: TType[TKey]) => TValue} fn
   *
   * @return Observable<TValue>
   */
  select<TKey extends keyof TType, TValue>(
    key: TKey,
    fn: (val: TType[TKey]) => TValue
  ): Observable<TValue>;

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
   * @return Observable<TType[TKeyOne]>
   */
  select<TKeyOne extends keyof TType>(k1: TKeyOne): Observable<TType[TKeyOne]>;

  /**
   * @internal
   */
  select<TKeyOne extends keyof TType, TKeyTwo extends keyof TType[TKeyOne]>(
    k1: TKeyOne,
    k2: TKeyTwo
  ): Observable<TType[TKeyOne][TKeyTwo]>;

  /**
   * @internal
   */
  select<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo]
  >(
    k1: TKeyOne,
    k2: TKeyTwo,
    k3: TKeyThree
  ): Observable<TType[TKeyOne][TKeyTwo][TKeyThree]>;

  /**
   * @internal
   */
  select<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree]
  >(
    k1: TKeyOne,
    k2: TKeyTwo,
    k3: TKeyThree,
    k4: TKeyFour
  ): Observable<TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour]>;

  /**
   * @internal
   */
  select<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree],
    TKeyFive extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour]
  >(
    k1: TKeyOne,
    k2: TKeyTwo,
    k3: TKeyThree,
    k4: TKeyFour,
    k5: TKeyFive
  ): Observable<TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive]>;

  /**
   * @internal
   */
  select<
    TKeyOne extends keyof TType,
    TKeyTwo extends keyof TType[TKeyOne],
    TKeyThree extends keyof TType[TKeyOne][TKeyTwo],
    TKeyFour extends keyof TType[TKeyOne][TKeyTwo][TKeyThree],
    TKeyFive extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour],
    TKeySix extends keyof TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive]
  >(
    k1: TKeyOne,
    k2: TKeyTwo,
    k3: TKeyThree,
    k4: TKeyFour,
    k5: TKeyFive,
    k6: TKeySix
  ): Observable<
    TType[TKeyOne][TKeyTwo][TKeyThree][TKeyFour][TKeyFive][TKeySix]
  >;

  /**
   * @internal
   */
  select<TReturn>(
    ...args:
      | OperatorFunction<TType, unknown>[]
      | string[]
      | [k: string, fn: (val: unknown) => unknown]
      | [
          keys: string[],
          fn: (slice: unknown) => unknown,
          keyCompareMap?: KeyCompareMap<TType>
        ]
  ): Observable<TType | TReturn> {
    return this.accumulator.state$.pipe(
      select(...(args as Parameters<typeof select>))
    );
  }

  /**
   * @description
   * Returns a signal of the given key. It's first value is determined by the
   * current keys value in RxState. Whenever the key gets updated, the signal
   * will also be updated accordingly.
   * @param {TKey} key
   *
   * @return Signal<TType[TKey]>
   */
  signal<TKey extends keyof TType>(key: TKey): Signal<TType[TKey]> {
    return this.signalStoreProxy[key];
  }

  /**
   * @description
   * Lets you create a computed signal based off multiple keys stored in RxState.
   *
   * @param {(slice: SignalStateProxy<TType>) => COMPUTED_TYPE} fn
   * @return Signal<TComputedType>
   */
  computed<TComputedType>(
    fn: (slice: SignalStateProxy<TType>) => TComputedType
  ): Signal<TComputedType> {
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
   // * @param op1 { OperatorFunction<TType, TTypeA> }
   // * @returns Signal<TTypeA>
   */
  computedFrom<TTypeA = TType>(
    op1: OperatorFunction<TType, TTypeA>
  ): Signal<TTypeA>;

  /** @internal */
  computedFrom<TTypeA = TType, TTypeB = TTypeA>(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>
  ): Signal<TTypeB>;

  /** @internal */
  computedFrom<TTypeA = TType, TTypeB = TTypeA, TTypeC = TTypeB>(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>,
    op3: OperatorFunction<TTypeB, TTypeC>
  ): Signal<TTypeC>;

  /** @internal */
  computedFrom<
    TTypeA = TType,
    TTypeB = TTypeA,
    TTypeC = TTypeB,
    TTypeD = TTypeC
  >(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>,
    op3: OperatorFunction<TTypeB, TTypeC>,
    op4: OperatorFunction<TTypeC, TTypeD>
  ): Signal<TTypeD>;

  /** @internal */
  computedFrom<
    TTypeA = TType,
    TTypeB = TTypeA,
    TTypeC = TTypeB,
    TTypeD = TTypeC,
    TTypeE = TTypeD
  >(
    op1: OperatorFunction<TType, TTypeA>,
    op2: OperatorFunction<TTypeA, TTypeB>,
    op3: OperatorFunction<TTypeB, TTypeC>,
    op4: OperatorFunction<TTypeC, TTypeD>,
    op5: OperatorFunction<TTypeD, TTypeE>
  ): Signal<TTypeE>;

  /** @internal */
  computedFrom<TReturn>(
    ...ops: OperatorFunction<TType, unknown>[]
  ): Signal<TReturn> {
    return toSignal<TReturn>(
      this.select(...(ops as Parameters<typeof select>)),
      {
        injector: this.injector,
        requireSync: true,
      }
    );
  }

  /**
   * @description
   * Manages side-effects of your state. Provide an `Observable<any>`
   * **side-effect** and an optional `sideEffectFunction`.
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
   * @param {Observable<TSideEffect>} obsOrObsWithSideEffect
   * @param {function} [sideEffectFn]
   *
   * @return void
   */
  hold<TSideEffect>(
    obsOrObsWithSideEffect: Observable<TSideEffect>,
    sideEffectFn?: (arg: TSideEffect) => void
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
    this.signalStoreProxy = createSignalStateProxy<TType>(
      this.$,
      this.get.bind(this)
    );
    return subscription;
  }
}

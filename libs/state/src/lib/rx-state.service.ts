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

export type ProjectStateFn<Type> = (oldState: Type) => Partial<Type>;

export type ProjectValueFn<Type, Key extends keyof Type> = (
  oldState: Type,
) => Type[Key];

export type ProjectStateReducer<Type, Value> = (
  oldState: Type,
  value: Value,
) => Partial<Type>;

export type ProjectValueReducer<Type, Key extends keyof Type, Value> = (
  oldState: Type,
  value: Value,
) => Type[Key];

export type ReadOnly = 'get' | 'select' | 'computed' | 'signal';

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
export class RxState<State extends object>
  implements OnDestroy, Subscribable<State>
{
  private subscription = new Subscription();

  private accumulator = createAccumulationObservable<State>();
  private effectObservable = createSideEffectObservable();

  private readonly injector = inject(Injector);

  private signalStoreProxy: SignalStateProxy<State>;

  /**
   * @description
   * The unmodified state exposed as `Observable<State>`. It is not shared, distinct or gets replayed.
   * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
   */
  readonly $: Observable<State> = this.accumulator.signal$;

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
   * Return RxState in ReadOnly mode exposing only methods for reading state
   * get(), select(), computed() and signal() methods.
   * This can be helpful when you don't want others to write in your state.
   *
   * @example
   * ```typescript
   * const readOnlyState = state.asReadOnly();
   * const getNum = state.get('num');
   * const selectNum$ = state.select('num');
   * ```
   *
   * @return Pick<RxState<State>, ReadOnly>
   */
  asReadOnly(): Pick<RxState<State>, ReadOnly> {
    return {
      get: this.get.bind(this),
      select: this.select.bind(this),
      computed: this.computed.bind(this),
      signal: this.signal.bind(this),
    };
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
   * @return State
   */
  get(): State;

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
   * @param {KeyA} keyA
   * @return State[KeyA]
   */
  get<KeyA extends keyof State>(keyA: KeyA): State[KeyA];

  /** @internal **/
  get<KeyA extends keyof State, KeyB extends keyof State[KeyA]>(
    keyA: KeyA,
    keyB: KeyB,
  ): State[KeyA][KeyB];

  /** @internal **/
  get<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
  >(keyA: KeyA, keyB: KeyB, keyC: KeyC): State[KeyA][KeyB][KeyC];

  /** @internal **/
  get<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
  >(
    keyA: KeyA,
    keyB: KeyB,
    keyC: KeyC,
    keyD: KeyD,
  ): State[KeyA][KeyB][KeyC][KeyD];

  /** @internal **/
  get<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
    KeyE extends keyof State[KeyA][KeyB][KeyC][KeyD],
  >(
    keyA: KeyA,
    keyB: KeyB,
    keyC: KeyC,
    keyD: KeyD,
    keyE: KeyE,
  ): State[KeyA][KeyB][KeyC][KeyD][KeyE];

  /** @internal **/
  get<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
    KeyE extends keyof State[KeyA][KeyB][KeyC][KeyD],
    KeyF extends keyof State[KeyA][KeyB][KeyC][KeyD][KeyE],
  >(
    keyA: KeyA,
    keyB: KeyB,
    keyC: KeyC,
    keyD: KeyD,
    keyE: KeyE,
    keyF: KeyF,
  ): State[KeyA][KeyB][KeyC][KeyD][KeyE][KeyF];

  /** @internal **/
  get<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
    KeyE extends keyof State[KeyA][KeyB][KeyC][KeyD],
    KeyF extends keyof State[KeyA][KeyB][KeyC][KeyD][KeyE],
  >(
    ...keys:
      | [KeyA]
      | [KeyA, KeyB]
      | [KeyA, KeyB, KeyC]
      | [KeyA, KeyB, KeyC, KeyD]
      | [KeyA, KeyB, KeyC, KeyD, KeyE]
      | [KeyA, KeyB, KeyC, KeyD, KeyE, KeyF]
  ):
    | State
    | State[KeyA]
    | State[KeyA][KeyB]
    | State[KeyA][KeyB][KeyC]
    | State[KeyA][KeyB][KeyC][KeyD]
    | State[KeyA][KeyB][KeyC][KeyD][KeyE]
    | State[KeyA][KeyB][KeyC][KeyD][KeyE][KeyF] {
    const hasStateAnyKeys = Object.keys(this.accumulator.state).length > 0;
    if (!!keys && keys.length) {
      return safePluck(this.accumulator.state, keys);
    } else {
      return hasStateAnyKeys
        ? this.accumulator.state
        : (undefined as unknown as State);
    }
  }

  /**
   * @description
   * Manipulate one or many properties of the state by providing
   * a `Partial<State>`state or a `ProjectionFunction<State>`.
   *
   * @example
   * // Update one or many properties of the state by providing a `Partial<State>`
   *
   * const partialState = {
   *   foo: 'bar',
   *   bar: 5
   * };
   * state.set(partialState);
   *
   * // Update one or many properties of the state by providing a `ProjectionFunction<State>`
   *
   * const reduceFn = oldState => ({
   *   bar: oldState.bar + 5
   * });
   * state.set(reduceFn);
   *
   * @param {Partial<State>|ProjectStateFn<State>} stateOrProjectState
   * @return void
   */
  set(stateOrProjectState: Partial<State> | ProjectStateFn<State>): void;

  /**
   * @description
   * Manipulate a single property of the state by the property name and a `ProjectionFunction<State>`.
   *
   * @example
   * const reduceFn = oldState => oldState.bar + 5;
   * state.set('bar', reduceFn);
   *
   * @param {Key} key
   * @param {ProjectValueFn<State, Key>} projectSlice
   * @return void
   */
  set<Key extends keyof State, Object>(
    key: Key,
    projectSlice: ProjectValueFn<State, Key>,
  ): void;
  /**
   * @internal
   */
  set<Key extends keyof State>(
    keyOrStateOrProjectState: Partial<State> | ProjectStateFn<State> | Key,
    stateOrSliceProjectFn?: ProjectValueFn<State, Key>,
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
        keyOrStateOrProjectState(this.accumulator.state),
      );
      return;
    }

    if (
      isKeyOf<State>(keyOrStateOrProjectState) &&
      typeof stateOrSliceProjectFn === 'function'
    ) {
      const state: Partial<State> = {};
      state[keyOrStateOrProjectState] = stateOrSliceProjectFn(
        this.accumulator.state,
      );
      this.accumulator.nextSlice(state);
      return;
    }

    throw new Error('wrong params passed to set');
  }

  /**
   * @description
   * Connect an `Observable<Partial<State>>` to the state `State`.
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
   *  @param {Observable<Partial<State>>} inputOrSlice$
   *  @return void
   */
  connect(inputOrSlice$: Observable<Partial<State>>): void;

  /**
   * @description
   * Connect a `Signal<Partial<State>>` to the state `State`.
   * Any change emitted by the source will get merged into the state.
   *
   *  @param {Signal<Partial<State>>} signal
   *  @return void
   */
  connect(signal: Signal<Partial<State>>): void;

  /**
   * @description
   * Connect an `Observable<Value>` to the state `State`.
   * Any change emitted by the source will get forwarded to project function and merged into the state.
   * Subscription handling is done automatically.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   *
   * @example
   * const sliceToAdd$ = interval(250);
   * state.connect(sliceToAdd$, (type, value) => ({bar: value}));
   * // every 250ms the property bar get updated due to the emission of sliceToAdd$
   * @param {Observable<Value>} inputOrSlice$
   * @param {ProjectStateReducer<State, Value>} projectFn
   * @return void
   */
  connect<Value>(
    inputOrSlice$: Observable<Value>,
    projectFn: ProjectStateReducer<State, Value>,
  ): void;

  /**
   * @description
   * Connect a `Signal<Value>` to the state `State`.
   * Any change emitted by the source will get forwarded to the project function and merged into the state.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   * @param {Signal<Value>} signal
   * @param {ProjectStateReducer<State, Value>} projectFn
   * @return void
   */
  connect<Value>(
    signal: Signal<Value>,
    projectFn: ProjectStateReducer<State, Value>,
  ): void;

  /**
   *
   * @description
   * Connect an `Observable<State[Key]>` source to a specific property `Key` in the state `State`.
   * Any emitted change will update this specific property in the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$);
   * // every 250ms the property timer will get updated
   * @param {Key} key
   * @param {Observable<State[Key]>} slice$
   *
   * @return void
   */
  connect<Key extends keyof State>(
    key: Key,
    slice$: Observable<State[Key]>,
  ): void;

  /**
   *
   * @description
   * Connect a `Signal<State[Key]>` source to a specific property `Key` in the state `State`.
   * Any emitted change will update this specific property in the state.
   * @param {Key} key
   * @param {Signal<State[Key]>} signal
   *
   * @return void
   */
  connect<Key extends keyof State>(key: Key, signal: Signal<State[Key]>): void;

  /**
   * @description
   * Connect an `Observable<Value>` source to a specific property in the state. Additionally, you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
   * // every 250ms the property timer will get updated
   * @param {Key} key
   * @param {Observable<Value>} input$
   * @param {ProjectValueReducer<State, Key, Value>} projectSliceFn
   *
   * @return void
   */
  connect<Key extends keyof State, Value>(
    key: Key,
    input$: Observable<Value>,
    projectSliceFn: ProjectValueReducer<State, Key, Value>,
  ): void;

  /**
   *
   * @description
   * Connect a `Signal<Value>` source to a specific property in the state. Additionally, you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   * @param {Key} key
   * @param {Signal<Value>} signal
   * @param {ProjectValueReducer<State, Key, Value>} projectSliceFn
   *
   * @return void
   */
  connect<Key extends keyof State, Value>(
    key: Key,
    signal: Signal<Value>,
    projectSliceFn: ProjectValueReducer<State, Key, Value>,
  ): void;

  /**
   * @internal
   */
  connect<Key extends keyof State, Value extends Partial<State>>(
    keyOrInputOrSlice$:
      | Key
      | Observable<Partial<State> | Value>
      | Signal<Partial<State> | Value>,
    projectOrSlices$?:
      | ProjectStateReducer<State, Value>
      | Observable<State[Key] | Value>
      | Signal<State[Key] | Value>,
    projectValueFn?: ProjectValueReducer<State, Key, Value>,
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
        toObservable(keyOrInputOrSlice$, { injector: this.injector }),
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
        map((v) => projectionStateFn(this.accumulator.state, v as Value)),
      );
      this.accumulator.nextSliceObservable(slice$ as Observable<Value>);
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
        map((v) => projectionStateFn(this.accumulator.state, v as Value)),
      );
      this.accumulator.nextSliceObservable(slice$ as Observable<Value>);
      return;
    }

    if (
      isKeyOf<State>(keyOrInputOrSlice$) &&
      isObservable(projectOrSlices$) &&
      !projectValueFn
    ) {
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({ ...{}, [keyOrInputOrSlice$]: value })),
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    if (
      isKeyOf<State>(keyOrInputOrSlice$) &&
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
      isKeyOf<State>(keyOrInputOrSlice$) &&
      isObservable(projectOrSlices$)
    ) {
      const key: Key = keyOrInputOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({
          ...{},
          [key]: projectValueFn(this.get(), value as Value),
        })),
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
      const key: Key = keyOrInputOrSlice$;
      const slice$ = toObservable(projectOrSlices$, {
        injector: this.injector,
      }).pipe(
        map((value) => ({
          ...{},
          [key]: projectValueFn(this.get(), value as Value),
        })),
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    throw new Error('wrong params passed to connect');
  }

  /**
   * @description
   * Returns the state as cached and distinct `Observable<Type>`.
   * This way you don't have to think about
   * **late subscribers**, **multiple subscribers** or **multiple emissions** of the same value
   *
   * @example
   * const state$ = state.select();
   * state$.subscribe(state => doStuff(state));
   *
   * @returns Observable<TType>
   */
  select(): Observable<State>;

  /**
   * @description
   * Returns the state as cached and distinct `Observable<TypeA>`. Accepts arbitrary
   * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators)
   * to enrich the selection with reactive composition.
   *
   * @example
   * const profilePicture$ = state.select(
   *  map((state) => state.profilePicture),
   *  switchMap(profilePicture => mapImageAsync(profilePicture))
   * );
   * @param op { OperatorFunction<Type, TypeA> }
   * @returns Observable<TypeA>
   */
  select<TypeA = State>(op: OperatorFunction<State, TypeA>): Observable<TypeA>;

  /**
   * @internal
   */
  select<TypeA = State, TypeB = TypeA>(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
  ): Observable<TypeB>;

  /**
   * @internal
   */
  select<TypeA = State, TypeB = TypeA, TypeC = TypeB>(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
    op3: OperatorFunction<TypeB, TypeC>,
  ): Observable<TypeC>;

  /**
   * @internal
   */
  select<TypeA = State, TypeB = TypeA, TypeC = TypeB, TypeD = TypeC>(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
    op3: OperatorFunction<TypeB, TypeC>,
    op4: OperatorFunction<TypeC, TypeD>,
  ): Observable<TypeD>;

  /**
   * @internal
   */
  select<
    TypeA = State,
    TypeB = TypeA,
    TypeC = TypeB,
    TypeD = TypeC,
    TypeE = TypeD,
  >(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
    op3: OperatorFunction<TypeB, TypeC>,
    op4: OperatorFunction<TypeC, TypeD>,
    op5: OperatorFunction<TypeD, TypeE>,
  ): Observable<TypeE>;

  /**
   * @description
   * Transform a slice of the state by providing keys and map function.
   * Returns result of applying function to state slice as cached and distinct `Observable<Value>`.
   *
   * @example
   * // Project state slice
   * const text$ = state.select(
   *   ['query', 'results'],
   *   ({ query, results }) => `${results.length} results found for "${query}"`
   * );
   *
   * @param {Key[]} keys
   * @param {(slice: PickSlice<Type, Key>) => Value} fn
   * @param {KeyCompareMap<Pick<Type, Key>>} keyCompareMap
   *
   * @return Observable<Value>
   */
  select<Key extends keyof State, Value>(
    keys: Key[],
    fn?: (slice: PickSlice<State, Key>) => Value,
    keyCompareMap?: KeyCompareMap<Pick<State, Key>>,
  ): Observable<Value>;

  /**
   * @description
   * Transform a single property of the state by providing a key and map function.
   * Returns result of applying function to state property as cached and distinct `Observable<Value>`.
   *
   * @example
   * // Project state based on single property
   * const foo$ = state.select('bar', bar => `bar equals ${bar}`);
   *
   * @param {Key} key
   * @param {(val: Type[Key]) => Value} fn
   *
   * @return Observable<Value>
   */
  select<Key extends keyof State, Value>(
    key: Key,
    fn: (val: State[Key]) => Value,
  ): Observable<Value>;

  /**
   * @description
   * Access a single property of the state by providing keys.
   * Returns a single property of the state as cached and distinct `Observable<State[KeyA]>`.
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
   * @return Observable<Type[KeyA]>
   */
  select<KeyA extends keyof State>(keyA: KeyA): Observable<State[KeyA]>;

  /**
   * @internal
   */
  select<KeyA extends keyof State, KeyB extends keyof State[KeyA]>(
    keyA: KeyA,
    keyB: KeyB,
  ): Observable<State[KeyA][KeyB]>;

  /**
   * @internal
   */
  select<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
  >(keyA: KeyA, keyB: KeyB, keyC: KeyC): Observable<State[KeyA][KeyB][KeyC]>;

  /**
   * @internal
   */
  select<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
  >(
    keyA: KeyA,
    keyB: KeyB,
    keyC: KeyC,
    keyD: KeyD,
  ): Observable<State[KeyA][KeyB][KeyC][KeyD]>;

  /**
   * @internal
   */
  select<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
    KeyE extends keyof State[KeyA][KeyB][KeyC][KeyD],
  >(
    keyA: KeyA,
    keyB: KeyB,
    keyC: KeyC,
    keyD: KeyD,
    keyE: KeyE,
  ): Observable<State[KeyA][KeyB][KeyC][KeyD][KeyE]>;

  /**
   * @internal
   */
  select<
    KeyA extends keyof State,
    KeyB extends keyof State[KeyA],
    KeyC extends keyof State[KeyA][KeyB],
    KeyD extends keyof State[KeyA][KeyB][KeyC],
    KeyE extends keyof State[KeyA][KeyB][KeyC][KeyD],
    KeyF extends keyof State[KeyA][KeyB][KeyC][KeyD][KeyE],
  >(
    keyA: KeyA,
    keyB: KeyB,
    keyC: KeyC,
    keyD: KeyD,
    keyE: KeyE,
    keyF: KeyF,
  ): Observable<State[KeyA][KeyB][KeyC][KeyD][KeyE][KeyF]>;

  /**
   * @internal
   */
  select<Return>(
    ...args:
      | OperatorFunction<State, unknown>[]
      | string[]
      | [k: string, fn: (val: unknown) => unknown]
      | [
          keys: string[],
          fn?: (slice: unknown) => unknown,
          keyCompareMap?: KeyCompareMap<State>,
        ]
  ): Observable<State | Return> {
    return this.accumulator.state$.pipe(
      select(...(args as Parameters<typeof select>)),
    );
  }

  /**
   * @description
   * Returns a signal of the given key. It's first value is determined by the
   * current keys value in RxState. Whenever the key gets updated, the signal
   * will also be updated accordingly.
   * @param {Key} key
   *
   * @return Signal<State[Key]>
   */
  signal<Key extends keyof State>(key: Key): Signal<State[Key]> {
    return this.signalStoreProxy[key];
  }

  /**
   * @description
   * Lets you create a computed signal based off multiple keys stored in RxState.
   *
   * @param {(slice: SignalStateProxy<Type>) => ComputedType} fn
   * @return Signal<ComputedType>
   */
  computed<ComputedType>(
    fn: (slice: SignalStateProxy<State>) => ComputedType,
  ): Signal<ComputedType> {
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
   // * @param op1 { OperatorFunction<Type, TypeA> }
   // * @returns Signal<TypeA>
   */
  computedFrom<TypeA = State>(
    op1: OperatorFunction<State, TypeA>,
  ): Signal<TypeA>;

  /** @internal */
  computedFrom<TypeA = State, TypeB = TypeA>(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
  ): Signal<TypeB>;

  /** @internal */
  computedFrom<TypeA = State, TypeB = TypeA, TypeC = TypeB>(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
    op3: OperatorFunction<TypeB, TypeC>,
  ): Signal<TypeC>;

  /** @internal */
  computedFrom<TypeA = State, TypeB = TypeA, TypeC = TypeB, TypeD = TypeC>(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
    op3: OperatorFunction<TypeB, TypeC>,
    op4: OperatorFunction<TypeC, TypeD>,
  ): Signal<TypeD>;

  /** @internal */
  computedFrom<
    TypeA = State,
    TypeB = TypeA,
    TypeC = TypeB,
    TypeD = TypeC,
    TypeE = TypeD,
  >(
    op1: OperatorFunction<State, TypeA>,
    op2: OperatorFunction<TypeA, TypeB>,
    op3: OperatorFunction<TypeB, TypeC>,
    op4: OperatorFunction<TypeC, TypeD>,
    op5: OperatorFunction<TypeD, TypeE>,
  ): Signal<TypeE>;

  /** @internal */
  computedFrom<Type>(...ops: OperatorFunction<State, unknown>[]): Signal<Type> {
    return toSignal<Type>(this.select(...(ops as Parameters<typeof select>)), {
      injector: this.injector,
      requireSync: true,
    });
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
   * @param {Observable<SideEffect>} obsOrObsWithSideEffect
   * @param {function} [sideEffectFn]
   *
   * @return void
   */
  hold<SideEffect>(
    obsOrObsWithSideEffect: Observable<SideEffect>,
    sideEffectFn?: (arg: SideEffect) => void,
  ): void {
    const sideEffect = obsOrObsWithSideEffect.pipe(catchError((e) => EMPTY));
    if (typeof sideEffectFn === 'function') {
      this.effectObservable.nextEffectObservable(
        sideEffect.pipe(tap(sideEffectFn)),
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
    this.signalStoreProxy = createSignalStateProxy<State>(
      this.$,
      this.get.bind(this),
    );
    return subscription;
  }
}

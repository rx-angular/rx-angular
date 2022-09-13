import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { KeyCompareMap, PickSlice } from '../interfaces';
import {
  isOperateFnArrayGuard,
  isStringAndFunctionTupleGuard,
  isStringArrayFunctionAndOptionalObjectTupleGuard,
  isStringArrayGuard,
} from '../utils/guards';
import { pipeFromArray } from '../utils/pipe-from-array';
import { selectSlice } from './selectSlice';
import { stateful } from './stateful';

/**
 * @description
 * Returns the state as shared, replayed and distinct `Observable<T>`. This way you don't have to think about late
 * subscribers, multiple subscribers or multiple emissions of the same value.
 *
 * @example
 * const state$ = state.pipe(select());
 * state$.subscribe(state => doStuff(state));
 *
 * @returns Observable<T>
 */

export function select<T>(): MonoTypeOperatorFunction<T>;

/**
 * @description
 * Returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
 * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.
 *
 * @example
 * const profilePicture$ = state.pipe(
 *   select(
 *    pluck('profilePicture'),
 *    switchMap(profilePicture => mapImageAsync(profilePicture))
 *   )
 * );
 * @param  { OperatorFunction<T, A> } op
 * @returns Observable<A>
 *
 * @docsPage select
 * @docsCategory operators
 */
export function select<T, A>(
  op: OperatorFunction<T, A>
): OperatorFunction<T, A>;
/**
 * @internal
 */
export function select<T, A, B>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>
): OperatorFunction<T, B>;
/**
 * @internal
 */
export function select<T, A, B, C>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): OperatorFunction<T, C>;
/**
 * @internal
 */
export function select<T, A, B, C, D>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): OperatorFunction<T, D>;
/**
 * @internal
 */
export function select<T, A, B, C, D, E>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): OperatorFunction<T, E>;

/**
 * @description
 * Transform a slice of the state by providing keys and map function.
 * Returns result of applying function to state slice as cached and distinct `Observable<R>`.
 *
 * @example
 * // Project state slice
 * const text$ = state$.pipe(
 *   select(
 *     ['query', 'results'],
 *     ({ query, results }) => `${results.length} results found for "${query}"`
 *   )
 * );
 *
 * @return Observable<R>
 */
export function select<T extends object, K extends keyof T, R>(
  keys: K[],
  fn: (slice: PickSlice<T, K>) => R,
  keyCompareMap?: KeyCompareMap<Pick<T, K>>
): OperatorFunction<T, R>;

/**
 * @description
 * Transform a single property of the state by providing a key and map function.
 * Returns result of applying function to state property as cached and distinct `Observable<T[R]>`.
 *
 * @example
 * // Project state based on single property
 * const foo$ = state$.pipe(select('bar', bar => `bar equals ${bar}`));
 *
 * @return Observable<R>
 */
export function select<T, K extends keyof T, R>(
  k: K,
  fn: (val: T[K]) => R
): OperatorFunction<T, R>;

/**
 * @description
 * Access a single property of the state by providing keys.
 * Returns a single property of the state as cached and distinct `Observable<T[K1]>`.
 *
 * @example
 * // Access a single property
 * const bar$ = state$.pipe(select('bar'));
 *
 * // Access a nested property
 * const foo$ = state$.pipe(select('bar', 'foo'));
 *
 * @return Observable<T[K1]>
 */
export function select<T, K1 extends keyof T>(
  k1: K1
): OperatorFunction<T, T[K1]>;
/**
 * @internal
 */
export function select<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  k1: K1,
  k2: K2
): OperatorFunction<T, T[K1][K2]>;
/**
 * @internal
 */
export function select<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][K2][K3]>;
/**
 * @internal
 */
export function select<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFunction<T, T[K1][K2][K3][K4]>;
/**
 * @internal
 */
export function select<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): OperatorFunction<T, T[K1][K2][K3][K4][K5]>;
/**
 * @internal
 */
export function select<
  T,
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
): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;

/**
 * @internal
 */
export function select<T extends Record<string, unknown>>(
  ...opOrMapFn:
    | OperatorFunction<T, unknown>[]
    | string[]
    | [k: string, fn: (val: unknown) => unknown]
    | [
        keys: string[],
        fn: (slice: unknown) => unknown,
        keyCompareMap?: KeyCompareMap<T>
      ]
): OperatorFunction<T, unknown> {
  return (state$: Observable<T>) => {
    if (!opOrMapFn || opOrMapFn.length === 0) {
      return state$.pipe(stateful());
    } else if (isStringAndFunctionTupleGuard(opOrMapFn)) {
      return state$.pipe(stateful(map((s) => opOrMapFn[1](s[opOrMapFn[0]]))));
    } else if (isStringArrayFunctionAndOptionalObjectTupleGuard(opOrMapFn)) {
      return state$.pipe(
        selectSlice<T & object, keyof T>(
          opOrMapFn[0] as (keyof T)[],
          opOrMapFn[2]
        ),
        stateful(map(opOrMapFn[1]))
      );
    } else if (isStringArrayGuard(opOrMapFn)) {
      return state$.pipe(stateful(pluck(...opOrMapFn)));
    } else if (isOperateFnArrayGuard(opOrMapFn)) {
      return state$.pipe(stateful(pipeFromArray(opOrMapFn)));
    } else {
      throw new Error('wrong params passed to select');
    }
  };
}

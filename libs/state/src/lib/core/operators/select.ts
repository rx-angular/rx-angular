import {
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction
} from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import {
  WrongSelectParamsError,
  isOperateFnArrayGuard,
  isStringArrayGuard,
  pipeFromArray
} from '../utils';
import { stateful } from './stateful';

export function select<T>(): MonoTypeOperatorFunction<T>;
// ========================
export function select<T, A>(
  op: OperatorFunction<T, A>
): OperatorFunction<T, A>;
export function select<T, A, B>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>
): OperatorFunction<T, B>;
export function select<T, A, B, C>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): OperatorFunction<T, C>;
export function select<T, A, B, C, D>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): OperatorFunction<T, D>;
export function select<T, A, B, C, D, E>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): OperatorFunction<T, E>;
// ================================
export function select<T, K1 extends keyof T>(
  k1: K1
): OperatorFunction<T, T[K1]>;
export function select<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  k1: K1,
  k2: K2
): OperatorFunction<T, T[K1][K2]>;
export function select<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][K2][K3]>;
export function select<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFunction<T, T[K1][K2][K3][K4]>;
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
// ===========================
export function select<T>(
  ...opOrMapFn: OperatorFunction<T, any>[] | string[]
): OperatorFunction<T, any> {
  return (state$: Observable<T>) => {
    if (!opOrMapFn || opOrMapFn.length === 0) {
      return state$.pipe(stateful());
    } else if (isStringArrayGuard(opOrMapFn)) {
      return state$.pipe(stateful(pluck(...opOrMapFn)));
    } else if (isOperateFnArrayGuard(opOrMapFn)) {
      return state$.pipe(stateful(pipeFromArray(opOrMapFn)));
    }

    throw new WrongSelectParamsError();
  };
}

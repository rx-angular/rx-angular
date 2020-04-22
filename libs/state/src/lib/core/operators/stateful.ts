import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';
import { isOperateFnArrayGuard } from '../utils';

export function stateful<T>(): MonoTypeOperatorFunction<T>;
// ========================
export function stateful<T, A>(
  op: OperatorFunction<T, A>
): OperatorFunction<T, A>;
export function stateful<T, A, B>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>
): OperatorFunction<T, B>;
export function stateful<T, A, B, C>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): OperatorFunction<T, C>;
export function stateful<T, A, B, C, D>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): OperatorFunction<T, D>;
export function stateful<T, A, B, C, D, E>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): OperatorFunction<T, E>;
export function stateful<T, R>(
  ...optionalDerive: OperatorFunction<T, R>[]
): OperatorFunction<T, T | R> {
  return (s: Observable<T>): Observable<T | R> => {
    return s.pipe(
      // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
      // of data) @TODO evaluate benefits vs. overhead
      distinctUntilChanged(),
      // CUSTOM LOGIC HERE
      (o: Observable<T>): Observable<T | R> => {
        if (isOperateFnArrayGuard(optionalDerive)) {
          return o.pipe(pipeFromArray(optionalDerive));
        }
        return o;
      },
      // initial emissions, undefined is no base-state, pollution with skip(1)
      filter(v => v !== undefined),
      // distinct same derivation value
      distinctUntilChanged(),
      // reuse custom operations result for multiple subscribers and reemit the last canculated value.
      shareReplay({ bufferSize: 1, refCount: true })
    );
  };
}

import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay } from 'rxjs/operators';
import {
  ArrayReducerFn,
  ExtractObservableValue,
  PropName,
  PropType,
} from '../utils/model';
import { NotEmpty, ObservableMap } from './model';

/**
 * This Observable creation function helps to accumulate an object of key & Observable of values to an Observable of objects of key & value.
 * This comes in handy if you quickly want to create subsets as objects/state-slices of different Observables.
 *
 * The resulting Observable filters out undefined values forwards only distinct values and shared the aggregated output.
 *
 * @example
 *
 * const object$: Observable<{
 *   prop1: number,
 *   prop2: string
 * }> = accumulateObservables({
 *   prop1: of(42),
 *   prop2: of('lorem')
 * });
 *
 * @param obj - An object of key & Observable values pairs
 */
export function accumulateObservables<T extends ObservableMap & NotEmpty<T>>(
  obj: T
): Observable<{ [K in keyof T]: ExtractObservableValue<T[K]> }> {
  const keys = Object.keys(obj);
  const observables = keys.map((key) =>
    obj[key].pipe(
      // we avoid using the nullish operator later ;)
      filter((v) => v !== undefined),
      // state "changes" differ from each other, this operator ensures distinct values
      distinctUntilChanged()
    )
  );
  return combineLatest(observables).pipe(
    map((values) => values.reduce(getEntriesToObjectReducerFn(keys), {})),
    // by using shareReplay we share the composition work done to create the accumulated object
    shareReplay()
  );
}

/**
 * @internal
 */
function getEntriesToObjectReducerFn<T extends Record<string, any>>(
  keys: PropName<T>[]
): ArrayReducerFn<T> {
  return (
    accumulator: T,
    currentValue?: PropType<T>,
    currentIndex?: number
  ): T => {
    return {
      ...accumulator,
      [keys[currentIndex]]: currentValue,
    };
  };
}

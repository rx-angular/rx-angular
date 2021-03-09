import { combineLatest, defer, from, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  shareReplay,
} from 'rxjs/operators';
import {
  ArrayReducerFn,
  ExtractObservableValue,
  PropName,
  PropType,
} from '../utils/model';
import { NotEmpty, ObservableMap } from './model';
import { coalesceWith } from '../utils';

const resolvedPromise = Promise.resolve();
const resolvedPromise$ = from(resolvedPromise);

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
    // As combineLatest will emit multiple times for a change in multiple properties we coalesce those emissions together
    coalesceWith(from(Promise.resolve())),
    // mapping array of values to object
    map((values) => values.reduce(getEntriesToObjectReducerFn(keys), {})),
    // by using shareReplay we share the last composition work done to create the accumulated object
    shareReplay(1)
  );
}

/**
 * @internal
 *
 * Used for typing
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

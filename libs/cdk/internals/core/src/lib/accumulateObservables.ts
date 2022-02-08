import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { combineLatest, from, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay } from 'rxjs/operators';
import {
  ArrayReducerFn,
  ExtractObservableValue,
  NotEmpty,
  ObservableMap,
  PropName,
  PropType,
} from './model';
import { getZoneUnPatchedApi } from './get-zone-unpatched-api';

const resolvedPromise = getZoneUnPatchedApi('Promise').resolve();
const resolvedPromise$ = from(resolvedPromise);

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

/**
 * This Observable creation function helps to accumulate an object of key & Observable of values to
 * an Observable of objects of key & value.
 * This comes in handy if you quickly want to create subsets as objects/state-slices of different Observables.
 *
 * The resulting Observable filters out undefined values forwards only distinct values and shared the aggregated output.
 *
 * @example
 *
 * Default usage:
 *
 * const object$: Observable<{
 *   prop1: number,
 *   prop2: string,
 *   prop3: string
 * }> = accumulateObservables({
 *   prop1: interval(42),
 *   prop2: of('lorem'),
 *   prop3: 'test'
 * });
 *
 * Usage with custom duration selector:
 *
 * const object$: Observable<{
 *   prop1: number,
 *   prop2: string,
 *   prop3: string
 * }> = accumulateObservables({
 *   prop1: interval(42),
 *   prop2: of('lorem'),
 *   prop3: 'test'
 * }, timer(0, 20));
 *
 * @param obj - An object of key & Observable values pairs
 * @param durationSelector - An Observable determining the duration for the internal coalescing method
 */
export function accumulateObservables<T extends ObservableMap & NotEmpty<T>>(
  // @TODO type static or Observable to enable mixing of imperative and reatctive values
  obj: T,
  durationSelector: Observable<any> = resolvedPromise$
): Observable<{ [K in keyof T]: ExtractObservableValue<T[K]> }> {
  const keys = Object.keys(obj) as (keyof T)[];
  // @TODO better typing to enable static values => coerceObservable(obj[key])
  const observables = keys.map((key) =>
    obj[key].pipe(
      // we avoid using the nullish operator later ;)
      filter((v) => v !== undefined),
      // state "changes" differ from each other, this operator ensures distinct values
      distinctUntilChanged()
    )
  );
  return combineLatest(observables).pipe(
    // As combineLatest will emit multiple times for a change in multiple properties we coalesce those emissions
    // together
    coalesceWith(durationSelector),
    // mapping array of values to object
    map((values) =>
      values.reduce(getEntriesToObjectReducerFn(keys), {} as any)
    ),
    // by using shareReplay we share the last composition work done to create the accumulated object
    shareReplay({refCount: true, bufferSize: 1})
  );
}

import { combineLatest, from, merge, Observable, scan } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay } from 'rxjs/operators';

import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { ExtractObservableValue } from '../../../../cdk/internals/core/src/lib/model';
import { NotEmpty, ObservableMap } from './interfaces';
import { coerceObservable } from '@rx-angular/cdk/coercing';

const resolvedPromise = Promise.resolve();
const resolvedPromise$ = from(resolvedPromise);

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
export function smosh<
  T extends ObservableMap | (Partial<T> & NotEmpty<T>),
  U extends Record<string, any>
>(
  obj: Partial<T>,
  spreads: Observable<U>[] = [],
  options?: { durationSelector: Observable<any> }
): Observable<{ [K in keyof T]: ExtractObservableValue<T[K]> } & U> {
  let { durationSelector } = options || {};
  durationSelector = durationSelector || resolvedPromise$;
  const keys = Object.keys(obj) as (keyof T)[];
  const observables = keys.map((key) =>
    // turn values, if they are static, into Observables
    coerceObservable(obj[key]).pipe(
      // we avoid using the nullish operator later ;)
      filter((v) => v !== undefined),
      // state "changes" differ from each other, this operator ensures distinct values
      distinctUntilChanged()
    )
  );

  const obj$ = combineLatest(observables).pipe(
    // mapping array of values to object
    map((values) => {
      const obj = {} as any;
      for (let i = 0; i < values.length; i++) {
        obj[keys[i]] = values[i];
      }
      return obj;
    })
  );
  spreads = spreads.map((o) =>
    o.pipe(
      // we avoid using the nullish operator later ;)
      filter((v) => v !== undefined),
      // state "changes" differ from each other, this operator ensures distinct values
      distinctUntilChanged()
    )
  );

  return combineLatest([...spreads, obj$])
    .pipe(
      scan((acc, slices) => {
        const ks = slices.flatMap((slice) => Object.keys(slice)) as (keyof T)[];
        slices.forEach((slice) => {
          for (let i = 0; i < ks.length; i++) {
            acc[ks[i] as any] = slice[ks[i]];
          }
        });
        return acc as any;
      }, {})
    )
    .pipe(
      // As combineLatest will emit multiple times for a change in multiple properties we coalesce those emissions together
      coalesceWith(durationSelector),
      // by using shareReplay we share the last composition work done to create the accumulated object
      shareReplay(1)
    );
}

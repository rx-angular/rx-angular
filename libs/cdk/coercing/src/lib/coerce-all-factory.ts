import type { Observable, OperatorFunction } from 'rxjs';
import { Subject } from 'rxjs';
import { switchAll } from 'rxjs/operators';
import { coerceDistinctWith } from './coerceDistinctObservableWith';

/**
 * A factory function returning an object to handle the process of merging Observable next notifications into one
 *   Observable. This API takes away the clumsy handling of static values and Observable, reduces the number of
 *   emissions by:
 * - only merging distinct Observables
 * - only emit distinct values of the merged result
 *
 * You can next a Observable of `U` multiple times and merge them into the Observable exposed under one optimized
 *   `values$`
 *
 */
export function coerceAllFactory<U, R = U>(
  subjectFactory?: () => Subject<Observable<U> | U>,
  flattenOperator?: OperatorFunction<Observable<U>, R>
): {
  values$: Observable<R>;
  next(observable: Observable<U> | U): void;
} {
  const observablesSubject = subjectFactory ? subjectFactory() : new Subject();
  flattenOperator = flattenOperator || (switchAll() as any);
  const values$ = observablesSubject.pipe(
    coerceDistinctWith(flattenOperator as any)
  ) as Observable<R>;

  return {
    next(observable: Observable<U> | U) {
      observablesSubject.next(observable);
    },
    values$,
  };
}

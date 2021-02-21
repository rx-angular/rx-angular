import { Observable, ObservableInput, OperatorFunction, Subject } from 'rxjs';
import { coerceDistinctWith } from './coerceDistinctObservableWith';

/**
 * @internal
 *
 * A factory function returning an object to handle the process of merging Observable next notifications into one Observable.
 * This API takes away the clumsy handling of static values and Observable, reduces the number of emissions by:
 * - only merging distinct Observables
 * - only emit distingt values of the merged result
 *
 * You can next a Observable of `U` multiple times and merge them into the Observable exposed under one optimized `values$`
 *
 */
export function hotFlatten<U>(
  subjectFactory?: () => Subject<ObservableInput<U> | U>,
  flattenOperator?: OperatorFunction<ObservableInput<U>, U>
): {
  values$: Observable<U>;
  next(observable: ObservableInput<U> | U): void;
} {
  const observablesSubject = subjectFactory ? subjectFactory() : new Subject();
  const values$ = observablesSubject.pipe(
    coerceDistinctWith(flattenOperator)
  ) as Observable<U>;

  return {
    next(observable: ObservableInput<U> | U) {
      observablesSubject.next(observable);
    },
    values$,
  };
}

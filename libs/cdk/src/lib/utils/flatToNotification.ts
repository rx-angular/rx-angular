import {
  from,
  isObservable,
  ObservableInput,
  of,
  OperatorFunction,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  startWith,
  switchAll,
  switchMap,
  tap,
} from 'rxjs/operators';
import { RxNotification, RxNotificationKind } from '../model';
import { coerceDistinctWith } from './coerceDistinctObservableWith';
import { toRxSuspenseNotification } from './notification-transforms';
import { rxMaterialize } from './rxMaterialize';

export function flatToNotification<T>(): OperatorFunction<
  Observable<T>,
  RxNotification<T>
> {
  let initialized = false;
  return (o$) => {
    return o$.pipe(
      switchMap((o) =>
        o.pipe(
          tap((v) => {
            console.log(v);
          }),
          // startWith(undefined),
          rxMaterialize(),
          filter(
            (notification) => notification.value !== undefined || initialized
          ),
          map((notification) => {
            const value = notification.value as T;
            if (
              notification.kind === RxNotificationKind.next &&
              value === undefined
            ) {
              return toRxSuspenseNotification(value) as RxNotification<T>;
            }
            initialized = true;
            return notification;
          })
        )
      )
    );
  };
}

/**
 * @internal
 */
export function hotTemplateNotificationFlatten<U>(
  withSuspense?: () => boolean
): {
  values$: Observable<RxNotification<U>>;
  next(observable: ObservableInput<U>): void;
} {
  const observablesSubject = new ReplaySubject<ObservableInput<U>>(1);
  let initialized = false;
  let observableChange = false;
  const values$ = observablesSubject.pipe(
    distinctUntilChanged(),
    // handle null | undefined assignment and new Observable reset
    map((observable$) => {
      initialized = false;
      observableChange = isObservable<U>(observable$);
      return observableChange
        ? (observable$ as Observable<U>)
        : from(observable$);
    }),
    switchMap((o) =>
      o.pipe(
        tap((v) => {
          console.log(v);
        }),
        // startWith(undefined),
        rxMaterialize(),
        distinctUntilKeyChanged('value'),
        filter(
          (notification) => notification.value !== undefined || observableChange
        ),
        map((notification) => {
          const value = notification.value as U;
          initialized = true;
          if (
            notification.kind === RxNotificationKind.next &&
            value === undefined
          ) {
            return toRxSuspenseNotification(value) as RxNotification<U>;
          }
          return notification;
        })
      )
    )
  );

  return {
    next(observable: ObservableInput<U>) {
      observablesSubject.next(observable);
    },
    values$,
  };
}

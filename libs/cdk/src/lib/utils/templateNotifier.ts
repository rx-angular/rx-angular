import {
  from,
  isObservable,
  NEVER,
  Observable,
  ObservableInput,
  of,
  ReplaySubject,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { RxNotification, RxNotificationKind } from '../model';
import { toRxSuspenseNotification } from './notification-transforms';
import { rxMaterialize } from './rxMaterialize';

/**
 * @internal
 */
export function templateNotifier<U>(
  withSuspense?: () => boolean
): {
  values$: Observable<RxNotification<U>>;
  next(observable: ObservableInput<U>): void;
} {
  const observablesSubject = new ReplaySubject<ObservableInput<U>>(1);
  let firstRun = true;
  const wSuspense = () => withSuspense && withSuspense();
  const values$ = observablesSubject.pipe(
    distinctUntilChanged(),
    // handle null | undefined assignment and new Observable reset
    map((observable$) => {
      const isObs = isObservable<U>(observable$);
      // only pass through initial undefined value to filter out
      if (firstRun && (observable$ === undefined || observable$ === NEVER)) {
        return wSuspense() ? NEVER.pipe(startWith(undefined)) : undefined;
      }
      const isNull = observable$ == null;
      if (isNull) {
        return NEVER.pipe(startWith(observable$));
      }
      return (isObs ? (observable$ as Observable<U>) : from(observable$)).pipe(
        (o$) => {
          if (!firstRun || (withSuspense && withSuspense())) {
            return o$.pipe(startWith(undefined));
          }
          return o$;
        }
      );
    }),
    tap(() => (firstRun = false)),
    filter((v) => v !== undefined),
    switchMap((o: Observable<U>) => {
      return o.pipe(
        distinctUntilChanged(),
        rxMaterialize(),
        map((notification) => {
          const value = notification.value as U;
          if (
            notification.kind === RxNotificationKind.next &&
            value === undefined
          ) {
            return toRxSuspenseNotification(value) as RxNotification<U>;
          }
          if (notification.kind === RxNotificationKind.error) {
            return {
              ...notification,
              value: notification.error,
            };
          }
          return notification;
        })
      );
    })
  );

  return {
    next(observable: ObservableInput<U>) {
      observablesSubject.next(observable);
    },
    values$,
  };
}

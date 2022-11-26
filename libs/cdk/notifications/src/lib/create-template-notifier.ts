import {
  from,
  isObservable,
  NEVER,
  Observable,
  ObservableInput,
  ReplaySubject,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { rxMaterialize } from './rx-materialize';
import { RxNotification, RxNotificationKind } from './model';
import { toRxSuspenseNotification } from './notification-transforms';

/**
 * @description
 * Sends value and an initial `undefined` as value With a NEVER.
 * This is needed to render the suspense template and avoid completing (and render the complete template).
 * @param value
 */
const emitAndDontComplete = (value) => NEVER.pipe(startWith(value));

/**
 * This helper is responsible for turning a stream of materialized notifications
 * (next error, complete as object in the next stream) into an enriched version with an additional suspense
 * notification type.
 *
 * If a notification enters and is of type next we store tne value of `notification.next` as last value emitted.
 * This value is important in the template to show an e.g. error and also have access to the last emitted value of
 * next.
 * The value can be very useful in error or complete messages or to display the old value overlays by a loading spinner
 * in case of the suspense state.
 *
 * If a notification of kind `next` enters and its value is undefined we turn it into a suspense notification
 * If a notification of kind `error`, `complete`, `suspense` enters we take the last value from of a next notification
 * and assign it as new value to the notification
 */
const handleSuspenseAndLastValueInNotifications = <T>() => {
  // Used to store the last value per handleSuspenseAndLastValueInNotifications call
  let latestNextValue: T;

  // returns a projection function with a lastValue cache
  return (notification: RxNotification<T>): RxNotification<T> => {
    // if it is the notification is of type next we take its value
    // otherwise we keep the existing last value
    if (notification.kind === RxNotificationKind.Next) {
      latestNextValue = notification.value;
    }

    // If a next notification enters with a value of undefined we turn it into a suspense notification
    if (
      notification.kind === RxNotificationKind.Next &&
      notification.value === undefined
    ) {
      return toRxSuspenseNotification(undefined) as RxNotification<T>;
    }

    // If a Notification of type error, complete or suspense enters we assign the latest last value to them.
    // This is needed to access the old value in case of error or complete.
    // Next notifications will pass as they are.
    if (
      notification.kind === RxNotificationKind.Error ||
      notification.kind === RxNotificationKind.Complete ||
      notification.kind === RxNotificationKind.Suspense
    ) {
      notification.value = latestNextValue;
    }

    return notification as RxNotification<T>;
  };
};

/**
 * @internal
 *
 * @description
 * This factory function returns an object that can be driven imperatively over a `next` method.
 * Internally it prepares the incoming values for rendering by turning them into "template notifications",
 * an extended `ObservableNotification` object used to determine the respective template for values, errors, completing
 *   or suspense states.
 *
 * Internally it handles different edge cases for initial emits. This helps to have or template creation lazy.
 * Also it maps any Observable to RxNotifications. These notifications are bound to the view later and handle the
 *   display of the default template as well as the suspense, error, complete templates.
 */
export function createTemplateNotifier<U>(): {
  values$: Observable<RxNotification<U>>;
  next(observable: ObservableInput<U> | U): void;
  withInitialSuspense(withInitialSuspense: boolean): void;
} {
  // A Subject driven from the outside, it can contain Observables, static values null and undefined on purpose of from unassigned properties
  const observablesSubject = new ReplaySubject<ObservableInput<U> | U>(1);

  let emittedValueOnce = false;

  const values$ = observablesSubject.pipe(
    distinctUntilChanged(),
    // handle static values inc null assignment and new Observable or Promises
    map((observable$): ObservableInput<U> | U => {
      if (isObservableInput(observable$)) {
        return skipSuspenseIfHasValue(observable$) as Observable<U>;
      } else if (!emittedValueOnce && observable$ === undefined) {
        return NEVER;
      }
      return emitAndDontComplete(observable$);
    }),
    switchMap((o: Observable<U>) => {
      return o.pipe(
        tap(() => (emittedValueOnce = true)),
        distinctUntilChanged(),
        rxMaterialize(),
        map(handleSuspenseAndLastValueInNotifications<U>())
      );
    })
  );

  return {
    next(observable: ObservableInput<U> | U) {
      observablesSubject.next(observable);
    },
    withInitialSuspense(withInitialSuspense: boolean) {
      emittedValueOnce = emittedValueOnce || withInitialSuspense;
    },
    values$,
  };

  /**
   * @description
   * returns an observable that starts with an undefined value in case the input
   * observable$ does not emit a value immediately.
   * This is needed in order to skip the suspense template when we already know
   * there will be a next template rendered afterwards
   * @param observable$
   */
  function skipSuspenseIfHasValue<T>(
    observable$: ObservableInput<T>
  ): Observable<T> {
    return new Observable((subscriber) => {
      let startWithUndefined = true;
      const inner = from(observable$).subscribe({
        next: (v) => {
          startWithUndefined = false;
          subscriber.next(v);
        },
        error: (e) => {
          startWithUndefined = false;
          subscriber.error(e);
        },
        complete: () => subscriber.complete(),
      });
      if (emittedValueOnce && startWithUndefined) {
        subscriber.next(undefined);
      }
      return () => {
        inner.unsubscribe();
      };
    });
  }
}

function isObservableInput<T>(input: unknown): input is ObservableInput<T> {
  return (
    typeof (input as Promise<T>)?.then === 'function' || isObservable(input)
  );
}

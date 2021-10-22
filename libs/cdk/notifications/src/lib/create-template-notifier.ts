import {
  from,
  isObservable,
  NEVER,
  Observable,
  ObservableInput, of,
  ReplaySubject
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';

import { rxMaterialize } from './rx-materialize';
import { RxNotification, RxNotificationKind } from './model';
import { toRxSuspenseNotification } from './notification-transforms';

const calcWithSuspense = (withSuspense?: () => boolean): boolean => withSuspense && withSuspense();
const singleShotOngoing = (value) => NEVER.pipe(startWith(value));
const mapFirst = <T>(transformation: (value: any) => any) => (o$: Observable<T>): Observable<T> => {
  // Flags the first run.
  // This is important as we want to create laziness in the template.
  // If no value ever is emitted we dont want to create/render the value (next template).
  // In case a suspense template is given (calculated by `withSuspense` param) we render the suspense template on the first run.

  let firstRun = true;
  return o$.pipe(
    map((value) => {
      if(!firstRun) {
        return value;
      }
      const result = transformation(value);
      firstRun = false;
      return result;
    })
  )
}
// @TODO needs documentation :D
const handleSuspenseNotifications = <T>() => {
  let  latestNextValue: T = undefined;

  return (notification) => {
    latestNextValue =
      notification.kind === RxNotificationKind.Next
        ? notification.value
        : latestNextValue;

    if (
      notification.kind === RxNotificationKind.Next &&
      latestNextValue === undefined
    ) {
      return toRxSuspenseNotification(
        latestNextValue
      ) as RxNotification<T>;
    }

    notification.value = latestNextValue;
    return notification;
  }
}

/**
 * @internal
 *
 * @description
 * This factory function returns an object that can be driven imperatovely over a next method.
 * Internally it prepares the incoming values for rendering by turning them into "template notifications" an
 * extended `Notification` object used to determine the respective template for values, errors, completing of suspense states.
 */
export function createTemplateNotifier<U>(withSuspense?: () => boolean): {
  values$: Observable<RxNotification<U>>;
  next(observable: ObservableInput<U> | U): void;
} {
  // A Subject driven from the outside, it can contain Observables, static values null and undefined on purpose of from unassigned properties
  const observablesSubject = new ReplaySubject<ObservableInput<U>>(1);

  // Determines if a suspense notification is needed
  const isWithSuspense = calcWithSuspense(withSuspense);

  const values$ = observablesSubject.pipe(
    distinctUntilChanged(),
    mapFirst((value) => {
      const isUndefined = value === undefined;

      if((isUndefined) && isWithSuspense) {
        // We return the value and an additional `undefined` as first value as we want to render the suspense template
        return singleShotOngoing(undefined)
      }

      const isNull = value === null;

      if (isNull) {
        // We return the value and no undefined as first value as we dont need to render the suspense template for null values (it is considered as not used)
        return of(value);
      }

      return value;
    }),
    // `undefined` values are only processed once at beginning to initialize lazy. After that they are filtered out.
    filter((v) => v !== undefined),
    // handle static values inc null assignment and new Observable or Promises
    map((observable$): Observable<ObservableInput<U> | U> => {
      const isPromiseOrObs = typeof (observable$ as any).then === 'function' || isObservable(observable$);
      const isNull = observable$ === null;
      // A value is considered as static value if it is `null`, or any other value than `undefined`, `Promise`, `Observable`
      const isStaticValue = !isPromiseOrObs && !(observable$ === undefined);

      const isNEVER = observable$ === NEVER;
      // If it is a `NEVER` Observable we know it will never emit a value nor complete or error.
      // Therefore we emit directly undefined to signal a suspense state
      if (isNEVER) {
        // We return undefined as first value as we want to render the suspense template for null values (it is considered as not used)
        return singleShotOngoing(undefined);
      }

      // If it is a static value forward directly
      if (isStaticValue) {
        // We return the value always and no undefined as first value as we dont need to render the suspense template for static values (it is considered as kinda sync)
        return singleShotOngoing(observable$);
      }

      return from(observable$).pipe(
        // We apply a leading undefined value to the emissions to display the suspense template
        (o$) => {
          if (isWithSuspense) {
            return o$.pipe(startWith(undefined));
          }
          return o$;
        }
      );
    }),
    switchMap((o: Observable<U>) => {
      return o.pipe(
        distinctUntilChanged(),
        rxMaterialize(),
        map(handleSuspenseNotifications<U>())
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

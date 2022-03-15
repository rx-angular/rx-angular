import {
  from,
  isObservable,
  NEVER,
  Observable,
  ObservableInput,
  of,
  ReplaySubject
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { rxMaterialize } from './rx-materialize';
import { RxNotification, RxNotificationKind } from './model';
import { toRxSuspenseNotification } from './notification-transforms';

const calcWithSuspenseTpl = (withSuspenseTpl?: () => boolean): boolean => withSuspenseTpl && withSuspenseTpl();

/**
 * @description
 * Sends value and an initial `undefined` as value With a NEVER.
 * This is needed to render the suspense template and avoid completing (and render the complete template).
 * @param value
 */
const emitAndDontComplete = (value) => NEVER.pipe(startWith(value));
/**
* @description
* Flags the first run.
* This is important as we want to create laziness in the template.
* If no value ever is emitted we dont want to create/render the value (next template).
* In case a suspense template is given (calculated by `withSuspense` param) we render the suspense template on the first run.
*/
const mapFirst = <T>(transformation: (value: any) => any) => (o$: Observable<T>): Observable<T> => {
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

/**
 * This helper is responsible for turning a stream of materialized notifications
 * (next error, complete as object in the next stream) into an enriched version with an additional suspense notification type.
 *
 * If a notification enters and is of type next we store tne value of `notification.next` as last value emitted.
 * This value is important in the template to show an e.g. error and also have access to the last emitted value of next.
 * The value can be very useful in error or complete messages or to display the old value overlays by a loading spinner in case of the suspense state.
 *
 * If a notification of kind `next` enters and its value is undefined we turn it into a suspense notification
 * If a notification of kind `error`, `complete`, `suspense` enters we take the last value from of a next notification
 * and assign it as new value to the notification
 */
const handleSuspenseAndLastValueInNotifications = <T>() => {
  // Used to store the last value per handleSuspenseAndLastValueInNotifications call
  let  latestNextValue: T;

  // returns a projection function with a lastValue cache
  return (notification: RxNotification<T>): RxNotification<T> => {
    // if it the notification is of type next we take its value
    // otherwise we keep the existing last value
    if(notification.kind === RxNotificationKind.Next) {
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
    if(
      notification.kind === RxNotificationKind.Error ||
      notification.kind === RxNotificationKind.Complete ||
      notification.kind === RxNotificationKind.Suspense) {
      notification.value = latestNextValue;
    }

    return notification as RxNotification<T>;
  }
}

/**
 * @internal
 *
 * @description
 * This factory function returns an object that can be driven imperatively over a `next` method.
 * Internally it prepares the incoming values for rendering by turning them into "template notifications",
 * an extended `ObservableNotification` object used to determine the respective template for values, errors, completing or suspense states.
 *
 * Internally it handles different edge cases for initial emits. This helps to have or template creation lazy.
 * Also it maps any Observable to RxNotifications. These notifications are bound to the view later and handle the display of
 * the default template as well as the suspense, error, complete templates.
 */
export function createTemplateNotifier<U>(withSuspenseTpl?: () => boolean): {
  values$: Observable<RxNotification<U>>;
  next(observable: ObservableInput<U> | U): void;
} {
  // A Subject driven from the outside, it can contain Observables, static values null and undefined on purpose of from unassigned properties
  const observablesSubject = new ReplaySubject<ObservableInput<U>>(1);


  const values$ = observablesSubject.pipe(
    distinctUntilChanged(),
    // Handle initialization edge cases
    mapFirst((value) => {

      const isUndefined = value === undefined;
        const isNEVER = value === NEVER;
        // If it is a `NEVER` Observable we know it will never emit a value nor complete or error.
        // Therefore we emit directly undefined to signal a suspense state

      if((isUndefined || isNEVER)) {
        // Determines if a suspense notification is needed
        const isSuspenseTemplateGiven = calcWithSuspenseTpl(withSuspenseTpl);

        // Render suspense template if given. Otherwise do nothing (later undefined are filtered out)
        return isSuspenseTemplateGiven ? emitAndDontComplete(undefined) : undefined
      }

      const isNull = value === null;

      if (isNull) {
        // We return the value and no undefined as first value
        // as we dont need to render the suspense template for null values (it is considered as not used)
        return of(null);
      }

      return value;
    }),
    // `undefined` values are only processed once at beginning to initialize lazy. After that they are filtered out.
    filter((v) => v !== undefined),
    // handle static values inc null assignment and new Observable or Promises
    map((observable$): Observable<ObservableInput<U> | U> => {
      const isNull = observable$ === null;
      const isPromiseOrObs = !isNull && (typeof (observable$ as any).then === 'function' || isObservable(observable$));
      // A value is considered as static value if it is `null`, or any other value than `undefined`, `Promise`, `Observable`
      const isStaticValue = !isPromiseOrObs && !(observable$ === undefined);

      const isNEVER = observable$ === NEVER;
      // If it is a `NEVER` Observable we know it will never emit a value nor complete or error.
      // Therefore we emit directly undefined to signal a suspense state
      if (isNEVER) {
        // Render suspense template for null values (it is considered as not used)
        return emitAndDontComplete(undefined);
      }

      // If it is a static value forward directly
      if (isStaticValue) {
        // Render next template for static values (it is considered as kinda sync)
        return emitAndDontComplete(observable$);
      }

      return from(observable$).pipe(
        (o$) => {
          // Determines if a suspense notification is needed
          const isSuspenseTemplateGiven = calcWithSuspenseTpl(withSuspenseTpl);

          if (isSuspenseTemplateGiven) {
            // Render suspense template
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
        map(handleSuspenseAndLastValueInNotifications<U>())
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

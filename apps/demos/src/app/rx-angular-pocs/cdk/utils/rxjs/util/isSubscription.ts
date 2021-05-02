/**
 * Tests to see if the object is an RxJS {@link Observable}
 * @param obj the object to test
 */
import { Subscription } from 'rxjs';
import { isFunction } from 'rxjs/internal/util/isFunction';

export function isSubscription(obj: any): obj is Subscription {
  // The !! is to ensure that this publicly exposed function returns
  // `false` if something like `null` or `0` is passed.
  return !!obj && (obj instanceof Subscription);
}

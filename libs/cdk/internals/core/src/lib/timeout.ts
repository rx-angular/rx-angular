import { Observable, Subscriber } from 'rxjs';
import { getZoneUnPatchedApi } from './get-zone-unpatched-api';

/**
 * Creates an Observable that emits after a setTimeout.
 * The timeout it unpatched to not avoid zone pollution
 * @param setTimeoutFn
 */
export function timeout(
  setTimeoutFn: (cb: () => void) => number = getZoneUnPatchedApi('setTimeout')
) {
  return new Observable<number>((subscriber: Subscriber<number>) => {
    const asyncID = setTimeoutFn(() => subscriber.next(0));
    return () => {
      getZoneUnPatchedApi('clearTimeout')(asyncID);
    };
  });
}

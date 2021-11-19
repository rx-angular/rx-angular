import { mapTo, Observable, Subscriber, concatMap } from 'rxjs';
import { getZoneUnPatchedApi } from './get-zone-unpatched-api';

/**
 * Creates an Observable that emits after a setTimeout.
 * The timeout it unpatched to not avoid zone pollution
 * @param setTimeoutFn
 */
function timeout(
  delay: number = 0
) {
  return new Observable<number>((subscriber: Subscriber<number>) => {
    const asyncID = getZoneUnPatchedApi('setTimeout')(() => subscriber.next(0), delay);
    return () => {
      getZoneUnPatchedApi('clearTimeout')(asyncID);
    };
  });
}

/**
 *
 */
export function timeoutSwitchMapWith<T>() {
  return (o$: Observable<T>) => o$.pipe(
    concatMap((v) => timeout().pipe(mapTo(v)))
  )
}

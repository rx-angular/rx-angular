import { defer, from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { getUnpatchedResolvedPromise } from '../utils';

/**
 * getZoneUnPatchedPromiseDurationSelector
 *
 * @description
 * This function returns Observable which creates an un-patched Promise when subscribed to.
 * It takes care of using the un-patched API if zone.js patched it and transforms the resolve into the number `1`
 *
 * @return {Observable<number>} the Observable emitting a `1` if the Promise resolves.
 *
 * @internal
 */
export function getZoneUnPatchedPromiseDurationSelector(): () => Observable<
  number
> {
  return () => defer(() => from(getUnpatchedResolvedPromise()).pipe(mapTo(1)));
}

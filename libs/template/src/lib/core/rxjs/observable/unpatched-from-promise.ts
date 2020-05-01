import { defer, from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { getUnpatchedResolvedPromise } from '../../utils/unpatched-promise';

export function tickFromUnPatchedPromise(): Observable<number> {
  return defer(() => from(getUnpatchedResolvedPromise()).pipe(mapTo(1)));
}

import { defer, from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { getUnpatchedResolvedPromise } from '@ngx-rx/ts-etc';

export function tickFromUnPatchedPromise(): Observable<number> {
  return defer(() => from(getUnpatchedResolvedPromise()).pipe(mapTo(1)));
}

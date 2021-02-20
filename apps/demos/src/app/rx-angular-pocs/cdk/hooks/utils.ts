import { Observable } from 'rxjs';
import { filter, pluck, shareReplay, take } from 'rxjs/operators';
import { HookProps } from './model';

export function toHook<H extends keyof HookProps>(name: H) {
  return (o$: Observable<HookProps>): Observable<HookProps[H]> =>
    o$.pipe(
      pluck(name),
      filter((init) => !!init),
      take(1),
      shareReplay()
    );
}

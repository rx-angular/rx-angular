import { Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { HookProps } from './model';

export function toHook<H extends keyof HookProps>(name: H) {
  return (o$: Observable<HookProps>): Observable<HookProps[H]> =>
    o$.pipe(
      map((props) => props[name]),
      filter((init) => !!init),
      take(1),
      shareReplay()
    );
}

import { Observable } from 'rxjs';
import { filter, map, pluck, shareReplay, take } from 'rxjs/operators';
import { HookProps } from './model';

export function toHook<H extends keyof HookProps>(name: H) {
  return (o$: Observable<HookProps>): Observable<HookProps[H]> => o$.pipe(
    pluck(name),
    filter((init) => !!init),
    take(1),
    shareReplay()
  )
}

export function toOnInitHook$(hooks$: Observable<HookProps>) {
  return hooks$.pipe(toHook('init'));
}

export function toOnDestroyHook$(hooks$: Observable<HookProps>) {
  return hooks$.pipe(
    map((h) => h.destroy),
    filter((destroy) => destroy),
    take(1),
    shareReplay()
  );
}

import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RenderStrategy } from '@ngx-rx/core';

export function renderChange<T>(
  strategy: RenderStrategy<T>
): MonoTypeOperatorFunction<T> {
  return (s: Observable<T>): Observable<T> => {
    return s.pipe(
      strategy.behaviour(),
      tap(() => strategy.render())
    );
  };
}

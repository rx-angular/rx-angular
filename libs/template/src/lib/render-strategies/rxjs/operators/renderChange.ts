import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RenderStrategy } from '../../../core';

export function renderChange<T>(
  strategy: RenderStrategy<T>
): MonoTypeOperatorFunction<T> {
  return (s: Observable<T>): Observable<T> => {
    return s.pipe(strategy.behavior);
  };
}

import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface OnDestroy$ {
  onDestroy$: Observable<boolean>
}

export function untilDestroyed<V>(instance: OnDestroy$): MonoTypeOperatorFunction<V> {
  return (source) => source.pipe(takeUntil<V>(instance.onDestroy$));
}

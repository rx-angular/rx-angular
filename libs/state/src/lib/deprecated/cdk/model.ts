import { Observable, Subscribable, Subscription } from 'rxjs';

/**
 * @deprecated moved to `@rx-angular/cdk/state`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export type AccumulationFn = <T>(st: T, sl: Partial<T>) => T;

/**
 * @deprecated moved to `@rx-angular/cdk/state`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export interface Accumulator<T> extends Subscribable<T> {
  state: T;
  state$: Observable<T>;
  signal$: Observable<T>;
  subscribe: () => Subscription;
  nextSlice: (stateSlice: Partial<T>) => void;
  nextSliceObservable: (state$: Observable<Partial<T>>) => void;
  nextAccumulator: (fn: AccumulationFn) => void;
}

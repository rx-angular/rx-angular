import { Observable, Subscribable, Subscription } from 'rxjs';

export type AccumulationFn = <T>(st: T, sl: Partial<T>) => T;

export interface Accumulator<T> extends Subscribable<T> {
  state: T;
  state$: Observable<T>;
  signal$: Observable<T>;
  subscribe: () => Subscription;
  nextSlice: (stateSlice: Partial<T>) => void;
  nextSliceObservable: (state$: Observable<Partial<T>>) => void;
  nextAccumulator: (fn: AccumulationFn) => void;
}

import {
  ConnectableObservable,
  merge,
  Observable,
  queueScheduler,
  Subject,
  Subscribable,
  Subscription
} from 'rxjs';
import {
  distinctUntilChanged,
  mergeAll,
  observeOn,
  publishReplay,
  scan,
  tap
} from 'rxjs/operators';

export function createAccumulationObservable<T extends object>(
  stateObservables = new Subject<Observable<Partial<T>>>(),
  stateSlices = new Subject<Partial<T>>(),
  stateAccumulator: (st: T, sl: Partial<T>) => T = (
    st: T,
    sl: Partial<T>
  ): T => {
    return { ...st, ...sl };
  }
): {
  state: T;
  state$: Observable<T>;
  nextSlice: (stateSlice: Partial<T>) => void;
  nextSliceObservable: (state$: Observable<Partial<T>>) => void;
} & Subscribable<T> {
  const compositionObservable = {
    state: {},
    state$: merge(
      stateObservables.pipe(
        distinctUntilChanged(),
        mergeAll(),
        observeOn(queueScheduler)
      ),
      stateSlices.pipe(observeOn(queueScheduler))
    ).pipe(
      scan(stateAccumulator, {} as T),
      tap(newState => (compositionObservable.state = newState)),
      publishReplay(1)
    ),
    nextSlice,
    nextSliceObservable,
    subscribe
  };

  // ======

  return compositionObservable;

  // ======

  function nextSlice(stateSlice: Partial<T>): void {
    stateSlices.next(stateSlice);
  }

  function nextSliceObservable(stateObservable: Observable<Partial<T>>): void {
    stateObservables.next(stateObservable);
  }

  function subscribe(): Subscription {
    return (compositionObservable.state$ as ConnectableObservable<T>).connect();
  }
}

import {
  BehaviorSubject,
  ConnectableObservable,
  merge,
  Observable,
  queueScheduler,
  Subject,
  Subscribable,
  Subscription,
  EMPTY,
} from 'rxjs';
import {
  distinctUntilChanged,
  mergeAll,
  observeOn,
  publish,
  publishReplay,
  scan,
  tap,
  withLatestFrom,
  catchError,
} from 'rxjs/operators';

export type AccumulationFn = <T>(st: T, sl: Partial<T>) => T;

const defaultAccumulator: AccumulationFn = <T>(st: T, sl: Partial<T>): T => {
  return { ...st, ...sl };
};

interface Accumulator<T> extends Subscribable<T> {
  state: T;
  state$: Observable<T>;
  signal$: Observable<T>;
  nextSlice: (stateSlice: Partial<T>) => void;
  nextSliceObservable: (state$: Observable<Partial<T>>) => void;
  nextAccumulator: (fn: AccumulationFn) => void;
}

export function createAccumulationObservable<T extends object>(
  stateObservables = new Subject<Observable<Partial<T>>>(),
  stateSlices = new Subject<Partial<T>>(),
  accumulatorObservable = new BehaviorSubject(defaultAccumulator)
): Accumulator<T> {
  const signal$ = merge(
    stateObservables.pipe(
      distinctUntilChanged(),
      mergeAll(),
      observeOn(queueScheduler)
    ),
    stateSlices.pipe(observeOn(queueScheduler))
  ).pipe(
    withLatestFrom(accumulatorObservable.pipe(observeOn(queueScheduler))),
    scan(
      (state, [slice, stateAccumulator]) => stateAccumulator(state, slice),
      {} as T
    ),
    tap(
      (newState) => (compositionObservable.state = newState),
      (error) => console.error(error)
    ),
    // @Notice We catch the error here as it get lost in between `publish` and `publishReplay`. We return empty to
    catchError((e) => EMPTY),
    publish()
  );
  const state$: Observable<T> = signal$.pipe(publishReplay(1));
  const compositionObservable: Accumulator<T> = {
    state: {} as T,
    signal$,
    state$,
    nextSlice,
    nextSliceObservable,
    nextAccumulator,
    subscribe,
  };

  // ======

  return compositionObservable;

  // ======

  function nextAccumulator(accumulatorFn: AccumulationFn): void {
    accumulatorObservable.next(accumulatorFn);
  }

  function nextSlice(stateSlice: Partial<T>): void {
    stateSlices.next(stateSlice);
  }

  function nextSliceObservable(stateObservable: Observable<Partial<T>>): void {
    stateObservables.next(stateObservable);
  }

  function subscribe(): Subscription {
    const sub = (compositionObservable.signal$ as ConnectableObservable<
      T
    >).connect();
    sub.add(
      (compositionObservable.state$ as ConnectableObservable<T>).connect()
    );
    sub.add(() => {
      accumulatorObservable.complete();
      stateObservables.complete();
      stateSlices.complete();
    });
    return sub;
  }
}

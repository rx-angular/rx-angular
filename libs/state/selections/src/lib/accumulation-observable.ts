import {
  BehaviorSubject,
  ConnectableObservable,
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  queueScheduler,
  SchedulerLike,
  Subject,
  Subscription,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  mergeAll,
  observeOn,
  publish,
  publishReplay,
  scan,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AccumulationFn, Accumulator } from './model';

export const defaultAccumulator: AccumulationFn = <T>(
  st: T,
  sl: Partial<T>,
): T => {
  return { ...st, ...sl };
};

export function createAccumulationObservable<T extends object>(
  stateObservables = new Subject<Observable<Partial<T>>>(),
  stateSlices = new Subject<Partial<T>>(),
  accumulatorObservable = new BehaviorSubject(defaultAccumulator),
  scheduler: SchedulerLike | null = queueScheduler,
): Accumulator<T> {
  const observeStateOn = <R>(): MonoTypeOperatorFunction<R> =>
    scheduler ? observeOn(scheduler) : (o$) => o$;
  const signal$ = merge(
    stateObservables.pipe(distinctUntilChanged(), mergeAll(), observeStateOn()),
    stateSlices.pipe(observeStateOn()),
  ).pipe(
    withLatestFrom(accumulatorObservable.pipe(observeStateOn())),
    scan(
      (state, [slice, stateAccumulator]) => stateAccumulator(state, slice),
      {} as T,
    ),
    tap(
      (newState) => (compositionObservable.state = newState),
      (error) => console.error(error),
    ),
    // @Notice We catch the error here as it get lost in between `publish` and `publishReplay`. We return empty to
    catchError((e) => EMPTY),
    publish(),
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
    const sub = (
      compositionObservable.signal$ as ConnectableObservable<T>
    ).connect();
    sub.add(
      (compositionObservable.state$ as ConnectableObservable<T>).connect(),
    );
    sub.add(() => {
      accumulatorObservable.complete();
      stateObservables.complete();
      stateSlices.complete();
    });
    return sub;
  }
}

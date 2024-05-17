import {
  merge,
  Observable,
  queueScheduler,
  SchedulerLike,
  Subject,
  Subscribable,
  Subscription,
} from 'rxjs';
import { mergeAll, observeOn } from 'rxjs/operators';

export function createSideEffectObservable<T>(
  stateObservables = new Subject<Observable<T>>(),
  scheduler: SchedulerLike | null = queueScheduler,
): {
  effects$: Observable<T>;
  nextEffectObservable: (effect$: Observable<T>) => void;
  subscribe: () => Subscription;
} & Subscribable<T> {
  const effects$: Observable<T> = merge(
    stateObservables.pipe(
      mergeAll(),
      scheduler ? observeOn(scheduler) : (o$) => o$,
    ),
  );

  function nextEffectObservable(effect$: Observable<T>): void {
    stateObservables.next(effect$);
  }

  function subscribe(): Subscription {
    return effects$.subscribe();
  }

  return {
    effects$,
    nextEffectObservable,
    subscribe,
  };
}

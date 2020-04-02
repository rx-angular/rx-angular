import {merge, Observable, queueScheduler, Subject, Subscribable, Subscription} from "rxjs";
import {distinctUntilChanged, mergeAll, observeOn, publishReplay, scan} from "rxjs/operators";

export function createSideEffectObservable<T>(
    stateObservables = new Subject<Observable<T>>(),
): {
    effects$: Observable<T>,
    nextEffectObservable: (effect$: Observable<T>) => void
} & Subscribable<T> {
    const effects$: Observable<T> = merge(
        stateObservables.pipe(
            mergeAll(),
            observeOn(queueScheduler)
        )
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
        subscribe
    }
}

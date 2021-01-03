import { Injectable, OnDestroy } from '@angular/core';
import { isSubscription } from '../../cdk/utils/rxjs/util/isSubscription';
import { createSideEffectObservable } from '../../cdk/utils/rxjs/observable/side-effect-observable';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class RxEffects implements OnDestroy {
  private readonly subscription;
  private readonly effectObservable = createSideEffectObservable();

  constructor() {
    this.subscription = this.effectObservable.subscribe();
  }

  /**
   * @description
   * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
   * `sideEffectFunction`.
   * Subscription handling is done automatically.
   *
   * @example
   * // Directly pass an observable side-effect
   * const localStorageEffect$ = changes$.pipe(
   *  tap(changes => storeChanges(changes))
   * );
   * state.hold(localStorageEffect$);
   *
   * // Pass an additional `sideEffectFunction`
   *
   * const localStorageEffectFn = changes => storeChanges(changes);
   * state.hold(changes$, localStorageEffectFn);
   *
   * @param {Observable<S>} obsOrObsWithSideEffectOrSubscription
   * @param {function} [sideEffectFn]
   */
  hold<S>(
    obsOrObsWithSideEffectOrSubscription: Observable<S> | Subscription,
    sideEffectFn?: (arg: S) => void
  ): void {
    if (isSubscription(obsOrObsWithSideEffectOrSubscription)) {
      this.subscription.add(obsOrObsWithSideEffectOrSubscription);
      return;
    } else if (typeof sideEffectFn === 'function') {
      this.effectObservable.nextEffectObservable(
        obsOrObsWithSideEffectOrSubscription.pipe(
          tap(sideEffectFn),
          catchError((e) => {
            console.error(e);
            return EMPTY;
          })
        )
      );
      return;
    }
    this.effectObservable.nextEffectObservable(obsOrObsWithSideEffectOrSubscription);
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.subscription && this.subscription.unsubscribe();
  }
}

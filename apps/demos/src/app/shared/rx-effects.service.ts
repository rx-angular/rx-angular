import { Injectable, OnDestroy } from '@angular/core';
import { createSideEffectObservable } from '@rx-angular/cdk/state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RxEffects implements OnDestroy {
  private readonly subscription;
  private readonly effectObservable = createSideEffectObservable();

  constructor() {
    this.subscription = this.effectObservable.subscribe()
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
   * @param {Observable<S>} obsOrObsWithSideEffect
   * @param {function} [sideEffectFn]
   */
  hold<S>(
    obsOrObsWithSideEffect: Observable<S>,
    sideEffectFn?: (arg: S) => void
  ): void {
    if (typeof sideEffectFn === 'function') {
      this.effectObservable.nextEffectObservable(
        obsOrObsWithSideEffect.pipe(tap(sideEffectFn))
      );
      return;
    }
    this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
  }

}

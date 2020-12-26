import { Injectable, OnDestroy } from '@angular/core';
import { createSideEffectObservable } from '../cdk/side-effect-observable';
import { EMPTY, Observable } from 'rxjs';
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
   * @param {Observable<S>} obsOrObsWithSideEffect
   * @param {function} [sideEffectFn]
   */
  hold<S>(
    obsOrObsWithSideEffect: Observable<S>,
    sideEffectFn?: (arg: S) => void
  ): void {
    if (typeof sideEffectFn === 'function') {
      this.effectObservable.nextEffectObservable(
        obsOrObsWithSideEffect.pipe(
          tap(sideEffectFn),
          catchError((e) => EMPTY)
        )
      );
      return;
    }
    this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.subscription && this.subscription.unsubscribe();
  }
}

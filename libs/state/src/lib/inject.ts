import { ChangeDetectorRef, ViewRef, inject } from '@angular/core';
import { AccumulationFn } from '@rx-angular/state/selections';
import { RxState } from './rx-state.service';

export interface InjectRxStateParams<State extends object> {
  initialState?: Partial<State>;
  accumulatorFn?: AccumulationFn;
}

export function injectRxState<State extends object>({
  accumulatorFn,
  initialState,
}: InjectRxStateParams<State> = {}): RxState<State> {
  const rxState = new RxState<State>();
  /**
   * @todo: Use DestroyRef instead when upgrading to Angular 16
   */
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  if (accumulatorFn) {
    rxState.setAccumulator(accumulatorFn);
  }
  if (initialState) {
    rxState.set(initialState);
  }

  viewRef.onDestroy(() => rxState.ngOnDestroy());

  return rxState;
}

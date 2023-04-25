import { ChangeDetectorRef, ViewRef, inject } from '@angular/core';
import { AccumulationFn } from '@rx-angular/state/selections';
import { Observable } from 'rxjs';
import { RxState } from './rx-state.service';

export type RxStateFeature<State extends object> = (
  rxState: RxState<State>
) => void;

/**
 * @todo: see how to infer generic type from accumulator to accumulatorFn.
 */
export function withAccumulator<State extends object>(
  accumulatorFn: AccumulationFn
) {
  return (rxState: RxState<State>) => rxState.setAccumulator(accumulatorFn);
}

export function withInitialState<State extends object>(
  initialState: Partial<State>
) {
  return (rxState: RxState<State>) => rxState.set(initialState);
}

/**
 * @todo: see how to infer type from RxState.connect parameters.
 * Current limitation is that overload signatures are hard to infer.
 */
export function withConnect<State extends object>(inputOrSlice$: any) {
  return (rxState: RxState<State>) => rxState.connect(inputOrSlice$);
}

export function withHold<State extends object>(
  obsOrObsWithSideEffect: Observable<unknown>,
  sideEffectFn?: (arg: unknown) => void
) {
  return (rxState: RxState<State>) =>
    rxState.hold(obsOrObsWithSideEffect, sideEffectFn);
}

export function rxState<State extends object>(
  ...features: RxStateFeature<State>[]
): RxState<State> {
  const rxState = new RxState<State>();
  /**
   * @todo: Use DestroyRef instead when upgrading to Angular 16
   */
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  features.forEach((composeWith) => composeWith(rxState));

  viewRef.onDestroy(() => rxState.ngOnDestroy());

  return rxState;
}

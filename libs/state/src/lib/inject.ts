import { ChangeDetectorRef, ViewRef, inject } from '@angular/core';
import { AccumulationFn } from '@rx-angular/state/selections';
import { Observable } from 'rxjs';
import { RxState } from './rx-state.service';

export type RxStateFeature<State extends object> = (
  rxState: RxState<State>
) => void;

export type RxStateFeatures<State extends object> = RxStateFeature<State>[];

/**
 * @todo: see how to infer generic type from accumulator to accumulatorFn.
 */
export function accumulator<State extends object>(
  accumulatorFn: AccumulationFn
) {
  return (rxState: RxState<State>) => rxState.setAccumulator(accumulatorFn);
}

export function initialState<State extends object>(
  initialState: Partial<State>
) {
  return (rxState: RxState<State>) => rxState.set(initialState);
}

/**
 * @todo: see how to infer type from RxState.connect parameters.
 * Current limitation is that overload signatures are hard to infer.
 */
export function connect<State extends object>(inputOrSlice$: any) {
  return (rxState: RxState<State>) => rxState.connect(inputOrSlice$);
}

export function hold<State extends object>(
  obsOrObsWithSideEffect: Observable<unknown>,
  sideEffectFn?: (arg: unknown) => void
) {
  return (rxState: RxState<State>) =>
    rxState.hold(obsOrObsWithSideEffect, sideEffectFn);
}

export function rxState<State extends object>(
  ...features: RxStateFeatures<State>
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

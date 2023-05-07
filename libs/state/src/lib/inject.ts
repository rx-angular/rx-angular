import { ChangeDetectorRef, ViewRef, inject } from '@angular/core';
import { AccumulationFn } from '@rx-angular/state/selections';
import { Observable } from 'rxjs';
import {
  ProjectStateReducer,
  ProjectValueReducer,
  RxState,
} from './rx-state.service';

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
 * @note:
 */
export function withConnect<State extends object>(
  inputOrSlice$: Observable<Partial<State>>
): RxStateFeature<State>;
export function withConnect<State extends object, Value>(
  inputOrSlice$: Observable<Value>,
  projectFn: ProjectStateReducer<State, Value>
): RxStateFeature<State>;
export function withConnect<State extends object, Key extends keyof State>(
  key: Key,
  slice$: Observable<State[Key]>
): RxStateFeature<State>;
export function withConnect<
  State extends object,
  Key extends keyof State,
  Value
>(
  key: Key,
  input$: Observable<Value>,
  projectSliceFn: ProjectValueReducer<State, Key, Value>
): RxStateFeature<State>;
export function withConnect<
  State extends object,
  Key extends keyof State,
  Value
>(callback: () => Record<Key, Observable<Value>>): RxStateFeature<State>;
/**
 * @internal
 */
export function withConnect<
  State extends object,
  Key extends keyof State,
  Value extends Partial<State>
>(
  keyOrInputOrSliceOrCallback$:
    | Key
    | Observable<Partial<State> | Value>
    | (() => Record<Key, Observable<Value>>),
  projectOrSlices$?:
    | ProjectStateReducer<State, Value>
    | Observable<State[Key] | Value>,
  projectValueFn?: ProjectValueReducer<State, Key, Value>
): RxStateFeature<State> {
  return (rxState: RxState<State>) => {
    if (typeof keyOrInputOrSliceOrCallback$ === 'function') {
      const slices$ = keyOrInputOrSliceOrCallback$();
      Object.keys(slices$).forEach((key) => {
        rxState.connect(key as Key, slices$[key]);
      });
      return;
    }

    rxState.connect(
      keyOrInputOrSliceOrCallback$ as any,
      projectOrSlices$ as any,
      projectValueFn
    );
  };
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

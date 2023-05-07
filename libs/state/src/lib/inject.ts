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

export function withConnect<State extends object>(
  inputOrSlice$: Observable<Partial<State>>
): RxStateFeature<State>;
export function withConnect<State extends object>(
  inputOrSlice$: Observable<Partial<State>>,
  projectFn: ProjectStateReducer<State, Partial<State>>
): RxStateFeature<State>;
export function withConnect<State extends object, Key extends keyof State>(
  key: Key,
  slice$: Observable<State[Key]>
): RxStateFeature<State>;
export function withConnect<State extends object, Key extends keyof State>(
  key: Key,
  input$: Observable<Partial<State>>,
  projectSliceFn: ProjectValueReducer<State, Key, Partial<State>>
): RxStateFeature<State>;
export function withConnect<State extends object, Key extends keyof State>(
  callback: (
    connect: RxState<State>['connect']
  ) =>
    | Observable<Partial<State>>
    | Record<Key, Observable<State[Key] | Partial<State>>>
    | void
): RxStateFeature<State>;
/**
 * @internal
 */
export function withConnect<State extends object, Key extends keyof State>(
  keyOrInputOrSliceOrCallback$:
    | Key
    | Observable<Partial<State>>
    | ((
        connect: RxState<State>['connect']
      ) =>
        | Observable<Partial<State>>
        | Record<Key, Observable<State[Key]>>
        | void),
  projectOrSlices$?:
    | ProjectStateReducer<State, Partial<State>>
    | Observable<State[Key] | Partial<State>>,
  projectValueFn?: ProjectValueReducer<State, Key, Partial<State>>
): RxStateFeature<State> {
  return (rxState: RxState<State>) => {
    if (typeof keyOrInputOrSliceOrCallback$ === 'function') {
      const slices = keyOrInputOrSliceOrCallback$(
        rxState.connect.bind(rxState)
      );
      if (slices instanceof Observable) {
        rxState.connect(slices);
      } else if (slices) {
        Object.keys(slices).forEach((key) => {
          rxState.connect(key as Key, slices[key as Key]);
        });
      }
      return;
    }

    // Notice: disable args type check as workaround for overload resolution issue, no clue how to fix it properly.
    rxState.connect(
      keyOrInputOrSliceOrCallback$ as any,
      projectOrSlices$ as any,
      projectValueFn as any
    );
  };
}

export function withHold<State extends object>(
  obsOrObsWithSideEffectOrCallback:
    | Observable<unknown>
    | ((hold: RxState<State>['hold']) => void),
  sideEffectFn?: (arg: unknown) => void
): RxStateFeature<State> {
  return (rxState: RxState<State>) => {
    if (typeof obsOrObsWithSideEffectOrCallback === 'function') {
      obsOrObsWithSideEffectOrCallback(rxState.hold.bind(rxState));
      return;
    }

    rxState.hold(obsOrObsWithSideEffectOrCallback, sideEffectFn);
  };
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

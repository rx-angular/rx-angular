import { DestroyRef, assertInInjectionContext, inject } from '@angular/core';
import { RxState } from './rx-state.service';

export type RxStateSetupFn<State extends object> = (
  rxState: Pick<RxState<State>, 'connect' | 'set' | 'setAccumulator' | 'hold'>
) => void;

/**
 * @description
 * Functional way to setup state management with RxState. It's a wrapper around RxState that automatically get destroyed.
 *
 * @example
 * ```ts
 * import { rxState } from '@rx-angular/state';
 *
 * Component({})
 * export class FooComponent {
 *  readonly state = rxState<{ count: number }>(({ set }) => set({ count: 0 }));
 * }
 * ```
 *
 * @param setupFn
 * @returns RxState instance
 *
 *
 *
 * @docsCategory RxState
 * @docsPage RxState
 *
 */
export function rxState<State extends object>(
  setupFn?: RxStateSetupFn<State>
): RxState<State> {
  assertInInjectionContext(rxState);

  const state = new RxState<State>();
  const destroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => state.ngOnDestroy());

  setupFn(state);

  return state;
}

import { assertInInjectionContext, DestroyRef, inject } from '@angular/core';
import { RxState as LegacyState } from './rx-state.service';

export type RxState<T extends object> = Pick<
  LegacyState<T>,
  | 'get'
  | 'select'
  | 'connect'
  | 'set'
  | '$'
  | 'setAccumulator'
  | 'signal'
  | 'computed'
  | 'computedFrom'
  | 'asReadOnly'
>;

export type RxStateSetupFn<State extends object> = (
  rxState: Pick<
    RxState<State>,
    'connect' | 'set' | 'get' | 'select' | 'setAccumulator'
  >,
) => void;

/**
 * @description
 * Functional way to setup state management with RxState. It's a wrapper around RxState that automatically get
 *   destroyed.
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
  setupFn?: RxStateSetupFn<State>,
): RxState<State> {
  assertInInjectionContext(rxState);

  const legacyState = new LegacyState<State>();
  const destroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => legacyState.ngOnDestroy());

  const state: RxState<State> = {
    get: legacyState.get.bind(legacyState),
    set: legacyState.set.bind(legacyState),
    connect: legacyState.connect.bind(legacyState),
    select: legacyState.select.bind(legacyState),
    signal: legacyState.signal.bind(legacyState),
    computed: legacyState.computed.bind(legacyState),
    computedFrom: legacyState.computedFrom.bind(legacyState),
    $: legacyState.$,
    setAccumulator: legacyState.setAccumulator.bind(legacyState),
    asReadOnly: legacyState.asReadOnly.bind(legacyState),
  };

  setupFn?.(state);

  return state;
}

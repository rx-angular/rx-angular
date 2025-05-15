import {
  assertInInjectionContext,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
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

export type RxStateOptions = {
  injector?: Injector;
};

function getInjectorFromOptions<
  SetupFn extends Function,
  Options extends { injector?: Injector },
>(setupFnOrOptions?: SetupFn | Options, options?: Options) {
  if (options?.injector) {
    return options.injector;
  }
  if (setupFnOrOptions && typeof setupFnOrOptions !== 'function') {
    return setupFnOrOptions.injector;
  }
  return undefined;
}

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
export function rxState<State extends object>(): RxState<State>;
export function rxState<State extends object>(
  setupFn: RxStateSetupFn<State>,
): RxState<State>;
export function rxState<State extends object>(
  options: RxStateOptions,
): RxState<State>;
export function rxState<State extends object>(
  setupFn: RxStateSetupFn<State>,
  options: RxStateOptions,
): RxState<State>;
export function rxState<State extends object>(
  setupFnOrOptions?: RxStateSetupFn<State> | RxStateOptions,
  options?: RxStateOptions,
): RxState<State> {
  const injectorFromOptions = getInjectorFromOptions(setupFnOrOptions, options);
  if (!injectorFromOptions) {
    assertInInjectionContext(rxState);
  }

  const injector = injectorFromOptions ?? inject(Injector);

  return runInInjectionContext(injector, () => {
    const legacyState = new LegacyState<State>();

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

    if (setupFnOrOptions && typeof setupFnOrOptions === 'function') {
      setupFnOrOptions(state);
    }

    return state;
  });
}

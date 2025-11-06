import { InjectionToken, Provider } from '@angular/core';
import { RX_CONCURRENT_STRATEGIES } from './concurrent-strategies';
import {
  RxCustomStrategyCredentials,
  RxDefaultStrategyNames,
  RxStrategyNames,
} from './model';
import { RX_NATIVE_STRATEGIES } from './native-strategies';

export interface RxRenderStrategiesConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
  /**
   *  @deprecated This flag will be dropped soon, as it is no longer required when using signal based view & content queries
   */
  parent?: boolean;
}

export const RX_RENDER_STRATEGIES_CONFIG = new InjectionToken<
  RxRenderStrategiesConfig<string>
>('rxa-render-strategies-config');

export const RX_RENDER_STRATEGIES_DEFAULTS: Required<
  RxRenderStrategiesConfig<RxDefaultStrategyNames>
> = {
  primaryStrategy: 'normal',
  customStrategies: {
    ...RX_NATIVE_STRATEGIES,
    ...RX_CONCURRENT_STRATEGIES,
  },
  patchZone: true,
  parent: false,
} as const;

export function mergeDefaultConfig<T extends string>(
  cfg?: RxRenderStrategiesConfig<T>,
): Required<RxRenderStrategiesConfig<T | RxDefaultStrategyNames>> {
  const custom: RxRenderStrategiesConfig<T> = cfg
    ? cfg
    : ({ customStrategies: {} } as any);
  return {
    ...RX_RENDER_STRATEGIES_DEFAULTS,
    ...custom,
    customStrategies: {
      ...custom.customStrategies,
      ...RX_RENDER_STRATEGIES_DEFAULTS.customStrategies,
    },
  };
}

/**
 * @description
 * Can be used to set the default render strategy or create custom render strategies.
 *
 * With this function you can customize the behavior of:
 * - `rxLet` directive
 * - `rxFor` directive
 * - `rxIf` directive
 * - `rxVirtualFor` directive
 * - `rxVirtualView` directive
 * - `RxStrategyProvider` service.
 *
 * @example
 * import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
 *
 * const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRxRenderStrategies({
 *       primaryStrategy: 'sync',
 *       customStrategies: {
 *         sync: {
 *           name: 'sync',
 *           work: (cdRef) => { cdRef.detectChanges(); },
 *           behavior: ({ work }) => (o$) => o$.pipe(tap(() => work()))
 *          },
 *         asap: {
 *           name: 'asap',
 *           work: (cdRef) => { cdRef.detectChanges(); },
 *           behavior: ({ work }) => (o$) => o$.pipe(delay(0, asapScheduler), tap(() => work()))
 *        },
 *     }),
 *   ],
 * };
 *
 * @param config - The configuration object.
 * @returns A provider that can be used to set the default render strategy or create custom render strategies.
 */
export function provideRxRenderStrategies(
  config:
    | RxRenderStrategiesConfig<string>
    | (() => RxRenderStrategiesConfig<string>),
): Provider {
  if (typeof config === 'function') {
    return {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useFactory: () => mergeDefaultConfig(config()),
    } satisfies Provider;
  }

  return {
    provide: RX_RENDER_STRATEGIES_CONFIG,
    useValue: mergeDefaultConfig(config),
  } satisfies Provider;
}

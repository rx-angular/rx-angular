import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware';
import { createNoopStrategy } from './noop.strategy';
import { createNativeStrategy } from './native.strategy';
import { getLocalStrategies } from './local.strategy';
import { getGlobalStrategies } from './global.strategy';

export const DEFAULT_STRATEGY_NAME = 'local';

/**
 * @description
 * This method returns the provided strategies as name:strategy pair
 *
 * Built-in Strategies:
 *
 * | Name      | Zone Agnostic | Render Method   | Coalescing    | Scheduling                 |
 * | --------- | --------------| --------------- | ------------- | -------------------------- |
 * | `local`   | ✔             | `detectChanges` | ✔             | `requestAnimationFrame`   |
 * | `global`  | ✔             | `ɵmarkDirty`    | ❌             | ❌                        |
 * | `detach`  | ✔             | `detectChanges` | ✔             | `requestAnimationFrame`   |
 * | `noop`    | ✔             | ❌              | ❌             | ❌                        |
 * | `native`  | ❌             | `markForCheck` | ❌             | ❌                        |
 *
 * @param config
 */
export function getStrategies(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    noop: createNoopStrategy(),
    native: createNativeStrategy(config),
    ...getGlobalStrategies(config),
    ...getLocalStrategies(config),
  };
}

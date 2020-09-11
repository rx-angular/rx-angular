import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware';
import { createNoopStrategy } from './noop.strategy';
import { createNativeStrategy } from './native.strategy';
import { getLocalStrategies } from './local.strategy';
import { getGlobalStrategies } from './global.strategy';
import { getDetachStrategies } from './detach-strategy';

export const DEFAULT_STRATEGY_NAME = 'local';

/**
 * @description
 * This method returns the provided strategies as name:strategy pair
 *
 * Built-in Strategies:
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing         | Scheduling                 |
 * | --------- | --------------| ----------------- | ------------------ | -------------------------- |
 * | `local`   | ✔             | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame`   |
 * | `global`  | ✔             | ⮁ `ɵmarkDirty`    | ✔ RootContext     | `requestAnimationFrame`   |
 * | `detach`  | ✔             | ⭭ `detectChanges` | ✔ ComponentContext | `requestAnimationFrame`   |
 * | `noop`    | ✔             | - `noop`          | ❌                 | ❌                        |
 * | `native`  | ❌             | ⮁ `markForCheck` | ✔ RootContext     | `requestAnimationFrame`  |
 *
 * @param config
 */
export function getStrategies(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    ...getLocalStrategies(config),
    ...getGlobalStrategies(config),
    ...getDetachStrategies(config),
    noop: createNoopStrategy(config),
    native: createNativeStrategy(config)
  };
}

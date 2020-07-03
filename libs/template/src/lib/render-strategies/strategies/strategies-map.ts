import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware/interfaces';
import { createNoopStrategy } from './noop.strategy';
import { createNativeStrategy } from './native.strategy';
import { getLocalStrategies } from './local.strategy';
import { getGlobalStrategies } from './global.strategy';

export const DEFAULT_STRATEGY_NAME = 'local';

export function getStrategies<T>(
  config: RenderStrategyFactoryConfig<T>
): { [strategy: string]: RenderStrategy } {
  return {
    noop: createNoopStrategy(),
    native: createNativeStrategy(config),
    ...getGlobalStrategies(config),
    ...getLocalStrategies(config)
  };
}

/**
 * Strategies
 *
 * - VE/I - Options for ViewEngine / Ivy
 * - mFC - `cdRef.markForCheck`
 * - dC - `cdRef.detectChanges`
 * - ɵMD - `ɵmarkDirty`
 * - ɵDC - `ɵdetectChanges`
 * - LV  - `LView`
 * - C - `Component`
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------------- | ---------------- |
 * | `noop`      | ❌/❌          | no rendering        | ❌               |
 * | `native`    | ❌/❌          | mFC / mFC           | ❌               |
 * | `global`    | ❌/✔ ️       | mFC  / ɵMD           | ❌               |
 * | `local`     | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
 * | `ɵglobal`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `ɵlocal`    | ✔/✔ ️       | dC / ɵDC             | ✔ ️ + C/ LV     |
 * | `ɵdetach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 *
 */

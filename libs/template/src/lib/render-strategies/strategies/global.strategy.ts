import { ɵmarkDirty as markDirty } from '@angular/core';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware/interfaces';

export function getGlobalStrategies<T>(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy<T> } {
  return {
    global: createGlobalStrategy<T>(config)
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
 * | `global`   | ❌/✔ ️        | mFC  / ɵMD          | ❌               |
 *
 */

/**
 *
 * Global Strategy
 *
 * This strategy is rendering the application root and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `global`   | ❌/✔️       | mFC / ɵMD           | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createGlobalStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const renderMethod = () => markDirty((config.cdRef as any).context);

  return {
    name: 'global',
    renderMethod,
    behavior: o => o,
    scheduleCD: () => renderMethod()
  };
}

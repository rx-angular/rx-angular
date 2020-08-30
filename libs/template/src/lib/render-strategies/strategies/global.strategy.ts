import { ɵmarkDirty as markDirty } from '@angular/core';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware';

export function getGlobalStrategies(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    global: createGlobalStrategy(config),
  };
}

/**
 *
 * @description
 *
 * Global Strategies
 *
 * This strategy leverages Angular's internal [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) render method.
 * It acts identical to [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) but works also zone-less.
 * `markDirty` in comparison to `markForCheck` also calls [`scheduleTick`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1863) which is the reason why it also works in zone-less environments.
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing      | Scheduling       |
 * | --------- | --------------| ----------------- | --------------- | ---------------- |
 * | `global`  | ✔             | ⮁ `ɵmarkDirty`   | ✔ `RootContext` | [`animationFrame`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/util/misc_utils.ts#L39)   |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return { RenderStrategy } - The calculated strategy
 *
 */
export function createGlobalStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const renderMethod = () => markDirty((config.cdRef as any).context);

  return {
    name: 'global',
    detectChanges: renderMethod,
    rxScheduleCD: (o) => o,
    scheduleCD: () => {
      renderMethod();
      return new AbortController();
    },
  };
}

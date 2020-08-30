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
 * This strategy leverages Angular's internal `ɵmarkDirty` render method.
 * This means it acts identical to `ChangeDetectorRef#markForCheck` but works also zone-less.
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing    | Scheduling |
 * | --------- | --------------| ----------------- | ------------- | ---------- |
 * | `global`  | ✔             | ⮁ `ɵmarkDirty`   | ❌            | ❌         |
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

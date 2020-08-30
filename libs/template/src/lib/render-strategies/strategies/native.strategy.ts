import { RenderStrategy, RenderStrategyFactoryConfig } from '../../core';
import { tap } from 'rxjs/operators';
import { ɵmarkDirty as markDirty } from '@angular/core';

/**
 * @description
 *
 * Native Strategy
 *
 * @description
 *
 * This strategy mirrors Angular's built-in `async` pipe.
 * This means for every emitted value `ChangeDetectorRef#markForCheck` is called.
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing    | Scheduling |
 * | --------- | --------------| ----------------- | ------------- | ---------- |
 * | `native`  | ❌             | ⮁ `markForCheck` | ❌             | ❌         |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createNativeStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  return {
    name: 'native',
    detectChanges: () => config.cdRef.markForCheck(),
    rxScheduleCD: (o) => o.pipe(tap(() => markDirty(component))),
    scheduleCD: () => {
      markDirty(component);
      return new AbortController();
    },
  };
}

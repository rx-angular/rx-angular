import { RenderStrategy, RenderStrategyFactoryConfig } from '../../core';
import { tap } from 'rxjs/operators';
import { ɵmarkDirty as markDirty } from '@angular/core';

/**
 * Native Strategy
 * @description
 *
 * - mFC - `cdRef.markForCheck`
 *
 * This strategy mirrors Angular's built-in `async` pipe.
 * This means for every emitted value `ChangeDetectorRef#markForCheck` is called.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `native`    | ❌       | mFC           | ❌                | ❌         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createNativeStrategy<T>(
  config: RenderStrategyFactoryConfig<T>
): RenderStrategy {
  return {
    name: 'native',
    detectChanges: () => config.cdRef.markForCheck(),
    rxScheduleCD: o => o.pipe(tap(() => markDirty(config.component))),
    scheduleCD: () => {
      markDirty(config.component);
      return new AbortController();
    }
  };
}

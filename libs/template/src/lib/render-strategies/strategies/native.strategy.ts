import { RenderStrategy, RenderStrategyFactoryConfig } from '../../core';
import { tap } from 'rxjs/operators';

/**
 * Native Strategy
 * @description
 *
 * This strategy mirrors Angular's built-in `async` pipe.
 * This means for every emitted value `ChangeDetectorRef#markForCheck` is called.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `native`    | ❌/❌         | mFC / mFC           | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createNativeStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  return {
    name: 'native',
    detectChanges: config.cdRef.markForCheck,
    rxScheduleCD: o => o.pipe(tap(config.cdRef.markForCheck)),
    scheduleCD: () => {
      config.cdRef.markForCheck();
      return new AbortController();
    }
  };
}

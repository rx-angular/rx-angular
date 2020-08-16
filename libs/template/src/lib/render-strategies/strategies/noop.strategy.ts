import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware/interfaces';

/**
 * Noop Strategy
 *
 * This strategy is does nothing. It serves for debugging only
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `noop`      | ❌       | ❌             | ❌                | ❌         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createNoopStrategy(): RenderStrategy {
  return {
    name: 'noop',
    detectChanges: () => {},
    rxScheduleCD: (o) => o,
    scheduleCD: () => new AbortController(),
  };
}

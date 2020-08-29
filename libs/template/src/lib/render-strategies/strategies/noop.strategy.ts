import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware/interfaces';

/**
 * @description
 *
 * Noop Strategy
 *
 * This strategy is does nothing. It serves several performance features
 * as well as a helpful tool when migrating and for debugging.
 *
 * | Name      | Zone Agnostic | Render Method   | Coalescing    | Scheduling |
 * | --------- | --------------| --------------- | ------------- | ---------- |
 * | `noop`    | ✔             |❌               | ❌             | ❌         |
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

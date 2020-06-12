import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware/interfaces';

/**
 * Noop Strategy
 *
 * This strategy is does nothing. It serves for debugging only
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `noop`      | ❌/❌         | no rendering        | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createNoopStrategy<T>(): RenderStrategy<T> {
  return {
    name: 'noop',
    renderMethod: () => {},
    behavior: o => o,
    scheduleCD: () => {}
  };
}

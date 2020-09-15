import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware/interfaces';

/**
 * @description
 *
 * Noop Strategy
 *
 * The no-operation strategy does nothing.
 * It can be a useful tool for performance improvements as well as debugging
 * The [`[viewport-prio]`](https://github.com/rx-angular/rx-angular/blob/ef99804c1b07aeb96763cacca6afad7bbdab03b1/libs/template/src/lib/experimental/viewport-prio/viewport-prio.directive.ts) directive use it to limit renderings to only visible components:
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing    | Scheduling |
 * | --------- | --------------| ----------------- | ------------- | ---------- |
 * | `noop`    | ✔             | - `noop`          | ❌             | ❌         |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createNoopStrategy(config: RenderStrategyFactoryConfig): RenderStrategy {
  return {
    name: 'noop',
    detectChanges: () => {},
    rxScheduleCD: (o) => o,
    scheduleCD: () => new AbortController(),
  };
}

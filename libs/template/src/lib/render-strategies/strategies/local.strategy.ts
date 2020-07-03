import { coalesceAndSchedule } from '../static';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { priorityTickMap } from '../rxjs/scheduling/priority-tick-map';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware/interfaces';
import { coalesceWith } from '../rxjs/operators/coalesceWith';
import { ɵdetectChanges as detectChanges } from '@angular/core';
import { promiseTick } from '../rxjs/scheduling';
import { createNoopStrategy } from './noop.strategy';
import { createNativeStrategy } from './native.strategy';
import { getGlobalStrategies } from './global.strategy';

const promiseDurationSelector = promiseTick();

export function getExperimentalLocalStrategies<T>(
  config: RenderStrategyFactoryConfig<T>
): { [strategy: string]: RenderStrategy } {
  return {
    ...getLocalStrategies(config)
  };
}

/**
 * Experimental Local Strategies
 *
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - det - `cdRef.detach`
 * - ret - `cdRef.reattach`
 * - Pr - `Promise`
 * - aF - `requestAnimationFrame`
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `local`     | ✔        | ɵDC           | C + Pr           | aF         | ❌      |
 * | `detach`    | ✔ ️     | ret,ɵDC, det  | C + Pr           | aF         | ❌      |
 *
 */

export function getLocalStrategies<T>(
  config: RenderStrategyFactoryConfig<T>
): { [strategy: string]: RenderStrategy } {
  return {
    local: createLocalStrategy<T>(config),
    detach: createDetachStrategy(config)
  };
}

/**
 *  Local Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `local`     | ✔        | ɵDC           | C + Pr           | aF         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createLocalStrategy<T>(
  config: RenderStrategyFactoryConfig<T>
): RenderStrategy {
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(config.component);
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, config.component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, config.component);

  return {
    name: 'local',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

/**
 *  Detach Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `detach`    | ✔ ️     | ret,ɵDC, det  | C + Pr           | aF         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createDetachStrategy<T>(
  config: RenderStrategyFactoryConfig<T>
): RenderStrategy {
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    config.cdRef.reattach();
    detectChanges(config.component);
    config.cdRef.detach();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, config.component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, config.component);

  return {
    name: 'detach',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

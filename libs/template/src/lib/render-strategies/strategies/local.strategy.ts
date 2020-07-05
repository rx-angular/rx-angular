import { coalesceAndSchedule } from '../static';
import { SchedulingPriority, priorityTickMap } from '../rxjs/scheduling';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware';
import { coalesceWith } from '../rxjs/operators';
import { promiseTick } from '../rxjs/scheduling';
import { ɵdetectChanges as detectChanges } from '@angular/core';

const promiseDurationSelector = promiseTick();

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
  config: RenderStrategyFactoryConfig
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
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

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
export function createDetachStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    config.cdRef.reattach();
    detectChanges(component);
    config.cdRef.detach();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'detach',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

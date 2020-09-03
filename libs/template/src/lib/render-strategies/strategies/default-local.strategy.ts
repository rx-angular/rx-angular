import { coalesceAndSchedule } from '../static';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { priorityTickMap } from '../rxjs/scheduling/priority-tick-map';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware';
import { coalesceWith } from '../rxjs/operators/coalesceWith';
import { promiseTick } from '../rxjs/scheduling/promiseTick';
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

export function getLocalDefaultStrategies<T>(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    defaultLocal: createLocalDefaultStrategy<T>(config),
  };
}

/**
 * @description
 *
 * Local Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) or [`ɵmarkDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/change_detection.ts#L36) has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events** by a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * This context could be the Component instance or a ViewContextRef,
 * both accessed over the context over `ChangeDetectorRef#context`.
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing         | Scheduling                 |
 * | --------- | --------------| ----------------- | ------------------ | -------------------------- |
 * | `local`   | ✔             | 🠗 `detectChanges` | ✔ ComponentContext | `requestAnimationFrame`   |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createLocalDefaultStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = (o) =>
    o.pipe(
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    renderMethod() as any;

  return {
    name: 'defaultLocal',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

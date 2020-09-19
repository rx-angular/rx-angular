import { coalesceAndSchedule } from '../../../render-strategies/static';
import {
  SchedulingPriority,
  priorityTickMap,
} from '../../../render-strategies/rxjs/scheduling';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../../core/render-aware';
import { coalesceWith } from '../../../render-strategies/rxjs/operators';
import { ɵdetectChanges as detectChanges } from '@angular/core';
import { promiseTick } from '../../../render-strategies/rxjs/scheduling';

const promiseDurationSelector = promiseTick();

/**
 * Strategies
 *
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - aF - `requestAnimationFrame`
 * - uV - `userVisible`
 * - uB - `userBlocking`
 * - bg - `background`
 * - iC - `idleCallback`
 *
 * | Name                       | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |--------------------------- | ---------| --------------| ---------------- | ---------- |-------- |
 * | `localCoalesce`            | ✔        | ɵDC           | C + Pr          | ❌          | ❌       |
 * | `localCoalesceAndSchedule` | ✔        | ɵDC           | C + Pr          | aF         | ❌       |
 * | `ɵuserVisible`              | ✔        | ɵDC           | C + Pr          | uV         | ❌       |
 * | `ɵuserBlocking`             | ✔        | ɵDC           | C + Pr          | uB         | ❌       |
 * | `ɵbackground`               | ✔        | ɵDC           | C + Pr          | bg         | ❌       |
 * | `idleCallback`             | ✔        | ɵDC           | C + Pr          | iC         | ❌       |
 *
 */

export function getLocalStrategies(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    localCoalesce: createLocalCoalesceStrategy(config),
    localCoalesceAndSchedule: createLocalCoalesceAndScheduleStrategy(config),
    userVisible: createUserVisibleStrategy(config),
    userBlocking: createUserBlockingStrategy(config),
    background: createBackgroundStrategy(config),
    idleCallback: createIdleCallbackStrategy(config),
  };
}

export function createLocalCoalesceStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = (o) =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'localCoalesce',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

export function createLocalCoalesceAndScheduleStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = (o) =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'localCoalesceAndSchedule',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

/**
 *  PostTask - Priority UserVisible Strategy
 *
 */
export function createUserVisibleStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.background;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = (o) =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'userVisible',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

/**
 *  PostTask - Priority UserBlocking Strategy
 *
 */
export function createUserBlockingStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.idleCallback;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = (o) =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'userBlocking',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

/**
 *  PostTask - Priority Background Strategy
 *
 */
export function createBackgroundStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.background;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = (o) =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'background',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

/**
 *  IdleCallback Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges is used the coalescing described in `ɵlocal` is implemented here.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `idleCall`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createIdleCallbackStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.idleCallback;
  const tick = priorityTickMap[priority];
  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = (o) =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap((v) => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'idleCallback',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

import { ɵdetectChanges as detectChanges } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../../core/render-aware';
import { coalesceWith } from '../../../render-strategies/rxjs/operators';
import {
  priorityTickMap,
  promiseTick,
  SchedulingPriority,
  TaskPriority
} from '../../../render-strategies/rxjs/scheduling';
import { scheduleOnGlobalTick } from '../../../render-strategies/rxjs/scheduling/globalAnimationFrameTick';
import { coalesceAndSchedule } from '../../../render-strategies/static';

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
 * | Name                       | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked + Queued |
 * |--------------------------- | ---------| --------------| ---------------- | ---------- |----------------- |
 * | `localCoalesce`            | ✔        | ɵDC           | C + Pr          | ❌          | ❌                 |
 * | `localCoalesceAndSchedule` | ✔        | ɵDC           | C + Pr          | aF         | ❌                 |
 * | `chunk`                    | ✔        | ɵDC           | C + Pr          | aF         | ✔ + blocking      |
 * | `blocking`                 | ✔        | ɵDC           | C + Pr          | aF         | ❌ + chunk         |
 * | `ɵuserVisible`              | ✔        | ɵDC           | C + Pr          | uV         | ❌                |
 * | `ɵuserBlocking`             | ✔        | ɵDC           | C + Pr          | uB         | ❌                |
 * | `ɵbackground`               | ✔        | ɵDC           | C + Pr          | bg         | ❌                |
 * | `idleCallback`             | ✔        | ɵDC           | C + Pr          | iC         | ❌                 |
 *
 */

export function getExperimentalLocalStrategies(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    localCoalesce: createLocalCoalesceStrategy(config),
    localCoalesceAndSchedule: createLocalCoalesceAndScheduleStrategy(config),
    userVisible: createUserVisibleStrategy(config),
    userBlocking: createUserBlockingStrategy(config),
    background: createBackgroundStrategy(config),
    idleCallback: createIdleCallbackStrategy(config),
    chunk: createChunkStrategy(config),
    blocking: createBlockingStrategy(config)
  };
}

export function createBlockingStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const taskPriority = TaskPriority.blocking;

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, scope),
      scheduleOnGlobalTick(() => ({
        priority: taskPriority,
        work: renderMethod
      }))
    );
  // @TODO: implement static
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'chunkedBlocking',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

export function createChunkStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const scope = (config.cdRef as any).context;
  const taskPriority = TaskPriority.smooth;
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;

  const renderMethod = () => {
    detectChanges(component);
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      scheduleOnGlobalTick(() => ({
        priority: taskPriority,
        work: renderMethod
      }))
    );
  // @TODO: implement static
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'chunked',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'localCoalesce',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'localCoalesceAndSchedule',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'userVisible',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'userBlocking',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'background',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
 * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
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
  const behavior = o =>
    o.pipe(
      coalesceWith(promiseDurationSelector, component),
      switchMap(v => tick.pipe(map(() => v))),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'idleCallback',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

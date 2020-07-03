import { coalesceAndSchedule, staticCoalesce } from '../static';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-resolved-promise';
import { from } from 'rxjs';
import { getScheduler } from '../rxjs/scheduling/priority-tick-map';
import { observeOn, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware/interfaces';
import { coalesceWith } from '../rxjs/operators/coalesceWith';
import { PostTaskSchedulerPriority } from '../rxjs/scheduling/postTask';
import { postTaskTick } from '../rxjs/scheduling/postTaskTick';
import { idleCallbackTick } from '../rxjs/scheduling/idleCallbackTick';

/**
 * Strategies
 *
 * - VE/I - Options for ViewEngine / Ivy
 * - mFC - `cdRef.markForCheck`
 * - dC - `cdRef.detectChanges`
 * - ɵMD - `ɵmarkDirty`
 * - ɵDC - `ɵdetectChanges`
 * - LV  - `LView`
 * - C - `Component`
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------------- | ---------------- |
 * | `local`    | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
 * | `detach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `postTask` | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `idleCallback` | ❌/✔ ️   | mFC  / ɵMD          | ❌               |
 *
 */

export function getLocalStrategies<T>(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    local: createLocalStrategy<T>(config),
    localCoalesce: createLocalCoalesceStrategy<T>(config),
    localCoalesceAndSchedule: createLocalCoalesceAndScheduleStrategy<T>(config),
    localNative: createLocalNativeStrategy<T>(config),
    detach: createDetachStrategy(config),
    userVisible: createUserVisibleStrategy(config),
    userBlocking: createUserBlockingStrategy(config),
    background: createBackgroundStrategy(config),
    idleCallback: createIdleCallbackStrategy(config)
  };
}

export function createLocalNativeStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o => o.pipe(tap(renderMethod));
  const scheduleCD = () => {
    renderMethod();
    return new AbortController();
  };

  return {
    name: 'localNative',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
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
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `ɵlocal`    | ✔️/✔️    | dC / dC             | ✔️ + C         |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createLocalStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'local',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

export function createLocalCoalesceStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'localCoalesce',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

export function createLocalCoalesceAndScheduleStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'localCoalesceAndSchedule',
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
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createDetachStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.reattach();
    config.cdRef.detectChanges();
    config.cdRef.detach();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'detach',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

/**
 *  PostTask - Priority UserVisible Strategy
 *
 */
export function createUserVisibleStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible,
    delay: 0
  });

  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.background;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

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
export function createUserBlockingStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible,
    delay: 0
  });
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.background;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    staticCoalesce(renderMethod, durationSelector, scope);

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
export function createBackgroundStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = postTaskTick({
    priority: PostTaskSchedulerPriority.userVisible,
    delay: 0
  });
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.background;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () =>
    staticCoalesce(renderMethod, durationSelector, scope);

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
export function createIdleCallbackStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const durationSelector = idleCallbackTick();
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.idleCallback;
  const scheduler = getScheduler(priority);
  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(
      coalesceWith(durationSelector, scope),
      observeOn(scheduler),
      tap(renderMethod)
    );
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'idleCallback',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD
  };
}

import { coalesceAndSchedule } from '../static';
import { SchedulingPriority } from '../core/interfaces';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-promise';
import { from } from 'rxjs';
import { getScheduler } from '../core/priorities-map';
import { observeOn, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../../core/render-aware/interfaces';
import { coalesceWith } from '../rxjs/operators/coalesceWith';

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
 * | `local`     | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
 * | `ɵlocal`    | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
 * | `ɵdetach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `ɵpostTask` | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `ɵidleCallback` | ❌/✔ ️   | mFC  / ɵMD          | ❌               |
 *
 */

export function getLocalStrategies<T>(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy<T> } {
  return {
    local: createLocalStrategy<T>(config),
    ɵlocal: createɵLocalStrategy<T>(config),
    ɵdetach: createɵDetachStrategy(config),
    ɵpostTask: createɵPostTaskStrategy(config)
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
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has,
 * this strategy may have negative performance impacts depending
 * on the usage and the related template structure.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `local`     | ✔️/✔️    | dC / dC             | ✔️ + C/C       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createLocalStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const renderMethod = () => config.cdRef.detectChanges();
  return {
    name: 'local',
    renderMethod,
    behavior: o => o,
    scheduleCD: () => renderMethod
  };
}

/**
 *  ɵLocal Strategy
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
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵLocalStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(coalesceWith(durationSelector, scope), tap(console.log));
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'ɵlocal',
    renderMethod,
    behavior,
    scheduleCD
  };
}

/**
 *  ɵDetach Strategy
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
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵDetachStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
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
    o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'ɵdetach',
    renderMethod,
    behavior,
    scheduleCD
  };
}

/**
 *  ɵpostTaks Strategy
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
 * | `ɵdetach`   | ✔️/✔️    | dC / ɵDC            | ✔️ + C/ LV     |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵPostTaskStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'ɵpostTask',
    renderMethod,
    behavior,
    scheduleCD
  };
}

/**
 *  ɵIdleCallback Strategy
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
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵIdleCallbackStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = (config.cdRef as any).context;
  const priority = SchedulingPriority.idleCallback;
  const scheduler = getScheduler(priority);

  const renderMethod = () => {
    config.cdRef.detectChanges();
  };
  const behavior = o =>
    o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
  const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);

  return {
    name: 'ɵIdleCallback',
    renderMethod,
    behavior,
    scheduleCD
  };
}

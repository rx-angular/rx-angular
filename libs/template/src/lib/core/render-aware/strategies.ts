import { coalesce, CoalesceConfig } from '../rxjs/operators';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { ChangeDetectorRef, ɵmarkDirty as markDirty } from '@angular/core';
import { getUnpatchedResolvedPromise, isViewEngineIvy } from '../utils';

export interface StrategySelection<U> {
  [strategy: string]: RenderStrategy<U>;
}

export interface RenderStrategyFactoryConfig {
  cdRef: ChangeDetectorRef;
}

export interface RenderStrategy<T> {
  behaviour: () => MonoTypeOperatorFunction<T>;
  render: () => void;
  name: string;
}

export const DEFAULT_STRATEGY_NAME = 'native';
export const IS_VIEW_ENGINE_IVY = isViewEngineIvy();

export function getStrategies<T>(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy<T> } {
  return {
    noop: createNoopStrategy<T>(),
    native: createNativeStrategy<T>(config),
    local: createLocalStrategy<T>(config),
    global: createGlobalStrategy<T>(config),
    ɵlocal: createɵLocalStrategy<T>(config),
    ɵglobal: createɵGlobalStrategy<T>(config),
    ɵdetach: createɵDetachStrategy<T>(config),
  };
}

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
 * | `noop`      | ❌/❌          | no rendering        | ❌               |
 * | `native`    | ❌/❌          | mFC / mFC           | ❌               |
 * | `global`    | ❌/✔ ️       | mFC  / ɵMD           | ❌               |
 * | `local`     | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
 * | `ɵglobal`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `ɵlocal`    | ✔/✔ ️       | dC / ɵDC             | ✔ ️ + C/ LV     |
 * | `ɵdetach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 *
 */

/**
 * Native Strategy
 * @description
 *
 * This strategy mirrors Angular's built-in `async` pipe.
 * This means for every emitted value `ChangeDetectorRef#markForCheck` is called.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `native`    | ❌/❌         | mFC / mFC           | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createNativeStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  return {
    render: (): void => config.cdRef.markForCheck(),
    behaviour: () => (o) => o,
    name: 'native',
  };
}

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
    render: (): void => {},
    behaviour: () => (o) => o,
    name: 'noop',
  };
}

/**
 *
 * Global Strategy
 *
 * This strategy is rendering the application root and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `global`    | ❌/❌️         | mFC / mFC         | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createGlobalStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  function render() {
    config.cdRef.markForCheck();
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => o$;
  }

  return {
    behaviour,
    render,
    name: 'global',
  };
}

/**
 *
 * ɵGlobal Strategy
 *
 * This strategy is rendering the application root and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `ɵglobal`   | ❌/✔️       | mFC / ɵMD           | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵGlobalStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  function render() {
    if (!IS_VIEW_ENGINE_IVY) {
      config.cdRef.markForCheck();
    } else {
      markDirty((config.cdRef as any).context);
    }
  }

  const behaviour = () => (o$: Observable<T>): Observable<T> => o$;

  return {
    behaviour,
    render,
    name: 'ɵglobal',
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
  function render() {
    // issue #68
    config.cdRef.detectChanges();
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => {
      return o$;
    };
  }

  return {
    behaviour,
    render,
    name: 'local',
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
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick,
 * that would cause a re-render and execute **re-rendering only once**.
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
  const durationSelector = () => getUnpatchedResolvedPromise();
  const coalesceConfig: CoalesceConfig = {
    // issue #69
    // @Notice Usage of internal method
    context: (config.cdRef as any).context,
  };

  function render() {
    // issue #68
    config.cdRef.detectChanges();
  }

  const behaviour = () => (o$: Observable<T>): Observable<T> => {
    return o$.pipe(coalesce(durationSelector, coalesceConfig));
  };

  return {
    behaviour,
    render,
    name: 'ɵlocal',
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
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick,
 * that would cause a re-render and execute **re-rendering only once**.
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
  const durationSelector = () => getUnpatchedResolvedPromise();
  const coalesceConfig: CoalesceConfig = {
    // issue #69
    // @Notice Usage of internal method
    context: (config.cdRef as any).context,
  };

  function render() {
    config.cdRef.reattach();
    // issue #68
    config.cdRef.detectChanges();
    config.cdRef.detach();
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => {
      return o$.pipe(coalesce(durationSelector, coalesceConfig));
    };
  }

  return {
    behaviour,
    render,
    name: 'ɵdetach',
  };
}

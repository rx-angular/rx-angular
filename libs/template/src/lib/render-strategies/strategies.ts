import { defer, from, Observable } from 'rxjs';
import { ɵmarkDirty as markDirty } from '@angular/core';
import { getUnpatchedResolvedPromise } from '../core/utils';
import { schedule } from './scheduling/schedule';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig
} from '../core/render-aware/interfaces';
import { coalesceWith } from './operator/coalesceWith';

declare const scheduler;

export const DEFAULT_STRATEGY_NAME = 'native';

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
    ɵpostTask: createɵPostTaskStrategy<T>(config)
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
  function render() {
    config.cdRef.markForCheck();
  }

  return {
    renderStatic: render,
    render,
    behaviour: () => o => o,
    name: 'native'
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
    renderStatic: (): void => {},
    render: (): void => {},
    behaviour: () => o => o,
    name: 'noop'
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
    renderStatic: render,
    behaviour,
    render,
    name: 'global'
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
    markDirty((config.cdRef as any).context);
  }

  const behaviour = () => (o$: Observable<T>): Observable<T> => o$;

  return {
    renderStatic: render,
    behaviour,
    render,
    name: 'ɵglobal'
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
    config.cdRef.detectChanges();
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => {
      return o$;
    };
  }

  return {
    renderStatic: render,
    behaviour,
    render,
    name: 'local'
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
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = getContext(config.cdRef as any);

  function render() {
    config.cdRef.detectChanges();
  }

  function renderStatic() {
    // schedule(durationSelector, scope, render);
  }

  const behaviour = () => (o$: Observable<T>): Observable<T> => {
    return o$.pipe(coalesceWith(durationSelector, scope));
  };

  return {
    renderStatic,
    behaviour,
    render,
    name: 'ɵlocal'
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
  const durationSelector = from(getUnpatchedResolvedPromise());
  const scope = getContext(config.cdRef as any);

  function render() {
    config.cdRef.reattach();
    config.cdRef.detectChanges();
    config.cdRef.detach();
  }

  function renderStatic() {
    // schedule(durationSelector, scope, render);
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => {
      return o$.pipe(coalesceWith(durationSelector, scope));
    };
  }

  return {
    renderStatic,
    behaviour,
    render,
    name: 'ɵdetach'
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
 * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵPostTaskStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const durationSelector = defer(() =>
    from((scheduler as any).postTask(() => {}, { priority: 'user-blocking' }))
  );
  const scope = getContext(config.cdRef as any);

  function render() {
    config.cdRef.detectChanges();
  }

  function renderStatic() {
    // schedule(durationSelector, scope, render);
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => {
      return o$.pipe(coalesceWith(durationSelector, scope));
    };
  }

  return {
    renderStatic,
    behaviour,
    render,
    name: 'ɵpostTask'
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
 * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createɵIdleCallbackStrategy<T>(
  config: RenderStrategyFactoryConfig
): RenderStrategy<T> {
  const durationSelector = defer(() =>
    from((scheduler as any).postTask(() => {}, { priority: 'user-blocking' }))
  );
  const scope = getContext(config.cdRef as any);

  const renderMethod = config.cdRef.detectChanges;

  function render() {
    renderMethod();
  }

  function renderStatic() {
    // schedule(durationSelector, scope, renderMethod);
  }

  function behaviour() {
    return (o$: Observable<T>): Observable<T> => {
      return o$.pipe(coalesceWith(durationSelector, scope));
    };
  }

  return {
    renderStatic,
    behaviour,
    render,
    name: 'ɵpostTask'
  };
}

function getContext(cdRef) {
  return (cdRef as any).context;
}

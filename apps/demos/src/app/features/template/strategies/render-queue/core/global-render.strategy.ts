import { RenderStrategy, RenderStrategyFactoryConfig } from '@rx-angular/template';
import { tap } from 'rxjs/operators';
import { GlobalTaskPriority } from './global-task-manager';
import { scheduleOnGlobalTick } from './globalAnimationFrameTick';
import { coalesceAndScheduleGlobal } from './static-schedule-and-coalesce-global';

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

export function getGlobalRenderingStrategies<T>(
    config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
    return {
        chunk: createChunkStrategy(config),
        blocking: createBlockingStrategy(config),
        detach: createDetachChunkStrategy(config),
        detachChunk: createDetachChunkStrategy(config),
        detachBlocking: createDetachBlockingStrategy(config)
    };
}

function afterCoalesceAndSchedule<R>(work: () => void, afterCD?: () => R) {
    work();
    if (afterCD) {
        afterCD();
    }
}

export function createBlockingStrategy<T>(
    config: RenderStrategyFactoryConfig
): RenderStrategy {
    const component = config.cdRef;
    const taskPriority = GlobalTaskPriority.blocking;

    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o =>
        o.pipe(
            scheduleOnGlobalTick(() => ({
                priority: taskPriority,
                work: renderMethod,
                scope: component
            }))
        );

    const scheduleCD = <R>(afterCD?: () => R) =>
        coalesceAndScheduleGlobal(() => {
            afterCoalesceAndSchedule(renderMethod, afterCD);
        }, taskPriority, component);

    return {
        name: 'blocking',
        detectChanges: renderMethod,
        rxScheduleCD: behavior,
        scheduleCD
    };
}

export function createChunkStrategy<T>(
    config: RenderStrategyFactoryConfig
): RenderStrategy {
    const taskPriority = GlobalTaskPriority.chunk;
    const component = config.cdRef;

    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o =>
        o.pipe(
            scheduleOnGlobalTick(() => ({
                priority: taskPriority,
                work: renderMethod,
                scope: component
            }))
        );

    const scheduleCD = <R>(afterCD?: () => R) =>
        coalesceAndScheduleGlobal(() => {
            afterCoalesceAndSchedule(renderMethod, afterCD);
        }, taskPriority, component);

    return {
        name: 'chunk',
        detectChanges: renderMethod,
        rxScheduleCD: behavior,
        scheduleCD
    };
}

export function createDetachChunkStrategy<T>(
    config: RenderStrategyFactoryConfig
): RenderStrategy {
    const component = config.cdRef;
    const taskPriority = GlobalTaskPriority.chunk;
    const renderMethod = () => {
        config.cdRef.reattach();
        config.cdRef.detectChanges();
        config.cdRef.detach();
    };
    const behavior = o =>
        o.pipe(
            tap(() => config.cdRef.detach()),
            scheduleOnGlobalTick(() => ({
                priority: taskPriority,
                work: renderMethod,
                scope: component
            }))
        );

    const scheduleCD = <R>(afterCD?: () => R) => {
        config.cdRef.detach();
        return  coalesceAndScheduleGlobal(() => {
            afterCoalesceAndSchedule(renderMethod, afterCD);
        }, taskPriority, component);
    }

    return {
        name: 'detachChunk',
        detectChanges: renderMethod,
        rxScheduleCD: behavior,
        scheduleCD
    };
}

export function createDetachBlockingStrategy<T>(
    config: RenderStrategyFactoryConfig
): RenderStrategy {
    const component = config.cdRef;
    const taskPriority = GlobalTaskPriority.blocking;
    const renderMethod = () => {
        config.cdRef.reattach();
        config.cdRef.detectChanges();
        config.cdRef.detach();
    };
    const behavior = o =>
        o.pipe(
            tap(() => config.cdRef.detach()),
            scheduleOnGlobalTick(() => ({
                priority: taskPriority,
                work: renderMethod,
                scope: component
            }))
        );

    const scheduleCD = <R>(afterCD?: () => R) => {
        config.cdRef.detach();
        return  coalesceAndScheduleGlobal(() => {
            afterCoalesceAndSchedule(renderMethod, afterCD);
        }, taskPriority, component);
    }

    return {
        name: 'detachBlocking',
        detectChanges: renderMethod,
        rxScheduleCD: behavior,
        scheduleCD
    };
}

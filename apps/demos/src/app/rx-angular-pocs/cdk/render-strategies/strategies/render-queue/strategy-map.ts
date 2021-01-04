import { tap } from 'rxjs/operators';
import { StrategyCredentials, StrategyCredentialsMap } from '../../model/strategy-credentials';
import { GlobalTaskPriority } from './utils/global-task-manager';
import { scheduleOnGlobalTick } from './utils/globalAnimationFrameTick';

export function getChunkStrategyCredentialsMap(): StrategyCredentialsMap {
    return {
        chunk: createRenderQueueStrategyCredentials(),
         detachChunk: createDetachChunkStrategyCredentials(),
    };
}

export function createRenderQueueStrategyCredentials(): StrategyCredentials {
    return {
        name: 'chunk',
        work: cdRef => {
            cdRef.reattach();
            cdRef.detectChanges();
        },
        behavior: (work: () => void, scope: any) => o$ =>
            o$.pipe(
                scheduleOnGlobalTick({
                    priority: GlobalTaskPriority.chunk,
                    work: work,
                    scope
                })
            )
    };
}

export function createDetachChunkStrategyCredentials(): StrategyCredentials {
    return {
        name: 'detachChunk',
        work: cdRef => {
            cdRef.reattach();
            cdRef.detectChanges();
            cdRef.detach();
        },
        behavior: (work: () => void, scope: any) => o$ =>
            o$.pipe(
                scheduleOnGlobalTick({
                    priority: GlobalTaskPriority.chunk,
                    work: work,
                    scope
                })
            )
    };
}

export function createDetachChunkFirstStrategyCredentials(): StrategyCredentials {
    let prio = GlobalTaskPriority.chunk;
    return {
        name: 'detachChunkFirst',
        work: cdRef => {
            cdRef.reattach();
            cdRef.detectChanges();
            cdRef.detach();
        },
        behavior: (work: () => void, scope: any) => o$ =>
            o$.pipe(
                scheduleOnGlobalTick({
                    priority: prio,
                    work: work,
                    scope
                }),
                tap(() => prio = GlobalTaskPriority.blocking)
            )
    };
}

export function createChunkFirstStrategyCredentials(): StrategyCredentials {
    let prio = GlobalTaskPriority.chunk;
    return {
        name: 'chunkFirst',
        work: cdRef => {
            cdRef.reattach();
            cdRef.detectChanges();
        },
        behavior: (work: () => void, scope: any) => o$ =>
            o$.pipe(
                scheduleOnGlobalTick({
                    priority: prio,
                    work: work,
                    scope
                }),
                tap(() => prio = GlobalTaskPriority.blocking)
            )
    };
}

export function createBlockingStrategyCredentials(): StrategyCredentials {
    return {
        name: 'blocking',
        work: cdRef => {
            cdRef.reattach();
            cdRef.detectChanges();
        },
        behavior: (work: () => void, scope: any) => o$ =>
            o$.pipe(
                scheduleOnGlobalTick({
                    priority: GlobalTaskPriority.blocking,
                    work: work,
                    scope
                })
            )
    };
}

export function createDetachBlockingStrategyCredentials(): StrategyCredentials {
    return {
        name: 'detachBlocking',
        work: cdRef => {
            cdRef.reattach();
            cdRef.detectChanges();
            cdRef.detach();
        },
        behavior: (work: () => void, scope: any) => o$ =>
            o$.pipe(
                scheduleOnGlobalTick({
                    priority: GlobalTaskPriority.blocking,
                    work: work,
                    scope
                })
            )
    };
}

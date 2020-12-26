import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { idleCallbackTick } from './utils/idleCallbackTick';
import { mapTo, switchMap } from 'rxjs/operators';

/**
 * Strategies
 *
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - iC - `idleCallback`
 *
 * | Name                       | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |--------------------------- | ---------| --------------| ---------------- | ---------- |-------- |
 * | `idleCallback`             | ✔        | ɵDC           | C + Pr          | iC         | ❌       |
 *
 */

export function getIdleCallbackStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    idleCallback: createIdleCallbackStrategyCredentials()
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
 * 'Scoped' coalescing, in addition, means **grouping the collected unpatch by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `idleCall`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @return - The calculated strategy credentials
 *
 */
export function createIdleCallbackStrategyCredentials(): StrategyCredentials {
  return {
    name: 'idleCallback',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work) => o => o.pipe(switchMap(v => idleCallbackTick(work).pipe(mapTo(v))))
  };
}

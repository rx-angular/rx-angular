import { RenderStrategy, RenderStrategyFactoryConfig } from '../../core/render-aware';
import { map, switchMap, tap } from 'rxjs/operators';
import { timeoutTick } from '../../experimental/render-strategies/rxjs/scheduling';
import { afterScheduleCD } from '../util';

/**
 * @description
 *
 * Native Strategy
 *
 * @description
 *
 * This strategy mirrors Angular's built-in `async` pipe.
 * This means for every emitted value [`ChangeDetectorRef#markForCheck`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/view_ref.ts#L128) is called.
 * Angular still needs zone.js to trigger the [`ApplicationRef#tick`](https://github.com/angular/angular/blob/7d8dce11c0726cdba999fc59a83295d19e5e92e6/packages/core/src/application_ref.ts#L719) to re-render,
 * as the internally called function [`markViewDirty`](https://github.com/angular/angular/blob/930eeaf177a4c277f437f42314605ff8dc56fc82/packages/core/src/render3/instructions/shared.ts#L1837) is only responsible for dirty marking and not rendering.
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing    | Scheduling               |
 * | --------- | --------------| ----------------- | ------------- | ------------------------ |
 * | `native`  | ❌            | ⮁ `markForCheck` | ✔ RootContext  | `requestAnimationFrame`  |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
export function createNativeStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const renderMethod = () => config.cdRef.markForCheck();
  const cdScheduled = afterScheduleCD(timeoutTick);
  return {
    name: 'native',
    detectChanges: () => renderMethod(),
    rxScheduleCD: (o) => o.pipe(
      tap(() => renderMethod()),
      switchMap(v => timeoutTick().pipe(map(() => v)))
    ),
    scheduleCD: <R>(afterCD?: () => R) => {
      renderMethod();
      return cdScheduled(afterCD);
    }
  };
}

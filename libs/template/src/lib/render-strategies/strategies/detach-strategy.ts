import { coalesceAndSchedule } from '../static';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { priorityTickMap } from '../rxjs/scheduling/priority-tick-map';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  RenderStrategy,
  RenderStrategyFactoryConfig,
} from '../../core/render-aware';
import { coalesceWith } from '../rxjs/operators/coalesceWith';
import { promiseTick } from '../rxjs/scheduling/promiseTick';

const promiseDurationSelector = promiseTick();

/**
 * Detach Strategies
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing         | Scheduling                 |
 * | --------- | --------------| ----------------- | ------------------ | -------------------------- |
 * | `detach`  | ✔             | ⭭ `detectChanges` | ✔ ComponentContext | `requestAnimationFrame`   |
 *
 */

export function getDetachStrategies<T>(
  config: RenderStrategyFactoryConfig
): { [strategy: string]: RenderStrategy } {
  return {
    detach: createDetachStrategy(config),
  };
}

/**
 * Detach Strategy
 *
 * This strategy behaves the same as the local strategy.
 * The detach strategy detaches the component from Angulars change detection.
 * With every new value it re-attaches the component/embedded view to the change detection,
 * renders the new value and detaches again.
 *
 * If a component is detached the input bindings will still receive values.
 * Also the internal logic will work as expected including the use of `ViewChild`.
 * Only the template will not be updated.
 *
 * | Name      | Zone Agnostic | Render Method     | Coalescing         | Scheduling                 |
 * | --------- | --------------| ----------------- | ------------------ | -------------------------- |
 * | `detach`  | ✔             | ⭭ `detectChanges` | ✔ ComponentContext | `requestAnimationFrame`   |
 *
 * @param config - The values this strategy needs to get calculated.
 * @return - The calculated strategy
 *
 */
export function createDetachStrategy(
  config: RenderStrategyFactoryConfig
): RenderStrategy {
  const component = (config.cdRef as any).context;
  const priority = SchedulingPriority.animationFrame;
  const tick = priorityTickMap[priority];

  const renderMethod = () => {
    config.cdRef.reattach();
    config.cdRef.detectChanges();
    config.cdRef.detach();
  };
  const behavior = (o) => o.pipe(
          coalesceWith(promiseDurationSelector, component),
          // dispose previous render attempts (tick schedules it into the future)
          switchMap((v) => tick.pipe(map(() => v))),
          tap(renderMethod)
    );
  const scheduleCD = () =>
    coalesceAndSchedule(renderMethod, priority, component);

  return {
    name: 'detach',
    detectChanges: renderMethod,
    rxScheduleCD: behavior,
    scheduleCD,
  };
}

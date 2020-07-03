import { MonoTypeOperatorFunction } from 'rxjs';
import { getStrategies } from '../../strategies';
import { Type } from '@angular/core';

export function renderChange<T>(
  component: Type<T> | HTMLElement,
  strategyName: string
): MonoTypeOperatorFunction<T> {
  const strategies = getStrategies({ component });
  const strategy = strategies[strategyName];
  return o => o.pipe(strategy.rxScheduleCD);
}

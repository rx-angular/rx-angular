import { MonoTypeOperatorFunction } from 'rxjs';
import { getStrategies } from '../../strategies';
import { ChangeDetectorRef, Type } from '@angular/core';

export function renderChange<T>(
  cdRef: ChangeDetectorRef,
  strategyName: string
): MonoTypeOperatorFunction<T> {
  const strategies = getStrategies({ cdRef });
  const strategy = strategies[strategyName];
  return o => o.pipe(strategy.rxScheduleCD);
}

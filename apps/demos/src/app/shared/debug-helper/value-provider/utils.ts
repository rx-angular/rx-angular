import { EMPTY, Observable, timer } from 'rxjs';
import { merge as mergeWith, repeat, switchMap, takeUntil } from 'rxjs/operators';
import { animationFrameTick } from '../../../../../../../libs/template/src/lib/render-strategies/rxjs/scheduling';
import { SchedulerConfig } from './model';

export function withCompleteAndError<T>(error$, complete$) {
  return (o: Observable<T>): Observable<T> =>
    o.pipe(mergeWith(error$), takeUntil(complete$));
}

export function toTick(): (o: Observable<SchedulerConfig>) => Observable<number> {
  return (o) =>
    o.pipe(
      switchMap((scheduleConfig) => {
        if (!scheduleConfig) {
          return EMPTY;
        } else {
          const stop$ = scheduleConfig.duration
            ? timer(scheduleConfig.duration)
            : EMPTY;
          if (scheduleConfig.scheduler === 'timeout') {
            return timer(0, scheduleConfig.tickSpeed).pipe(takeUntil(stop$));
          } else if (scheduleConfig.scheduler === 'animationFrame') {
            return animationFrameTick().pipe(
              repeat(scheduleConfig.numEmissions),
              takeUntil(stop$)
            );
          }
          throw new Error('Wrong scheduler config');
        }
      })
    );
}

export function toInt(float: number, min = 0, max = 10): number {
  // tslint:disable-next-line:no-bitwise
  return float !== undefined ? ~~(min + float * (max - min)) : undefined;
}

export function toRandom(): number {
  return Math.random();
}

export function toBoolean(float: number, truthy: number): boolean | undefined {
  return float !== undefined ? float < truthy : undefined;
}

export function toRandomItems(ids: number[]): any[] {
  const _ids = [...ids];
  return new Array(ids.length).fill(0).map((v) => ({ id: _ids.pop(), value: toRandom()}));
}


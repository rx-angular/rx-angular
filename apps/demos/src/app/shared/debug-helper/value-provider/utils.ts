import { EMPTY, Observable, timer } from 'rxjs';
import { merge as mergeWith, repeat, switchMap, takeUntil } from 'rxjs/operators';
import { animationFrameTick } from '@rx-angular/template';
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

export function toInt(float: number = toRandom(), min = 0, max = 10): number {
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
  return new Array(ids.length).fill(0).map((v) => ({ id: _ids.pop(), value: toRandom() }));
}

export function toNewItems(arr: any[] = [], numItems: number, maxId = 10): any[] {
  const ids = arr.map(i => i.id);
  const newItems = [];
  // arr.length <= maxId to avoid infinite loops if no new item can be found
  while (newItems.length < numItems && arr.length <= maxId) {
    const id = toInt(undefined, 0, maxId);
    if (!ids.includes(id)) {
      newItems.push(...toRandomItems([id]));
    }
  }
  return newItems;
}

export function getRandomItems(arr: any[], numItems: number) {
  const result = new Array(numItems);
  let len = arr.length;
  const taken = new Array(len);
  if (numItems > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (numItems--) {
    const x = Math.floor(Math.random() * len);
    result[numItems] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function compareIdFn(a, b) {
  return a.id === b.id;
}

export function moveItemMutable(arr: any[] = [], pos1: number, pos2: number): any[] {
  // local variables
  let i, tmp;
  console.log(pos1, pos2);
  // if positions are different and inside array
  if (pos1 !== pos2 && 0 <= pos1 && pos1 <= arr.length && 0 <= pos2 && pos2 <= arr.length) {
    // save element from position 1
    tmp = arr[pos1];
    // move element down and shift other elements up
    if (pos1 < pos2) {
      for (i = pos1; i < pos2; i++) {
        arr[i] = arr[i + 1];
      }
    }
    // move element up and shift other elements down
    else {
      for (i = pos1; i > pos2; i--) {
        arr[i] = arr[i - 1];
      }
    }
    // put element from position 1 to destination
    arr[pos2] = tmp;

    return arr;
  }
  return arr;
}

export function moveItemImmutable(arr: any[] = [], pos1: number, pos2: number): any[] {
  return moveItemMutable(arr, pos1, pos2);
}

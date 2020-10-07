import { EMPTY, Observable, timer } from 'rxjs';
import { merge as mergeWith, repeat, takeUntil } from 'rxjs/operators';
import { priorityTickMap } from '@rx-angular/template';
import { SchedulerConfig, TestItem } from './model';
import { remove } from '../../../../../../../libs/state/src/lib/transformation-helpers/array';


export function compareIdFn(a, b) {
  return a.id === b.id;
}

export function withCompleteAndError<T>(error$, complete$) {
  return (o: Observable<T>): Observable<T> =>
    o.pipe(mergeWith(error$), takeUntil(complete$));
}

export function toTick(scheduleConfig: SchedulerConfig): Observable<number> {
  if (!scheduleConfig) {
    return EMPTY;
  } else {
    const stop$ = scheduleConfig.duration
      ? timer(scheduleConfig.duration)
      : EMPTY;
    if (scheduleConfig.scheduler) {
      return priorityTickMap[scheduleConfig.scheduler].pipe(
        repeat(scheduleConfig.numEmissions),
        takeUntil(stop$)
      );
    }
    throw new Error('Wrong scheduler config');
  }
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

export function toRandomItems(ids: number[]): TestItem[] {
  const _ids = [...ids];
  return new Array(ids.length).fill(0).map((v) => ({ id: _ids.pop(), value: toRandom() }));
}

export function toNewItems(arr: TestItem[] = [], numItems: number, maxId = 10): TestItem[] {
  const ids = arr.map(i => i.id);
  const newItems: TestItem[] = [];
  if (arr.length >= maxId) {
    return newItems;
  }
  // arr.length <= maxId to avoid infinite loops if no new item can be found
  while (newItems.length < numItems) {
    const id = toInt(undefined, 0, maxId);
    if (!ids.includes(id) && !newItems.map(i => i.id).includes(id)) {
      newItems.push(toRandomItems([id])[0]);
    }
  }
  return newItems;
}

export function getRandomItems(arr: TestItem[] = [], numItems: number) {
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

export function getItems(arr: TestItem[] = [], itemIds: number[]) {
  return arr.filter(i => itemIds.includes(i.id));
}


export function updateItemMutable(arr = [], itemIds: number[]) {
  if (!arr.length) {
    return arr;
  }
  itemIds = itemIds || getRandomItems(arr, 1).map(i => i.id);
  getItems(arr, itemIds).forEach(i => arr.find(ii => i.id === ii.id).value = toRandom());
  return arr;
}

export function updateItemImmutable(arr = [], itemIds: number[]) {
  return [...updateItemMutable(arr, itemIds)];
}

export function addItemMutable(arr = [], numItems: number) {
  toNewItems(arr, numItems).forEach(i => arr.push(i));
  return arr;
}

export function addItemImmutable(arr = [], numItems: number) {
  return [...addItemMutable(arr, numItems)];
}

export function moveItemMutable(arr: TestItem[] = [], positions): TestItem[] {
  if (!arr.length) {
    return arr;
  }
  const randItemId = getRandomItems(arr, 1)[0].id;
  Object.entries(positions || { [randItemId]: 1 }).forEach(([id, pos2]) => {
    // local variables
    let i, tmp;
    const pos1 = arr.findIndex(ii => +ii.id === +id);
    pos2 = +pos2;
    // if positions are different and inside array
    if (arr.length >= 2 && pos1 !== pos2 && 0 <= pos1 && pos1 <= arr.length && 0 <= pos2 && pos2 <= arr.length) {
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
      arr[+pos2] = tmp;
    }
  });
  return arr;
}

export function moveItemImmutable(arr: TestItem[] = [], positions): TestItem[] {
  return [...moveItemMutable(arr, positions)];
}

export function removeItemsMutable(arr: TestItem[] = [], ids: number[]) {
  if (!arr.length) {
    return arr;
  }
  ids = ids || getRandomItems(arr, 1);
  ids.forEach(id => {
    arr.splice(arr.findIndex(i => i.id === id), 1);
  })
  return arr;
}

export function removeItemsImmutable(arr: TestItem[] = [], ids: number[]) {
  return [...removeItemsMutable(arr, ids)];
}

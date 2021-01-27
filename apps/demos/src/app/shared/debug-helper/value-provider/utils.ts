import { EMPTY, from, Observable, of, timer } from 'rxjs';
import { merge as mergeWith, share, switchMap, take, takeUntil } from 'rxjs/operators';
import { priorityTickMap } from '@rx-angular/template';
import { SchedulerConfig, TestItem } from './model';
import { fromFetch } from 'rxjs/fetch';

export function compareIdFn(a, b) {
  return a.id === b.id;
}

const theMax = 10000;

export function withCompleteAndError<T>(error$, complete$) {
  return (o: Observable<T>): Observable<T> =>
    o.pipe(mergeWith(error$), takeUntil(complete$));
}

export function toTick(scheduleConfig: SchedulerConfig): Observable<number> {
  if (!scheduleConfig) {
    return EMPTY;
  } else {
    const timerConfig = Array.isArray(scheduleConfig.tickSpeed) ? {
      dueTime: scheduleConfig.tickSpeed[0],
      period: scheduleConfig.tickSpeed[1]
    } : { dueTime: 0, period: scheduleConfig.tickSpeed };
    console.log('timerConfig', timerConfig);
    const stop$ = scheduleConfig.duration
      ? timer(scheduleConfig.duration)
      : EMPTY;
    if (scheduleConfig.scheduler) {
      return timer(timerConfig.dueTime, timerConfig.period).pipe(
        take(scheduleConfig.numEmissions),
        switchMap(t => priorityTickMap[scheduleConfig.scheduler]),
        takeUntil(stop$)
      ) as Observable<number>;
    }
    throw new Error('Wrong scheduler config');
  }
}

export function toInt(float: number = toRandom(), min = 0, max = theMax): number {
  // tslint:disable-next-line:no-bitwise
  return ~~(min + float * (max+1 - min));
}

export function toRandom(): number {
  return Math.random();
}

export function toBoolean(float: number, truthy: number = 0.5): boolean | undefined {
  return float !== undefined ? float < truthy : undefined;
}

export function toImgUrl(float: number): string {
  return 'https://media0.giphy.com/media/oeGgcmHVHLVCg/200_d.gif';
}

export function toRandomItems(ids: number[]): TestItem[] {
  const _ids = [...ids];
  return new Array(ids.length).fill(0).map((v) => ({ id: _ids.pop(), value: toRandom() }));
}

export function toNewItems(arr: TestItem[] = [], numItems: number, maxId = theMax): TestItem[] {
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

export function getRandomItems<T>(arr: T[] = [], numItems: number, exclude?: (i: T) => boolean) {
  const result = new Array(numItems);
  let len = arr.length;
  const taken = new Array(len);
  if (numItems > len) {
    numItems = len - 1;
  }
  while (numItems--) {
    const x = Math.floor(Math.random() * len);
    const i = arr[x in taken ? taken[x] : x];
      if(exclude && exclude(i)) {
        numItems++;
        continue;
      }
    result[numItems] = i;
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function getRandomRecords(arr: TestItem[] = [], numItems: number) {
  numItems = Math.abs(Math.max(numItems, arr.length-1));
  const randomItems = new Map<number, TestItem>();
  while(randomItems.size < numItems) {
    randomItems.set(numItems, arr[toInt(0, arr.length-1)]);
  }
  return randomItems;
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

export function updateItemImmutable(arr = [], num: number) {
  const itemIds = getRandomItems(arr, num).map(i => i.id);
  return [...updateItemMutable(arr, itemIds).map(i => itemIds.find(id => id + '' === i.id + '') ? { ...i } : i)];
}

export function addItemMutable(arr = [], numItems: number) {
  toNewItems(arr, numItems).forEach(i => arr.push(i));
  return arr;
}

export function addItemImmutable(arr = [], numItems: number) {
  return [...addItemMutable(arr, numItems)];
}

export function moveItemMutable(arr: TestItem[] = [], num: number): TestItem[] {
  if (!arr.length) {
    return arr;
  }
  const numItems = arr.length - 1;

  if (num > numItems) {
    num = numItems;
  }

  for (let i = 0; i<num; i++) {

    // local variables
    const id1 = getRandomItems(arr, 1)[0].id;
    const id2 = getRandomItems(arr, 1, (it) => it.id === id1)[0].id;

    let tmp;
    const pos1 = arr.findIndex(ii => +ii.id === id1);
    const pos2 = arr.findIndex(ii => +ii.id === id2);
    console.log('id1', id1, pos1, pos2);
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
  }

return arr;
}

export function moveItemImmutable(arr: TestItem[] = []): TestItem[] {
  return [...moveItemMutable(arr, 1)];
}
export function moveItemsImmutable(arr: TestItem[] = [], num: number): TestItem[] {
  return [...moveItemMutable(arr, num)];
}

export function shuffleItemsImmutable(arr: TestItem[] = []): TestItem[] {
  // console.log(arr.map(i => i.id));
  const shuffled = [...arr.sort(() => Math.random() - .5)];
  // console.log(shuffled.map(i => i.id));
  return shuffled;
}

export function removeItemsMutable(arr: TestItem[] = [], ids: number[]) {
  if (!arr.length) {
    return arr;
  }
  ids = ids || getRandomItems(arr, 1);
  ids.forEach(id => {
    arr.splice(arr.findIndex(i => i.id === id), 1);
  });
  return arr;
}

export function removeItemsImmutable(arr: TestItem[] = [], num: number) {
  return [...removeItemsMutable(arr, getRandomItems(arr,num).map(i => i.id))];
}

export class GliphyApi {

  baseUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private key: string) {

  }

  random() {
    return from(fromFetch(this.getUrl()).pipe(this.handleFetch)).pipe(share());
  };

  search(queryParams: { q: string, [key: string]: any }) {
    queryParams = {
      limit: 25,
      offset: 0,
      lang: 'en',
      ...queryParams
    };
    return from(fromFetch(this.getUrl(['search'], queryParams))
    ).pipe(
      this.handleFetch,
      share());
  };

  private getUrl(params = ['random'], queryParams?: {}) {
    const qP = {
      api_key: this.key,
      tag: '',
      rating: 'G',
      ...queryParams
    };

    return [
      this.baseUrl,
      [
        params.join('/'),
        Object
          .entries(qP)
          .reduce((s, i) => {
            s.push(i[0] + '=' + i[1]);
            return s;
          }, [])
          .join('&')
      ]
        .join('?')
    ]
      .join('/');
  }

  handleFetch(o$) {
    return o$.pipe(switchMap(response => {
      // @ts-ignore
      if (response.ok) {
        // OK return data
        // @ts-ignore
        return response.json();
      } else {
        // Server is returning a status requiring the client to try something else.
        // @ts-ignore
        return of({ error: true, message: `Error ${response.status}` });
      }
    }));
  }

}

const base64Src  = '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';
export const placeholderImg = `data:image/png;base64, ` + base64Src;

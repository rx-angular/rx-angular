import { Observable } from 'rxjs';
import { map, scan, share, tap } from 'rxjs/operators';
import { toInt } from '../../../../shared/debug-helper/value-provider';

const children1 = 10;
const children2 = 3;

export const rand = (n: number = 2): number => {
  // tslint:disable-next-line:no-bitwise
  return ~~(Math.random() * n);
};

export const randArray = (items: number = children1): any[] => {
  return Array(items).fill(0).map((_, idx) => ({ id: idx % items, value: rand() }));
};

export const immutableIncArr = (rows: number = children1, columns: number = children2) => (o$: Observable<number>) => o$.pipe(
  scan((a, i, idx) => {
    const arr = randArray(children2);
    const value = rand(100);
    if(i === 1) {
      a[idx % rows] = { id: idx % rows, value, arr };
    } else if(i === 0) {
      const id = rand(1);
      a[id] = { id, value, arr };
    } else {
      a.splice(idx % rows, 1);
    }
    return a;
  }, []),
  tap(console.log),
  share()
);
export const mutableIncArr = (rows: number = children1, columns: number = children2) => {
  return (o$: Observable<number>) => o$.pipe(
    scan((a, i, idx) => {
      const arr = randArray(children2);
      a[idx % rows].value = rand();
      a[idx % rows].arr = arr;
      return a;
    }, []),
    share()
  );
}

export const immutableArr = (rows: number = children1, columns: number = children2) => (o$: Observable<number>) => o$.pipe(
  map(() => randArray(rows).map((r) => toInt(1) ? ({ ...r, arr: randArray(columns) }) : r) ),
  share()
);

export const mutableArr = (rows: number = children1, columns: number = children2) => {
  const arr = Array(rows);
  return (o$: Observable<number>) => o$.pipe(
    map(v => arr.forEach((i, idx) => {
      i.value = rand();
      i.arr = randArray(children2);
    })),
    share()
  );
}

import { Observable } from 'rxjs';
import { map, scan, share, tap } from 'rxjs/operators';

const children1 = 10;
const children2 = 3;

export const rand = (n: number = 2): number => {
  // tslint:disable-next-line:no-bitwise
  return ~~(Math.random() * n);
};

export const randArray = (n: number = 6): any[] => {
  return Array(n).fill(0).map((_, idx) => ({ id: idx % n, value: rand() }));
};

export const immutableIncArr = (n: number = children1) => (o$: Observable<number>) => o$.pipe(
  scan((a, i, idx) => {
    const arr = randArray(children2);
    const value = rand(100);
    if(i === 1) {
      a[idx % n] = { id: idx % n, value, arr };
    } else if(i === 0) {
      const id = rand(1);
      a[id] = { id, value, arr };
    } else {
      a.splice(idx % n, 1);
    }
    return a;
  }, []),
  tap(console.log),
  share()
);
export const mutableIncArr = (n: number = children1) => {
  return (o$: Observable<number>) => o$.pipe(
    scan((a, i, idx) => {
      const arr = randArray(children2);
      a[idx % n].value = rand();
      a[idx % n].arr = arr;
      return a;
    }, []),
    share()
  );
}

export const immutableArr = (n: number = children1) => (o$: Observable<number>) => o$.pipe(
  map(v => Array(n).fill(0).map((_, idx) => ({ id: idx % n, value: rand(), arr: randArray(children2) }))),
  share()
);

export const mutableArr = (n: number = children1) => {
  const arr = Array(n);
  return (o$: Observable<number>) => o$.pipe(
    map(v => arr.forEach((i, idx) => {
      i.value = rand();
      i.arr = randArray(children2);
    })),
    share()
  );
}

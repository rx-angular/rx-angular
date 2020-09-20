import { Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

export const rand = (n: number = 2): number => {
  // tslint:disable-next-line:no-bitwise
  return ~~(Math.random() * n);
};

export const randArray = (n: number = 6): any[] => {
  return Array(n).fill(0).map((_, idx) => ({ id: idx % n, value: rand() }));
};



export const immutableIncArr = (n: number = 10) => (o$: Observable<number>) => o$.pipe(
  scan((a, i, idx) => {
    const arr = randArray(3);
    const value = rand();
    if(i === 1) {
      a[idx % n] = { id: idx % n, value, arr };
    } else if(i === 0) {
      const id = rand(a.length);
      a[id] = { id, value, arr };
    } else {
      a.splice(idx % n, 1);
    }
    return a;
  }, [])
);
export const mutableIncArr = (n: number = 10) => {
  return (o$: Observable<number>) => o$.pipe(
    scan((a, i, idx) => {
      const arr = randArray(3);
      a[idx % n].value = rand();
      a[idx % n].arr = arr;
      return a;
    }, [])
  );
}

export const immutableArr = (n: number = 10) => (o$: Observable<number>) => o$.pipe(
  map(v => Array(n).fill(0).map((_, idx) => ({ id: idx % n, value: rand(), arr: randArray(3) })))
);

export const mutableArr = (n: number = 10) => {
  const arr = Array(n);
  return (o$: Observable<number>) => o$.pipe(
    map(v => arr.forEach((i, idx) => {
      i.value = rand();
      i.arr = randArray(3);
    }))
  );
}

import { ConnectableObservable, Observable, Subject, Subscription } from 'rxjs';
import { map, pairwise, publishReplay, startWith, tap } from 'rxjs/operators';
import { constantPluck } from './utils';

export interface DifferResult<T> {
  enter: T[],
  update: T[],
  exit: T[],
}

// Identify items over their index in the array
export function diffByIndex<T>(oldData: T[], newData: T[]): DifferResult<T> {

  const oldLength = oldData.length,
    dataLength = newData.length,
    enter = [] as T[],
    update = [] as T[],
    exit = [] as T[];

  // `i` is defined at the top of the function as it is shared with all `for` loops
  let i = 0;

  // The counter variable is left out as we use the shared `i` as counter
  for (; i < dataLength; ++i) {
    // As we track by index, if a value is provided for that index it belongs to the update set
    if (oldData[i]) {
      update[i] = newData[i];
    }
    // If no value is present at the current index it belongs to the enter set.
    else {
      enter[i] = newData[i];
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  // As `i` was used in the `for` loop for the newData,
  // the only situation where we can enter this loop is if the old data set is bigger than the new one.
  for (; i < oldLength; ++i) {
    // This check is needed to only non-null values belong to the exit set
    if (oldData[i]) {
      exit[i] = oldData[i];
    }
  }

  return { enter, update, exit } as DifferResult<T>;
}

// Identify items over a provided key in the array
export function diffByKey<T>(oldData: T[], newData: T[], key = (item: T, idx?: number) => idx, distinct = (item: T, idx?: number) => idx): DifferResult<T> {
  let i,
    keyValue;
  const dataByKeyValue = new Map,
    oldDataLength = oldData.length,
    newDataLength = newData.length,
    keyValues = new Array(oldDataLength),
    enter = [],
    update = [],
    exit = [];

  // Iterate over the old data and compute the key for each node.
  for (i = 0; i < oldDataLength; ++i) {
    const d = oldData[i];
    if (d) {
      // Make sure the result is a string by coercing it with `+ ''` at the end
      keyValues[i] = keyValue = key(d, i) + '';
      // If multiple nodes have the same key, the duplicates are added to exit set.
      if (dataByKeyValue.has(keyValue)) {
        exit[i] = d;
      }
      // datum has a unique key result
      else {
        dataByKeyValue.set(keyValue, d);
      }
    }
  }

  // Iterate over the old data and compute the key for each datum.
  for (i = 0; i < newDataLength; ++i) {
    const d = newData[i];
    // Make sure the result is a string by coercing it with `+ ''` at the end
    keyValue = key(d, i) + '';

    // If there a datum associated with this key, join and add it to update.
    const old = dataByKeyValue.get(keyValue);
    if (old) {
      // only update items that are distinct
      if (distinct) {
        if (distinct(old) !== distinct(d)) {
          update[i] = d;
        }
      } else {
        update[i] = d;
      }
      // we need to delete this here as we dont want to have them included in the next loop
      dataByKeyValue.delete(keyValue);
    }
      // If there is not (or the key is a duplicate), add it to enter.
    // @TODO Why key can be a duplicate??
    else {
      enter[i] = d;
    }
  }

  // Iterate over the old data and add any remaining nodes that were not bound to data to the exit set.
  for (i = 0; i < oldDataLength; ++i) {
    const d = oldData[i];
    // @TODO Why check for reference equality??
    if ((d) && (dataByKeyValue.get(keyValues[i]) === d)) {
      exit[i] = d;
    }
  }

  return { enter, update, exit };
}


export function functionalDiffer<T>(oldData: T[], newData: T[], key?: (item: T, idx: number) => any, distinct?: (item: T, idx: number) => any): DifferResult<T> {
  const diffFn = key ? (o: T[], n: T[]) => diffByKey(o, n, key) : (o: T[], n: T[]) => diffByIndex(o, n);
  return diffFn(oldData, newData);
}


export interface RxIterableDiffer<T extends object> {
  connect: () => Subscription;
  next: (v: T[]) => void;
  enter$: Observable<T>;
  update$: Observable<T>;
  exit$: Observable<T>;
}

export interface RxIterableDifferConfig<T extends object> {
  trackBy: keyof T | ((i: T) => any);
  distinctBy?: keyof T | ((i: T) => any)
}


export function rxIterableDifferFactory<T extends object>(config: RxIterableDifferConfig<T>): RxIterableDiffer<T> {
  const trackBy = (typeof config.trackBy !== 'function') ? constantPluck(config.trackBy) : config.trackBy;
  const distinctBy = (typeof config.distinctBy !== 'function') ? constantPluck(config.distinctBy) : config.distinctBy;

  const array$ = new Subject<T[]>();
  const differResult$: ConnectableObservable<DifferResult<T>> = array$.pipe(
    startWith([]),
    pairwise(),
    tap(console.log),
    map(([oldData, newData]) => {
      return functionalDiffer(oldData, newData, trackBy);
    }),
    publishReplay(1)
  ) as ConnectableObservable<DifferResult<T>>;

  return {
    connect,
    next,
    enter$: differResult$.pipe(map(r => r.enter)),
    update$: differResult$.pipe(map(r => r.update)),
    exit$: differResult$.pipe(map(r => r.exit))
  } as RxIterableDiffer<T>;

  // ===

  function connect(): Subscription {
    return (differResult$ as ConnectableObservable<T>).connect();
  }

  function next(v: T[]): void {
    array$.next(v);
  }
}

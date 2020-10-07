import { ConnectableObservable, Observable, pipe, Subject, Subscription } from 'rxjs';
import {
  bufferCount,
  distinctUntilChanged,
  groupBy,
  map,
  mergeAll,
  mergeMap, pairwise,
  publish,
  scan, startWith,
  tap
} from 'rxjs/operators';


export interface DifferResult<T> {
  enter: T[],
  update: T[],
  exit: T[],
}

// Identify items over their index in the array
export function diffByIndex<T>(oldData: T[], newData: T[]): DifferResult<T> {

  const oldLength = oldData.length,
    dataLength = newData.length,
    enter = [],
    update = [],
    exit = [];

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

  return { enter, update, exit };
}

// Identify items over a provided key in the array
export function diffByKey<T>(oldData: T[], newData: T[], key = (item: T, idx: number) => idx, distinctBy = (d: T, idx: number) => d): DifferResult<T> {
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
    if (dataByKeyValue.get(keyValue)) {
      update[i] = d;
      // @TODO Why do we delete here??
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

/*
export function functionalDiffer<T>(value: T, key, distinct): DifferResult<T> {
  if (!arguments.length) return Array.from(this, value);

  const bind = key ? diffByKey : diffByIndex,
    parents = this._parents,
    groups = this._groups;

  if (typeof value !== 'function') value = constant(value);

  for (let m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    const parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = array(value.call(parent, parent && parent.__data__, j, parents)),
      dataLength = data.length,
      enterGroup = enter[j] = new Array(dataLength),
      updateGroup = update[j] = new Array(dataLength),
      exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (let i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
*/


interface RxIterableDiffer<T extends object> {
  connect: () => Subscription;
  next: (v: T[]) => void;
  enter$: Observable<T>;
  update$: Observable<T>;
  exit$: Observable<T>;
}

export function rxIterableDifferFactory<T extends object>(config: { trackBy: keyof T | ((i: T) => any), distinctBy: keyof T | ((i: T) => any) }): RxIterableDiffer<T> {
  const trackBy = (typeof config.trackBy !== 'function') ? constantPluck(config.trackBy) : config.trackBy;
  const distinctBy = (typeof  config.distinctBy !== 'function') ? constantPluck(config.distinctBy) : config.distinctBy;

  const array$ = new Subject<T[]>();
  const differResult$ = array$.pipe(
    startWith([]),
    pairwise(),
    map(([oldData, newData]) => {
      return diffByKey(oldData, newData, trackBy, distinctBy)
    }),
    tap(console.log),
    publish()
  );

  return {
    connect,
    next,
    enter$: differResult$.pipe(map(r => r.enter), distinctArray(trackBy, distinctBy)),
    update$: differResult$.pipe(map(r => r.update), distinctArray(trackBy, distinctBy)),
    exit$: differResult$.pipe(map(r => r.exit), distinctArray(trackBy, distinctBy))
  };

  // ===

  function connect(): Subscription {
    return (differResult$ as ConnectableObservable<T>).connect();
  }

  function next(v: T[]): void {
    array$.next(v);
  }
}


function constant(x) {
  return function() {
    return x;
  };
}

function constantPluck<T>(x) {
  return function(i: T) {
    return i[x];
  };
}

function distinctArray<T>(trackBy: (i: T) => any, distinctBy: (i: T) => any) {
  return pipe(
    mergeMap(arr => arr as T[]),
    groupBy(i => trackBy(i)),
    map(o$ => o$.pipe(distinctUntilChanged((a, b) => distinctBy(a) === distinctBy(b)))),
    mergeAll()
  );
}


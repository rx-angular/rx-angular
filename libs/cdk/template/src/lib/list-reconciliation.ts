// Based on https://github.com/angular/angular/blob/main/packages/core/src/render3/list_reconciliation.ts
// The fast paths are kept, the slow path is replaced by a longest increasing subsequence (LIS) pass
// that performs the minimum number of moves.

import { TrackByFunction } from '@angular/core';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

/**
 * A type representing the live collection to be reconciled with any new (incoming) collection. This
 * is an adapter class that makes it possible to work with different internal data structures,
 * regardless of the actual values of the incoming collection.
 */
export abstract class LiveCollection<T, V> {
  abstract get length(): number;
  abstract at(index: number): V;
  abstract attach(index: number, item: T): void;
  abstract detach(index: number): T;
  abstract create(index: number, value: V): T;
  destroy(item: T): void {
    // noop by default
  }
  updateValue(index: number, value: V): void {
    // noop by default
  }

  // operations below could be implemented on top of the operations defined so far, but having
  // them explicitly allow clear expression of intent and potentially more performant
  // implementations
  swap(index1: number, index2: number): void {
    const startIdx = Math.min(index1, index2);
    const endIdx = Math.max(index1, index2);
    const endItem = this.detach(endIdx);
    if (endIdx - startIdx > 1) {
      const startItem = this.detach(startIdx);
      this.attach(startIdx, endItem);
      this.attach(endIdx, startItem);
    } else {
      this.attach(startIdx, endItem);
    }
  }
  move(prevIndex: number, newIdx: number): void {
    this.attach(newIdx, this.detach(prevIndex));
  }
}

/**
 * 1: same item, nothing to update; -1: same item, value identity changed; 0: different items.
 */
function valuesMatching<V>(
  liveIdx: number,
  liveValue: V,
  newIdx: number,
  newValue: V,
  trackBy: TrackByFunction<V>,
  indexIndependent: boolean,
): number {
  if (
    (indexIndependent || liveIdx === newIdx) &&
    Object.is(liveValue, newValue)
  ) {
    // matching and no value identity to update
    return 1;
  } else if (
    Object.is(trackBy(liveIdx, liveValue), trackBy(newIdx, newValue))
  ) {
    // matching but requires value identity update
    return -1;
  }

  return 0;
}

/**
 * The live collection reconciliation algorithm that performs in-place operations, so the live
 * collection reflects the content of the new (incoming) collection.
 *
 * It first consumes the matching items from the start and the end of both collections, detects
 * swaps and single moves between the two ends, and parks items that look removed. Whatever is left
 * in the middle is solved in one pass: removed items are destroyed first, then only the items that
 * are not part of the longest increasing subsequence (LIS) of new positions are moved. For unique
 * keys this is the minimum number of moves, items are never re-created when their key is retained.
 *
 * Complexity: O(n + m) when the collections differ only at their ends, O(n + m + k log k) otherwise
 * (k = number of retained items in the unsolved middle part). Memory: O(n + m) on the slow path.
 *
 * @param liveCollection the current, live collection;
 * @param newCollection the new, incoming collection;
 * @param trackByFn key generation function that determines equality between items in the live and
 *     incoming collection;
 * @param trackByIsIndexIndependent `true` when `trackByFn` ignores the index argument (e.g. it
 *     returns the item or one of its properties). The same value at a different index is then
 *     known to be the same item without calling `trackByFn`.
 */
export function reconcile<T, V>(
  liveCollection: LiveCollection<T, V>,
  newCollection: Iterable<V> | undefined | null,
  trackByFn: TrackByFunction<V>,
  trackByIsIndexIndependent = false,
): void {
  const newItems: V[] = Array.isArray(newCollection)
    ? newCollection
    : newCollection != null
      ? Array.from(newCollection)
      : [];

  // like upstream, the initial render (nothing to reconcile against) doesn't report
  if (
    (typeof ngDevMode === 'undefined' || ngDevMode) &&
    liveCollection.length > 0
  ) {
    reportDuplicateKeys(newItems, trackByFn);
  }

  // live items that looked removed, parked by key until the end
  let parked: Map<unknown, T> | undefined = undefined;
  let liveStartIdx = 0;
  let liveEndIdx = liveCollection.length - 1;
  let newEndIdx = newItems.length - 1;

  while (liveStartIdx <= liveEndIdx && liveStartIdx <= newEndIdx) {
    // compare from the beginning
    const liveStartValue = liveCollection.at(liveStartIdx);
    const newStartValue = newItems[liveStartIdx];
    const isStartMatching = valuesMatching(
      liveStartIdx,
      liveStartValue,
      liveStartIdx,
      newStartValue,
      trackByFn,
      trackByIsIndexIndependent,
    );
    if (isStartMatching !== 0) {
      if (isStartMatching < 0) {
        liveCollection.updateValue(liveStartIdx, newStartValue);
      }
      liveStartIdx++;
      continue;
    }

    // compare from the end, consume the whole matching tail at once
    const prevLiveEndIdx = liveEndIdx;
    while (liveEndIdx >= liveStartIdx && newEndIdx >= liveStartIdx) {
      const newEndValue = newItems[newEndIdx];
      const isEndMatching = valuesMatching(
        liveEndIdx,
        liveCollection.at(liveEndIdx),
        newEndIdx,
        newEndValue,
        trackByFn,
        trackByIsIndexIndependent,
      );
      if (isEndMatching === 0) {
        break;
      }
      if (isEndMatching < 0) {
        liveCollection.updateValue(liveEndIdx, newEndValue);
      }
      liveEndIdx--;
      newEndIdx--;
    }
    if (liveEndIdx !== prevLiveEndIdx) {
      continue;
    }

    // Detect swap and moves. The live end item is the new start item: it can't stay in place
    // together with any other item, moving it is minimal - unless it's the only item that stays.
    // Only take these shortcuts when another item is confirmed to stay, the slow path is minimal.
    const liveStartKey = trackByFn(liveStartIdx, liveStartValue);
    const newStartKey = trackByFn(liveStartIdx, newStartValue);
    const liveEndKey = trackByFn(liveEndIdx, liveCollection.at(liveEndIdx));
    if (Object.is(newStartKey, liveEndKey) && liveStartIdx < newEndIdx) {
      const newEndValue = newItems[newEndIdx];
      const newSecondKey = trackByFn(
        liveStartIdx + 1,
        newItems[liveStartIdx + 1],
      );
      if (Object.is(trackByFn(newEndIdx, newEndValue), liveStartKey)) {
        // swap on both ends: minimal if the ends are adjacent or the item after the start stays
        if (
          liveEndIdx - liveStartIdx === 1 ||
          Object.is(
            trackByFn(liveStartIdx + 1, liveCollection.at(liveStartIdx + 1)),
            newSecondKey,
          )
        ) {
          liveCollection.swap(liveStartIdx, liveEndIdx);
          liveCollection.updateValue(liveEndIdx, newEndValue);
          liveCollection.updateValue(liveStartIdx, newStartValue);
          newEndIdx--;
          liveEndIdx--;
          liveStartIdx++;
          continue;
        }
      } else if (Object.is(liveStartKey, newSecondKey)) {
        // the live end item moves forward, the live start item stays right after it
        liveCollection.move(liveEndIdx, liveStartIdx);
        liveCollection.updateValue(liveStartIdx, newStartValue);
        liveStartIdx++;
        continue;
      }
    }

    // The next live item is the new start item: the current live item was removed or moved
    // further back. Park it, it is either re-attached or destroyed at the end. Parking it is always
    // a minimal choice: any item following it in the live collection can follow the new start item.
    if (
      liveStartIdx < liveEndIdx &&
      (parked === undefined || !parked.has(liveStartKey)) &&
      Object.is(
        trackByFn(liveStartIdx + 1, liveCollection.at(liveStartIdx + 1)),
        newStartKey,
      )
    ) {
      (parked ??= new Map()).set(
        liveStartKey,
        liveCollection.detach(liveStartIdx),
      );
      liveEndIdx--;
      continue;
    }

    break;
  }

  if (parked === undefined) {
    if (liveStartIdx > liveEndIdx) {
      // only additions are left
      for (let i = liveStartIdx; i <= newEndIdx; i++) {
        liveCollection.attach(i, liveCollection.create(i, newItems[i]));
      }
      return;
    }
    if (liveStartIdx > newEndIdx) {
      // only removals are left, delete starting from the end
      while (liveStartIdx <= liveEndIdx) {
        liveCollection.destroy(liveCollection.detach(liveEndIdx--));
      }
      return;
    }
  }

  reconcileWindow(
    liveCollection,
    newItems,
    trackByFn,
    liveStartIdx,
    liveEndIdx,
    newEndIdx,
    parked,
  );
}

/**
 * Solves the unmatched middle part `live[start..liveEnd]` vs `new[start..newEnd]` plus the parked
 * items with the minimum number of moves:
 * 1. every live item claims the next unclaimed new position with its key (FIFO for duplicates);
 * 2. items without a position are destroyed;
 * 3. items on the LIS of their new positions stay, all others are detached;
 * 4. the new positions are filled in order, around the items that stayed.
 */
function reconcileWindow<T, V>(
  liveCollection: LiveCollection<T, V>,
  newItems: V[],
  trackByFn: TrackByFunction<V>,
  start: number,
  liveEnd: number,
  newEnd: number,
  parked: Map<unknown, T> | undefined,
): void {
  const newLength = Math.max(newEnd - start + 1, 0);
  const liveLength = Math.max(liveEnd - start + 1, 0);

  // key -> first unclaimed new index, further indices with the same key are chained in `nextSame`
  const firstIdx = new Map<unknown, number>();
  const nextSame = new Int32Array(newLength);
  for (let i = newEnd; i >= start; i--) {
    const key = trackByFn(i, newItems[i]);
    const head = firstIdx.get(key);
    nextSame[i - start] = head === undefined ? -1 : head;
    firstIdx.set(key, i);
  }
  const claim = (key: unknown): number => {
    const head = firstIdx.get(key);
    if (head === undefined) {
      return -1;
    }
    const next = nextSame[head - start];
    if (next < 0) {
      firstIdx.delete(key);
    } else {
      firstIdx.set(key, next);
    }
    return head;
  };

  // items to be attached at a new position (relative index), coming from `parked` or detached here
  const toAttach: (T | undefined)[] = new Array(newLength);
  if (parked !== undefined) {
    for (const [key, item] of parked) {
      const target = claim(key);
      if (target < 0) {
        liveCollection.destroy(item);
      } else {
        toAttach[target - start] = item;
      }
    }
  }

  // 1. new position of every live item in the window
  const targets = new Int32Array(liveLength);
  let retained = 0;
  for (let j = 0; j < liveLength; j++) {
    const target = claim(trackByFn(start + j, liveCollection.at(start + j)));
    targets[j] = target;
    if (target >= 0) {
      retained++;
    }
  }

  // 2. destroy removed items (from the end, so indices stay valid)
  const positions = new Int32Array(retained);
  for (let j = liveLength - 1, r = retained - 1; j >= 0; j--) {
    if (targets[j] < 0) {
      liveCollection.destroy(liveCollection.detach(start + j));
    } else {
      positions[r--] = targets[j];
    }
  }

  // 3. detach everything that is not on the LIS (from the end)
  const stays = longestIncreasingSubsequence(positions);
  for (let r = retained - 1; r >= 0; r--) {
    if (stays[r] === 0) {
      toAttach[positions[r] - start] = liveCollection.detach(start + r);
    }
  }

  // 4. fill the new positions in order
  let r = 0;
  while (r < retained && stays[r] === 0) r++;
  for (let i = start; i <= newEnd; i++) {
    const newValue = newItems[i];
    if (r < retained && positions[r] === i) {
      // an item that stayed, all positions before it are filled already
      if (!Object.is(liveCollection.at(i), newValue)) {
        liveCollection.updateValue(i, newValue);
      }
      do r++;
      while (r < retained && stays[r] === 0);
      continue;
    }
    const item = toAttach[i - start];
    if (item !== undefined) {
      liveCollection.attach(i, item);
      if (!Object.is(liveCollection.at(i), newValue)) {
        liveCollection.updateValue(i, newValue);
      }
    } else {
      liveCollection.attach(i, liveCollection.create(i, newValue));
    }
  }
}

/**
 * Marks (1) the entries of a longest strictly increasing subsequence of `values`.
 * O(n log n).
 */
function longestIncreasingSubsequence(values: Int32Array): Uint8Array {
  const n = values.length;
  const result = new Uint8Array(n);
  if (n === 0) {
    return result;
  }
  // tails[l] = index of the smallest tail value of all increasing subsequences of length l + 1
  const tails = new Int32Array(n);
  const prev = new Int32Array(n);
  let length = 0;
  for (let i = 0; i < n; i++) {
    const value = values[i];
    let lo = 0;
    let hi = length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (values[tails[mid]] < value) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    prev[i] = lo > 0 ? tails[lo - 1] : -1;
    tails[lo] = i;
    if (lo === length) {
      length++;
    }
  }
  for (let i = tails[length - 1]; i >= 0; i = prev[i]) {
    result[i] = 1;
  }
  return result;
}

function reportDuplicateKeys<V>(
  newItems: V[],
  trackByFn: TrackByFunction<V>,
): void {
  const keyToIdx = new Map<unknown, number[]>();
  for (let i = 0; i < newItems.length; i++) {
    const key = trackByFn(i, newItems[i]);
    const idxSoFar = keyToIdx.get(key);
    if (idxSoFar !== undefined) {
      idxSoFar.push(i);
    } else {
      keyToIdx.set(key, [i]);
    }
  }
  const duplicatedKeysMsg = [];
  for (const [key, idx] of keyToIdx) {
    for (let i = 1; i < idx.length; i++) {
      duplicatedKeysMsg.push(
        `key "${key}" at index "${idx[i - 1]}" and "${idx[i]}"`,
      );
    }
  }
  if (duplicatedKeysMsg.length > 0) {
    const message =
      'The provided track expression resulted in duplicated keys for a given collection. ' +
      'Adjust the tracking expression such that it uniquely identifies all the items in the collection. ' +
      'Duplicated keys were: \n' +
      duplicatedKeysMsg.join(', \n') +
      '.';

    // tslint:disable-next-line:no-console
    console.warn(message);
  }
}

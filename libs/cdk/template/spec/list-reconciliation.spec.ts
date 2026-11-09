import { TrackByFunction } from '@angular/core';
import { LiveCollection, reconcile } from '../src/lib/list-reconciliation';

interface Entry<V> {
  value: V;
  id: number;
}

/** Array backed live collection, counting the operations reconcile performs. */
class TestCollection<V> extends LiveCollection<Entry<V>, V> {
  entries: Entry<V>[];
  ops = { create: 0, destroy: 0, moved: 0, update: 0 };
  peak: number;
  private nextId = 0;
  private detached = new Set<Entry<V>>();

  constructor(values: V[]) {
    super();
    this.entries = values.map((value) => ({ value, id: this.nextId++ }));
    this.peak = this.entries.length;
  }
  get length() {
    return this.entries.length;
  }
  at(index: number) {
    return this.entries[index].value;
  }
  attach(index: number, entry: Entry<V>) {
    if (this.detached.delete(entry)) {
      this.ops.moved++;
    }
    this.entries.splice(index, 0, entry);
    this.peak = Math.max(this.peak, this.entries.length + this.detached.size);
  }
  detach(index: number) {
    const [entry] = this.entries.splice(index, 1);
    this.detached.add(entry);
    return entry;
  }
  create(_: number, value: V) {
    this.ops.create++;
    return { value, id: this.nextId++ };
  }
  override destroy(entry: Entry<V>) {
    expect(this.detached.delete(entry)).toBe(true);
    this.ops.destroy++;
  }
  override updateValue(index: number, value: V) {
    this.ops.update++;
    this.entries[index].value = value;
  }
  values() {
    return this.entries.map((e) => e.value);
  }
}

interface Item {
  id: number;
}
const trackById: TrackByFunction<Item> = (_, item) => item.id;

/** minimum number of moves: retained items not on the LIS of their new positions */
function minMoves(prev: Item[], next: Item[]): number {
  const prevIdx = new Map(prev.map((item, i) => [item.id, i]));
  const seq = next
    .map((item) => prevIdx.get(item.id))
    .filter((i): i is number => i !== undefined);
  const tails: number[] = [];
  for (const x of seq) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return seq.length - tails.length;
}

function random(seed: number) {
  return (n: number) => {
    seed = (seed * 16807) % 2147483647;
    return Math.floor((seed / 2147483647) * n);
  };
}

function shuffle<T>(arr: T[], rnd: (n: number) => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const range = (n: number, offset = 0): Item[] =>
  Array.from({ length: n }, (_, i) => ({ id: i + offset }));

describe('reconcile', () => {
  it('should create the initial collection', () => {
    const live = new TestCollection<Item>([]);
    const items = range(3);
    reconcile(live, items, trackById);
    expect(live.values()).toEqual(items);
    expect(live.ops.create).toBe(3);
  });

  it('should handle null, undefined and iterables', () => {
    const items = range(3);
    const live = new TestCollection<Item>(items);
    reconcile(live, new Set([items[2], items[0]]), trackById);
    expect(live.values()).toEqual([items[2], items[0]]);
    reconcile(live, null, trackById);
    expect(live.values()).toEqual([]);
    reconcile(live, undefined, trackById);
    expect(live.values()).toEqual([]);
  });

  describe('with an index independent trackBy', () => {
    it('should not update shifted items that kept their identity', () => {
      const items = range(100);
      const live = new TestCollection<Item>(items);
      const trackBy = vi.fn(trackById);
      const devMode = (globalThis as any).ngDevMode;
      // the dev mode duplicate key check calls trackBy for every item
      (globalThis as any).ngDevMode = false;
      reconcile(live, items.slice(1), trackBy, true);
      (globalThis as any).ngDevMode = devMode;
      expect(live.values()).toEqual(items.slice(1));
      expect(live.ops.update).toBe(0);
      expect(trackBy.mock.calls.length).toBe(2);
    });

    it('should still update values with a new identity', () => {
      const items = range(3);
      const live = new TestCollection<Item>(items);
      const next = [{ id: 9 }, ...items.map((i) => ({ ...i }))];
      reconcile(live, next, trackById, true);
      expect(live.values()).toEqual(next);
      expect(live.values()[1]).toBe(next[1]);
      expect(live.ops.update).toBe(3);
    });
  });

  it('should treat equal values at different indices as different items for an index based trackBy', () => {
    const live = new TestCollection<string>(['a', 'b', 'c']);
    reconcile(live, ['x', 'a', 'b', 'c'], (index) => index);
    expect(live.values()).toEqual(['x', 'a', 'b', 'c']);
    // keys 0..2 are retained (and updated), key 3 is new
    expect(live.ops.create).toBe(1);
    expect(live.ops.moved).toBe(0);
  });

  it('should move a single relocated item once', () => {
    const items = range(100);
    const next = items.slice();
    next.splice(80, 0, ...next.splice(10, 1));
    const live = new TestCollection<Item>(items);
    reconcile(live, next, trackById, true);
    expect(live.values()).toEqual(next);
    expect(live.ops.moved).toBe(1);
  });

  it('should move only the minimum number of items for scattered relocations', () => {
    const rnd = random(42);
    const items = range(1000);
    const next = items.slice();
    for (let i = 0; i < 10; i++) {
      next.splice(rnd(next.length), 0, ...next.splice(rnd(next.length), 1));
    }
    const live = new TestCollection<Item>(items);
    reconcile(live, next, trackById, true);
    expect(live.values()).toEqual(next);
    expect(live.ops.moved).toBe(minMoves(items, next));
    expect(live.ops.moved).toBeLessThanOrEqual(10);
  });

  it('should destroy removed items before creating new ones', () => {
    const items = range(100);
    const live = new TestCollection<Item>(items);
    reconcile(live, range(100, 1000), trackById, true);
    expect(live.ops).toEqual({
      create: 100,
      destroy: 100,
      moved: 0,
      update: 0,
    });
    expect(live.peak).toBeLessThanOrEqual(101);
  });

  it('should reconcile random changes of unique keys with the minimum number of moves', () => {
    const rnd = random(7);
    for (let run = 0; run < 3000; run++) {
      const universe = range(20);
      const prev = shuffle(universe, rnd).slice(0, rnd(21));
      const next = shuffle(universe, rnd)
        .slice(0, rnd(21))
        // some values change identity, keeping their key
        .map((item) => (rnd(2) ? item : { ...item }));
      for (const indexIndependent of [false, true]) {
        const live = new TestCollection<Item>(prev);
        const ids = new Map(live.entries.map((e) => [e.value.id, e.id]));
        reconcile(live, next, trackById, indexIndependent);

        expect(live.values()).toEqual(next);
        live.values().forEach((value, i) => expect(value).toBe(next[i]));
        // retained keys keep their entry
        for (const entry of live.entries) {
          if (ids.has(entry.value.id)) {
            expect(entry.id).toBe(ids.get(entry.value.id));
          }
        }
        expect(live.ops.create).toBe(
          next.filter((n) => !prev.some((p) => p.id === n.id)).length,
        );
        expect(live.ops.moved).toBe(minMoves(prev, next));
      }
    }
  });

  it('should reconcile random changes with duplicated keys', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const rnd = random(11);
    for (let run = 0; run < 3000; run++) {
      const prev = Array.from({ length: rnd(8) }, () => rnd(4));
      const next = Array.from({ length: rnd(8) }, () => rnd(4));
      const live = new TestCollection<number>(prev);
      reconcile(live, next, (_, v) => v, true);
      expect(live.values()).toEqual(next);
      // as many entries are kept as the keys allow
      let retained = 0;
      const counts = new Map<number, number>();
      prev.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
      next.forEach((v) => {
        if ((counts.get(v) ?? 0) > 0) {
          counts.set(v, counts.get(v)! - 1);
          retained++;
        }
      });
      expect(live.ops.create).toBe(next.length - retained);
    }
    warn.mockRestore();
  });
});

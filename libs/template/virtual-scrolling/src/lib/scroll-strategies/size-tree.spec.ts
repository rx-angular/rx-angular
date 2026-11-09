import { SizeTree } from './size-tree';

describe('SizeTree', () => {
  // sizes incl. zeros (items rendering nothing) and a non power of 2 length
  const sizes = [50, 0, 31, 0, 0, 120, 7, 64, 0, 33, 18];
  const prefix = (s: number[], i: number) =>
    s.slice(0, i).reduce((a, b) => a + b, 0);
  /** what walking the items does: the largest index with prefix <= target */
  const indexAt = (s: number[], target: number) => {
    let i = 0;
    while (i < s.length && prefix(s, i + 1) <= target) i++;
    return i;
  };

  it('answers prefix sums, total and index lookups like a walk does', () => {
    const tree = new SizeTree();
    tree.reset(sizes);
    expect(tree.length).toBe(sizes.length);
    expect(tree.total).toBe(prefix(sizes, sizes.length));
    for (let i = 0; i <= sizes.length + 2; i++) {
      expect(tree.prefix(i)).toBe(prefix(sizes, Math.min(i, sizes.length)));
    }
    for (let target = 0; target <= tree.total + 10; target++) {
      expect(tree.indexAt(target)).toBe(indexAt(sizes, target));
    }
  });

  it('keeps all sums in sync when single sizes change', () => {
    const tree = new SizeTree();
    const current = sizes.slice();
    tree.reset(current);
    const updates: [number, number][] = [
      [0, 10],
      [3, 25],
      [10, 0],
      [5, 121],
      [1, 0],
    ];
    for (const [index, size] of updates) {
      tree.set(index, size);
      current[index] = size;
      expect(tree.get(index)).toBe(size);
      expect(tree.total).toBe(prefix(current, current.length));
      for (let i = 0; i <= current.length; i++) {
        expect(tree.prefix(i)).toBe(prefix(current, i));
      }
      for (let target = 0; target <= tree.total; target += 3) {
        expect(tree.indexAt(target)).toBe(indexAt(current, target));
      }
    }
  });

  it('ignores updates beyond the ledger and handles an empty one', () => {
    const tree = new SizeTree();
    tree.reset([]);
    tree.set(0, 10);
    expect(tree.total).toBe(0);
    expect(tree.prefix(5)).toBe(0);
    expect(tree.indexAt(100)).toBe(0);
  });
});

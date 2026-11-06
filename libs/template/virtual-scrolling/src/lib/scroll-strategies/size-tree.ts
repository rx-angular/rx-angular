/**
 * @internal
 *
 * Prefix sums over item sizes (a Fenwick tree). Positions and the content
 * size are sums over thousands of items, the tree answers them in O(log n)
 * instead of walking the items, and updates a single size in O(log n).
 */
export class SizeTree {
  private tree = new Float64Array(1);
  private sizes = new Float64Array(0);
  private _length = 0;
  private _total = 0;
  private topStep = 0;

  get length(): number {
    return this._length;
  }

  /** the sum of all sizes */
  get total(): number {
    return this._total;
  }

  /** rebuilds the tree from the given sizes in O(n) */
  reset(sizes: ArrayLike<number>): void {
    const length = sizes.length;
    const tree = new Float64Array(length + 1);
    const own = new Float64Array(length);
    let total = 0;
    for (let i = 0; i < length; i++) {
      const size = sizes[i];
      own[i] = size;
      total += size;
      const node = i + 1;
      tree[node] += size;
      const parent = node + (node & -node);
      if (parent <= length) {
        tree[parent] += tree[node];
      }
    }
    this.tree = tree;
    this.sizes = own;
    this._length = length;
    this._total = total;
    let step = 1;
    while (step * 2 <= length) {
      step *= 2;
    }
    this.topStep = length ? step : 0;
  }

  get(index: number): number {
    return this.sizes[index];
  }

  set(index: number, size: number): void {
    if (index < 0 || index >= this._length) {
      return;
    }
    const delta = size - this.sizes[index];
    if (delta === 0) {
      return;
    }
    this.sizes[index] = size;
    this._total += delta;
    for (let node = index + 1; node <= this._length; node += node & -node) {
      this.tree[node] += delta;
    }
  }

  /** the sum of the sizes in `[0, index)` */
  prefix(index: number): number {
    let sum = 0;
    for (
      let node = Math.min(index, this._length);
      node > 0;
      node -= node & -node
    ) {
      sum += this.tree[node];
    }
    return sum;
  }

  /**
   * The largest index whose prefix is `<= target`, `length` if `target` is
   * beyond the total. Items of size 0 at the boundary are skipped.
   */
  indexAt(target: number): number {
    let index = 0;
    let rest = target;
    for (let step = this.topStep; step > 0; step >>= 1) {
      const next = index + step;
      if (next <= this._length && this.tree[next] <= rest) {
        index = next;
        rest -= this.tree[next];
      }
    }
    return index;
  }
}

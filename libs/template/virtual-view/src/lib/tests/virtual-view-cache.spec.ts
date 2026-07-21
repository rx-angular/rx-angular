import { fc, test } from '@fast-check/jest';
import { fakeViewRef } from './test-utils/fake-view-ref';
import { createCache } from './test-utils/testbed';

describe('VirtualViewCache', () => {
  describe('non-positive cache sizes (edge cases)', () => {
    it('destroys the provided content view and stores nothing when contentCacheSize is 0 (Req 1.5)', () => {
      const cache = createCache({ contentCacheSize: 0 });
      const key = {};
      const view = fakeViewRef();

      cache.storeContent(key, view);

      expect(view.destroy).toHaveBeenCalledTimes(1);
      expect(cache.getContent(key)).toBeUndefined();
    });

    it('destroys the provided content view and stores nothing when contentCacheSize is negative (Req 1.5)', () => {
      const cache = createCache({ contentCacheSize: -1 });
      const key = {};
      const view = fakeViewRef();

      cache.storeContent(key, view);

      expect(view.destroy).toHaveBeenCalledTimes(1);
      expect(cache.getContent(key)).toBeUndefined();
    });

    it('destroys the provided placeholder view and stores nothing when placeholderCacheSize is 0 (Req 1.6)', () => {
      const cache = createCache({ placeholderCacheSize: 0 });
      const key = {};
      const view = fakeViewRef();

      cache.storePlaceholder(key, view);

      expect(view.destroy).toHaveBeenCalledTimes(1);
      expect(cache.getPlaceholder(key)).toBeUndefined();
    });

    it('destroys the provided placeholder view and stores nothing when placeholderCacheSize is negative (Req 1.6)', () => {
      const cache = createCache({ placeholderCacheSize: -5 });
      const key = {};
      const view = fakeViewRef();

      cache.storePlaceholder(key, view);

      expect(view.destroy).toHaveBeenCalledTimes(1);
      expect(cache.getPlaceholder(key)).toBeUndefined();
    });
  });

  describe('absent-key retrieval (edge case)', () => {
    it('returns undefined when retrieving content for a key that was never stored (Req 1.9)', () => {
      const cache = createCache();

      expect(cache.getContent({})).toBeUndefined();
    });

    it('returns undefined when retrieving a placeholder for a key that was never stored (Req 1.9)', () => {
      const cache = createCache();

      expect(cache.getPlaceholder({})).toBeUndefined();
    });
  });
});

describe('VirtualViewCache (property-based)', () => {
  // A cache size far larger than the maximum generated entry count so that no
  // eviction ever occurs and the round-trip/removal invariant is isolated.
  const BIG_CACHE_SIZE = 1000;

  // Feature: virtual-view-test-coverage, Property 1: Cache store/retrieve round trip with removal
  test.prop([fc.integer({ min: 1, max: 50 })], { numRuns: 100 })(
    'stored key returns the exact view once, then undefined, for both caches (Req 1.1, 1.2, 1.9)',
    (n) => {
      // n (<= 50) is always smaller than the cache size, so no eviction occurs.
      const cache = createCache({
        contentCacheSize: BIG_CACHE_SIZE,
        placeholderCacheSize: BIG_CACHE_SIZE,
      });

      // Fresh, distinct object-reference keys and view doubles per iteration.
      const contentEntries = Array.from({ length: n }, () => ({
        key: {},
        view: fakeViewRef(),
      }));
      const placeholderEntries = Array.from({ length: n }, () => ({
        key: {},
        view: fakeViewRef(),
      }));

      // Content cache round trip with removal.
      for (const { key, view } of contentEntries) {
        cache.storeContent(key, view);
      }
      for (const { key, view } of contentEntries) {
        // Retrieving a stored key returns the exact view that was stored...
        expect(cache.getContent(key)).toBe(view);
        // ...and a subsequent retrieval returns undefined (retrieval removes it).
        expect(cache.getContent(key)).toBeUndefined();
      }

      // Placeholder cache round trip with removal (identical behavior).
      for (const { key, view } of placeholderEntries) {
        cache.storePlaceholder(key, view);
      }
      for (const { key, view } of placeholderEntries) {
        expect(cache.getPlaceholder(key)).toBe(view);
        expect(cache.getPlaceholder(key)).toBeUndefined();
      }
    },
  );

  // Feature: virtual-view-test-coverage, Property 2: Bounded cache evicts oldest and retains most recent
  test.prop(
    [fc.integer({ min: 1, max: 10 }), fc.integer({ min: 1, max: 10 })],
    { numRuns: 100 },
  )(
    'evicts the n - s oldest views and retains the last s, for both caches (Req 1.3, 1.4)',
    (s, extra) => {
      const n = s + extra; // n > s guarantees eviction occurs.

      const cache = createCache({
        contentCacheSize: s,
        placeholderCacheSize: s,
      });

      // Runs the bounded-eviction assertions for one cache flavor, driven by its
      // own store/get functions so both content and placeholder share one body.
      const assertBoundedEviction = (
        store: (key: unknown, view: ReturnType<typeof fakeViewRef>) => void,
        get: (key: unknown) => unknown,
      ) => {
        // Fresh, distinct object-reference keys and view doubles in insertion order.
        const entries = Array.from({ length: n }, () => ({
          key: {},
          view: fakeViewRef(),
        }));

        for (const { key, view } of entries) {
          store(key, view);
        }

        // The n - s oldest views were evicted and destroyed.
        for (let i = 0; i < n - s; i++) {
          expect(entries[i].view.destroy).toHaveBeenCalled();
        }

        // The oldest (evicted) keys are absent. Checking these does not disturb
        // the retained entries since they were already removed from the map.
        for (let i = 0; i < n - s; i++) {
          expect(get(entries[i].key)).toBeUndefined();
        }

        // The last s views are intact (never destroyed). Assert this BEFORE
        // retrieving them, since get() removes the entry from the map.
        for (let i = n - s; i < n; i++) {
          expect(entries[i].view.destroy).not.toHaveBeenCalled();
        }

        // The last s keys are retained and return the exact stored view.
        for (let i = n - s; i < n; i++) {
          expect(get(entries[i].key)).toBe(entries[i].view);
        }
      };

      // Content cache flavor.
      assertBoundedEviction(
        (key, view) => cache.storeContent(key, view),
        (key) => cache.getContent(key),
      );

      // Placeholder cache flavor (fresh keys/views, same cache instance).
      assertBoundedEviction(
        (key, view) => cache.storePlaceholder(key, view),
        (key) => cache.getPlaceholder(key),
      );
    },
  );

  // Feature: virtual-view-test-coverage, Property 3: clear removes and destroys both views for a key
  test.prop([fc.integer({ min: 2, max: 20 })], { numRuns: 100 })(
    'clear(key) destroys both views for that key and leaves other keys untouched (Req 1.7)',
    (m) => {
      // Cache sizes far exceed m so no eviction interferes with the clear behavior.
      const cache = createCache({
        contentCacheSize: BIG_CACHE_SIZE,
        placeholderCacheSize: BIG_CACHE_SIZE,
      });

      // Fresh, distinct object-reference keys, each with its own content and
      // placeholder view double.
      const entries = Array.from({ length: m }, () => ({
        key: {},
        contentView: fakeViewRef(),
        placeholderView: fakeViewRef(),
      }));

      for (const { key, contentView, placeholderView } of entries) {
        cache.storeContent(key, contentView);
        cache.storePlaceholder(key, placeholderView);
      }

      // Pick one target key to clear (any valid index in 0..m-1).
      const targetIndex = m - 1;
      const target = entries[targetIndex];

      cache.clear(target.key);

      // The target's content and placeholder views were both destroyed...
      expect(target.contentView.destroy).toHaveBeenCalledTimes(1);
      expect(target.placeholderView.destroy).toHaveBeenCalledTimes(1);
      // ...and subsequent retrieval of the target key returns undefined.
      expect(cache.getContent(target.key)).toBeUndefined();
      expect(cache.getPlaceholder(target.key)).toBeUndefined();

      // Every other key is untouched. Assert not-destroyed BEFORE retrieving,
      // since get() removes the entry from the map.
      for (let i = 0; i < m; i++) {
        if (i === targetIndex) {
          continue;
        }
        expect(entries[i].contentView.destroy).not.toHaveBeenCalled();
        expect(entries[i].placeholderView.destroy).not.toHaveBeenCalled();
      }
      for (let i = 0; i < m; i++) {
        if (i === targetIndex) {
          continue;
        }
        expect(cache.getContent(entries[i].key)).toBe(entries[i].contentView);
        expect(cache.getPlaceholder(entries[i].key)).toBe(
          entries[i].placeholderView,
        );
      }
    },
  );

  // Feature: virtual-view-test-coverage, Property 4: Destroy empties both caches
  test.prop(
    [fc.integer({ min: 0, max: 20 }), fc.integer({ min: 0, max: 20 })],
    { numRuns: 100 },
  )(
    'ngOnDestroy destroys every cached content and placeholder view and empties both caches (Req 1.8)',
    (c, p) => {
      // Cache sizes far exceed c and p so every stored entry is retained (no
      // eviction) and is therefore present when ngOnDestroy runs.
      const cache = createCache({
        contentCacheSize: BIG_CACHE_SIZE,
        placeholderCacheSize: BIG_CACHE_SIZE,
      });

      // Fresh, distinct object-reference keys and view doubles per iteration.
      const contentEntries = Array.from({ length: c }, () => ({
        key: {},
        view: fakeViewRef(),
      }));
      const placeholderEntries = Array.from({ length: p }, () => ({
        key: {},
        view: fakeViewRef(),
      }));

      for (const { key, view } of contentEntries) {
        cache.storeContent(key, view);
      }
      for (const { key, view } of placeholderEntries) {
        cache.storePlaceholder(key, view);
      }

      cache.ngOnDestroy();

      // Every stored content and placeholder view had destroy() called.
      for (const { view } of contentEntries) {
        expect(view.destroy).toHaveBeenCalledTimes(1);
      }
      for (const { view } of placeholderEntries) {
        expect(view.destroy).toHaveBeenCalledTimes(1);
      }

      // Both caches are emptied: every stored key now retrieves undefined.
      for (const { key } of contentEntries) {
        expect(cache.getContent(key)).toBeUndefined();
      }
      for (const { key } of placeholderEntries) {
        expect(cache.getPlaceholder(key)).toBeUndefined();
      }
    },
  );
});

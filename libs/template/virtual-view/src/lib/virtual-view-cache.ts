import { inject, Injectable, OnDestroy, ViewRef } from '@angular/core';
import { VIRTUAL_VIEW_CONFIG_TOKEN } from './virtual-view.config';

/**
 * A service that caches templates and placeholders to optimize view rendering.
 * It makes sure that all cached resources are cleared when the service is destroyed.
 *
 * @developerPreview
 */
@Injectable()
export class VirtualViewCache implements OnDestroy {
  #config = inject(VIRTUAL_VIEW_CONFIG_TOKEN);

  // Maximum number of content that can be stored in the cache.
  #contentCacheSize = this.#config.cache.contentCacheSize;

  // Cache for storing content views, identified by a unique key, which is the directive instance.
  #contentCache = new Map<unknown, ViewRef>();

  // Maximum number of placeholders that can be stored in the cache.
  #placeholderCacheSize = this.#config.cache.placeholderCacheSize;

  // Cache for storing placeholder views, identified by a unique key.
  #placeholderCache = new Map<unknown, ViewRef>();

  /**
   * Stores a placeholder view in the cache. When the cache reaches its limit,
   * the oldest entry is removed.
   *
   * @param key - The key used to identify the placeholder in the cache.
   * @param view - The ViewRef of the placeholder to cache.
   */
  storePlaceholder(key: unknown, view: ViewRef) {
    if (this.#placeholderCacheSize <= 0) {
      view.destroy();
      return;
    }
    if (this.#placeholderCache.size >= this.#placeholderCacheSize) {
      this.#removeOldestEntry(this.#placeholderCache);
    }
    this.#placeholderCache.set(key, view);
  }

  /**
   * Retrieves a cached placeholder view using the specified key.
   *
   * @param key - The key of the placeholder to retrieve.
   * @returns The ViewRef of the cached placeholder, or undefined if not found.
   */
  getPlaceholder(key: unknown) {
    const view = this.#placeholderCache.get(key);
    this.#placeholderCache.delete(key);
    return view;
  }

  /**
   * Stores a content view in the cache. When the cache reaches its limit,
   * the oldest entry is removed.
   *
   * @param key - The key used to identify the content in the cache.
   * @param view - The ViewRef of the content to cache.
   */
  storeContent(key: unknown, view: ViewRef) {
    if (this.#contentCacheSize <= 0) {
      view.destroy();
      return;
    }
    if (this.#contentCache.size >= this.#contentCacheSize) {
      this.#removeOldestEntry(this.#contentCache);
    }
    this.#contentCache.set(key, view);
  }

  /**
   * Retrieves a cached content view using the specified key.
   *
   * @param key - The key of the content to retrieve.
   * @returns The ViewRef of the cached content, or undefined if not found.
   */
  getContent(key: unknown) {
    const view = this.#contentCache.get(key);
    this.#contentCache.delete(key);
    return view;
  }

  /**
   * Clears both content and placeholder caches for a given key.
   *
   * @param key - The key of the content and placeholder to remove.
   */
  clear(key: unknown) {
    this.#contentCache.get(key)?.destroy();
    this.#contentCache.delete(key);
    this.#placeholderCache.get(key)?.destroy();
    this.#placeholderCache.delete(key);
  }

  /**
   * Clears all cached resources when the service is destroyed.
   */
  ngOnDestroy() {
    this.#contentCache.forEach((view) => view.destroy());
    this.#placeholderCache.forEach((view) => view.destroy());
    this.#contentCache.clear();
    this.#placeholderCache.clear();
  }

  #removeOldestEntry(cache: Map<unknown, ViewRef>) {
    const oldestValue = cache.entries().next().value;
    if (oldestValue !== undefined) {
      const [key, view] = oldestValue;
      view?.destroy();
      cache.delete(key);
    }
  }
}

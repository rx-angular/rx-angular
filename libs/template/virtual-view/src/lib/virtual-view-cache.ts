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

  // Maximum number of templates that can be stored in the cache.
  #maxTemplates = this.#config.cache.maxTemplates;

  // Cache for storing template views, identified by a unique key, which is the directive instance.
  #templateCache = new Map<unknown, ViewRef>();

  // Maximum number of placeholders that can be stored in the cache.
  #maxPlaceholders = this.#config.cache.maxPlaceholders;

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
    if (this.#maxPlaceholders <= 0) {
      view.destroy();
      return;
    }
    if (this.#placeholderCache.size >= this.#maxPlaceholders) {
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
   * Stores a template view in the cache. When the cache reaches its limit,
   * the oldest entry is removed.
   *
   * @param key - The key used to identify the template in the cache.
   * @param view - The ViewRef of the template to cache.
   */
  storeTemplate(key: unknown, view: ViewRef) {
    if (this.#maxTemplates <= 0) {
      view.destroy();
      return;
    }
    if (this.#templateCache.size >= this.#maxTemplates) {
      this.#removeOldestEntry(this.#templateCache);
    }
    this.#templateCache.set(key, view);
  }

  /**
   * Retrieves a cached template view using the specified key.
   *
   * @param key - The key of the template to retrieve.
   * @returns The ViewRef of the cached template, or undefined if not found.
   */
  getTemplate(key: unknown) {
    const view = this.#templateCache.get(key);
    this.#templateCache.delete(key);
    return view;
  }

  /**
   * Clears both template and placeholder caches for a given key.
   *
   * @param key - The key of the template and placeholder to remove.
   */
  clear(key: unknown) {
    this.#templateCache.get(key)?.destroy();
    this.#templateCache.delete(key);
    this.#placeholderCache.get(key)?.destroy();
    this.#placeholderCache.delete(key);
  }

  /**
   * Clears all cached resources when the service is destroyed.
   */
  ngOnDestroy() {
    this.#templateCache.forEach((view) => view.destroy());
    this.#placeholderCache.forEach((view) => view.destroy());
    this.#templateCache.clear();
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

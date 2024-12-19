import { Injectable, OnDestroy, ViewRef } from '@angular/core';

@Injectable()
export class VirtualViewCache implements OnDestroy {
  #maxTemplates = 20;
  #templateCache = new Map<unknown, ViewRef>();
  #maxPlaceholders = 20;
  #placeholderCache = new Map<unknown, ViewRef>();

  storePlaceholder(key: unknown, view: ViewRef) {
    if (this.#placeholderCache.size >= this.#maxPlaceholders) {
      this.#placeholderCache.delete(
        this.#placeholderCache.entries().next().value[0],
      );
    }
    this.#placeholderCache.set(key, view);
  }

  getPlaceholder(key: unknown) {
    return this.#placeholderCache.get(key);
  }

  storeTemplate(key: unknown, view: ViewRef) {
    if (this.#templateCache.size >= this.#maxTemplates) {
      this.#templateCache.delete(this.#templateCache.entries().next().value[0]);
    }
    this.#templateCache.set(key, view);
  }

  getTemplate(key: unknown) {
    return this.#templateCache.get(key);
  }

  clear(key: unknown) {
    this.#templateCache.delete(key);
    this.#placeholderCache.delete(key);
  }

  ngOnDestroy() {
    this.#templateCache.clear();
    this.#placeholderCache.clear();
  }
}

import { inject, Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { SpeculativeLinkRegistry } from './speculative-link-registry.service';

@Injectable({ providedIn: 'root' })
export class SpeculativeLinkPreloader implements PreloadingStrategy {
  #loading = new Set<Route>();
  #registry = inject(SpeculativeLinkRegistry);

  preload(route: Route, load: () => Observable<void>): Observable<void> {
    if (this.#loading.has(route)) {
      // Don't preload the same route twice
      return EMPTY;
    }
    const conn =
      typeof navigator !== 'undefined'
        ? (navigator as any).connection
        : undefined;
    if (conn) {
      // Don't preload if the user is on 2G. or if Save-Data is enabled.
      if ((conn.effectiveType || '').includes('2g') || conn.saveData)
        return EMPTY;
    }
    // Prevent from preloading
    if (route.data && route.data['preload'] === false) {
      return EMPTY;
    }

    if (this.#registry.shouldPrefetch(route)) {
      this.#loading.add(route);
      return load();
    }

    return EMPTY;
  }
}

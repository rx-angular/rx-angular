import { Injectable, signal } from '@angular/core';

export interface ResolveEvent {
  id: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class SpeculativeLinkService {
  readonly events = signal<ResolveEvent[]>([]);
  readonly resolvedCounts = signal<Record<string, number>>({});
  readonly lastResolvedId = signal<string | null>(null);

  logResolve(id: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.events.update((e) => [{ id, timestamp }, ...e].slice(0, 50));
    this.resolvedCounts.update((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    this.lastResolvedId.set(id);

    // Reset lastResolvedId after a short delay to allow re-triggering the flash
    setTimeout(() => {
      if (this.lastResolvedId() === id) {
        this.lastResolvedId.set(null);
      }
    }, 500);
  }
}

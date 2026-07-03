---
id: track-app-hydration
title: 'How to run work once the app is fully hydrated'
diataxis_type: how-to
package: cdk
legacy_guard: false
sidebar_label: 'Track app hydration'
tags: [cdk, guides]
---

# How to run work once the app is fully hydrated

**Goal.** Defer app-level work (analytics, a heavy chart, a global "still
hydrating" indicator) until your **entire** server-rendered page has finished
hydrating, using `HydrationTracker`'s app-wide `isFullyHydrated` signal.

Use this when you need one signal for the whole app. For hydrating an individual
region on demand, prefer Angular's native incremental hydration (`@defer (hydrate …)`,
v19+) instead; this recipe is for the app-wide case that native per-block
hydration does not cover.

## Steps

### 1. Provide the tracker

Add `provideHydrationTracker()` to your application config. Omit the argument for
the defaults (timeout `10000` ms, logging `false`), or pass a shorter timeout as a
safety net:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHydrationTracker } from '@rx-angular/cdk/ssr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHydrationTracker({
      timeout: 5000, // force completion after 5s even if some nodes remain
      logging: true, // log completion / timeout while debugging
    }),
  ],
};
```

### 2. Gate a template on the signal

Inject `HydrationTracker` and read `isFullyHydrated()` in the template. Render the
heavy content only once it is `true`:

```ts
import { Component, inject } from '@angular/core';
import { HydrationTracker } from '@rx-angular/cdk/ssr';

@Component({
  selector: 'app-shell',
  template: `
    @if (tracker.isFullyHydrated()) {
      <app-heavy-chart />
    } @else {
      <p>Loading…</p>
    }
  `,
})
export class ShellComponent {
  protected readonly tracker = inject(HydrationTracker);
}
```

### 3. Run one-off logic after hydration

For imperative work that should run exactly once when hydration completes, use the
observable form and take a single emission:

```ts
import { Component, inject } from '@angular/core';
import { HydrationTracker } from '@rx-angular/cdk/ssr';
import { filter, take } from 'rxjs';

@Component({
  /* … */
})
export class AnalyticsComponent {
  private readonly tracker = inject(HydrationTracker);

  ngOnInit() {
    this.tracker.isFullyHydrated$.pipe(filter(Boolean), take(1)).subscribe(() => {
      // run analytics or other post-hydration logic once
    });
  }
}
```

## Result

The gated content appears, and your one-off logic runs, only after the whole
page has hydrated (or after the timeout fires as a safety net). Confirm by
enabling `logging: true` and watching for the completion log in the browser
console; the signal flips from `false` to `true` at that moment. On a
non-server-rendered browser load there is nothing to hydrate, so the signal is
`true` immediately.

The tracker infers completion from Angular removing the internal `ngh` attribute
as it hydrates each node. That marker is not a public contract, so treat the
signal as a best-effort heuristic backed by the timeout; see the
[reference](../reference/hydration-tracker.md) for the caveat.

## See also

- Reference: [`HydrationTracker`](../reference/hydration-tracker.md)

---
id: hydration-tracker
title: "HydrationTracker"
diataxis_type: reference
package: cdk
legacy_guard: false
sidebar_label: "HydrationTracker"
tags: [cdk, api-reference]
---

# HydrationTracker

`HydrationTracker` exposes an **app-wide "fully hydrated" signal** for a
server-rendered Angular application. It reports `true` once every server-rendered
node in the document has been hydrated, or after a configurable timeout, whichever
comes first. Use it to gate work that must wait until the whole page is
interactive: app-level analytics, deferred non-critical bootstrapping, or a global
"still hydrating" indicator.

Everything is exported from the `@rx-angular/cdk/ssr` entry point.

```ts
import {
  HydrationTracker,
  provideHydrationTracker,
  HydrationTrackerConfig,
  HYDRATION_TRACKER_CONFIG_TOKEN,
  PLATFORM,
} from '@rx-angular/cdk/ssr';
```

:::info Prefer native per-block hydration where it fits
Angular's own **incremental hydration** (`@defer (hydrate …)`, v19+) hydrates
individual blocks on a trigger, and the Angular DevTools hydration overlay lets you
inspect per-component hydration status. For per-region control, prefer those native
tools. `HydrationTracker` covers the case they do not: a single reactive signal for
when the **entire application** has finished hydrating.
:::

:::caution `ngh`-watch is a heuristic, not a contract
`HydrationTracker` computes "fully hydrated" by observing the removal of the `ngh`
attribute that Angular writes on server-rendered nodes. As of Angular v21, `ngh` is
still the hydration boundary marker Angular removes as it hydrates a node, but it
is an **internal, non-public** detail, not a stability contract. Treat the tracker
as a best-effort heuristic backed by the timeout safety net, and re-verify against
your Angular version before relying on it.
:::

## `HydrationTracker`

An `@Injectable({ providedIn: 'root' })` service. It runs **only in the browser**;
on the server it does nothing. On a browser that was **not** server-rendered it
sets the signal to `true` immediately (there is nothing to hydrate). On a
server-rendered page it watches `[ngh]` nodes with a `MutationObserver` and marks
completion when the last one is hydrated or the timeout fires.

### Members

| Member             | Type                  | Description                                                      |
| ------------------ | --------------------- | ---------------------------------------------------------------- |
| `isFullyHydrated`  | `Signal<boolean>`     | Signal that is `true` once the app is considered fully hydrated. |
| `isFullyHydrated$` | `Observable<boolean>` | Observable form of `isFullyHydrated` (via `toObservable`).       |

The service also implements `OnDestroy`; on destroy it disconnects the observer
and clears the pending timeout.

## `provideHydrationTracker(config?)`

```ts
function provideHydrationTracker(config?: HydrationTrackerConfig): Provider;
```

Returns a `Provider` that binds `HYDRATION_TRACKER_CONFIG_TOKEN` to the given
config, merged over the defaults. Call it in `ApplicationConfig.providers`. The
argument is optional; omit it to use the defaults (timeout `10000`, logging
`false`).

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHydrationTracker({ timeout: 5000 })],
};
```

## `HydrationTrackerConfig`

```ts
interface HydrationTrackerConfig {
  timeout?: number;
  logging?: boolean;
}
```

| Property  | Type      | Default | Description                                                                                         |
| --------- | --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `timeout` | `number`  | `10000` | Milliseconds after which hydration is considered complete even if some `ngh` nodes remain; a safety net so the signal never hangs. |
| `logging` | `boolean` | `false` | When `true`, logs hydration completion and timeout to the console.                                  |

## `HYDRATION_TRACKER_CONFIG_TOKEN`

```ts
const HYDRATION_TRACKER_CONFIG_TOKEN: InjectionToken<HydrationTrackerConfig>;
```

The `InjectionToken` the tracker reads its config from (`providedIn: 'root'`, with
a factory returning the defaults). `provideHydrationTracker()` binds it; inject it
directly only if you need to read the resolved config yourself.

## `PLATFORM`

```ts
const PLATFORM: InjectionToken<{
  isServer: boolean;
  isBrowser: boolean;
  isServerRendered: boolean;
}>;
```

An `InjectionToken` (`providedIn: 'platform'`) exposing the current platform.
`isServerRendered` is `true` only in the browser when the page carries the
server-render marker (`#ng-state`). `HydrationTracker` uses it to decide whether it
has anything to observe; you can inject it in your own code for the same
platform/hydration branch.

## Minimal example

```ts
import { Component, inject } from '@angular/core';
import { HydrationTracker } from '@rx-angular/cdk/ssr';

@Component({
  selector: 'app-root',
  template: `
    @if (tracker.isFullyHydrated()) {
      <app-heavy-chart />
    } @else {
      <p>Hydrating…</p>
    }
  `,
})
export class AppComponent {
  protected readonly tracker = inject(HydrationTracker);
}
```

## See also

- How-to: [Track when the app is fully hydrated](../how-to/track-app-hydration.md)

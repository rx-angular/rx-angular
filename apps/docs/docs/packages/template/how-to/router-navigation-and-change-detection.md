---
id: router-navigation-and-change-detection
title: 'How to fix router navigation that does not trigger change detection'
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: 'Router navigation & change detection'
tags: [template, router, guides]
concepts: [E2]
---

# How to fix router navigation that does not trigger change detection

**Goal.** Make `Router.navigate()` and `routerLink` clicks that originate from
inside a `*rxIf`/`*rxLet`/`*rxFor`-projected template (or any other zoneless,
`OnPush` component that does not otherwise write a signal) reliably re-render
after navigation.

**The problem.** Under zoneless change detection (default since Angular v21),
Angular only re-renders the views that read a signal you wrote. Calling
`router.navigate(...)` or clicking a `routerLink` does not itself write any
signal that a currently-rendered view depends on: the `Router` resolves the new
route, updates its own internal state, and fires `NavigationEnd`, but nothing
about that sequence marks your template for check. If the click handler lives on
a component that `*rxIf`, `*rxLet`, or `*rxFor` projected into the tree, and that
component has no further reactive state change of its own, the app can look
"stuck" after the URL changes: the outlet's content updates on the next
unrelated render, not on navigation itself. The same gap exists with the legacy
Zone.js scheduler whenever the navigating code runs **outside** the Angular zone
(for example, inside an un-patched event handler, or a callback handed to you by
a third-party library) — see
[Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
for why "something happened" is no longer a signal Angular listens for.

## Steps

### 1. Tick the application after every navigation

Subscribe once to `Router.events`, filter for `NavigationEnd`, and call
`ApplicationRef.tick()`. This is the direct fix: it forces a full check right
after the router has committed the new route, regardless of what triggered the
navigation or which component's template the trigger lived in.

```ts
import { ApplicationRef, Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterTickService {
  private readonly router = inject(Router);
  private readonly appRef = inject(ApplicationRef);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap(() => this.appRef.tick()),
      )
      .subscribe();
  }
}
```

Provide/inject `RouterTickService` once near the application root (for example
in `AppComponent`'s constructor via `inject(RouterTickService)`) so the
subscription is created exactly once for the lifetime of the app.

### 2. For Zone.js apps, run the navigation inside the zone instead

If you still run with Zone.js and the warning or missing render only happens
because the navigating code executes outside the Angular zone (a raw DOM
listener, a third-party callback), wrap the call in `NgZone.run()` rather than
ticking globally:

```ts
import { NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';

export class NavComponent {
  private readonly ngZone = inject(NgZone);
  private readonly router = inject(Router);

  openPage(): void {
    this.ngZone.run(() => this.router.navigate(['page-1']));
  }
}
```

This re-enters the zone before `navigate()` runs, so Zone.js's own
change-detection trigger fires normally. It only helps in zone-based apps: under
zoneless change detection there is no zone to re-enter, so step 1 is the fix that
applies.

## Result

After navigating (by `router.navigate()` or a `routerLink` click) from a
component rendered through `*rxIf`/`*rxLet`/`*rxFor`, the destination route's
content appears immediately instead of waiting for an unrelated render to catch
it up.

## See also

- Concept: [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- Reference: [`*rxIf`](../reference/rx-if.md)
- Reference: [`*rxLet`](../reference/rx-let.md)
- Reference: [`*rxFor`](../reference/rx-for.md)

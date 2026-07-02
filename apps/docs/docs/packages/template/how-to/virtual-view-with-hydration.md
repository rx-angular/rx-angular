---
id: virtual-view-with-hydration
title: 'How to use RxVirtualView with hydration (SSR)'
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: 'RxVirtualView with hydration'
tags: [template, guides]
concepts: [E5]
---

# How to use RxVirtualView with hydration (SSR)

**Goal.** Use `RxVirtualView` in a server-side-rendered / hydrated app without a flash
of placeholders. When the server sends full HTML, an `IntersectionObserver` that runs
immediately on the client can replace freshly hydrated content with placeholders,
causing a flash and destroying components that were just hydrated. Keep the virtual
view **disabled** until hydration completes, then optionally **enable** it so that
virtual behavior applies only after the app is interactive.

## Step 1: Disable virtual behavior until hydrated (`enabled`)

Set the global config option `enabled` to a `boolean` or a `Signal<boolean>`. When
`enabled` is `false`:

- The directive renders **content** synchronously (no `IntersectionObserver`).
- No placeholders are shown; everything behaves like normal, non-virtual content.

On the server and during hydration the user sees the full content. Once `enabled`
turns `true` (e.g. hydration is done), the directive can start observing visibility.

Pass a signal that flips to `true` after hydration, for example the
`HydrationTracker` from `@rx-angular/cdk/ssr` and its `isFullyHydrated` signal:

```typescript
// app.config.ts
import { ApplicationConfig, inject } from '@angular/core';
import { provideVirtualViewConfig } from '@rx-angular/template/virtual-view';
import { HydrationTracker } from '@rx-angular/cdk/ssr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideVirtualViewConfig(() => {
      const hydrationTracker = inject(HydrationTracker);
      return {
        enabled: hydrationTracker.isFullyHydrated,
      };
    }),
  ],
};
```

Until `isFullyHydrated` is `true`, the virtual view stays disabled and shows content
everywhere. After hydration, `enabled` becomes `true` and the directive can start
virtualizing.

## Step 2: Control behavior after hydration (`enableAfterHydration`)

When the directive **starts disabled** and later becomes **enabled**, decide whether it
should start observing visibility and swap visible content for placeholders as elements
scroll out of view. That is what `enableAfterHydration` controls (provider-level config
only).

| Value | Behavior |
| --- | --- |
| `true` (default) | After `enabled` turns `true`, the directive registers the `IntersectionObserver`. Elements that scroll out of view show placeholders; virtual behavior is fully active. |
| `false` | After `enabled` turns `true`, the directive **does not** register the observer. Hydrated content stays as-is and is never replaced by placeholders. Use this to avoid destroying components that were just hydrated. |

**Keep hydrated content, no virtualizing afterwards:**

```typescript
provideVirtualViewConfig(() => {
  const hydrationTracker = inject(HydrationTracker);
  return {
    enabled: hydrationTracker.isFullyHydrated,
    enableAfterHydration: false, // hydrated nodes stay content; no placeholders later
  };
});
```

**Full virtual behavior after hydration (default):**

```typescript
provideVirtualViewConfig(() => {
  const hydrationTracker = inject(HydrationTracker);
  return {
    enabled: hydrationTracker.isFullyHydrated,
    enableAfterHydration: true, // after hydration, virtualize as usual (default)
  };
});
```

## When to choose which

Use `enableAfterHydration: false` when:

- You want the **first paint** to match the server (no placeholders) and you are okay
  **not** virtualizing that page after hydration (e.g. long, mostly-static landing pages).
- You want to avoid any risk of destroying freshly hydrated components or causing layout
  shifts right after hydration.

Keep `enableAfterHydration: true` (default) when:

- You want **full virtual behavior** after hydration: once the app is interactive,
  elements that leave the viewport should show placeholders again to save DOM and work.

## Result

| Config | Effect |
| --- | --- |
| `enabled: false` or a signal that becomes `true` after hydration | Turns off virtual behavior on the server and during hydration; turns it on only when appropriate (e.g. after `HydrationTracker.isFullyHydrated`). |
| `enableAfterHydration: true` | Once `enabled` becomes `true`, start observing and show placeholders when elements leave the viewport. |
| `enableAfterHydration: false` | Once `enabled` becomes `true`, do **not** start observing; keep hydrated content and never replace it with placeholders. |

On the server and during hydration the user sees full content; after hydration the page
behaves according to `enableAfterHydration`.

## See also

- Reference: [`RxVirtualView`](../reference/rx-virtual-view.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)

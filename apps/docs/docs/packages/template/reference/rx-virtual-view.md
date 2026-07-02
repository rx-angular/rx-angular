---
id: rx-virtual-view
title: 'RxVirtualView'
diataxis_type: reference
package: template
legacy_guard: false
sidebar_label: 'RxVirtualView'
tags: [template, api-reference]
concepts: [E5]
---

# RxVirtualView

:::info Developer preview

This feature is under developer preview. It won't follow semver.

:::

`RxVirtualView` virtualizes arbitrary DOM by rendering an element's content only
while it is visible in the viewport (via `IntersectionObserver`) and swapping it
for a lightweight placeholder while it is out of view. Unlike list virtualization
(`rxVirtualFor`), it works for masonry layouts, dynamic grids, and widget-based
landing pages where the items are heterogeneous. Content and placeholder rendering
are scheduled through the concurrent render strategies.

> **Why this matters:** see [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).

## Import

```typescript
import {
  RxVirtualView,
  RxVirtualViewContent,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
  RxVirtualViewConfig,
  provideVirtualViewConfig,
} from '@rx-angular/template/virtual-view';
```

`RxVirtualView` works together with three sibling directives. `rxVirtualViewObserver`
is mandatory and must be an ancestor of `rxVirtualView`.

| Directive | Selector | Role |
| --- | --- | --- |
| `RxVirtualViewObserver` | `[rxVirtualViewObserver]` | Hosts the `IntersectionObserver`, cache, and resize services. Mandatory ancestor. |
| `RxVirtualView` | `[rxVirtualView]` | The observed node whose content/placeholder is swapped by visibility. `exportAs: 'rxVirtualView'`. |
| `RxVirtualViewContent` | `[rxVirtualViewContent]` | Template rendered while the node is visible. |
| `RxVirtualViewPlaceholder` | `[rxVirtualViewPlaceholder]` | (Optional) template rendered while the node is not visible. |

## RxVirtualViewObserver Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | `ElementRef \| HTMLElement \| null` | the host element | The element the `IntersectionObserver` is applied to. Pass `null` to observe against the browser viewport. See [`root`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root). |
| `rootMargin` | `string` | `''` | Margin around the root. See [`rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin). |
| `scrollMargin` | `string` | config `scrollMargin` (`'100px'`) | Margin applied to nested scroll containers between the target and the root. See [`scrollMargin`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#scrollmargin). |
| `threshold` | `number \| number[]` | `0` | Percentage(s) of target visibility at which the observer callback runs. See [`threshold`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds). |

## RxVirtualView Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `cacheEnabled` | `boolean` | config `cacheEnabled` (`true`) | Cache detached contents and placeholders to optimize view rendering. |
| `startWithPlaceholderAsap` | `boolean` | config `startWithPlaceholderAsap` (`false`) | Render the placeholder immediately, without waiting for the content to become visible. Counters concurrent-render flickering. |
| `keepLastKnownSize` | `boolean` | config `keepLastKnownSize` (`false`) | Keep the last known size of the host element by setting `min-height`/`min-width` while the placeholder is shown. |
| `useContentVisibility` | `boolean` | config `useContentVisibility` (`false`) | Add `content-visibility: auto` to the host together with `contain-intrinsic-width`/`contain-intrinsic-height`. |
| `useContainment` | `boolean` | config `useContainment` (`true`) | Add the `contain` CSS property: `size layout paint` when `useContentVisibility` is `true` and the placeholder is visible; `content` otherwise. |
| `placeholderStrategy` | `RxStrategyNames<string>` | config `placeholderStrategy` (`'low'`) | The render strategy used to render the placeholder. See [render strategies](../../../concepts/E5-concurrent-scheduling.md). |
| `contentStrategy` | `RxStrategyNames<string>` | config `contentStrategy` (`'normal'`) | The render strategy used to render the content. See [render strategies](../../../concepts/E5-concurrent-scheduling.md). |
| `extractSize` | `(entry: ResizeObserverEntry) => { width: number; height: number }` | border-box size | Function extracting width & height from a `ResizeObserverEntry`. |
| `resizeObserverOptions` | `ResizeObserverOptions` | — | Options passed to the underlying `ResizeObserver`. |

## RxVirtualView Outputs

| Output | Type | Description |
| --- | --- | --- |
| `visibilityChanged` | `{ content: boolean; placeholder: boolean }` | Emits whenever the virtual view transitions between showing content and showing placeholder. The emitted value is the current visibility state of both templates. |

## RxVirtualView members

| Member | Type | Description |
| --- | --- | --- |
| `visibility` | `{ content: boolean; placeholder: boolean }` (getter) | Synchronous read of the current visibility state. Accessible in the template via `exportAs="rxVirtualView"`. |

## RxVirtualViewObserver methods

| Method | Signature | Description |
| --- | --- | --- |
| `hideAll` | `(): void` | Force all virtual views in this observer to hide (e.g. when a modal opens). |
| `showAllVisible` | `(): void` | Restore visibility after `hideAll()`. Must be called to undo `hideAll()`. |

## RxVirtualViewConfig

Interface representing all configuration that can be adjusted on a provider level.

```typescript
export interface RxVirtualViewConfig {
  enabled: boolean | Signal<boolean>;
  keepLastKnownSize: boolean;
  useContentVisibility: boolean;
  useContainment: boolean;
  placeholderStrategy: RxStrategyNames<string>;
  contentStrategy: RxStrategyNames<string>;
  cacheEnabled: boolean;
  startWithPlaceholderAsap: boolean;
  scrollMargin: string;
  enableAfterHydration: boolean;
  cache: {
    /** The maximum number of contents that can be stored in the cache. Defaults to 20. */
    contentCacheSize: number;
    /** The maximum number of placeholders that can be stored in the cache. Defaults to 20. */
    placeholderCacheSize: number;
  };
}
```

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean \| Signal<boolean>` | Whether the virtual view is active. When `false`, content is rendered synchronously with no `IntersectionObserver` (useful for SSR/hydration). |
| `enableAfterHydration` | `boolean` | When the directive starts disabled and later becomes enabled: if `true`, register the visibility observer and virtualize; if `false`, keep showing content and never swap to placeholders. |
| `scrollMargin` | `string` | Default scroll margin used by `RxVirtualViewObserver`. |
| `placeholderStrategy` | `RxStrategyNames<string>` | Default placeholder render strategy. |
| `contentStrategy` | `RxStrategyNames<string>` | Default content render strategy. |

For the SSR/hydration usage of `enabled` and `enableAfterHydration`, see [How to use RxVirtualView with hydration](../how-to/virtual-view-with-hydration.md).

## Customize the config

Use `provideVirtualViewConfig` at any provider level (component, `appConfig`, route,
…). Provided values are merged over the defaults.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideVirtualViewConfig } from '@rx-angular/template/virtual-view';

const appConfig: ApplicationConfig = {
  providers: [
    provideVirtualViewConfig({
      /* your custom configuration */
    }),
  ],
};
```

`provideVirtualViewConfig` also accepts a factory function, evaluated in an injection
context, for signal-driven config (see the hydration how-to).

## Default configuration

Used when no other config is provided.

```typescript
{
  enabled: true,
  keepLastKnownSize: false,
  useContentVisibility: false,
  useContainment: true,
  placeholderStrategy: 'low',
  contentStrategy: 'normal',
  startWithPlaceholderAsap: false,
  cacheEnabled: true,
  enableAfterHydration: true,
  scrollMargin: '100px',
  cache: {
    contentCacheSize: 20,
    placeholderCacheSize: 20,
  },
}
```

## Minimal example

Render a widget when it is visible, otherwise a placeholder that reserves its size:

```html
<!-- observe against the browser viewport -->
<div rxVirtualViewObserver [root]="null">
  <div class="widget" rxVirtualView>
    <widget *rxVirtualViewContent />
    <div
      *rxVirtualViewPlaceholder
      style="min-height: var(--rx-vw-h, 100px); min-width: var(--rx-vw-w, 50px);"
    ></div>
  </div>
</div>
```

After the content renders once, the `--rx-vw-h` / `--rx-vw-w` CSS variables hold its
measured dimensions, so the placeholder can match its size and avoid layout shift.

## See also

- How-to: [Use RxVirtualView with hydration (SSR)](../how-to/virtual-view-with-hydration.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)

---
id: isr-render-config
title: "ISR Handler Config fields"
diataxis_type: reference
package: isr
legacy_guard: false
sidebar_label: "Render Config"
sidebar_position: 3
tags: [isr, api-reference]
---

# ISR Handler Config fields

Field-level reference for a subset of [`ISRHandlerConfig`](./isr-handler-config.md) fields, plus the deprecated `RenderConfig.modifyGeneratedHtml` history. For the full field table see [ISRHandlerConfig](./isr-handler-config.md).

## `allowedQueryParams`

Specifies which query parameters are included in the cache key.

- **`undefined`**: all query parameters are included in the cache key.
- **`[]`** (empty array): no query parameters are included in the cache key.
- **`string[]`**: only the listed query parameters are included in the cache key.

```ts
const isrHandlerConfig = {
  allowedQueryParams: ['param1', 'param2'], // only 'param1' and 'param2' are part of the cache key
};
```

## `modifyGeneratedHtml`

:::note
This replaced the `modifyGeneratedHtml` property in `RenderConfig`, which is now `@deprecated`; see [`RenderConfig`](./isr-handler-config.md#renderconfig).
:::

Hook into the generated HTML and apply modifications on-the-fly. Use with caution: it may cost performance on every serve. If not provided, the `defaultModifyGeneratedHtml` function is used, which only adds a comment to the HTML indicating when it was generated.

Type: [`ModifyHtmlCallbackFn`](./isr-handler-config.md#modifyhtmlcallbackfn).

## `backgroundRevalidation`

When `true`, the server serves the cached HTML as soon as possible and revalidates the cache in the background. This lets sites serve stale content when live backend APIs are down, slow, or rate-limited.

## `nonBlockingRender`

When `true`, the server returns the rendered HTML as soon as possible without waiting to store it in the cache storage first. This avoids client-side waiting times if the remote cache storage is down.

---

## See also

- Full config reference: [ISRHandlerConfig](./isr-handler-config.md)
- API reference: [`@rx-angular/isr` API](./api.md)

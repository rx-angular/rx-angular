---
sidebar_label: ISR Handler Config
sidebar_position: 12
title: ISR Handler Config
---

## ISR Handler Configuration

### allowedQueryParams

The `allowedQueryParams` property specifies which query parameters should be included in the cache key. This property can be configured as follows:

- **Undefined**: If `allowedQueryParams` is not provided, all query parameters will be included in the cache key.
- **Empty Array**: If `allowedQueryParams` is provided as an empty array, no query parameters will be included in the cache key.
- **Array of Strings**: If `allowedQueryParams` is provided as an array of strings, only the specified query parameters will be included in the cache key.

#### Example

```typescript
const isrHandlerConfig = {
  allowedQueryParams: ['param1', 'param2'], // Only 'param1' and 'param2' will be allowed to be part of the cache key
};
```

### modifyGeneratedHtml

> [!IMPORTANT]
> This replaced the `modifyGeneratedHtml` property in `RenderConfig`.

The `modifyGeneratedHtml` property allows you to hook into the generated HTML and provide any modifications on-the-fly. Use this with caution as it may lead to a performance loss when serving the HTML. If set to null, the `defaultModifyGeneratedHtml` function will be used, which only adds a commented text to the HTML to indicate when it was generated.

### backgroundRevalidation

The `backgroundRevalidation` property determines whether the server should provide the cached HTML as soon as possible and revalidate the cache in the background. If set to true, the server will serve the cached HTML immediately and update the cache in the background. This feature allows sites to serve stale content when live backend APIs are down, slow, or rate-limited.

### nonBlockingRender

The `nonBlockingRender` property determines whether the server should return the rendered HTML as soon as possible without waiting to store it in the cache storage first. If set to true, this can avoid client-side waiting times if the remote cache storage is down.

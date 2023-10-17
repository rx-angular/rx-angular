---
sidebar_label: Cache Variants
sidebar_position: 11
title: Cache Variants
---

## Why do we need it?

In some apps, pages are displayed in different variants. This can be the case, for example, if the application has a login. Users who are already logged in may not see a login button or something similar, whereas an authenticated user will.

These scenarios would lead to a content shift after delivery of the cached variant that does not correspond to the user status.

## How to use it?

For these cases the configuration can be extended by any number of render variants by the `variants` property.

```typescript title="server.ts"
const isr = new ISRHandler({
  ...
  // highlight-next-line
  variants: [] // 👈 register your variants here
});
```

The `RenderVariant` interface is defined as follows:

```typescript
export interface RenderVariant {
  identifier: string;
  detectVariant: (req: Request) => boolean;
  simulateVariant?: (req: Request) => Request;
}
```

### identifier

The `identifier` must be unique and is used next to the URL as a key for the cache.

### detectVariant

The `detectVariant` callback detects from the current request whether a defined variant must be delivered. This can happen e.g. on the basis of a cookie or similar. The return value is a boolean which determines whether this request fits the variant or not.

### simulateVariant

If on-demand revalidation is also to be used for the different variants, a way must be provided to modify the request so that it can be recognized again by the `detectVariant` callback.

For example, a placeholder for an authentication cookie can be added so that an authenticated variant of the app is rendered.
For this we use the `simulateVariant` callback, which is called before rendering to modify the request.

### Example

```typescript title="server.ts"
const isr = new ISRHandler({
  ...
  variants: [
      {
          identifier: 'logged-in', // 👈 key to cache the variant
          detectVariant: (req) => {
              // 👇 Variant is recognized as soon as the request contains a cookie 'access_token'
              return req.cookies && req.cookies.access_token;
          },
          simulateVariant: (req) => {
              // 👇 For on-demand revalidation we insert a placeholder 'access_token' cookie
              req.cookies['access_token'] = 'isr';
              return req;
          }
      },
  ]
});
```

## Gotchas

If more than one variant is registered, the one where the `detectVariant` returns `true` the first time is used.

If a variant is to become a combination of different variants, this state should be registered as an independent variant before the corresponding single variant.

```typescript title="server.ts"
const isr = new ISRHandler({
  ...
  variants: [
      {
          identifier: 'A_AND_B',
          detectVariant: (req) => req.cookies && req.cookies.is_A && req.cookies.is_B,
          simulateVariant: (req) => {
              req.cookies['is_A'] = true;
              req.cookies['is_B'] = true;
              return req;
          }
      },
      {
          identifier: 'A',
          detectVariant: (req) => req.cookies && req.cookies.is_A,
          simulateVariant: (req) => {
              req.cookies['is_A'] = true;
              return req;
          }
      },
      {
          identifier: 'B',
          detectVariant: (req) => req.cookies && req.cookies.is_B,
          simulateVariant: (req) => {
              req.cookies['is_B'] = true;
              return req;
          }
      },
  ]
});
```

:::caution **Important:**
For each variant entered here, a corresponding duplicate is cached per page. So be aware that depending on the cache handler this could significantly increase the disk or RAM usage.
:::

Note that when using placeholder cookies or similar, the application should have appropriate exceptions defined to avoid runtime errors caused by invalid values.

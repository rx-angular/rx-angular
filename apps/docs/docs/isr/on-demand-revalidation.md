---
sidebar_label: On Demand Revalidation
sidebar_position: 5
title: On Demand Revalidation
---

## Why do we need it?

Caching is a great way to improve the performance of your app. But, sometimes you need to
revalidate the cache when the data changes. This is where on-demand revalidation comes in
handy.

On-demand revalidation is a feature that allows you to revalidate the cache whenever you want.
So, you won't have to wait for the cache to expire to get the latest data.

## How to use it?

In order to use on-demand revalidation, we need to add some configuration in the
**server.ts** file.

```json
{
  "token": "your-secret-token",
  "urlsToInvalidate": ["/", "/docs/on-demand-revalidation"]
}
```

Now, we can invalidate the cache by sending a**POST** request to the **/api/invalidate** endpoint. With the below request body:

```typescript
export function app(): express.Express {
  // other configurations
  // 👇 add this line in order to allow the server to read the body of the request
  server.use(express.json());

  // 👇 add this line to enable on-demand revalidation
  server.post(
    '/api/invalidate',
    async (req, res) => await isr.invalidate(req, res)
  );
}
```

**token** is the secret token that you set in the **ISRHandler invalidateSecretToken** field. **urlsToInvalidate** is an array of URLs that you want to invalidate.

Here's an example of how to invalidate the cache using**Postman**:

<img src="assets/images/on-demand-postman.png" alt="Postman Invalidate Cache" />

## Usecases

This feature is best used when you have a CMS that updates the data frequently.
For example, if you have a blog that you update frequently, you can use on-demand revalidation
to invalidate the cache whenever you update a blog post.
This way, you won't have to wait for the cache to expire to get the latest data.

> Hint:
> By setting the**revalidate: 0**, you can disable the scheduled (automatic) revalidation.
> The cache will never revalidate, unless you manually invalidate it using on-demand revalidation.
>
> It's just like when you use**changeDetectorRef.detach** with **changeDetectorRef.detectChanges** methods.**You have full control!**

---
sidebar_label: Cache Hooks
sidebar_position: 7
title: Cache Hooks
---

## Cache Hooks

There are cases where you want to modify the html that is served from cache or the html that is generated on the fly.

For example, you might want to add some tracking scripts to the html that is served from cache. Or you might want to add some custom html to the html that is generated on the fly.

To do that, you can use the `modifyCachedHtml` and `modifyGeneratedHtml` callbacks.

### modifyCachedHtml

The `modifyCachedHtml` callback is called when the html is served from cache (on every user request). It receives the request and the cached html as parameters. It should return the modified html.

### modifyGeneratedHtml

The `modifyGeneratedHtml` callback is called when the html is generated on the fly (before the cache is stored). It receives the request and the generated html as parameters. It should return the modified html.

### Example

```ts
server.get(
  '*',
  // Serve page if it exists in cache
  async (req, res, next) =>
    await isr.serveFromCache(req, res, next, {
      modifyCachedHtml: (req, cachedHtml) => {
        return `${cachedHtml}<!-- Hello, I'm a modification to the original cache! -->`;
      },
    }),

  const isr = new ISRHandler({
    indexHtml,
    invalidateSecretToken: 'MY_TOKEN', // replace with env secret key ex. process.env.REVALIDATE_SECRET_TOKEN
    enableLogging: true,
    serverDistFolder,
    browserDistFolder,
    bootstrap,
    commonEngine,
    modifyGeneratedHtml: (req, html) => {
      return `${html}<!-- Hello, I'm modifying the generatedHtml before caching it! -->`;
    },
    // cache: fsCacheHandler,
  });

// Server side render the page and add to cache if needed
  async (req, res, next) => await isr.render(req, res, next),
);
```

:::caution **Important:**
Use these methods with caution as the logic written can increase the processing time.
:::

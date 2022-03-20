# Incremental Static Regeneration for Angular
> Incremental Static Regeneration (ISR) enables developers and content editors to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages. [Source](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

# How to use it?

1. Install npm package
```bash
npm install ngx-isr
```

> Make sure you have Angular Universal in your app.

> Setup Angular Universal: `ng add @nguniversal/express-engine`


2. Initialize `ISRHandler` inside `server.ts`
```ts
const isr = new ISRHandler({
  cache: { type: 'memory' },
  indexHtml,
  invalidateSecretToken: 'MY_TOKEN', // replace with env secret key
  enableLogging: !environment.production
});
```

3. Add invalidation url handler
```ts
server.get("/api/invalidate", async (req, res) => await isr.invalidate(req, res));
```

4. Replace Angular default server side rendering with ISR rendering

Replace
```ts
server.get('*',
 (req, res) => {
   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
 }
);
```
with
```ts
server.get('*',
  // Serve page if it exists in cache
  async (req, res, next) => await isr.serveFromCache(req, res, next),
  // Server side render the page and add to cache if needed
  async (req, res, next) => await isr.render(req, res, next),
);
```
> NOTE: Routes that don't have revalidate key in data won't be handled by ISR, they will fallback to Angular default server side rendering pipeline.

5. Add `revalidate` key in route data

Example:
```ts
{
  path: "example",
  component: ExampleComponent,
  data: { revalidate: 5 },
}
```

6. Add `NgxIsrService` in AppComponent contructor
```ts
  constructor(private isrService: NgxIsrService) {}
```
By adding the service in the constructor it will be initialized and start to listen to route changes.

**It will be run only on server side.**

# Play with demo [Stackblitz](https://stackblitz.com/edit/node-cvlod6?file=server.ts)

```bash
git clone https://github.com/eneajaho/ngx-isr.git
npm install
npm run dev:ssr
```

1. **Disable Javascript** (in order to not load Angular after the page loads)
2. Navigate to different pages and check how the cache gets regenerated in terminal logs


# How it works?
- [Explanation video](https://vimeo.com/687530247) (w/o voice)

The first time a user opens a pages, we server-side render that page, and save its result in cache.

Next time when a user requests the same page he will be served the first cached response.

To handle Incremental Static Regeneration, we need to configure it from our route data.

For example:
```ts
const routes: Routes = [
  {
    path: "one",
    component: PageOneComponent,
  },
  {
    path: "two",
    component: PageTwoComponent,
    data: { revalidate: 5 },
  },
  {
    path: "three",
    component: PageThreeComponent,
    data: { revalidate: 0 },
  },
];
```

- Path `/one` won't be cached at all, and everytime it is requested it will be server-rendered and then will be served to the user.

- Path `/two` on the first request will be server-rendered and then will be cached. On the second request to it, the user will be served the cache that we got on the first request.
The url will be added to a regeneration queue, in order to re-generate the cache after `5` seconds.
On the third request to the same url, if the regeneration was finished the user will be served the regenerated page otherwise he will be served with the old cached page.

- Path `/three` after the first request that is server-rendered, the page will be added to cache and the cache will never be deleted automatically as in path `/two`. So after the first request, all the other ones will come from the cache.

## What's next?
- Add tests
- Add create cache at production build
- Add Redis implementation to handle cache
- Check-out what can be done with hybrid-rendering (using cached pages as prerendered ones)
- Add an api to invalidate (regenerate) multiple pages at once (using post request with urls in body)

## License
MIT
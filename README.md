<p align="center">
  <img width="460" height="300" src="https://raw.githubusercontent.com/eneajaho/ngx-isr/main/projects/ngx-isr-demo/src/assets/logo.svg">
</p>

# Incremental Static Regeneration for Angular
A library that enables Angular Universal applications to generate static pages at runtime and then update them incrementally on demand or on a schedule.

📰 [Documentation](https://ngx-isr.vercel.app/)

📰 [ISR Blog post](https://itnext.io/incremental-static-regeneration-for-angular-42b0a8440e53)

# Features
- ⏰ Scheduled cache invalidation
- ▶️ On-demand cache invalidation
- 🔌  Plugin based cache handlers
- 👌 No build changes required!
- 🅰️ Supports Angular Universal
- 🛡️ NgModules & Standalone Compatible

# How to use it?

1. Install npm package
```bash
npm install ngx-isr
# or
yarn add ngx-isr
# or
pnpm add ngx-isr
```

2. Initialize `ISRHandler` inside `server.ts`
```ts
const isr = new ISRHandler({
  indexHtml,
  invalidateSecretToken: 'MY_TOKEN', // replace with env secret key ex. process.env.REVALIDATE_SECRET_TOKEN
  enableLogging: !environment.production
});
```

3. Add invalidation url handler
```ts
server.use(express.json());
server.post("/api/invalidate", async (req, res) => await isr.invalidate(req, res));
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

You can also pass `providers` to each of the `ISRHandler` methods.

```ts
server.get('*',
  ...
    async (req, res, next) => await isr.render(req, res, next, {
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }, // <-- Needs to be provided when passing providers
        { provide: CUSTOM_TOKEN, useValue: 'Hello from ISR' },
        CustomService
      ]
    }),
);
```

It is also possible to pass a `modifyCachedHtml` or `modifyGeneratedHtml` callbacks to the `ISRHandler` methods.
These methods provide a way to modify the html served from cache or the html that is generated on the fly.

**Important:** Use these methods with caution as the logic written can increase the processing time.
```ts
server.get('*',
  // Serve page if it exists in cache
  async (req, res, next) => await isr.serveFromCache(req, res, next, {
    modifyCachedHtml: (req, cachedHtml) => {
        return `${cachedHtml}<!-- Hello, I'm a modification to the original cache! -->`;
    }
  }),
  // Server side render the page and add to cache if needed
  async (req, res, next) => await isr.render(req, res, next, {
    modifyGeneratedHtml: (req, html) => {
      return `${html}<!-- Hello, I'm modifying the generatedHtml before caching it! -->`
    }
  }),
);
```

ISRHandler provides `APP_BASE_HREF` by default. And if you want pass `providers` into the methods of ISRHandler, you will also have to provide `APP_BASE_HREF` token.

5. Add `revalidate` key in route data

Example:
```ts
{
  path: "example",
  component: ExampleComponent,
  data: { revalidate: 5 },
}
```

> **NOTE:** Routes that don't have revalidate key in data won't be handled by ISR. They will fallback to Angular default server side rendering pipeline.


6. Register providers
To register the ngx-isr providers, you can either import `NgxIsrModule` in your `AppServerModule` or provide `provideISR` in your `AppServerModule` providers.

Or, if you are in a standalone app, you can register the providers in your `app.config.server.ts` file.


- Register using `NgxIsrModule`

```ts
import { NgxIsrModule } from 'ngx-isr'; // <-- Import module from library

@NgModule({
  imports: [
    ...
    NgxIsrModule.forRoot()  // <-- Use it in module imports
  ]
})
export class AppServerModule {}
```

- Register using the `provideISR` function

```ts
import { provideISR } from 'ngx-isr';

@NgModule({
  providers: [
    provideISR() // <-- Use it in module providers
  ]
})
export class AppServerModule {}
```

- Register using the `provideISR` function in standalone app
  
```ts
import { provideISR } from 'ngx-isr';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideISR() // <-- Use it in config providers
  ],
};
```

When registering the providers, `NgxIsrService` will be initialized and will start to listen to route changes, only on the server side, so the browser bundle won't contain any extra code.

# Play with demo

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

## Changelog
- version 0.5.2
  * feat: Migrate repository to nx workspace
  * feat: Added `provideISR` provider function
  * chore: Update example RedisCacheHandler to use a prefix
## License
MIT


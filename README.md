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

# Changelog

## Version 0.5.4

### Features

- feat: refactor FileSystem cache handler from scratch (fixes: #35)
- fix: buildId can be null but also undefined, added a check for it

## Version 0.5.3

### Features
  
- feat: Introduce `RouteISRConfig` interface for better type safety in route data
  
  How to use it? 
  ```ts
  const routes: Rotues = [{
    path: 'home',
    component: HomeComponent,
    data: { revalidate: 0 } as RouteISRConfig // 👈 Add type to route data
  }];
  ```

- feat: Added build id support 

  **What is it and why do we need it?**

  The build id is a unique identifier that is generated for each build. It is used to invalidate the cache when a new build is deployed. So, when a new build is deployed, every page that will be requested will be server-rendered again and not served from the cache. This way, the users will always get the latest version of the application. 
  
  _Useful when you have an external cache handler like Redis._

  **How to use it?**
  
  To use it, you need to pass the build id to the `ISRHandler` constructor. 
  Angular itself doesn't generate a build id. But we can generate it using the environment file.
  What we can do is to set field in the environment file called `buildId` and set it to: `new Date().getTime(),`. 

  Ex. environment.ts: 
  ```ts
  export const environment = {
    production: false,
    buildId: new Date().getTime() + '', // We need to convert it to string because the buildId is a string
  };
  ```
  This way we will have a unique build id for each build because the buildId will evaluated at build time. 
  Then, we pass the build id to the ISRHandler constructor.

  Ex. server.ts: 
  ```ts
  import { environment } from './src/environments/environment';

  const isr = new ISRHandler({
    .. other options
    buildId: environment.buildTimestamp // Pass the build id
  });
  ```

- fix: Fixed a bug where the cache was not invalidated when the build id changed 


### Breaking changes:
- `ISROptions` is being deprecated. Use `CacheISRConfig` instead.


## Version 0.5.2
  * feat: Migrate repository to nx workspace
  * feat: Added `provideISR` provider function
  * chore: Update example RedisCacheHandler to use a prefix

## License
MIT

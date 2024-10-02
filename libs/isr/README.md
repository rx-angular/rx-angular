<p align="center">
  <img width="460" height="300" src="https://raw.githubusercontent.com/rx-angular/rx-angular/main/apps/docs/static/img/isr-logo.png" />
</p>

# @rx-angular/isr

A library that enables Angular Universal applications to generate static pages at runtime and then update them incrementally on demand or on a schedule.

## Features

- ⏰ Scheduled cache invalidation
- ▶️ On-demand cache invalidation
- 🔌 Plugin based cache handlers
- 👌 No build changes required!
- 🅰️ Supports Angular Universal
- 🛡️ NgModules & Standalone Compatible

## Installation

```
npm install @rx-angular/isr
```

## Version Compatibility

| RxAngular | Angular   |
| --------- | --------- |
| `^18.0.0` | `^18.0.0` |
| `^17.1.0` | `^17.0.0` |
| `^16.0.0` | `^16.0.0` |

## How to use it?

1. Initialize `ISRHandler` inside `server.ts`

```ts
const isr = new ISRHandler({
  indexHtml,
  invalidateSecretToken: 'MY_TOKEN', // replace with env secret key ex. process.env.REVALIDATE_SECRET_TOKEN
  enableLogging: !environment.production,
});
```

2. Add invalidation url handler

```ts
server.use(express.json());
server.post('/api/invalidate', async (req, res) => await isr.invalidate(req, res));
```

3. Replace Angular default server side rendering with ISR rendering

Replace

```ts
server.get('*', (req, res) => {
  res.render(indexHtml, {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  });
});
```

with

```ts
server.get(
  '*',
  // Serve page if it exists in cache
  async (req, res, next) => await isr.serveFromCache(req, res, next),
  // Server side render the page and add to cache if needed
  async (req, res, next) => await isr.render(req, res, next),
);
```

You can also pass `providers` to each of the `ISRHandler` methods.

```ts
server.get(
  '*',
  ...async (req, res, next) =>
    await isr.render(req, res, next, {
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }, // <-- Needs to be provided when passing providers
        { provide: CUSTOM_TOKEN, useValue: 'Hello from ISR' },
        CustomService,
      ],
    }),
);
```

It is also possible to pass a `modifyCachedHtml` or `modifyGeneratedHtml` callbacks to the `ISRHandler` methods.
These methods provide a way to modify the html served from cache or the html that is generated on the fly.

**Important:** Use these methods with caution as the logic written can increase the processing time.

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
  // Server side render the page and add to cache if needed
  async (req, res, next) =>
    await isr.render(req, res, next, {
      modifyGeneratedHtml: (req, html) => {
        return `${html}<!-- Hello, I'm modifying the generatedHtml before caching it! -->`;
      },
    }),
);
```

ISRHandler provides `APP_BASE_HREF` by default. And if you want pass `providers` into the methods of ISRHandler, you will also have to provide `APP_BASE_HREF` token.

4. Add `revalidate` key in route data

Example:

```ts
{
  path: "example",
  component: ExampleComponent,
  data: { revalidate: 5 },
}
```

> **NOTE:** Routes that don't have revalidate key in data won't be handled by ISR. They will fallback to Angular default server side rendering pipeline.

5. Register providers
   To register the ISR providers, you can either import `IsrModule` in your `AppServerModule` or provide `provideISR` in your `AppServerModule` providers.

Or, if you are in a standalone app, you can register the providers in your `app.config.server.ts` file.

- Register using `IsrModule`

```ts
import { IsrModule } from '@rx-angular/isr/server'; // <-- Import module from library

@NgModule({
  imports: [
    IsrModule.forRoot(), // <-- Use it in module imports
  ],
})
export class AppServerModule {}
```

- Register using the `provideISR` function

```ts
import { provideISR } from '@rx-angular/isr/server';

@NgModule({
  providers: [
    provideISR(), // <-- Use it in module providers
  ],
})
export class AppServerModule {}
```

- Register using the `provideISR` function in standalone app

```ts
import { provideISR } from '@rx-angular/isr/server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideISR(), // <-- Use it in config providers
  ],
};
```

When registering the providers, `IsrService` will be initialized and will start to listen to route changes, only on the server side, so the browser bundle won't contain any extra code.

## License

MIT

---
id: set-up-isr
title: 'How to set up ISR in an SSR app'
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: 'Set up ISR'
sidebar_position: 1
tags: [isr, guides]
concepts: [E8]
---

# How to set up ISR in an SSR app

## Goal

Wire `@rx-angular/isr` into an existing Angular SSR application so that routes marked with `revalidate` are cached and served from cache. This recipe assumes you already understand _how ISR works_ (route-data capture → cache decision at render-finish); if you don't, read the [How ISR works](../../../concepts/E8-how-isr-works.md) concept first. This page is the task only; every symbol used here is documented in the [ISR API reference](../reference/api.md) and [`ISRHandlerConfig`](../reference/isr-handler-config.md).

## Steps

1. **Add Angular SSR to the app** (skip if already server-rendered).

   ```shell
   ng add @angular/ssr
   ```

   This scaffolds `main.server.ts`, `server.ts`, and the server build target.

2. **Install `@rx-angular/isr`.**

   ```shell
   npm install @rx-angular/isr
   ```

3. **Register the ISR providers** in your standalone server config (`main.server.ts`). Add [`provideISR()`](../reference/api.md#provideisr) and register the [`isrHttpInterceptors`](../reference/api.md#isrhttpinterceptors) with `provideHttpClient(withInterceptors(...))`.

   ```typescript title="main.server.ts"
   import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
   import { provideServerRendering } from '@angular/ssr';
   import { provideHttpClient, withInterceptors } from '@angular/common/http';
   import { provideISR, isrHttpInterceptors } from '@rx-angular/isr/server';

   import { appConfig } from './app/app.config';

   const serverConfig: ApplicationConfig = {
     providers: [
       provideServerRendering(),
       // highlight-next-line
       provideISR(), // 👈 register the ISR providers
       provideHttpClient(withInterceptors(isrHttpInterceptors)),
     ],
   };

   export const config = mergeApplicationConfig(appConfig, serverConfig);
   ```

4. **Instantiate `ISRHandler` in `server.ts`** and wire it into the request pipeline. Pass the render engine, either [`commonEngine`](../reference/isr-handler-config.md#fields) or [`angularAppEngine`](../reference/isr-handler-config.md#fields). This recipe uses `CommonEngine`; the `AngularNodeAppEngine` variant is shown below.

   ```typescript title="server.ts"
   import { CommonEngine } from '@angular/ssr/node';
   import express from 'express';
   import { fileURLToPath } from 'node:url';
   import { dirname, join, resolve } from 'node:path';
   import bootstrap from './src/main.server';

   // highlight-next-line
   import { ISRHandler } from '@rx-angular/isr/server';

   export function app(): express.Express {
     const server = express();
     const serverDistFolder = dirname(fileURLToPath(import.meta.url));
     const browserDistFolder = resolve(serverDistFolder, '../browser');
     const indexHtml = join(serverDistFolder, 'index.server.html');

     const commonEngine = new CommonEngine();

     // Query params allowed in the cache key. `undefined` = all, `[]` = none.
     const allowedQueryParams = ['page'];

     // highlight-start
     const isr = new ISRHandler({
       indexHtml,
       invalidateSecretToken: process.env['REVALIDATE_SECRET_TOKEN'] ?? 'MY_TOKEN',
       enableLogging: true,
       serverDistFolder,
       browserDistFolder,
       bootstrap,
       commonEngine,
       allowedQueryParams,
     });
     // highlight-end

     server.use(express.json());
     server.post('/api/invalidate', async (req, res) => await isr.invalidate(req, res));

     server.set('view engine', 'html');
     server.set('views', browserDistFolder);

     server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

     // highlight-start
     server.get(
       '*',
       // Serve the page if it exists in cache…
       async (req, res, next) => await isr.serveFromCache(req, res, next),
       // …otherwise render it and add it to the cache when needed.
       async (req, res, next) => await isr.render(req, res, next),
     );
     // highlight-end

     return server;
   }
   ```

   :::note Using `AngularNodeAppEngine` instead
   On the newer `@angular/ssr` application builder output, pass `angularAppEngine` instead of `commonEngine`. Both are [`ISRHandlerConfig`](../reference/isr-handler-config.md#fields) fields; supply exactly one.

   ```typescript title="server.ts (excerpt)"
   import { AngularNodeAppEngine } from '@angular/ssr/node';

   const angularAppEngine = new AngularNodeAppEngine();

   const isr = new ISRHandler({
     indexHtml,
     invalidateSecretToken: process.env['REVALIDATE_SECRET_TOKEN'] ?? 'MY_TOKEN',
     serverDistFolder,
     browserDistFolder,
     bootstrap,
     // highlight-next-line
     angularAppEngine,
   });
   ```

   :::

5. **Mark the routes you want cached** with a `revalidate` value in the route `data`. Routes without `revalidate` are passed through un-cached.

   ```typescript title="app.routes.ts"
   import { Routes } from '@angular/router';
   import { RouteISRConfig } from '@rx-angular/isr/models';

   export const routes: Routes = [
     {
       path: 'home',
       component: HomeComponent,
       // highlight-next-line
       data: { revalidate: 100 } as RouteISRConfig,
     },
   ];
   ```

   `revalidate` is the number of seconds after which the cached page is regenerated on the next hit. See [`RouteISRConfig`](../reference/isr-handler-config.md#routeisrconfig) for the `null` / `0` / `N` value semantics.

6. **Run it in development.** On Angular v17.1+ (v21 here), `ng serve` runs your `server.ts`, so ISR works under the normal dev-server:

   ```shell
   ng serve
   ```

   > On an older builder that does not execute `server.ts` in dev, build and serve the server bundle directly instead: `ng build --watch --configuration development`, then `node dist/your-app/server/server.mjs`.

## Result

Request a `revalidate`-enabled route twice. The first request server-renders and caches the page; the second request is served from the cache. With `enableLogging: true` the ISR logs show a cache hit, and the response returns without a fresh render.

## See also

- Reference: [`@rx-angular/isr` API](../reference/api.md): `ISRHandler`, `provideISR`, `isrHttpInterceptors`.
- Reference: [`ISRHandlerConfig`](../reference/isr-handler-config.md): all 18 config fields and the `RouteISRConfig` route data.
- Concept: [**How ISR works**](../../../concepts/E8-how-isr-works.md) (E8): the route-data capture → cache-decision mechanism this recipe assumes.

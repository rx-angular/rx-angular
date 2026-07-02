---
id: T3-add-isr-to-an-ssr-app
title: "Add ISR to an SSR app"
diataxis_type: tutorial
package: _site
legacy_guard: false
sidebar_label: "Add ISR to an SSR app"
sidebar_position: 3
tags: [isr, examples]
concepts: [E8]
---

:::caution Candidate tutorial — not a committed launch artifact
**T3 is a stretch / candidate deliverable.** The committed launch tutorials are T1, T2, and T4; ISR is not a launch tutorial (goal.md §11.4). This page exists to demonstrate the Tutorial page shape and to give ISR a single guaranteed-success path. Treat it as illustrative, not a supported track.
:::

# Add ISR to an SSR app

By the end of this lesson you will have an Angular SSR app that caches one route with Incremental Static Regeneration and serves it straight from cache on the second visit.

## Prerequisites

- **Node.js 20+** and **npm 10+**.
- **Angular 21** with a standalone, zoneless app created from a fresh `ng new my-app` (no `NgModule` bootstrap).
- **`@rx-angular/isr` 21** (peer `@angular/ssr ^21`).

We start from a brand-new app and add everything the lesson needs, so it cannot fail.

## Steps

### 1. Create the app and add SSR

Create a fresh app and add Angular SSR:

```shell
ng new my-app
cd my-app
ng add @angular/ssr
```

You now have a `main.server.ts`, a `server.ts`, and an SSR build target. Running `ng serve` renders the app on the server.

### 2. Install ISR

```shell
npm install @rx-angular/isr
```

`@rx-angular/isr` is now in your `package.json` dependencies.

### 3. Register the ISR providers

Open `main.server.ts` and register the ISR providers in the server config:

```typescript title="main.server.ts"
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideISR, isrHttpInterceptors } from '@rx-angular/isr/server';

import { appConfig } from './app/app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideISR(),
    provideHttpClient(withInterceptors(isrHttpInterceptors)),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

The app still builds and serves exactly as before: ISR is registered but no route is cached yet.

### 4. Wire the ISR handler into the server

Open `server.ts` and instantiate `ISRHandler` with `CommonEngine`, then serve requests through it:

```typescript title="server.ts"
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { ISRHandler } from '@rx-angular/isr/server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  const isr = new ISRHandler({
    indexHtml,
    invalidateSecretToken: 'MY_TOKEN',
    enableLogging: true,
    serverDistFolder,
    browserDistFolder,
    bootstrap,
    commonEngine,
  });

  server.use(express.json());
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  server.get(
    '*',
    async (req, res, next) => await isr.serveFromCache(req, res, next),
    async (req, res, next) => await isr.render(req, res, next),
  );

  return server;
}
```

Every request now passes through ISR: it tries the cache first, then falls back to rendering.

### 5. Cache one route

Open `app.routes.ts` and give the home route a `revalidate` value:

```typescript title="app.routes.ts"
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { revalidate: 100 },
  },
];
```

The home route is now marked for caching for 100 seconds.

### 6. Build, serve, and see the cache hit

On Angular 21, `ng serve` runs `server.ts`, so start the dev-server normally:

```shell
ng serve
```

Open `http://localhost:4200/` in your browser. **Reload the page.** In the terminal running the server, the ISR logs show the first request rendering the page and the second request **served from cache**. That cache hit on the second visit is the success signal that proves ISR is working.

## What you built

An Angular 21 SSR app with `@rx-angular/isr` wired through `CommonEngine`, one route cached with `revalidate`, and a confirmed cache hit on the second request.

## Next steps

- Go deeper: [**How ISR works**](../concepts/E8-how-isr-works.md) (E8): the mechanism behind the cache decision.
- Do it for real: [How to set up ISR in an SSR app](../packages/isr/how-to/set-up-isr.md): the same wiring as a task recipe, with the `AngularNodeAppEngine` variant and on-demand invalidation.

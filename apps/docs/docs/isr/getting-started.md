---
sidebar_label: Getting Started
sidebar_position: 3
title: Getting Started
---

## Installation

### Preconditions

To get started, first you need an application to have Angular Universal installed and configured.

**@rx-angular/isr** is available as an npm package. To install it, run the following command:

```shell
npm install @rx-angular/isr
```

or if you use yarn or pnpm:

```shell
yarn add @rx-angular/isr
```

```shell
pnpm add @rx-angular/isr
```

## Configure providers

To use it in your application, you need to register the providers in your **app.server.module.ts** file.

- Import the **provideISR()** function from the **@rx-angular/isr/server** package.
- Register the provider in the **providers** array of your **NgModule**.

```typescript title="app.server.module.ts"
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// 1. 👇 Import the provider function
// highlight-next-line
import { provideISR } from '@rx-angular/isr/server';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    // highlight-next-line
    provideISR(), // 2. 👈 Register the provider
  ],
})
export class AppServerModule {}
```

If you are in a standalone application, you can also register the provider in the **serverConfig**.

```typescript title="main.server.ts"
import { provideISR } from '@rx-angular/isr/server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // highlight-next-line
    provideISR(), // 👈 Use it in config providers
  ],
};
```

## Configure server handling

Now you need to configure the ISR handler in your **server.ts** file.

1. Import the **ISRHandler ** class from the **@rx-angular/isr** package.
2. Create a new instance of the **ISRHandler** class.
3. Use the ISRHandler instance to handle the requests.
4. Comment out default angular universal handler, because it's will be handled in ISR render method.

```typescript title="server.ts"
import { environment } from './src/environments/environment';
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { existsSync } from 'fs';

// 1. 👇 Import the ISRHandler class
// highlight-next-line
import { ISRHandler } from '@rx-angular/isr/server';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/docs/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // 2. 👇 Instantiate the ISRHandler class with the index.html file
  // highlight-start
  const isr = new ISRHandler({
    indexHtml,
    invalidateSecretToken: process.env['INVALIDATE_TOKEN'] || 'MY_TOKEN',
    enableLogging: !environment.production,
  });
  // highlight-end

  server.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, { maxAge: '1y' }));

  // 3. 👇 Use the ISRHandler to handle the requests
  // highlight-start
  server.get(
    '*',
    // Serve page if it exists in cache
    async (req, res, next) => await isr.serveFromCache(req, res, next),
    // Server side render the page and add to cache if needed
    async (req, res, next) => await isr.render(req, res, next)
  );
  // highlight-end

  // 4: 👇 Comment out default angular universal handler, because it's will be handled in ISR render method
  // (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // }

  return server;
}
```

:::tip
Congratulations! You have successfully configured the **@rx-angular/isr** package.
:::

## Configure routes

Now that we have configured the **@rx-angular/isr** package, we need to configure the routes that
we want to be cached using ISR.

To do this, we need to add the **revalidate** key in the route **data** object.

```typescript title="app.routes.ts"
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      // highlight-next-line
      revalidate: 100, // 👈 Add the revalidate key
    },
  },
];
```

The **revalidate** key is the number of seconds after which the page will be revalidated.

If you don't want a specific route to be handled by the ISR handler, you just shouldn't add
the **revalidate** key in the route **data** object.

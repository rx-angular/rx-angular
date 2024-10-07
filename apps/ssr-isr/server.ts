import { CommonEngine } from '@angular/ssr';
import { ModifyHtmlCallbackFn } from '@rx-angular/isr/models';
import { ISRHandler } from '@rx-angular/isr/server';
import express, { Request } from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RESPONSE } from './src/app/redirect.component';
import bootstrap from './src/main.server';
// import { FileSystemCacheHandler } from '@rx-angular/isr/server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // const fsCacheHandler = new FileSystemCacheHandler({
  //   cacheFolderPath: join(browserDistFolder, '/cache'),
  //   prerenderedPagesPath: browserDistFolder,
  //   addPrerenderedPagesToCache: true,
  // });

  const commonEngine = new CommonEngine();

  const isr = new ISRHandler({
    indexHtml,
    invalidateSecretToken: 'MY_TOKEN', // replace with env secret key ex. process.env.REVALIDATE_SECRET_TOKEN
    enableLogging: true,
    serverDistFolder,
    browserDistFolder,
    bootstrap,
    commonEngine,
    backgroundRevalidation: true, // will revalidate in background and serve the cache page first
    nonBlockingRender: true, // will serve page first and store in cache in background
    modifyGeneratedHtml: customModifyGeneratedHtml,
    // cache: fsCacheHandler,
  });

  server.use(express.json());

  server.post(
    '/api/invalidate',
    async (req, res) => await isr.invalidate(req, res),
  );

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  server.get(
    '*',
    // Serve page if it exists in cache
    async (req, res, next) =>
      await isr.serveFromCache(req, res, next, {
        providers: [{ provide: RESPONSE, useValue: res }],
      }),

    // Server side render the page and add to cache if needed
    async (req, res, next) =>
      await isr.render(req, res, next, {
        providers: [{ provide: RESPONSE, useValue: res }],
      }),
  );

  return server;
}

const customModifyGeneratedHtml: ModifyHtmlCallbackFn = (
  req: Request,
  html: string,
): string => {
  const time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  let msg = '<!-- ';
  msg += `\n🚀 ISR: Served from cache! \n⌛ Last updated: ${time}. `;
  msg += ' \n-->';
  html = html.replace('Original content', 'Modified content');
  return html + msg;
};

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

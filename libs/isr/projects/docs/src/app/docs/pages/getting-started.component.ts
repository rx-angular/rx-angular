import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { AlerSuccessComponent } from '../components/alert-success.component';
import { AlertWarningComponent } from '../components/alert-warning.component';
import { TerminalBlockComponent } from '../components/terminal-block.component';
import { DocsPageSectionComponent } from '../layout/docs-page-section.component';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  template: `
    <app-alert-warning>
      <span title>Warning</span>
      <span description>
        To get started, first you need an application to have Angular Universal installed and
        configured.
      </span>
    </app-alert-warning>

    <br />
    <docs-page-section title="Installation">
      <p>
        <b>ngx-isr</b> is available as an npm package. To install it, run the following command:
      </p>
      <br />
      <app-terminal-block text="npm install ngx-isr"></app-terminal-block>
      <br />
      <p>or if you use yarn or pnpm:</p>
      <br />
      <app-terminal-block text="yarn add ngx-isr"></app-terminal-block>
      <br />
      <app-terminal-block text="pnpm add ngx-isr"></app-terminal-block>
    </docs-page-section>

    <br />

    <docs-page-section title="Configure providers">
      <p>
        To use it in your application, you need to register the providers in your
        <b>app.server.module.ts</b> file.
      </p>
      <br />
      <p>
        <b>1.</b> Import the <b>provideISR()</b> function from the <b>ngx-isr</b> package.
        <br />
        <b>2.</b> Register the provider in the <b>providers</b> array of your <b>NgModule</b>.
      </p>
      <br />
      <pre>
        <code
          class="!m-0 !p-0 bg-gray-900"
          [highlight]="appServerModuleCode"
          [languages]="['typescript']"
          [lineNumbers]="true">
        </code>
      </pre>

      <p>
        If you are in a standalone application, you can also register the provider in the
        <b>serverConfig</b>.
      </p>
      <br />
      <pre>
        <code
          class="!m-0 !p-0 bg-gray-900"
          [highlight]="serverConfigCode"
          [languages]="['typescript']"
          [lineNumbers]="true">
        </code>
      </pre>
    </docs-page-section>

    <docs-page-section title="Configure server handling">
      <p>Now you need to configure the ISR handler in your <b>server.ts</b> file.</p>
      <br />
      <ol>
        <li>1. Import the <b>ISRHandler</b> class from the <b>ngx-isr</b> package.</li>
        <li>2. Create a new instance of the <b>ISRHandler</b> class.</li>
        <li>3. Use the ISRHandler instance to handle the requests.</li>
        <li>
          4. Comment out default angular universal handler, because it's will be handled in ISR
          render method.
        </li>
      </ol>
      <br />
      <pre>
        <code
          class="!m-0 !p-0 bg-gray-900"
          [highlight]="serverTsCode"
          [languages]="['typescript']"
          [lineNumbers]="true">
        </code>
      </pre>
    </docs-page-section>
    <app-alert-success>
      <span title>Congratulations!</span>
      <span description> You have successfully configured the <b>ngx-isr</b> package.</span>
    </app-alert-success>
    <br />
    <docs-page-section title="Configure routes">
      <p>
        Now that we have configured the <b>ngx-isr</b> package, we need to configure the routes that
        we want to be cached using ISR.
      </p>

      <br />

      <p>To do this, we need to add the <b>revalidate</b> key in the route <b>data</b> object.</p>

      <pre>
        <code
          class="!m-0 !p-0 bg-gray-900"
          [highlight]="routesCode"
          [languages]="['typescript']"
          [lineNumbers]="true">
        </code>
      </pre>

      <p class="text-herbs">
        The <b>revalidate</b> key is the number of seconds after which the page will be revalidated.
      </p>

      <br />

      <p class="text-pumpikin">
        If you don't want a specific route to be handled by the ISR handler, you just shouldn't add
        the
        <b>revalidate</b> key in the route <b>data</b> object.
      </p>
    </docs-page-section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocsPageSectionComponent,
    AlertWarningComponent,
    TerminalBlockComponent,
    CommonModule,
    HighlightModule,
    AlerSuccessComponent,
  ],
})
export default class IntroComponent {
  constructor() {
    configurePage(PAGE_IDS.gettingStarted);
  }

  appServerModuleCode = `
  import { NgModule } from '@angular/core';
  import { ServerModule } from '@angular/platform-server';

  import { AppModule } from './app.module';
  import { AppComponent } from './app.component';

  // 1. 👇 Import the provider function
  import { provideISR } from 'ngx-isr/server';

  @NgModule({
    imports: [
      AppModule,
      ServerModule,
    ],
    bootstrap: [AppComponent],
    providers: [
      provideISR() // 2. 👈 Register the provider
    ]
  })
  export class AppServerModule {}
  `;

  serverConfigCode = `
  import { provideISR } from 'ngx-isr/server';

  const serverConfig: ApplicationConfig = {
    providers: [
      provideServerRendering(),
      provideISR() // 👈 Use it in config providers
    ],
  };
  `;

  serverTsCode = `
  import { environment } from './src/environments/environment';
  import 'zone.js/dist/zone-node';

  import { ngExpressEngine } from '@nguniversal/express-engine';
  import * as express from 'express';
  import { join } from 'path';

  import { AppServerModule } from './src/main.server';
  import { existsSync } from 'fs';

  // 1. 👇 Import the ISRHandler class
  import { ISRHandler } from 'ngx-isr/server';

  export function app(): express.Express {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/docs/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html'))
      ? 'index.original.html'
      : 'index';

    // 2. 👇 Instantiate the ISRHandler class with the index.html file
    const isr = new ISRHandler({
      indexHtml,
      invalidateSecretToken: process.env['INVALIDATE_TOKEN'] || 'MY_TOKEN',
      enableLogging: !environment.production,
    });

    server.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));

    server.set('view engine', 'html');
    server.set('views', distFolder);

    server.get('*.*', express.static(distFolder, { maxAge: '1y' }));

    // 3. 👇 Use the ISRHandler to handle the requests
    server.get('*',
      // Serve page if it exists in cache
      async (req, res, next) => await isr.serveFromCache(req, res, next),
      // Server side render the page and add to cache if needed
      async (req, res, next) => await isr.render(req, res, next)
    );

    // 4: 👇 Comment out default angular universal handler, because it's will be handled in ISR render method
    // (req, res) => {
    //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    // }

    return server;
  }
  `;

  routesCode = `
  import { Routes } from '@angular/router';

  export const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      data: {
        revalidate: 100, // 👈 Add the revalidate key
      },
    },
 ];
  `;
}

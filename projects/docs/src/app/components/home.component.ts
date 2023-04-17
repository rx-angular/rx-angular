import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HighlightModule } from 'ngx-highlightjs';
import { trackInstallEvent } from '../analytics/inject-analytics-script';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, HighlightModule, RouterLink],
})
export default class HomeComponent {

  tabs: string[] = ['server.ts', 'app.server.module.ts', 'routes.ts'];
  activeTab = 'server.ts';

  get activeCode() {
    switch (this.activeTab) {
      case 'server.ts':
        return this.serverTsCode;
      case 'app.server.module.ts':
        return this.ngModuleCode;
      case 'routes.ts':
        return this.routesCode;
      default:
        return 'server.ts';
    }
  }

  isrFeatures = [
    'Server Side Rendering & Static Site Generation in one',
    'Static timer cache invalidation',
    'In-demand cache invalidation',
    'Plugin based cache handlers',
    'Easy to setup and use',
    'Supports Angular 9+',
    'No build changes required',
    'Supports Angular Universal',
    'Improves TTFB (Time to First Byte)',
  ];

  serverTsCode = `
  import { ISRHandler } from 'ngx-isr';
  
  export function app(): express.Express {
    // Other Angular Universal setup code...

    const isr = new ISRHandler({
      indexHtml,
      invalidateSecretToken: process.env['INVALIDATE_TOKEN'] || 'TOKEN',
      enableLogging: !environment.production,
    });

    server.get('*',
      async (req, res, next) => await isr.serveFromCache(req, res, next),
      async (req, res, next) => await isr.render(req, res, next)
    );
 
    return server;
  } 
  `;

  ngModuleCode = `
  import { provideISR } from 'ngx-isr';

  @NgModule({
    imports: [
      AppModule,
      ServerModule,
    ],
    // 👇 Register ISR providers
    providers: [ provideISR() ],
    bootstrap: [AppComponent],
  })
  export class AppServerModule {}
  `;

  routesCode = `
  const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      // 👇 Add revalidate property to your route data
      data: { revalidate: 60 * 10 }
    },
    {
      path: 'products/:id',
      component: ProductComponent,
      // 👇 Revalidate every 30 minutes
      data: { revalidate: 60 * 30 },
    },
    {
      path: 'about',
      component: AboutComponent,
      // 👇 Never revalidate (cache forever)
      data: { revalidate: 0 },
    },
    {
      path: 'statistics',
      component: StatisticsComponent,
      // 👇 Don't cache this route, always render on the fly
      data: {}
    }
  ]
  `;

  trackInstall() {
    trackInstallEvent();
  }
}

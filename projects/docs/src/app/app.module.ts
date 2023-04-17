import { routes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, PLATFORM_ID, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { CustomTitleStrategy } from './custom-title-strategy';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions } from 'ngx-highlightjs';
import { ANALYTICS_TRACK_ID, injectAnalyticsScript, trackRouterEvents } from './analytics/inject-analytics-script';
import { isPlatformServer } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    TransferHttpCacheModule,
    HttpClientModule,
    HighlightModule,
  ],
  providers: [
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
        },
      } as HighlightOptions,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    const isServer = isPlatformServer(inject(PLATFORM_ID));
    // we don't want to inject the script on the server side
    if (!isServer) {
      injectAnalyticsScript({ gaTrackId: ANALYTICS_TRACK_ID });
      trackRouterEvents();
    }
  }
}

import { TitleStrategy, provideRouter } from '@angular/router';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CustomTitleStrategy } from './custom-title-strategy';
import { routes } from './routes';
import {
  APP_ID,
  ApplicationConfig,
  PLATFORM_ID,
  PLATFORM_INITIALIZER,
  inject,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import {
  injectAnalyticsScript,
  ANALYTICS_TRACK_ID,
  trackRouterEvents,
} from './analytics/inject-analytics-script';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    { provide: APP_ID, useValue: 'serverApp' },
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
        },
      },
    },
    {
      provide: PLATFORM_INITIALIZER,
      useFactory: () => {
        const isServer = isPlatformServer(inject(PLATFORM_ID));
        // we don't want to inject the script on the server side
        if (!isServer) {
          injectAnalyticsScript({ gaTrackId: ANALYTICS_TRACK_ID });
          trackRouterEvents();
        }
      },
      multi: true,
    },
  ],
};

import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, ɵprovideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-component/app.routes';
import { AppComponent } from './app/app-component/index';

import { ENVIRONMENT_SETTINGS } from './app/shared/environment.token';
import { environment } from './environments/environment';
import { promiseMarkerFactory } from './app/shared/utils/measure';

if (environment.production) {
  enableProdMode();
}

const mP = promiseMarkerFactory('Bootstrap');
mP.wrap(
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideAnimations(),
      {
        provide: ENVIRONMENT_SETTINGS,
        useValue: environment,
      },
      ɵprovideZonelessChangeDetection(),
      provideRouter(ROUTES),
    ],
  }),
).catch((err) => console.error(err));

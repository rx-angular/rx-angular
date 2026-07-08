import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-component/app.routes';
import { AppComponent } from './app/app-component/index';
import { ENVIRONMENT_SETTINGS } from './app/shared/environment.token';
import { promiseMarkerFactory } from './app/shared/utils/measure';
import { environment } from './environments/environment';

const mP = promiseMarkerFactory('Bootstrap');
mP.wrap(
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: {
          appearance: 'outline',
          subscriptSizing: 'dynamic',
        },
      },
      provideAnimations(),
      {
        provide: ENVIRONMENT_SETTINGS,
        useValue: environment,
      },
      provideZonelessChangeDetection(),
      provideRouter(ROUTES),
    ],
  }),
).catch((err) => console.error(err));

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { isrHttpInterceptors, provideISR } from '@rx-angular/isr/server';

import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withInterceptors(isrHttpInterceptors)),
    provideISR(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

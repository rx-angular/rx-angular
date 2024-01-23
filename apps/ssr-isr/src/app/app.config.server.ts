import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { isrHttpInterceptors, provideISR } from '@rx-angular/isr/server';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withInterceptors(isrHttpInterceptors)),
    provideISR(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { isrHttpInterceptors, provideISR } from '@rx-angular/isr/server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(withInterceptors(isrHttpInterceptors)),
    provideISR(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

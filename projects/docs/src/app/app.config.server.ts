import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideISR } from 'ngx-isr/server';
import { urlTimingInterceptor } from './url-timings.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideISR(),
    // Add the interceptor to the server config providers only
    provideHttpClient(withInterceptors([urlTimingInterceptor])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

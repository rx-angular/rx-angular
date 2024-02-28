import { DOCUMENT, isPlatformServer } from '@angular/common';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ENVIRONMENT_INITIALIZER } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { IsrService } from '@rx-angular/isr/browser';
import {
  HTTP_ERROR_PROVIDER_ISR,
  httpErrorInterceptorISR,
} from './http-errors.interceptor';
import { IsrServerService } from './isr-server.service';
import { addIsrDataBeforeSerialized } from './utils/add-isr-data-before-serialized';

/**
 * @description
 * This function registers the providers needed for ISR to work.
 *
 * @returns {EnvironmentProviders} The providers for the application.
 *
 * @example
 * ```
 * import { provideISR } from '@rx-angular/isr/server';
 *
 * @NgModule({
 *  providers: [ provideISR() ]
 * })
 * export class AppServerModule {}
 * ```
 *
 * To configure ISR in a standalone application:
 * ```
 * const serverConfig: ApplicationConfig = {
 *   providers: [
 *     provideServerRendering()
 *     provideISR()
 *   ],
 * };
 * export const config = mergeApplicationConfig(appConfig, serverConfig);
 * ```
 */
export const provideISR = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    IsrServerService,
    HTTP_ERROR_PROVIDER_ISR,
    {
      provide: IsrService,
      useExisting: IsrServerService,
    },
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: addIsrDataBeforeSerialized,
      multi: true,
      deps: [IsrServerService, DOCUMENT],
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: (isrService: IsrService, platformId: object) => () => {
        // Activate ISR only on the server
        if (isPlatformServer(platformId)) {
          isrService.activate();
        }
      },
      deps: [IsrService, PLATFORM_ID],
      multi: true,
    },
  ]);
};

/**
 * @description
 * This function registers the providers needed for ISR to work.
 *
 * @usage
 * ```ts
 * import { isrHttpInterceptors } from '@rx-angular/isr/server';
 *
 * providers: [
 *   provideHttpClient(
 *     withInterceptors(isrHttpInterceptors)
 *   )
 * ]
 * ```
 */
export const isrHttpInterceptors = [httpErrorInterceptorISR];

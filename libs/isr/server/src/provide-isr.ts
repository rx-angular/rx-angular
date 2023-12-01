import type { EnvironmentProviders } from '@angular/core';
import { makeEnvironmentProviders } from '@angular/core';
import { IsrServerService } from './isr-server.service';
import { HTTP_ERROR_PROVIDER_ISR } from './http-errors.interceptor';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { addIsrDataBeforeSerialized } from './utils/add-isr-data-before-serialized';
import { ENVIRONMENT_INITIALIZER } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { IsrService } from '@rx-angular/isr/browser';

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

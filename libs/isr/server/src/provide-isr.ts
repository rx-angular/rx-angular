import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideEnvironmentInitializer,
} from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { IsrService } from '@rx-angular/isr/browser';
import { addIsrDataBeforeSerialized } from '../../utils/src/add-isr-data-before-serialized';
import { HTTP_ERROR_PROVIDER_ISR, httpErrorInterceptorISR } from '../../utils/src/http-errors.interceptor';
import { IsrServerService } from './isr-server.service';

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
    provideEnvironmentInitializer(() => {
      const isrService = inject(IsrService);
      const platformId = inject(PLATFORM_ID);
      // Activate ISR only on the server
      if (isPlatformServer(platformId)) {
        isrService.activate();
      }
    }),
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

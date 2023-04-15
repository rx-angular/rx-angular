import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { NgxIsrService } from "./ngx-isr.service";
import { HTTP_ERROR_PROVIDER_ISR } from "./http-errors.interceptor";
import { BEFORE_APP_SERIALIZED } from "@angular/platform-server";
import { DOCUMENT, isPlatformServer } from "@angular/common";
import { addIsrDataBeforeSerialized } from "./utils/add-isr-data-before-serialized";
import { ENVIRONMENT_INITIALIZER } from "@angular/core";
import { PLATFORM_ID } from "@angular/core";

/**  
* @description
* This function registers the providers needed for ISR to work.
* 
* @returns {EnvironmentProviders} The providers for the application.
* 
* @example
* ```
* import { provideISR } from 'ngx-isr';
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
        NgxIsrService,
        HTTP_ERROR_PROVIDER_ISR,
        {
            provide: BEFORE_APP_SERIALIZED,
            useFactory: addIsrDataBeforeSerialized,
            multi: true,
            deps: [NgxIsrService, DOCUMENT]
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useFactory: (isrService: NgxIsrService, platformId: object) => () => {
                if (isPlatformServer(platformId)) {
                    isrService.activate();
                }
            },
            deps: [NgxIsrService, PLATFORM_ID],
            multi: true,
        },
    ]);
}
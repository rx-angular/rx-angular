import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { IsrService } from '@rx-angular/isr/browser';
import { HTTP_ERROR_PROVIDER_ISR } from './http-errors.interceptor';
import { IsrServerService } from './isr-server.service';
import { addIsrDataBeforeSerialized } from './utils/add-isr-data-before-serialized';

@NgModule({ providers: [IsrService] })
export class IsrModule {
  constructor(
    private isrService: IsrService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // Activate ISR only on the server
    if (isPlatformServer(platformId)) {
      isrService.activate();
    }
  }

  static forRoot(): ModuleWithProviders<IsrModule> {
    return {
      ngModule: IsrModule,
      providers: [
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
          deps: [IsrService, DOCUMENT],
        },
      ],
    };
  }
}

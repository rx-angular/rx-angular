import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { HTTP_ERROR_PROVIDER_ISR } from './http-errors.interceptor';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { addIsrDataBeforeSerialized } from './utils/add-isr-data-before-serialized';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { NgxIsrService } from 'ngx-isr/browser';
import { NgxIsrServerService } from './ngx-isr-server.service';

@NgModule({ providers: [NgxIsrService] })
export class NgxIsrModule {
  constructor(
    isrService: NgxIsrService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    // Activate ISR only on the server
    if (isPlatformServer(platformId)) {
      isrService.activate();
    }
  }

  static forRoot(): ModuleWithProviders<NgxIsrModule> {
    return {
      ngModule: NgxIsrModule,
      providers: [
        NgxIsrServerService,
        HTTP_ERROR_PROVIDER_ISR,
        {
          provide: NgxIsrService,
          useExisting: NgxIsrServerService,
        },
        {
          provide: BEFORE_APP_SERIALIZED,
          useFactory: addIsrDataBeforeSerialized,
          multi: true,
          deps: [NgxIsrService, DOCUMENT],
        },
      ],
    };
  }
}

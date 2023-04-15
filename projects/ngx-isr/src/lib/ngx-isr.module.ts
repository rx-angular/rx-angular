import { Inject, ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { NgxIsrService } from './ngx-isr.service';
import { HTTP_ERROR_PROVIDER_ISR } from './http-errors.interceptor';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { addIsrDataBeforeSerialized } from './utils/add-isr-data-before-serialized';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@NgModule({ providers: [ NgxIsrService ] })
export class NgxIsrModule {
  constructor(private isrService: NgxIsrService, @Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformServer(platformId)) {
      isrService.activate();
    }
  }

  static forRoot(): ModuleWithProviders<NgxIsrModule> {
    return {
      ngModule: NgxIsrModule,
      providers: [
        NgxIsrService,
        HTTP_ERROR_PROVIDER_ISR,
        {
          provide: BEFORE_APP_SERIALIZED,
          useFactory: addIsrDataBeforeSerialized,
          multi: true,
          deps: [ NgxIsrService, DOCUMENT ]
        },
      ]
    }
  }

}

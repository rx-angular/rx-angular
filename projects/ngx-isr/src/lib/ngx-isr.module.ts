import { NgModule } from '@angular/core';
import { NgxIsrService } from './ngx-isr.service';

@NgModule({ providers: [NgxIsrService] })
export class NgxIsrModule {
  constructor(private isrService: NgxIsrService) {}
}

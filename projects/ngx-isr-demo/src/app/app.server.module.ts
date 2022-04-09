import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgxIsrModule } from 'ngx-isr';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    NgxIsrModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

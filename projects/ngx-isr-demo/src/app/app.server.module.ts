import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgxIsrModule } from 'ngx-isr/server';
import { HTTP_URL_TIMINGS_INTERCEPTOR_ISR } from './url-timings.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NgxIsrModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [HTTP_URL_TIMINGS_INTERCEPTOR_ISR]
})
export class AppServerModule {}

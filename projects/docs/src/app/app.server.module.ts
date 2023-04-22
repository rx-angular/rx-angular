import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { provideISR } from 'ngx-isr/server';
import { HTTP_URL_TIMINGS_INTERCEPTOR_ISR } from './url-timings.interceptor';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [HTTP_URL_TIMINGS_INTERCEPTOR_ISR, provideISR()],
})
export class AppServerModule {}

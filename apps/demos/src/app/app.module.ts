import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';
import { ENVIRONMENT_SETTINGS } from './shared/environment.token';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponentModule
  ],
  providers: [
    {
      provide: ENVIRONMENT_SETTINGS,
      useValue: environment
    }
  ],
  declarations: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';
import { ENVIRONMENT_SETTINGS } from './shared/environment.token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { getCustomStrategyCredentialsMap, RX_CUSTOM_STRATEGIES, RX_PRIMARY_STRATEGY } from './shared/rx-angular-pocs/render-stragegies';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppComponentModule
  ],
  providers: [
    {
      provide: ENVIRONMENT_SETTINGS,
      useValue: environment
    },
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: getCustomStrategyCredentialsMap(),
      multi: true
    },
    {
      provide: RX_PRIMARY_STRATEGY,
      useValue: 'local'
    }
  ],
  declarations: [HomeComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

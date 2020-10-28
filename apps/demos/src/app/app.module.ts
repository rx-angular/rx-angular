import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';
import { ENVIRONMENT_SETTINGS } from './shared/environment.token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { RX_CUSTOM_STRATEGIES } from './features/experiments/structural-directives/rx-let-poc/custom-strategies-token';
import { customStrategies } from './features/experiments/structural-directives/rx-let-poc/strategy-handling';
import { RX_DEFAULT_STRATEGY } from './features/experiments/structural-directives/rx-let-poc/default-strategy-token';

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
    // {
    //   provide: StrategyTokenProvider,
    //   useValue: {
    //     name: 'appModuleLevel_renderQueue',
    //     factory: getGlobalRenderingStrategies
    //   },
    //   multi: true,
    // },
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: customStrategies,
      multi: true
    },
    {
      provide: RX_DEFAULT_STRATEGY,
      useValue: 'local'
    }
  ],
  declarations: [HomeComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

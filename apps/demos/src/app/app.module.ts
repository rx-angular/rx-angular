import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';
import { ENVIRONMENT_SETTINGS } from './shared/environment.token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { filter } from 'rxjs/operators';
import { StrategyTokenProvider } from './shared/rx-change-detector-ref/strategy.token';
import { getGlobalRenderingStrategies } from './shared/render-stragegies/render-queue/global-render.strategy';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppComponentModule,
  ],
  providers: [
    {
      provide: ENVIRONMENT_SETTINGS,
      useValue: environment,
    },
    // {
    //   provide: StrategyTokenProvider,
    //   useValue: {
    //     name: 'appModuleLevel_renderQueue',
    //     factory: getGlobalRenderingStrategies
    //   },
    //   multi: true,
    // },
  ],
  declarations: [HomeComponent],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

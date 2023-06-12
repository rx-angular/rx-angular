import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { RX_RENDER_STRATEGIES_CONFIG } from '../../../../libs/cdk/render-strategies/src/lib/config';
import {AppShellModule} from "../../../demos/src/app/app-shell";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppShellModule,
  ],
  providers: [
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: {
        primaryStrategy: 'normal',
        patchZone: true
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

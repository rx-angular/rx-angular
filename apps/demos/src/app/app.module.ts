import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app-component/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponentModule
  ],
  declarations: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

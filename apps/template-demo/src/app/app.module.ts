import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app-component/app.component';
import { ROUTES } from './app.routes';
import { DirtyChecksModule } from './debug-helper/dirty-checks/dirty-checks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DirtyChecksModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

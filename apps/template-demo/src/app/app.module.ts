import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app-component/app.component';
import { AppShellModule } from './app-shell';
import { ROUTES } from './app.routes';
import { DirtyChecksModule } from './debug-helper/dirty-checks/dirty-checks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DirtyChecksModule,
    RouterModule.forRoot(ROUTES),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    AppShellModule
  ],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

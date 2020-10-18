import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppShellModule } from '../app-shell';
// import { DirtyChecksModule } from '../debug-helper/dirty-checks/dirty-checks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { DirtyChecksModule } from '../shared/debug-helper/dirty-checks';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    AppShellModule,
    RouterModule.forRoot(ROUTES),
    DirtyChecksModule
  ],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppComponentModule {
}

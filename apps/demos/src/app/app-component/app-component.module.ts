import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppShellModule } from '../app-shell';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { DirtyChecksModule } from '../shared/debug-helper/dirty-checks';
import { AppControlPanelModule } from './app-control-panel/';


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
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }),
    DirtyChecksModule,
    AppControlPanelModule
  ],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppComponentModule {
}

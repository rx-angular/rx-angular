import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RxIf } from '@rx-angular/template/if';
import { RxLetModule } from '../rx-angular-pocs/template/directives/let';
import { AppShellComponent } from './app-shell-component/app-shell.component';
import {
  AppShellHeaderContent,
  AppShellSidenavContent,
  AppShellSidenavTitle,
} from './app-shell-content.directives';
import { AppShellSideNavComponent } from './side-nav/side-nav.component';
import { AppShellSideNavItemDirective } from './side-nav/side-nav-item.directive';

const exportedDeclarations = [
  AppShellHeaderContent,
  AppShellSidenavContent,
  AppShellComponent,
  AppShellSidenavTitle,
  AppShellSideNavComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    CdkTreeModule,
    RxLetModule,
    RxIf,
    ...exportedDeclarations,
    AppShellSideNavItemDirective,
  ],
  exports: exportedDeclarations,
})
export class AppShellModule {}

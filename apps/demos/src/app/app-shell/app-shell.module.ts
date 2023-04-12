import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  AppShellHeaderContent,
  AppShellSidenavContent,
  AppShellSidenavTitle,
} from './app-shell-content.directives';
import { AppShellComponent } from './app-shell-component/app-shell.component';
import { AppShellSideNavItemDirective } from './side-nav/side-nav-item.directive';
import { AppShellSideNavComponent } from './side-nav/side-nav.component';
import { RxLetModule } from '../rx-angular-pocs/template/directives/let';
import { IfModule } from '@rx-angular/template/if';

const exportedDeclarations = [
  AppShellHeaderContent,
  AppShellSidenavContent,
  AppShellComponent,
  AppShellSidenavTitle,
  AppShellSideNavComponent,
];

@NgModule({
  declarations: [...exportedDeclarations, AppShellSideNavItemDirective],
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
    IfModule,
  ],
  exports: exportedDeclarations,
})
export class AppShellModule {}

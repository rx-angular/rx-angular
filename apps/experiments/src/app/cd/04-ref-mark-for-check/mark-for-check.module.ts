import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './mark-for-check.routes';
import { MatButtonModule } from '@angular/material/button';
import { Child0401Component } from './child01.component';
import { Child0402Component } from './child02.component';
import { Child040101Component } from './child0101.component';
import { RefMarkMorCheckContainerComponent } from './ref-mark-mor-check.container.component';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../shared/debug-helper/dirty-checks/dirty-checks.module';


@NgModule({
  declarations: [
    RefMarkMorCheckContainerComponent,
    Child0401Component,
    Child0402Component,
    Child040101Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule
  ]
})
export class MarkForCheckModule {
}

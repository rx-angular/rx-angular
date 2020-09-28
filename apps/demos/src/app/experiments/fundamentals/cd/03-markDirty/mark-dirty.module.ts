import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './mark-dirty.routes';
import { MatButtonModule } from '@angular/material/button';
import { MarkDirtyComponent } from './mark-dirty.component';
import { Child0301Component } from './child01.component';
import { Child0302Component } from './child02.component';
import { Child030101Component } from './child0101.component';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks/dirty-checks.module';
import { UnpatchEventsModule } from '@rx-angular/template';


@NgModule({
  declarations: [
    MarkDirtyComponent,
    Child0301Component,
    Child0302Component,
    Child030101Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule
  ]
})
export class MarkDirtyModule {
}

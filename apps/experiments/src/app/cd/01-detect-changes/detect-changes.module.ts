import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './detect-changes.routes';
import { MatButtonModule } from '@angular/material/button';
import { Child0101Component } from './child01.component';
import { Child0102Component } from './child02.component';
import { Child010101Component } from './child0101.component';
import { DirtyChecksModule } from '../../shared/debug-helper/dirty-checks/dirty-checks.module';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DetectChangesContainerComponent } from './detect-changes.container.component';

@NgModule({
  declarations: [
    DetectChangesContainerComponent,
    Child0101Component,
    Child0102Component,
    Child010101Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule
  ]
})
export class DetectChangesModule {
}

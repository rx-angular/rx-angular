import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './ref-detect-changes.routes';
import { MatButtonModule } from '@angular/material/button';

import { RefDetectChangesContainerComponent } from './ref-detect-changes.container.component';
import { Child0201Component } from './child01.component';
import { Child0202Component } from './child02.component';
import { Child020101Component } from './child0101.component';
import { DirtyChecksModule } from '../../../../../shared/debug-helper/dirty-checks';
import { UnpatchEventsModule } from '@rx-angular/template';

@NgModule({
  declarations: [
    RefDetectChangesContainerComponent,
    Child0201Component,
    Child0202Component,
    Child020101Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule
  ]
})
export class RefDetectChangesModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { ComparisonUnpatchComponent } from './comparison-unpatch.component';
import { ROUTES } from './comparison.routes';
import { RunOutsideZoneDirective } from './runOutsideZone.directive';
import { DirtyChecksModule } from '../../../debug-helper/dirty-checks/dirty-checks.module';
import { MatButtonModule } from '@angular/material/button';

const DECLARATIONS = [ComparisonUnpatchComponent, RunOutsideZoneDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
    UnpatchEventsModule,
    DirtyChecksModule
  ],
  exports: [DECLARATIONS]
})
export class UnpatchComparisonModule {
}

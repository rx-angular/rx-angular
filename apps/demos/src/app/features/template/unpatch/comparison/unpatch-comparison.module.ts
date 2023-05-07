import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ComparisonUnpatchComponent } from './comparison-unpatch.component';
import { ROUTES } from './comparison.routes';
import { RunOutsideZoneDirective } from './runOutsideZone.directive';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

const DECLARATIONS = [ComparisonUnpatchComponent, RunOutsideZoneDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
    UnpatchModule,
    DirtyChecksModule,
  ],
  exports: [DECLARATIONS],
})
export class UnpatchComparisonModule {}

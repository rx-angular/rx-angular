import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ROUTES } from './comparison.routes';
import { ComparisonUnpatchComponent } from './comparison-unpatch.component';
import { RunOutsideZoneDirective } from './runOutsideZone.directive';

const DECLARATIONS = [ComparisonUnpatchComponent, RunOutsideZoneDirective];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
    RxUnpatch,
    DirtyChecksModule,
  ],
  exports: [DECLARATIONS],
})
export class UnpatchComparisonModule {}

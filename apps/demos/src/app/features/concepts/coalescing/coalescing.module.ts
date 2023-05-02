import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';

import { ROUTES } from './coalescing.routes';
import { CoalescingComponent } from './coalescing/coalescing.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';

const DECLARATIONS = [CoalescingComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    StrategySelectModule,
    UnpatchModule,
    MatButtonModule,
    RxPush,
  ],
  providers: [],
  exports: [DECLARATIONS],
})
export class CoalescingModule {}

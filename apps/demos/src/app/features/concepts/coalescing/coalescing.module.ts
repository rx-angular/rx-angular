import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { ROUTES } from './coalescing.routes';
import { CoalescingComponent } from './coalescing/coalescing.component';

const DECLARATIONS = [CoalescingComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    StrategySelectModule,
    RxUnpatch,
    MatButtonModule,
    RxPush,
    DECLARATIONS,
  ],
  providers: [],
  exports: [DECLARATIONS],
})
export class CoalescingModule {}

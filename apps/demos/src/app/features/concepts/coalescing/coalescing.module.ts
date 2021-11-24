import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template';
import { UnpatchModule } from '@rx-angular/template/experimental/unpatch';

import { ROUTES } from './coalescing.routes';
import { CoalescingComponent } from './coalescing/coalescing.component';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';

const DECLARATIONS = [
  CoalescingComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    StrategySelectModule,
    UnpatchModule,
    MatButtonModule,
    PushModule
  ],
  providers: [],
  exports: [DECLARATIONS]
})
export class CoalescingModule {
}

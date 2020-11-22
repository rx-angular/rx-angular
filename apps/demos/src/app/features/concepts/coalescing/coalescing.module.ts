import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';

import { ROUTES } from './coalescing.routes';
import { CoalescingComponent } from './coalescing/coalescing.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { ReactiveFormsModule } from '@angular/forms';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { PushModule } from '../../../shared/rx-angular-pocs/push/push.module';
import { RxLetPocModule } from '../../experiments/structural-directives/rx-let-poc/rx-let-poc.module';

const DECLARATIONS = [
  CoalescingComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    DirtyChecksModule,
    ValueProvidersModule,
    ReactiveFormsModule,
    StrategySelectModule,
    PushModule,
    RxLetPocModule,
    UnpatchEventsModule
  ],
  providers: [],
  exports: [DECLARATIONS]
})
export class CoalescingModule {
}

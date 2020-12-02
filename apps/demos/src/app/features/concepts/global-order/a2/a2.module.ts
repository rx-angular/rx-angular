import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { LetModule } from '../../../../shared/rx-angular-pocs/let/let.module';
import { RxLetPocModule } from '../../../experiments/structural-directives/rx-let-poc/rx-let-poc.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { RippleModule } from '../../../../shared/debug-helper/ripple';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { A2Component } from './a2.component';
import { B2Component } from './b2/b2.component';

@NgModule({
  declarations: [
    A2Component,
    B2Component
  ],
  imports: [
    CommonModule,
    VisualizerModule,
    PushModule,
    UnpatchEventsModule,
    RxLetPocModule,
    MatButtonModule,
    LetModule,
    RippleModule,
    ValueProvidersModule,
    DirtyChecksModule
  ],
  exports: [
    A2Component,
    B2Component
  ]
})
export class A2Module {
}

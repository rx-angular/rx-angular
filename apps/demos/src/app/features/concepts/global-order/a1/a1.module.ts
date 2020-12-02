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
import { A1Component } from './a1.component';
import { B1Component } from './b1/b1.component';

@NgModule({
  declarations: [
    A1Component,
    B1Component
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
    A1Component,
    B1Component
  ]
})
export class A1Module {
}

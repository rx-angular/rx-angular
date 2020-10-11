import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-swicht-poc.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { RxSwitchPocComponent } from './rx-switch-poc.component';
import { Poc1Switch } from './poc1-switch.directive';
import { Poc1SwitchCase } from './poc1-switch-case.directive';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';

@NgModule({
  declarations: [
    Poc1Switch,
    Poc1SwitchCase,
    RxSwitchPocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DirtyChecksModule
  ]
})
export class RxSwichtPocModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-if-poc.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '@rx-angular/template';
import { Poc1IfDirective } from './poc1-if.directive';
import { RxIfPocComponent } from './rx-if-poc.component';
import { Poc2IfDirective } from './poc2-if.directive';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { Poc3IfDirective } from './poc3-if.directive';
import { WorkModule } from '../../../../shared/debug-helper/work';

@NgModule({
  declarations: [
    Poc1IfDirective,
    Poc2IfDirective,
    Poc3IfDirective,
    RxIfPocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DirtyChecksModule,
    WorkModule
  ]
})
export class RxIfPocModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rxIf-poc.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '@rx-angular/template';
import { Poc1IfDirective } from './poc1-if.directive';
import { RxIfPocComponent } from './rxIf-poc.component';
import { Poc2IfDirective } from './poc2-if.directive';
import { MatButtonModule } from '@angular/material/button';
import { DebugHelperModule } from '../../../../../../../tour-of-heroes/src/app/debug-helper.module.ts/debug-helper.module';

@NgModule({
  declarations: [
    Poc1IfDirective,
    Poc2IfDirective,
    RxIfPocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DebugHelperModule
  ]
})
export class RxIfPocModule {
}

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
import { ValueModule } from '../../../../shared/debug-helper/work';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { IfModule } from '../../../../shared/rx-angular-pocs/If/if.module';

const DECLARATIONS = [
  Poc1IfDirective,
  Poc2IfDirective,
  RxIfPocComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DirtyChecksModule,
    ValueModule,
    GhostElementsModule,
    ValueProvidersModule,
    StrategySelectModule,
    IfModule
  ],
  exports: DECLARATIONS
})
export class RxIfPocModule {
}

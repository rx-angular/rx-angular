import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RxLetPocComponent } from './rx-let-poc.component';
import { LetModule } from '../../../../shared/rx-angular-pocs/let/let.module';
import { GhostElementsModule } from '../../../../shared/ghost-elements';

const DECLARATIONS = [
  RxLetPocComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    LetModule,
    VisualizerModule,
    ValueProvidersModule,
    StrategySelectModule,
    GhostElementsModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class RxLetPocModule {
}

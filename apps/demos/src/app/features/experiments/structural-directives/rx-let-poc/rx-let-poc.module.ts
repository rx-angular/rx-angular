import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RxLetPocComponent } from './rx-let-poc.component';
import { RxLetModule } from '../../../../shared/rx-angular-pocs/let/rx-let.module';

const DECLARATIONS = [
  RxLetPocComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    RxLetModule,
    VisualizerModule,
    ValueProvidersModule,
    StrategySelectModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class RxLetPocModule {
}

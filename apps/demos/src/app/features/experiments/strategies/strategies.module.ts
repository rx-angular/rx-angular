import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './strategies.routes';
import { StrategyTokensInheritComponent } from './strategy-tokens/strategy-tokens-inherit.component';
import { StrategyTokensProvideComponent } from './strategy-tokens/strategy-tokens-provide.component';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';

@NgModule({
  declarations: [StrategyTokensInheritComponent, StrategyTokensProvideComponent],
  exports: [
    StrategyTokensInheritComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    ValueProvidersModule,
    StrategySelectModule,
    VisualizerModule
  ]
})
export class StrategiesModule {
}

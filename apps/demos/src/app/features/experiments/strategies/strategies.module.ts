import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './strategies.routes';
import { StrategyTokensRootInheritComponent } from './strategy-tokens/strategy-tokens-root-inherit.component';
import { StrategyTokensProvideComponent } from './strategy-tokens/strategy-tokens-provide.component';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';

@NgModule({
  declarations: [StrategyTokensRootInheritComponent, StrategyTokensProvideComponent],
  exports: [
    StrategyTokensRootInheritComponent
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

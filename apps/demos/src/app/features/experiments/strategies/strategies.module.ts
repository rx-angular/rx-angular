import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { ROUTES as CD_ROUTES } from './strategies.routes';
import { StrategyTokensProvideComponent } from './strategy-tokens/strategy-tokens-provide.component';
import { StrategyTokensRootInheritComponent } from './strategy-tokens/strategy-tokens-root-inherit.component';

@NgModule({
  exports: [StrategyTokensRootInheritComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    StrategySelectModule,
    VisualizerModule,
    StrategyTokensRootInheritComponent,
    StrategyTokensProvideComponent,
  ],
})
export class StrategiesModule {}

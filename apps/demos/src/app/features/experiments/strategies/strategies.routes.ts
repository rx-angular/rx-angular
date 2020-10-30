import { Routes } from '@angular/router';
import { StrategyTokensInheritComponent } from './strategy-tokens/strategy-tokens-inherit.component';
import { StrategyTokensProvideComponent } from './strategy-tokens/strategy-tokens-provide.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'inherit'
  },
  {
    path: 'inherit',
    component: StrategyTokensInheritComponent
  },
  {
    path: 'provide',
    component: StrategyTokensProvideComponent
  }
];

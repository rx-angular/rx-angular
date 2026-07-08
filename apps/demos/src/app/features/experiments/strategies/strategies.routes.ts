import { Routes } from '@angular/router';
import { StrategyTokensProvideComponent } from './strategy-tokens/strategy-tokens-provide.component';
import { StrategyTokensRootInheritComponent } from './strategy-tokens/strategy-tokens-root-inherit.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'inherit',
  },
  {
    path: 'inherit',
    component: StrategyTokensRootInheritComponent,
  },
  {
    path: 'provide',
    component: StrategyTokensProvideComponent,
  },
];

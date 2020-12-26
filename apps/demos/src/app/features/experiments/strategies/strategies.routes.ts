import { Routes } from '@angular/router';
import { StrategyTokensRootInheritComponent } from './strategy-tokens/strategy-tokens-root-inherit.component';
import { StrategyTokensProvideComponent } from './strategy-tokens/strategy-tokens-provide.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'inherit'
  },
  {
    path: 'inherit',
    component: StrategyTokensRootInheritComponent
  },
  {
    path: 'provide',
    component: StrategyTokensProvideComponent
  },
  {
    path: 'partial-tree-update',
    loadChildren: () => import('./partial-tree-update/partial-tree-update.module')
      .then(m => m.PartialTreeUpdateModule)
  }
];

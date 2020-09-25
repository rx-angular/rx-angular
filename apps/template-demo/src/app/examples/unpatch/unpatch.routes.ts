import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'comparison',
    pathMatch: 'full'
  },
  {
    path: 'comparison',
    loadChildren: () =>
      import('./comparison/unpatch-comparison.module').then(
        m => m.UnpatchComparisonModule
      )
  },
  {
    path: 'routing',
    loadChildren: () =>
      import('./routing/unpatch-routing.module').then(
        m => m.UnpatchRoutingModule
      )
  }
];

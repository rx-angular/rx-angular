import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'detect-changes'
  },
  {
    path: 'detect-changes',
    loadChildren: () => import('./detect-changes/detect-changes.module').then(
      m => m.DetectChangesModule
    )
  },
  {
    path: 'passing-values',
    loadChildren: () => import('./passing-values/passing-values.module').then(
      m => m.PassingValuesModule
    )
  },
  {
    path: 'patched-apis',
    loadChildren: () => import('./zone-patched-apis/zone-patched-apis.module').then(
      m => m.ZonePatchedApisModule
    )
  }
];

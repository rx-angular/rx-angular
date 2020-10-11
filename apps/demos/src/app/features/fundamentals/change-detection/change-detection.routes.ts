import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'change-detection-methods'
  },
  {
    path: 'change-detection-methods',
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
    path: 'zone-patched-apis',
    loadChildren: () => import('./zone-patched-apis/zone-patched-apis.module').then(
      m => m.ZonePatchedApisModule
    )
  },
  {
    path: 'scheduling',
    loadChildren: () => import('./scheduling/scheduling.module').then(
      m => m.SchedulingModule
    )
  },
  {
    path: 'coalescing',
    loadChildren: () => import('./coalescing/coalescing.module').then(
      m => m.CoalescingModule
    )
  }
];

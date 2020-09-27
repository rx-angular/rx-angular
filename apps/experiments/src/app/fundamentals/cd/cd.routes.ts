import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'detect-changes'
  },
  {
    path: 'detect-changes',
    loadChildren: () => import('./01-detect-changes/detect-changes.module').then(
      m => m.DetectChangesModule
    )
  },
  {
    path: 'ref-detect-changes',
    loadChildren: () => import('./02-ref-detect-changes/ref-detect-changes.module').then(
      m => m.RefDetectChangesModule
    )
  },
  {
    path: 'mark-dirty',
    loadChildren: () => import('./03-markDirty/mark-dirty.module').then(
      m => m.MarkDirtyModule
    )
  },
  {
    path: 'app-ref-tick',
    loadChildren: () => import('./06-app-ref-tick/app-ref-tick.module').then(
      m => m.AppRefTickModule
    )
  },
  {
    path: 'ref-mark-for-check',
    loadChildren: () => import('./04-ref-mark-for-check/mark-for-check.module').then(
      m => m.MarkForCheckModule
    )
  },
  {
    path: 'patched-apis',
    loadChildren: () => import('./13-patched-apis/patched-apis.module').then(
      m => m.PatchedApisModule
    )
  }
];

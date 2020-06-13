import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'coalescing',
    pathMatch: 'full'
  },
  {
    path: 'coalescing',
    loadChildren: () =>
      import('./examples/coalescing/coalescing.module').then(
        m => m.CoalescingModule
      )
  },
  {
    path: 'prioritize-in-tree',
    loadChildren: () =>
      import('./examples/prioritize-in-tree/prioritize-in-tree.module').then(
        m => m.PrioritizeInTreeModule
      )
  },
  {
    path: 'prioritize-in-viewport',
    loadChildren: () =>
      import(
        './examples/prioritize-in-viewport/prioritize-in-viewport.module'
      ).then(m => m.PrioritizeInViewportModule)
  }
];

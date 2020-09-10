import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-let',
    pathMatch: 'full'
  },
  {
    path: 'rx-let',
    loadChildren: () =>
      import('./examples/rx-let/rx-let-demo.module').then(
        m => m.RxLetDemoModule
      )
  },
  {
    path: 'unpatch',
    loadChildren: () =>
      import('./examples/unpatch/comparison-unpatch.module').then(
        m => m.ComparisonUnpatchModule
      )
  },
  {
    path: 'viewport-prio',
    loadChildren: () =>
      import('./examples/viewport-prio/component-tree-prio/component-tree-prio.module').then(
        m => m.ComponentTreePrioModule
      )
  }
];

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-let',
    pathMatch: 'full'
  },
  {
    path: 'rendering',
    loadChildren: () =>
      import('./examples/rendering/rendering.module').then(
        m => m.RenderingDemoModule
      )
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
      import('./examples/unpatch/unpatch.module').then(
        m => m.UnpatchModule
      )
  },
    {
    path: 'viewport-prio',
    loadChildren: () =>
      import('./examples/viewport-prio/viewport-prio-demo.module').then(
        m => m.ViewportPrioModule
      )
  }
];

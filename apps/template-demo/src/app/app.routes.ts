import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-let',
    pathMatch: 'full'
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./examples/strategies/strategies.module').then(
        m => m.StrategiesDemoModule
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
    path: 'push',
    loadChildren: () =>
      import('./examples/push/push.module').then(
        m => m.PushDemoModule
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
    path: 'view-port-prio',
    loadChildren: () =>
      import('./examples/viewport-prio/viewport-prio-demo.module').then(
        m => m.ViewportPrioModule
      )
  }
];

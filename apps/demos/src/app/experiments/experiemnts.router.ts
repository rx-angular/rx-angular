import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./fundamentals/cd/cd.module').then((mod) => mod.CdModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: '',
    loadChildren: () =>
      import('./template/mixed/mixed.module').then((mod) => mod.MixedModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'x s',
    loadChildren: () =>
      import('./fundamentals/irrelevant-to-test/irrelevant-to-test.module').then(
        (mod) => mod.IrrelevantToTestModule
      ),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: '',
    loadChildren: () =>
      import('./state/rx-state.module').then((mod) => mod.RxStateModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then((m) => m.StrategiesModule)
  },
  {
    path: 'embedded-view',
    loadChildren: () =>
      import('./template/cd-embedded-view/cd-embedded-view.module').then((m) => m.CdEmbeddedViewModule)
  }
];

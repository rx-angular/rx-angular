import { Routes } from '@angular/router';
import { ROUTES as PERFORMANCE_ROUTES } from './performance/performance.routes';
import { ROUTES as PUSH_ROUTES } from './push/push.routes';

export const ROUTES: Routes = [
  ...PUSH_ROUTES,
  {
    path: '',
    loadChildren: () =>
      import('./push/push.module').then((mod) => mod.PushModule),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: '',
    loadChildren: () =>
      import('./mixed/mixed.module').then((mod) => mod.MixedModule),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: '',
    loadChildren: () => import('./let/let.module').then((mod) => mod.LetModule),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: '',
    loadChildren: () => import('./cd/cd.module').then((mod) => mod.CdModule),
    canActivate: [],
    canActivateChild: [],
  },
  ...PERFORMANCE_ROUTES,
  {
    path: '',
    loadChildren: () =>
      import('./irrelevant-to-test/irrelevant-to-test.module').then(
        (mod) => mod.IrrelevantToTestModule
      ),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: '',
    loadChildren: () =>
      import('./cd-operators/cd-operators.module').then(
        (mod) => mod.CdOperatorsModule
      ),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: '',
    loadChildren: () =>
      import('./state/rx-state.module').then((mod) => mod.RxStateModule),
    canActivate: [],
    canActivateChild: [],
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then((m) => m.StrategiesModule),
  },
  {
    path: 'embedded-view',
    loadChildren: () =>
      import('./cd-embedded-view/cd-embedded-view.module').then((m) => m.CdEmbeddedViewModule),
  },
];

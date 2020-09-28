import { Routes } from '@angular/router';

export const EXAMPLES_TEMPLATE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-let',
    pathMatch: 'full'
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('../examples/template/strategies/strategies.module').then(
        m => m.StrategiesDemoModule
      )
  },
  {
    path: 'rx-let',
    loadChildren: () =>
      import('../examples/template/rx-let/rx-let-demo.module').then(
        m => m.RxLetDemoModule
      )
  },
  {
    path: 'push',
    loadChildren: () =>
      import('../examples/template/push/push.module').then(
        m => m.PushDemoModule
      )
  },
  {
    path: 'unpatch',
    loadChildren: () =>
      import('../examples/template/unpatch/unpatch.module').then(
        m => m.UnpatchModule
      )
  },
  {
    path: 'view-port-prio',
    loadChildren: () =>
      import('../examples/template/viewport-prio/viewport-prio-demo.module').then(
        m => m.ViewportPrioModule
      )
  }/**/
];
export const EXAMPLES_STATE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full'
  },
  {
    path: 'basics',
    loadChildren: () =>
      import('../tutorials/demo-basics/demo-basics.module').then(
        m => m.DemoBasicsModule
      )
  }
];
export const SHOWCASES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dynamic-counter',
    pathMatch: 'full'
  },
  {
    path: 'dynamic-counter',
    loadChildren: () =>
      import('../showcases/dynamic-counter/dynamic-counter.module').then(
        m => m.DynamicCounterModule
      )
  }
];
export const EXPERIMENTS_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../experiments/fundamentals/cd/cd.module').then((mod) => mod.CdModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: '',
    loadChildren: () =>
      import('../experiments/template/mixed/mixed.module').then((mod) => mod.MixedModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: '',
    loadChildren: () =>
      import('../experiments/fundamentals/irrelevant-to-test/irrelevant-to-test.module').then(
        (mod) => mod.IrrelevantToTestModule
      ),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: '',
    loadChildren: () =>
      import('../experiments/state/rx-state.module').then((mod) => mod.RxStateModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('../experiments/strategies/strategies.module').then((m) => m.StrategiesModule)
  },
  {
    path: 'embedded-view',
    loadChildren: () =>
      import('../experiments/template/cd-embedded-view/cd-embedded-view.module').then((m) => m.CdEmbeddedViewModule)
  }
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'template',
    pathMatch: 'full'
  },
  {
    path: 'template',
    children: EXAMPLES_TEMPLATE_ROUTES
  },
  {
    path: 'tutorials',
    children: EXAMPLES_STATE_ROUTES
  },
  {
    path: 'showcases',
    children: SHOWCASES_ROUTES
  },
  {
    path: 'experiments',
    children: EXPERIMENTS_ROUTES
  }
];

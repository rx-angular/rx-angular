import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'demo-basics',
    pathMatch: 'full'
  },
  {
    path: 'demo-basics',
    loadChildren: () =>
      import('./examples/demo-basics/demo-basics.module').then(
        m => m.DemoBasicsModule
      )
  },
  {
    path: 'mutate-state',
    loadChildren: () =>
      import('./examples/mutate-state/mutate-state.module').then(
        m => m.MutateStateModule
      )
  }
];

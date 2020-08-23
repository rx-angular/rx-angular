import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'demo-basics',
    pathMatch: 'full',
  },
  {
    path: 'demo-basics',
    loadChildren: () =>
      import('./examples/demo-basics/demo-basics.module').then(
        (m) => m.DemoBasicsModule
      ),
  },
  {
    path: 'dynamic-counter',
    loadChildren: () =>
      import('./examples/dynamic-counter/dynamic-counter.module').then(
        (m) => m.DynamicCounterModule
      ),
  },
];

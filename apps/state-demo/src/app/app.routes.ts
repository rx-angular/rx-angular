import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'demo-basics'
  },
  {
    path: 'demo-basics',
    loadChildren: () =>
      import('./examples/demo-basics/demo-basics.module').then(
        m => m.DemoBasicsModule
      )
  }
];

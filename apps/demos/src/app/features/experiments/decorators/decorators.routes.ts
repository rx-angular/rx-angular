import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'stateful',
  },
  {
    path: 'stateful',
    loadChildren: () =>
      import('./stateful/stateful.module').then(
        (m) => m.StatefulModule
      ),
  },
];

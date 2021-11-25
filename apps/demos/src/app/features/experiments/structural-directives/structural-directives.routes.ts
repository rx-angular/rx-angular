import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-switch-poc',
  },
  {
    path: 'rx-switch-poc',
    loadChildren: () =>
      import('./rx-switch-poc/rx-switch-poc.module').then(
        (m) => m.RxSwitchPocModule
      ),
  },
  {
    path: 'if-visible',
    loadChildren: () =>
      import('./if-visible-poc/if-visible-routed.module').then(
        (m) => m.IfVisibleRoutedModule
      ),
  },
];

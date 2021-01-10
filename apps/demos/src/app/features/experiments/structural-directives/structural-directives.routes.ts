import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-if-poc',
  },
  {
    path: 'rx-if-poc',
    loadChildren: () =>
      import('./rx-if-poc/rx-if-poc.routed.module').then(
        (m) => m.RxIfPocRoutedModule
      ),
  },
  {
    path: 'rx-swicht-poc',
    loadChildren: () =>
      import('./rx-switch-poc/rx-swich-poc.module').then(
        (m) => m.RxSwichPocModule
      ),
  },
  {
    path: 'rx-let-poc',
    loadChildren: () =>
      import('./rx-let-poc/rx-let-poc.routed.module').then(
        (m) => m.RxLetPocRoutedModule
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

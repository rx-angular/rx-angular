import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'view-vs-embedded-view',
  },
  {
    path: 'view-vs-embedded-view',
    loadChildren: () =>
      import(
        './view-vs-embedded-view/view-vs-embedded-view.routed.module'
      ).then((m) => m.ViewVsEmbeddedViewRoutedModule),
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
    path: 'for',
    loadChildren: () =>
      import('./rx-for-poc/rx-for-poc.routed.module').then(
        (m) => m.RxForPocRoutedModule
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

import { CdEmbeddedViewParent05Component } from './05/parent.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'view-vs-embedded-view'
  },
  {
    path: 'view-vs-embedded-view',
    loadChildren: () => import('./view-vs-embedded-view/view-vs-embedded-view.routed.module').then(m => m.ViewVsEmbeddedViewRoutedModule)
  },
  {
    path: 'rx-if-poc',
    loadChildren: () => import('./rx-if-poc/rx-if-poc.routed.module').then(m => m.RxIfPocRoutedModule)
  },
  {
    path: 'rx-swicht-poc',
    loadChildren: () => import('./rx-switch-poc/rx-swicht-poc.module').then(m => m.RxSwichtPocModule)
  },
  {
    path: 'rx-for-poc',
    loadChildren: () => import('./rx-for-poc/rx-for-poc.routed.module').then(m => m.RxForPocRoutedModule)
  },
  {
    path: 'cd-embedded-view-05',
    component: CdEmbeddedViewParent05Component
  }
];

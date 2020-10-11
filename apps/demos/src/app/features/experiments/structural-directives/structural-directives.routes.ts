import { CdEmbeddedViewParent05Component } from './05/parent.component';
import { CdEmbeddedViewParent06Component } from './06/parent.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'view-vs-embedded-view'
  },
  {
    path: 'view-vs-embedded-view',
    loadChildren: () => import('./view-vs-embedded-view/view-vs-embedded-view.module').then(m => m.ViewVsEmbeddedViewModule)
  },
  {
    path: 'rx-if-poc',
    loadChildren: () => import('./rx-if-poc/rx-if-poc.module').then(m => m.RxIfPocModule)
  },
  {
    path: 'rx-swicht-poc',
    loadChildren: () => import('./rx-switch-poc/rx-swicht-poc.module').then(m => m.RxSwichtPocModule)
  },
  {
    path: 'cd-embedded-view-05',
    component: CdEmbeddedViewParent05Component
  },
  {
    path: 'cd-embedded-view-06',
    component: CdEmbeddedViewParent06Component
  }
];

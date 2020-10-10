import { CdEmbeddedViewParent02Component } from './02/parent.component';
import { CdEmbeddedViewParent03Component } from './03/parent.component';
import { CdEmbeddedViewParent04Component } from './04/parent.component';
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
    path: 'cd-embedded-view-02',
    component: CdEmbeddedViewParent02Component
  },
  {
    path: 'cd-embedded-view-03',
    component: CdEmbeddedViewParent03Component
  },
  {
    path: 'cd-embedded-view-04',
    component: CdEmbeddedViewParent04Component
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

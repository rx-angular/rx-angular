
import { CdEmbeddedViewOverviewComponent } from './cd-embedded-view.overview.component';
import { CdEmbeddedViewParent01Component } from './01/parent.component';
import { CdEmbeddedViewParent02Component } from './02/parent.component';
import { CdEmbeddedViewParent03Component } from './03/parent.component';
import { CdEmbeddedViewParent04Component } from './04/parent.component';
import { CdEmbeddedViewParent05Component } from './05/parent.component';
import { CdEmbeddedViewParent06Component } from './06/parent.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'cd-embedded-view'
  },
  {
    path: 'cd-embedded-view',
    component: CdEmbeddedViewOverviewComponent,
  },
  {
    path: 'cd-embedded-view-01',
    component: CdEmbeddedViewParent01Component,
  },
  {
    path: 'cd-embedded-view-02',
    component: CdEmbeddedViewParent02Component,
  },
  {
    path: 'cd-embedded-view-03',
    component: CdEmbeddedViewParent03Component,
  },
  {
    path: 'cd-embedded-view-04',
    component: CdEmbeddedViewParent04Component,
  },
  {
    path: 'cd-embedded-view-05',
    component: CdEmbeddedViewParent05Component
  },
  {
    path: 'cd-embedded-view-06',
    component: CdEmbeddedViewParent06Component
  },
];

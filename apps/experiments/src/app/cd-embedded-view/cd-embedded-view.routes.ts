
import { CdEmbeddedViewOverviewComponent } from './cd-embedded-view.overview.component';
import { CdEmbeddedViewParent01Component } from './01/parent.component';
import { CdEmbeddedViewParent02Component } from './02/parent.component';

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
];

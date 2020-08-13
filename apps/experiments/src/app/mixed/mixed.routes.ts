import { Parent01Component } from './01/parent.component';
import { MixedOverviewComponent } from './mixed.overview.component';
import { Parent02Component } from './02/parent.component';

export const ROUTES = [
  {
    path: 'mixed',
    component: MixedOverviewComponent,
  },
  {
    path: 'mixed-01',
    component: Parent01Component,
  },
  {
    path: 'mixed-02',
    component: Parent02Component,
  },
];

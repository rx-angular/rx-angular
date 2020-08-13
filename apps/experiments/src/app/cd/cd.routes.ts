import { CdParent01Component } from './01/parent.component';
import { CdParent02Component } from './02/parent.component';
import { CdOverviewComponent } from './cd.overview.component';
import { CdParent03Component } from './03/parent.component';
import { CdParent04Component } from './04/parent.component';
import { CdParent05Component } from './05/parent.component';
import { CdParent06Component } from './06/parent.component';
import { CdParent11Component } from './11/parent.component';
import { CdParent12Component } from './12/parent.component';
import { CdParent13Component } from './13/parent.component';

export const ROUTES = [
  {
    path: 'cd',
    component: CdOverviewComponent,
  },
  {
    path: 'cd-01',
    component: CdParent01Component,
  },
  {
    path: 'cd-02',
    component: CdParent02Component,
  },
  {
    path: 'cd-03',
    component: CdParent03Component,
  },
  {
    path: 'cd-04',
    component: CdParent04Component,
  },
  {
    path: 'cd-05',
    component: CdParent05Component,
  },
  {
    path: 'cd-06',
    component: CdParent06Component,
  },
  {
    path: 'cd-11',
    component: CdParent11Component,
  },
  {
    path: 'cd-12',
    component: CdParent12Component,
  },
  {
    path: 'cd-13',
    component: CdParent13Component,
  },
];

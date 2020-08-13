import { Parent01Component } from './01/parent.component';
import { Parent02Component } from './02/parent.component';
import { Parent03Component } from './03/parent.component';
import { Parent05Component } from './05/parent.component';
import { Parent11Component } from './11/parent.component';
import { Parent12Component } from './12/parent.component';
import { Parent13Component } from './13/parent.component';
import { Parent14Component } from './14/parent.component';
import { Parent04Component } from './04/parent.component';
import { PushOverviewComponent } from './push.overview.component';
import { Parent21Component } from './21/parent.component';
import { Parent31Component } from './31/parent.component';

export const ROUTES = [
  {
    path: 'push',
    component: PushOverviewComponent,
  },
  {
    path: 'push-01',
    component: Parent01Component,
  },
  {
    path: 'push-02',
    component: Parent02Component,
  },
  {
    path: 'push-03',
    component: Parent03Component,
  },
  {
    path: 'push-04',
    component: Parent04Component,
  },
  {
    path: 'push-05',
    component: Parent05Component,
  },
  {
    path: 'push-11',
    component: Parent11Component,
  },
  {
    path: 'push-12',
    component: Parent12Component,
  },
  {
    path: 'push-13',
    component: Parent13Component,
  },
  {
    path: 'push-14',
    component: Parent14Component,
  },
  {
    path: 'push-21',
    component: Parent21Component,
  },
  {
    path: 'push-31',
    component: Parent31Component,
  },
];

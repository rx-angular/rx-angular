import { LetParent01Component } from './01/parent.component';
import { LetParent02Component } from './02/parent.component';
import { LetParent03Component } from './03/parent.component';
import { LetOverviewComponent } from './let.overview.component';
import { LetParent11Component } from './11/parent.component';
import { LetParent12Component } from './12/parent.component';

export const ROUTES = [
  {
    path: 'let',
    component: LetOverviewComponent,
  },
  {
    path: 'let-01',
    component: LetParent01Component,
  },
  {
    path: 'let-02',
    component: LetParent02Component,
  },
  {
    path: 'let-03',
    component: LetParent03Component,
  },
  {
    path: 'let-11',
    component: LetParent11Component,
  },
  {
    path: 'let-12',
    component: LetParent12Component,
  },
];

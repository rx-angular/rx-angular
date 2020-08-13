import { CdOperatorsParent01Component } from './01/parent.component';
import { CdOperatorsOverviewComponent } from './cd-operators.overview.component';

export const ROUTES = [
  {
    path: 'cd-operators',
    component: CdOperatorsOverviewComponent,
  },
  {
    path: 'cd-operators-01',
    component: CdOperatorsParent01Component,
  },
];

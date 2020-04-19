import { RxStateParent01Component } from './01/parent.component';
import { RxStateOverviewComponent } from './rx-state.overview.component';

export const ROUTES = [
  {
    path: 'rx-state',
    component: RxStateOverviewComponent
  },
  {
    path: 'rx-state-01',
    component: RxStateParent01Component
  }
];

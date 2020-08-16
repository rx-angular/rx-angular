import { RxStateOverviewComponent } from './rx-state.overview.component';
import { RxStateSelectSliceComponent } from './selectslice/select-slice.component';
import { RxStateParentSubscriptionComponent } from './subscription/parent.component';
import { RxStateParentSelectionsComponent } from './selections/parent.component';
import { RxStateParentCompositionComponent } from './composition/parent.component';
import { RxStateParentSubscriptionLessComponent } from './subscription-less-interaction/parent.component';

export const ROUTES = [
  {
    path: 'rx-base-state',
    component: RxStateOverviewComponent,
  },
  {
    path: 'subscription',
    component: RxStateParentSubscriptionComponent,
  },
  {
    path: 'composition',
    component: RxStateParentCompositionComponent,
  },
  {
    path: 'selections',
    component: RxStateParentSelectionsComponent,
  },
  {
    path: 'connect',
    component: RxStateParentSubscriptionLessComponent,
  },
  {
    path: 'selectslice',
    component: RxStateSelectSliceComponent,
  },
];

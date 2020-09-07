
import { ForPocBasicParentComponent } from './basic/parent.component';
import { ForPocAdvancedParentComponent } from './advanced/parent.component';
import { ForPocOverviewComponent } from './for-poc-overview.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'overview'
  },
  {
    path: 'overview',
    component: ForPocOverviewComponent,
  },
  {
    path: 'basic',
    component: ForPocBasicParentComponent,
  },
  {
    path: 'advanced',
    component: ForPocAdvancedParentComponent,
  },
];

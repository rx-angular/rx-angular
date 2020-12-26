import { Routes } from '@angular/router';
import { RxLetPocComponent } from './rx-let-poc.component';
import { RxQueryChildrenComponent } from './rx-query-children.component';
import { RxQueryComponent } from './rx-query.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: RxLetPocComponent,
  },
  {
    path: 'rx-query',
    component: RxQueryComponent,
  },
  {
    path: 'rx-query-children',
    component: RxQueryChildrenComponent,
  },
];

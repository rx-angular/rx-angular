import { Routes } from '@angular/router';
import { RxLetPocComponent } from './rx-let-poc.component';
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
];

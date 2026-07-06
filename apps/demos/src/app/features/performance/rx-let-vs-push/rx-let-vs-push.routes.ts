import { RxLetVsPushComponent } from './rx-let-vs-push.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'rx-let-vs-push',
    pathMatch: 'full' as const,
  },
  {
    path: 'list-toggle',
    component: RxLetVsPushComponent,
  },
];

import { Routes } from '@angular/router';

export const PUSH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basic-example',
    pathMatch: 'full',
  },
  {
    path: 'basic-example',
    loadComponent: () =>
      import('./push-basic.component').then((m) => m.PushBasicComponent),
  },
  {
    path: 'vs-async',
    loadComponent: () =>
      import('./push-vs-async.component').then((m) => m.PushVsAsyncComponent),
  },
];

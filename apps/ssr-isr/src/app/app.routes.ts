import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'static',
    loadComponent: () =>
      import('./static.component').then((m) => m.StaticComponent),
  },
  {
    path: 'dynamic/:id',
    loadComponent: () =>
      import('./dynamic.component').then((m) => m.DynamicPageComponent),
    data: {
      revalidate: 10,
    },
  },
  {
    path: 'needs-redirect',
    loadComponent: () =>
      import('./redirect.component').then((m) => m.RedirectComponent),
  },
  {
    path: '**',
    redirectTo: '/static',
  },
];

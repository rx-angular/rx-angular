import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home.component'),
    data: { revalidate: 5 },
  },
  {
    path: 'docs',
    loadComponent: () => import('./docs/layout/layout.component'),
    loadChildren: () => import('./docs/routes'),
  },
];

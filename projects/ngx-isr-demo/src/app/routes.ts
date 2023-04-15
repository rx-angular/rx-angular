import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home.component'),
    data: { revalidate: 5 },
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout.component'),
    children: [
      {
        path: 'one',
        loadComponent: () => import('./components/page-one.component'),
        title: 'Page One',
      },
      {
        path: 'two',
        loadComponent: () => import('./components/page-two.component'),
        data: { revalidate: 5 },
        title: 'Page Two',
      },
      {
        path: 'three',
        loadComponent: () => import('./components/page-three.component'),
        data: { revalidate: 0 },
        title: 'Page Three',
      },
      {
        path: 'details',
        loadComponent: () => import('./components/details.component'),
        data: { revalidate: 10 },
        title: 'Details',
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details.component'),
        data: { revalidate: 10 },
        title: 'Details',
      },
    ],
  },
];

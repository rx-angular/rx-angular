import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'intro',
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages/getting-started.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'how-it-works',
    loadComponent: () => import('./pages/how-it-works.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'error-handling',
    loadComponent: () => import('./pages/error-handling.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'on-demand-revalidation',
    loadComponent: () => import('./pages/on-demand-revalidation.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'cache-handlers',
    loadComponent: () => import('./pages/cache-handlers.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'pre-rendering-and-isr',
    loadComponent: () => import('./pages/prerendering-isr.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'create-your-own-cache-handler',
    loadComponent: () => import('./pages/create-own-cache-handler.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'modify-html-cache-hooks',
    loadComponent: () => import('./pages/modify-html-hooks.component'),
    data: { revalidate: 0 },
  },
  {
    path: 'use-ngx-isr-service-for-more-than-caching',
    loadComponent: () => import('./pages/isr-service-more-than-caching.component'),
  },
  {
    path: 'api',
    loadComponent: () => import('./pages/api.component'),
    data: { revalidate: 0 },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component'),
    data: { revalidate: 0 },
  }
];

export default routes;

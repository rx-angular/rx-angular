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
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages/getting-started.component'),
  },
  {
    path: 'how-it-works',
    loadComponent: () => import('./pages/how-it-works.component'),
  },
  {
    path: 'error-handling',
    loadComponent: () => import('./pages/error-handling.component'),
  },
  {
    path: 'on-demand-revalidation',
    loadComponent: () => import('./pages/on-demand-revalidation.component'),
  },
  {
    path: 'cache-handlers',
    loadComponent: () => import('./pages/cache-handlers.component'),
  },
  {
    path: 'pre-rendering-and-isr',
    loadComponent: () => import('./pages/prerendering-isr.component'),
  },
  {
    path: 'create-your-own-cache-handler',
    loadComponent: () => import('./pages/create-own-cache-handler.component'),
  },
  {
    path: 'modify-html-cache-hooks',
    loadComponent: () => import('./pages/modify-html-hooks.component'),
  },
  {
    path: 'use-ngx-isr-service-for-more-than-caching',
    loadComponent: () => import('./pages/isr-service-more-than-caching.component'),
  },
  {
    path: 'api',
    loadComponent: () => import('./pages/api.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component'),
  }
];

export default routes;

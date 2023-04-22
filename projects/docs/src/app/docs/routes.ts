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
    title: 'Introduction',
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages/getting-started.component'),
    data: { revalidate: 0 },
    title: 'Getting Started',
  },
  {
    path: 'how-it-works',
    loadComponent: () => import('./pages/how-it-works.component'),
    data: { revalidate: 0 },
    title: 'How it works',
  },
  {
    path: 'error-handling',
    loadComponent: () => import('./pages/error-handling.component'),
    data: { revalidate: 5 },
    title: 'Error Handling',
  },
  {
    path: 'on-demand-revalidation',
    loadComponent: () => import('./pages/on-demand-revalidation.component'),
    data: { revalidate: 0 },
    title: 'On-Demand Revalidation',
  },
  {
    path: 'cache-handlers',
    loadComponent: () => import('./pages/cache-handlers.component'),
    data: { revalidate: 0 },
    title: 'Cache Handlers',
  },
  {
    path: 'pre-rendering-and-isr',
    loadComponent: () => import('./pages/prerendering-isr.component'),
    data: { revalidate: 0 },
    title: 'Pre-rendering and ISR',
  },
  {
    path: 'create-your-own-cache-handler',
    loadComponent: () => import('./pages/create-own-cache-handler.component'),
    data: { revalidate: 0 },
    title: 'Create your own CacheHandler',
  },
  {
    path: 'modify-html-cache-hooks',
    loadComponent: () => import('./pages/modify-html-hooks.component'),
    data: { revalidate: 0 },
    title: 'Modify HTML Cache Hooks',
  },
  {
    path: 'use-ngx-isr-service-for-more-than-caching',
    loadComponent: () => import('./pages/isr-service-more-than-caching.component'),
    data: { revalidate: 0 },
    title: 'Use NgxIsrService for more than caching',
  },
  {
    path: 'api',
    loadComponent: () => import('./pages/api.component'),
    data: { revalidate: 0 },
    title: 'API',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component'),
    data: { revalidate: 0 },
  },
];

export default routes;

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '0',
    loadChildren: () =>
      import('../shared/chunkers-3MB-500constants-0components/root-chunker.routes').then(
        (m) => m.rootChunkerRoutes,
      ),
  },
  {
    path: '20',
    loadChildren: () =>
      import('../shared/chunkers-3MB-500constants-20components/root-chunker.routes').then(
        (m) => m.rootChunkerRoutes,
      ),
  },
  {
    path: '100',
    loadChildren: () =>
      import('../shared/chunkers-3MB-500constants-100components/root-chunker.routes').then(
        (m) => m.rootChunkerRoutes,
      ),
  },
  {
    path: '250',
    loadChildren: () =>
      import('../shared/chunkers-3MB-500constants-250components/root-chunker.routes').then(
        (m) => m.rootChunkerRoutes,
      ),
  },
  {
    path: '500',
    loadChildren: () =>
      import('../shared/chunkers-3MB-500constants-500components/root-chunker.routes').then(
        (m) => m.rootChunkerRoutes,
      ),
  },
];

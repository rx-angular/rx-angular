import { Route } from '@angular/router';

export const chunkRoutes: Route[] = [
  {
    path: 'chunk-001',
    loadComponent: () =>
      import('./chunks/chunk-001.component').then((m) => m.Chunk001Component),
  },
  {
    path: 'chunk-002',
    loadComponent: () =>
      import('./chunks/chunk-002.component').then((m) => m.Chunk002Component),
  },
  {
    path: 'chunk-003',
    loadComponent: () =>
      import('./chunks/chunk-003.component').then((m) => m.Chunk003Component),
  },
  {
    path: 'chunk-004',
    loadComponent: () =>
      import('./chunks/chunk-004.component').then((m) => m.Chunk004Component),
  },
  {
    path: 'chunk-005',
    loadComponent: () =>
      import('./chunks/chunk-005.component').then((m) => m.Chunk005Component),
  },
  {
    path: 'chunk-006',
    loadComponent: () =>
      import('./chunks/chunk-006.component').then((m) => m.Chunk006Component),
  },
  {
    path: 'chunk-007',
    loadComponent: () =>
      import('./chunks/chunk-007.component').then((m) => m.Chunk007Component),
  },
  {
    path: 'chunk-008',
    loadComponent: () =>
      import('./chunks/chunk-008.component').then((m) => m.Chunk008Component),
  },
  {
    path: 'chunk-009',
    loadComponent: () =>
      import('./chunks/chunk-009.component').then((m) => m.Chunk009Component),
  },
  {
    path: 'chunk-010',
    loadComponent: () =>
      import('./chunks/chunk-010.component').then((m) => m.Chunk010Component),
  },
  {
    path: 'chunk-011',
    loadComponent: () =>
      import('./chunks/chunk-011.component').then((m) => m.Chunk011Component),
  },
  {
    path: 'chunk-012',
    loadComponent: () =>
      import('./chunks/chunk-012.component').then((m) => m.Chunk012Component),
  },
  {
    path: 'chunk-013',
    loadComponent: () =>
      import('./chunks/chunk-013.component').then((m) => m.Chunk013Component),
  },
  {
    path: 'chunk-014',
    loadComponent: () =>
      import('./chunks/chunk-014.component').then((m) => m.Chunk014Component),
  },
  {
    path: 'chunk-015',
    loadComponent: () =>
      import('./chunks/chunk-015.component').then((m) => m.Chunk015Component),
  },
  {
    path: 'chunk-016',
    loadComponent: () =>
      import('./chunks/chunk-016.component').then((m) => m.Chunk016Component),
  },
  {
    path: 'chunk-017',
    loadComponent: () =>
      import('./chunks/chunk-017.component').then((m) => m.Chunk017Component),
  },
  {
    path: 'chunk-018',
    loadComponent: () =>
      import('./chunks/chunk-018.component').then((m) => m.Chunk018Component),
  },
  {
    path: 'chunk-019',
    loadComponent: () =>
      import('./chunks/chunk-019.component').then((m) => m.Chunk019Component),
  },
  {
    path: 'chunk-020',
    loadComponent: () =>
      import('./chunks/chunk-020.component').then((m) => m.Chunk020Component),
  },
];

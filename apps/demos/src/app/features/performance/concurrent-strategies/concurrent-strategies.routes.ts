import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'comparison'
  },
  {
    path: 'comparison',
    loadChildren: () => import('./comparison/comparison.module')
      .then(m => m.ComparisonModule)
  },
  {
    path: 'pixel-priority',
    loadChildren: () => import('./pixel-priority/pixel-priority.module')
      .then(m => m.PixelPriorityModule)
  }
];

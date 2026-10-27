import { Routes } from '@angular/router';

export const STRATEGIES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'comparison',
    pathMatch: 'full',
  },
  {
    path: 'comparison',
    loadComponent: () =>
      import('./comparison/comparison.component').then(
        (m) => m.ComparisonComponent,
      ),
  },
  {
    path: 'pixel-priority',
    loadComponent: () =>
      import('./pixel-priority/pixel-priority.component').then(
        (m) => m.PixelPriorityComponent,
      ),
  },
];

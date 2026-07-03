import { Routes } from '@angular/router';

export const CDK_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'transformations',
    pathMatch: 'full',
  },
  {
    path: 'transformations',
    loadComponent: () =>
      import('./transformations/transformations.component').then(
        (mod) => mod.TransformationsComponent,
      ),
  },
  {
    path: 'coercing',
    loadComponent: () =>
      import('./coercing/coercing.component').then(
        (mod) => mod.CoercingComponent,
      ),
  },
];

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'mixed-01'
  },
  {
    path: 'mixed-01',
    loadChildren: () => import('./01/mix-1.module').then(m => m.Mix1Module)
  },
  {
    path: 'mixed-02',
    loadChildren: () => import('./02/mix2.module').then(m => m.Mix2Module)
  }
];

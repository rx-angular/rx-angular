import { AlphasCompareComponent } from './alphas-compare.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'alphas-compare',
  },
  {
    path: 'list-toggle',
    component: AlphasCompareComponent,
  },
];

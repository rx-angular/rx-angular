import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basic',
  },
  {
    path: 'basic',
    loadChildren: () =>
      import('./basic/rx-chunk-basic.module').then((m) => m.RxChunkBasicModule),
  },
];

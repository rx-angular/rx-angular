import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ng-iterable-differ',
        loadChildren: () => import('./ng-iterable-differ/ng-iterable-differ.module')
          .then(m => m.NgIterableDifferModule)
      },
      {
        path: 'rx-iterable-differ',
        loadChildren: () => import('./rx-iterable-differ/rx-iterable-differ.module')
          .then(m => m.RxIterableDifferModule)
      },
      {
        path: 'for-differ',
        loadChildren: () => import('./rx-for-differ/rx-for-differ.module')
          .then(m => m.RxForDifferModule)
      }
      /**/
    ]
  }
];

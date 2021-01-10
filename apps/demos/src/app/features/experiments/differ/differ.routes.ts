import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'rx-iterable-differ',
        loadChildren: () =>
          import('./rx-iterable-differ/rx-iterable-differ.module').then(
            (m) => m.RxIterableDifferModule
          ),
      },
    ],
  },
];

import { Routes } from '@angular/router';

export const RX_FOR_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list-actions',
    pathMatch: 'full',
  },
  {
    path: 'list-actions',
    loadComponent: () =>
      import('./list-actions/list-actions.component').then(
        (m) => m.ListActionsComponent,
      ),
  },
  {
    path: 'error-handling',
    loadComponent: () =>
      import('./error-handling/error-handling-parent.component').then(
        (m) => m.ErrorHandlingParentComponent,
      ),
  },
  {
    path: 'nested-lists',
    loadComponent: () =>
      import('./nested-lists/nested-lists.component').then(
        (m) => m.RxForNestedListsComponent,
      ),
  },
  {
    path: 'route-change',
    loadComponent: () =>
      import('./route-change/route-change.component').then(
        (m) => m.RouteChangeComponent,
      ),
    children: [
      {
        path: 'native',
        loadComponent: () =>
          import('./route-change/routed-ng-for.component').then(
            (m) => m.RoutedNgForComponent,
          ),
      },
      {
        path: 'rx-for',
        loadComponent: () =>
          import('./route-change/routed-rx-for.component').then(
            (m) => m.RoutedRxForComponent,
          ),
      },
    ],
  },
];

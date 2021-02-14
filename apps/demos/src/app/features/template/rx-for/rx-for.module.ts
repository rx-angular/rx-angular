import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'list-actions'
  },
  {
    path: 'list-actions',
    loadChildren: () =>
      import('./list-actions/list-actions.module').then(
        m => m.ListActionsModule
      )
  },
  {
    path: 'nested-lists',
    loadChildren: () =>
      import('./nested-lists/nested-lists.routed.module').then(
        m => m.NestedListsRoutedModule
      )
  },
  {
    path: 'route-change',
    loadChildren: () =>
      import('./route-change/route-change.module').then(
        m => m.RouteChangeModule
      )
  }
];


@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [],
})
export class RxForDemoModule {}

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
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
})
export class RxForDemoModule {}

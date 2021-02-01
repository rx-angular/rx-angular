import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './nested-lists.routes';
import { NestedListsModule } from './nested-lists.module';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    NestedListsModule
  ]
})
export class NestedListsRoutedModule {
}

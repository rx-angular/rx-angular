import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NestedListsModule } from './nested-lists.module';
import { ROUTES } from './nested-lists.routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES), NestedListsModule],
})
export class NestedListsRoutedModule {}

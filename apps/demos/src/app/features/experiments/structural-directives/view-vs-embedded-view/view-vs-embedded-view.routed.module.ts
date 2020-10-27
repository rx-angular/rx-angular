import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './view-vs-embedded-view.routes';
import { ViewVsEmbeddedViewModule } from './view-vs-embedded-view.module';

@NgModule({
  declarations: [],
  exports: [
    ViewVsEmbeddedViewModule
  ],
  imports: [
    ViewVsEmbeddedViewModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ViewVsEmbeddedViewRoutedModule {
}

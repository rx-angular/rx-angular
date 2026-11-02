import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewVsEmbeddedViewModule } from './view-vs-embedded-view.module';
import { ROUTES } from './view-vs-embedded-view.routes';

@NgModule({
  declarations: [],
  exports: [ViewVsEmbeddedViewModule],
  imports: [ViewVsEmbeddedViewModule, RouterModule.forChild(ROUTES)],
})
export class ViewVsEmbeddedViewRoutedModule {}

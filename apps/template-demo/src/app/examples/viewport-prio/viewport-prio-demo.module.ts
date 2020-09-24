import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewportPrioComponent } from './basic-example/viewport-prio.component';
import { TemplateModule } from '@rx-angular/template';
import { SharedModule } from '../../shared/shared.module';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewportPrioComponent
  },
  {
    path: 'solution',
    component: ViewportPrioComponent
  }
];
const DECLARATIONS = [ViewportPrioComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    SharedModule
  ],
  exports: [DECLARATIONS]
})
export class ViewportPrioModule {}

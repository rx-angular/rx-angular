import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Let1ContainerComponent } from './solution/let1.container.component';
import { TemplateModule } from '@rx-angular/template';
import { ViewportModule } from '../../viewport.module';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: Let1ContainerComponent
  },
  {
    path: 'solution',
    component: Let1ContainerComponent
  }
];
const DECLARATIONS = [Let1ContainerComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    ViewportModule,
    RouterModule.forChild(ROUTES),
    TemplateModule
  ],
  exports: [DECLARATIONS]
})
export class PrioritizeInViewportModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { Circles1ContainerComponent } from './circles/circles-1.container.component';
import { Circles1Component } from './circles/circles-1.component';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: Circles1Component
  },
  {
    path: 'circle',
    component: Circles1ContainerComponent
  }
];
const DECLARATIONS = [Circles1ContainerComponent, Circles1Component];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, RouterModule.forChild(ROUTES), TemplateModule],
  exports: [DECLARATIONS]
})
export class CoalescingModule {}

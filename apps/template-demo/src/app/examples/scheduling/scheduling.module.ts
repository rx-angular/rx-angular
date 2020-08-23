import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from './experiments-profiling/scheduling.component';
import { TemplateModule } from '@rx-angular/template';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: SchedulingComponent
  },
  {
    path: 'solution',
    component: SchedulingComponent
  }
];
const DECLARATIONS = [SchedulingComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, RouterModule.forChild(ROUTES), TemplateModule],
  exports: [DECLARATIONS]
})
export class SchedulingModule {}

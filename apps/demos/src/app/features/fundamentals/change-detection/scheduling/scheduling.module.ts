import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './scheduling.routes';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';

const DECLARATIONS = [SchedulingComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    MatButtonModule,
    VisualizerModule
  ],
  exports: [DECLARATIONS]
})
export class SchedulingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from './experiments-profiling/scheduling.component';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './scheduling.routes';
import { DirtyChecksModule } from '../../../debug-helper/dirty-checks/dirty-checks.module';
import { MatButtonModule } from '@angular/material/button';

const DECLARATIONS = [SchedulingComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    DirtyChecksModule,
    MatButtonModule
  ],
  exports: [DECLARATIONS]
})
export class SchedulingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoalescingExperimentsProfilingComponent } from './experiments-profiling/coalescing-experiments-profiling.component';
import { TemplateModule } from '@rx-angular/template';
import { RealLife1ContainerComponent } from './real-life-1/real-life-1.container.component';
import { RealLife1Component } from './real-life-1/real-life-1.component';
import { SharedModule } from '../shared/shared.module';
import { CoalescingExperimentsProfilingChildComponent } from './experiments-profiling/coalescing-experiments-profiling-child.component';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: CoalescingExperimentsProfilingComponent
  },
  {
    path: 'experiments-profiling',
    component: CoalescingExperimentsProfilingComponent
  },
  {
    path: 'real-life-1',
    component: RealLife1ContainerComponent
  }
];
const DECLARATIONS = [
  CoalescingExperimentsProfilingComponent,
  RealLife1ContainerComponent,
  CoalescingExperimentsProfilingChildComponent,
  RealLife1Component
];

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
export class CoalescingModule {}

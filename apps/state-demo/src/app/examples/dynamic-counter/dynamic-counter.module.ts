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
import { DynamicCounter1ContainerComponent } from './1/dynamic-counter-1.container.component';
import { Counter1Component } from './1/dynamic-counter-1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToArrayPipe } from '../../core/to-array.pipe';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: DynamicCounter1ContainerComponent
  },
  {
    path: 'step-1',
    component: DynamicCounter1ContainerComponent
  }
];
const DECLARATIONS = [
  ToArrayPipe,
  DynamicCounter1ContainerComponent,
  Counter1Component
];
export const materialModules = [
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    materialModules,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ],
  exports: [DECLARATIONS]
})
export class DynamicCounterModule {}

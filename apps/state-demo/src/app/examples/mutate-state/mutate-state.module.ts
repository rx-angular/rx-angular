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
import { MutateState1ContainerComponent } from './1/mutate-state-1.container.component';
import { MutateState1Component1 } from './1/mutate-state-1.component';
export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: MutateState1ContainerComponent
  },
  {
    path: 'step-1',
    component: MutateState1ContainerComponent
  }
];
const DECLARATIONS = [MutateState1ContainerComponent, MutateState1Component1];
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
  imports: [CommonModule, materialModules, RouterModule.forChild(ROUTES)],
  exports: [DECLARATIONS]
})
export class MutateStateModule {}

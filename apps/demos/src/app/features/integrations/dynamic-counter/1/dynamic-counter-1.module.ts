import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../../shared/utils/utils.module';
import { Counter1Component } from './dynamic-counter-1.component';
import { DynamicCounter1ContainerComponent } from './dynamic-counter-1.container.component';
import { ROUTES } from './dynamic-counter-1.routes';

const DECLARATIONS = [DynamicCounter1ContainerComponent, Counter1Component]

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    MatInputModule,
    UtilsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class DynamicCounter1Module { }

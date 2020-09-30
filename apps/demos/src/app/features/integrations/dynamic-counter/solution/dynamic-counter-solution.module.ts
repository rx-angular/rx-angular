import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../../shared/utils/utils.module';
import { ROUTES } from './dynamic-counter-solution.routes';
import { CounterComponent } from './dynamic-counter.component';
import { DynamicCounterContainerComponent } from './dynamic-counter.container.component';

const DECLARATIONS = [DynamicCounterContainerComponent, CounterComponent]

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
export class DynamicCounterSolutionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ROUTES } from './passing-values.routes';
import { MatButtonModule } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { PassingValuesComponent } from './passing-values.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RecursiveModule } from '../../../shared/template-structures/recursive/recursive.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
    MatIconModule,
    RecursiveModule,
    FormsModule,
    RxUnpatch,
    MatButtonModule,
    RxPush,
    PassingValuesComponent,
  ],
  exports: [],
})
export class PassingValuesModule {}

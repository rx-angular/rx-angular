import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { RecursiveModule } from '../../../shared/template-structures/recursive/recursive.module';
import { PassingValuesComponent } from './passing-values.component';
import { ROUTES } from './passing-values.routes';

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

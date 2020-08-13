import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Performance03IndexComponent } from './index/performance03-index.component';
import { RouterModule } from '@angular/router';
import { ROUTES as PERFORMANCE_3_ROUTES } from '../performance-03/performance-03.routes';

@NgModule({
  declarations: [Performance03IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PERFORMANCE_3_ROUTES),
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class Performance03Module {}

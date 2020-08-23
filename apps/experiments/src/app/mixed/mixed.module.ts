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
import { TemplateModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { ROUTES as MIXED_ROUTES } from './mixed.routes';
import { Parent01Component } from './01/parent.component';
import { Child01Component } from './01/child.component';
import { Parent02Component } from './02/parent.component';
import { Child02Component } from './02/child.component';

import { MixedOverviewComponent } from './mixed.overview.component';

@NgModule({
  declarations: [
    Parent01Component,
    Child01Component,
    Parent02Component,
    Child02Component,
    MixedOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MIXED_ROUTES),
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TemplateModule,
  ],
})
export class MixedModule {}

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
import { ROUTES as LET_ROUTES } from './let.routes';
import { LetParent01Component } from './01/parent.component';
import { LetParent02Component } from './02/parent.component';
import { LetParent03Component } from './03/parent.component';
import { LetParent11Component } from './11/parent.component';
import { LetOverviewComponent } from './let.overview.component';
import { LetParent12Component } from './12/parent.component';

@NgModule({
  declarations: [
    LetParent01Component,
    LetParent02Component,
    LetParent03Component,
    LetParent11Component,
    LetParent12Component,
    LetOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LET_ROUTES),
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
export class LetModule {}

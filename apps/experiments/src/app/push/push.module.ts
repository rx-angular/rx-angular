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
import { Child05Component } from './05/child.component';
import { Parent05Component } from './05/parent.component';
import { ROUTES as PUSH_ROUTES } from './push.routes';
import { Parent01Component } from './01/parent.component';
import { Parent02Component } from './02/parent.component';
import { Parent03Component } from './03/parent.component';
import { Parent11Component } from './11/parent.component';
import { Child11Component } from './11/child.component';
import { Child12Component } from './12/child.component';
import { Parent12Component } from './12/parent.component';
import { Parent13Component } from './13/parent.component';
import { Child13Component } from './13/child.component';
import { Parent14Component } from './14/parent.component';
import { Child14Component } from './14/child.component';
import { Parent04Component } from './04/parent.component';
import { PushOverviewComponent } from './push.overview.component';
import { Child21Component } from './21/child.component';
import { Parent21Component } from './21/parent.component';
import { Parent31Component } from './31/parent.component';
import { Child31Component } from './31/child.component';

@NgModule({
  declarations: [
    Parent01Component,
    Parent02Component,
    Parent03Component,
    Parent04Component,
    Parent05Component,
    Child05Component,
    Parent11Component,
    Child11Component,
    Parent12Component,
    Child12Component,
    Parent13Component,
    Child13Component,
    Parent14Component,
    Child14Component,
    Parent21Component,
    Child21Component,
    Parent31Component,
    Child31Component,
    PushOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PUSH_ROUTES),
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
export class PushModule {}

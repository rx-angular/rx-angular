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
import { Child0201Component } from './02/child01.component';
import { Child0202Component } from './02/child02.component';
import { CdParent02Component } from './02/parent.component';
import { ROUTES as CD_ROUTES } from './cd.routes';

import { CdParent01Component } from './01/parent.component';
import { Child0101Component } from './01/child01.component';
import { Child010101Component } from './01/child0101.component';
import { Child0102Component } from './01/child02.component';

import { CdOverviewComponent } from './cd.overview.component';
import { CdParent03Component } from './03/parent.component';
import { Child030101Component } from './03/child0101.component';
import { Child0301Component } from './03/child01.component';
import { Child0302Component } from './03/child02.component';
import { Child020101Component } from './02/child0101.component';
import { CdParent04Component } from './04/parent.component';
import { Child0401Component } from './04/child01.component';
import { Child0402Component } from './04/child02.component';
import { Child040101Component } from './04/child0101.component';
import { CdParent05Component } from './05/parent.component';
import { Child0601Component } from './06/child01.component';
import { CdParent06Component } from './06/parent.component';
import { Child0602Component } from './06/child02.component';
import { Child060101Component } from './06/child0101.component';
import { CdParent11Component } from './11/parent.component';
import { CdParent12Component } from './12/parent.component';
import { CdParent13Component } from './13/parent.component';

@NgModule({
  declarations: [
    CdParent01Component,
    Child0101Component,
    Child010101Component,
    Child0102Component,
    CdParent02Component,
    Child0201Component,
    Child020101Component,
    Child0202Component,
    CdParent03Component,
    Child0301Component,
    Child030101Component,
    Child0302Component,
    CdParent04Component,
    Child0401Component,
    Child040101Component,
    Child0402Component,
    CdParent05Component,
    CdParent06Component,
    Child0601Component,
    Child060101Component,
    Child0602Component,
    CdParent11Component,
    CdParent12Component,
    CdParent13Component,
    CdOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
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
export class CdModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { DirtyChecksModule } from '../../../debug-helper/dirty-checks/dirty-checks.module';
import { ErrorHandlingComponent } from './error-handling.component';
import { ROUTES } from './error-handling.routes';
import { GhostElementsModule } from '../../../ghost-elements/ghost-elements.module';

const DECLARATIONS = [
  ErrorHandlingComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    GhostElementsModule,
    DirtyChecksModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ErrorHandingModule {

}

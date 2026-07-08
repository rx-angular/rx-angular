import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { ErrorHandlingComponent } from './error-handling.component';
import { ROUTES } from './error-handling.routes';

const DECLARATIONS = [ErrorHandlingComponent];

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
    RouterModule.forChild(ROUTES),
  ],
})
export class ErrorHandingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ErrorHandlingComponent } from './error-handling.component';
import { ROUTES } from './error-handling.routes';
import { GhostElementsModule } from '../../../../shared/ghost-elements';

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

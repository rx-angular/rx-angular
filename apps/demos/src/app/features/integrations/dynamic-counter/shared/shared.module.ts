import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { UtilsModule } from '../../../../shared/utils/utils.module';
import { CounterDisplayComponent } from './counter-display.component';

const DECLARATIONS = [CounterDisplayComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, LetModule, PushModule, UtilsModule],
  exports: [
    DECLARATIONS,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    LetModule,
    PushModule,
    UtilsModule,
  ],
})
export class SharedModule {}

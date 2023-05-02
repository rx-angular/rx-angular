import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { PushPipe } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { CounterDisplayComponent } from './counter-display.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../../../shared/utils/utils.module';

const DECLARATIONS = [CounterDisplayComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, RxLet, PushPipe, UtilsModule],
  exports: [
    DECLARATIONS,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RxLet,
    PushPipe,
    UtilsModule,
  ],
})
export class SharedModule {}

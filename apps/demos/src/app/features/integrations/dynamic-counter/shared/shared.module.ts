import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { CounterDisplayComponent } from './counter-display.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS = [CounterDisplayComponent];

@NgModule({
  imports: [CommonModule, RxLet, RxPush, ...DECLARATIONS],
  exports: [
    DECLARATIONS,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RxLet,
    RxPush,
  ],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { CounterDisplayComponent } from './counter-display.component';

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

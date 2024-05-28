import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { RxForModule } from '../../../rx-angular-pocs/template/directives/for/rx-for.module';
import { StrategySelectComponent } from './strategy-select/strategy-select.component';

@NgModule({
  declarations: [StrategySelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RxUnpatch,
    RxPush,
    MatIconModule,
    MatSelectModule,
    RxForModule,
    RxLet,
  ],
  exports: [StrategySelectComponent],
})
export class StrategySelectModule {}

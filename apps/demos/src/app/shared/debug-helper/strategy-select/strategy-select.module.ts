import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { RxForModule } from '../../../rx-angular-pocs/template/directives/for/rx-for.module';
import { StrategySelectComponent } from './strategy-select/strategy-select.component';

@NgModule({
  declarations: [StrategySelectComponent],
  imports: [
    CommonModule,
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

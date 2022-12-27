import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { RxForModule } from '../../../rx-angular-pocs/template/directives/for/rx-for.module';
import { StrategySelectComponent } from './strategy-select/strategy-select.component';

@NgModule({
  declarations: [StrategySelectComponent],
  imports: [
    CommonModule,
    UnpatchModule,
    PushModule,
    MatIconModule,
    MatSelectModule,
    RxForModule,
    LetModule,
  ],
  exports: [StrategySelectComponent],
})
export class StrategySelectModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { UtilsModule } from '../../../utils/utils.module';
import { DirtyChecksModule } from '../../dirty-checks';
import { ValueComponent } from './value.component';

const DEPRECATIONS = [ValueComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [
    CommonModule,
    MatRippleModule,
    RxPush,
    UtilsModule,
    RxLet,
    MatIconModule,
    DirtyChecksModule,
  ],
  exports: [...DEPRECATIONS],
})
export class ValueModule {}

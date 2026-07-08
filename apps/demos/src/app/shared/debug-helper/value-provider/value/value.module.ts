import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { DirtyChecksModule } from '../../dirty-checks';
import { ValueComponent } from './value.component';

const DEPRECATIONS = [ValueComponent];

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    RxPush,
    RxLet,
    MatIconModule,
    DirtyChecksModule,
    ...DEPRECATIONS,
  ],
  exports: [...DEPRECATIONS],
})
export class ValueModule {}

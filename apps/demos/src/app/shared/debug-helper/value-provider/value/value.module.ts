import { NgModule } from '@angular/core';
import { DirtyChecksModule } from '../../dirty-checks';
import { ValueComponent } from './value.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';

import { MatIconModule } from '@angular/material/icon';

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

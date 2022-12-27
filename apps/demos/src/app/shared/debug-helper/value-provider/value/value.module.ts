import { NgModule } from '@angular/core';
import { DirtyChecksModule } from '../../dirty-checks';
import { ValueComponent } from './value.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UtilsModule } from '../../../utils/utils.module';
import { MatIconModule } from '@angular/material/icon';

const DEPRECATIONS = [ValueComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [
    CommonModule,
    MatRippleModule,
    PushModule,
    UtilsModule,
    LetModule,
    MatIconModule,
    DirtyChecksModule,
  ],
  exports: [...DEPRECATIONS],
})
export class ValueModule {}

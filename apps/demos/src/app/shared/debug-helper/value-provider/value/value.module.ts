import { NgModule } from '@angular/core';
import { ValueComponent } from './value.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { LetModule, PushModule } from '@rx-angular/template';
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
    MatIconModule
  ],
  exports: [...DEPRECATIONS]
})
export class ValueModule {

}

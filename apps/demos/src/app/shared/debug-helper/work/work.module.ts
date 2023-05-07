import { NgModule } from '@angular/core';
import { WorkComponent } from './work.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { UtilsModule } from '../../utils/utils.module';

const DEPRECATIONS = [WorkComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [CommonModule, MatRippleModule, RxPush, UtilsModule, RxLet],
  exports: [...DEPRECATIONS],
})
export class WorkModule {}

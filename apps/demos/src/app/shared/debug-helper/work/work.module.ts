import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { UtilsModule } from '../../utils/utils.module';
import { WorkComponent } from './work.component';

const DEPRECATIONS = [WorkComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [CommonModule, MatRippleModule, RxPush, UtilsModule, RxLet],
  exports: [...DEPRECATIONS],
})
export class WorkModule {}

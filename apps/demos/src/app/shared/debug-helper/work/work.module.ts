import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { WorkComponent } from './work.component';

const DEPRECATIONS = [WorkComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, RxPush, RxLet, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class WorkModule {}

import { NgModule } from '@angular/core';
import { WorkComponent } from './work.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';

const DEPRECATIONS = [WorkComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, RxPush, RxLet, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class WorkModule {}

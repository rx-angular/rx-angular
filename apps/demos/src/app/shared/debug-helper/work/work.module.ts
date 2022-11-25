import { NgModule } from '@angular/core';
import { WorkComponent } from './work.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UtilsModule } from '../../utils/utils.module';

const DEPRECATIONS = [WorkComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [CommonModule, MatRippleModule, PushModule, UtilsModule, LetModule],
  exports: [...DEPRECATIONS],
})
export class WorkModule {}

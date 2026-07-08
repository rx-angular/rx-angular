import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RippleComponent } from './ripple.component';

const DEPRECATIONS = [RippleComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [CommonModule, MatRippleModule],
  exports: [...DEPRECATIONS],
})
export class RippleModule {}

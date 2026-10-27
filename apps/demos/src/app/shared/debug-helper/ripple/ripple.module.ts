import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RippleComponent } from './ripple.component';

const DEPRECATIONS = [RippleComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class RippleModule {}

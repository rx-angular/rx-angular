import { NgModule } from '@angular/core';
import { RippleComponent } from './ripple.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

const DEPRECATIONS = [RippleComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class RippleModule {}

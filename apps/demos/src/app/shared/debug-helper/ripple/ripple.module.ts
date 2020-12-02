import { NgModule } from '@angular/core';
import { RippleComponent } from './ripple.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

const DEPRECATIONS = [RippleComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [...DEPRECATIONS]
})
export class RippleModule {

}

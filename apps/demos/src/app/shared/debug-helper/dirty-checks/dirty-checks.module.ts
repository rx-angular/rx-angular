import { NgModule } from '@angular/core';
import { DirtyChecksComponent } from './dirty-checks.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

const DEPRECATIONS = [DirtyChecksComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [...DEPRECATIONS]
})
export class DirtyChecksModule {

}

import { NgModule } from '@angular/core';
import { DirtyChecksWorkComponent } from './dirty-checks-work.component';
import { DirtyChecksComponent } from './dirty-checks.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

const DEPRECATIONS = [DirtyChecksComponent, DirtyChecksWorkComponent];

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

import { NgModule } from '@angular/core';
import { DirtyChecksWorkComponent } from './dirty-checks-work.component';
import { DirtyChecksComponent } from './dirty-checks.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

const DEPRECATIONS = [DirtyChecksComponent, DirtyChecksWorkComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class DirtyChecksModule {}

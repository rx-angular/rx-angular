import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { DirtyChecksComponent } from './dirty-checks.component';
import { DirtyChecksWorkComponent } from './dirty-checks-work.component';

const DEPRECATIONS = [DirtyChecksComponent, DirtyChecksWorkComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class DirtyChecksModule {}

import { NgModule } from '@angular/core';
import { DirtyChecksComponent } from './dirty-checks.component';
import { CommonModule } from '@angular/common';

const DEPRECATIONS = [DirtyChecksComponent];

@NgModule({
  imports: [CommonModule, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class DirtyChecksModule {}

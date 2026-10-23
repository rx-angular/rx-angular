import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirtyChecksComponent } from './dirty-checks.component';

const DEPRECATIONS = [DirtyChecksComponent];

@NgModule({
  imports: [CommonModule, ...DEPRECATIONS],
  exports: [...DEPRECATIONS],
})
export class DirtyChecksModule {}

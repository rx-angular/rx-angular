import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirtyChecksComponent } from './dirty-checks.component';

const DEPRECATIONS = [DirtyChecksComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [CommonModule],
  exports: [...DEPRECATIONS],
})
export class DirtyChecksModule {}

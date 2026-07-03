import { NgModule } from '@angular/core';
import { IfVisibleDirective } from './if-visible.directive';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [IfVisibleDirective];

@NgModule({
  imports: [CommonModule, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [],
})
export class IfVisibleModule {}

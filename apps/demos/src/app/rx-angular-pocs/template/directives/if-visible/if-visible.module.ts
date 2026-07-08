import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IfVisibleDirective } from './if-visible.directive';

const DECLARATIONS = [IfVisibleDirective];

@NgModule({
  imports: [CommonModule, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [],
})
export class IfVisibleModule {}

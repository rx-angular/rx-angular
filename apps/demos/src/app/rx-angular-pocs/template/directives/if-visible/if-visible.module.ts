import { NgModule } from '@angular/core';
import { IfVisibleDirective } from './if-visible.directive';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [
  IfVisibleDirective
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class IfVisibleModule {
}

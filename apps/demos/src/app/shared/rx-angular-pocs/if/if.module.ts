import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxIfDirective } from './rx-if.directive';

const DECLARATIONS = [RxIfDirective];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: DECLARATIONS
})
export class IfModule {
}
